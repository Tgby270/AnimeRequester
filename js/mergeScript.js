const form = document.getElementById("requestForm");
const reset = document.getElementById("reset");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    let url = "";

    if(window.sessionStorage.getItem("api_key") == null){
        console.log("No API key found in session storage, setting new key.");
         //request api key
        api_key = prompt("Veuillez entrer votre clé API:");
        window.sessionStorage.setItem("api_key", api_key);
        console.log("API key stored : " + window.sessionStorage.getItem("api_key"));
    }

    const formData = new FormData(form);
    const searchValue = formData.get("param"); // Changé de "searchValue" à "param"
    
    getData(searchValue);
});


function getData(searchValue) {
    switch(document.getElementById("searchType").value){
        case "titleSearch":
            url = "https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=" + searchValue + "&sortBy=ranking&sortOrder=asc"; 
            break;
        case "IDSearch":
            url = "https://anime-db.p.rapidapi.com/anime/by-id/" + searchValue; 
            break;
        case "rankSearch":
            url = "https://anime-db.p.rapidapi.com/anime/by-ranking/" + searchValue; 
            break;
        case "genreSearch":
            url = ""; 
            break;
    }
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': window.sessionStorage.getItem("api_key"),
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                showNotFound();
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            //console.log("API Response:", data);
            
            // Pour une recherche par rang, l'API retourne directement un objet anime
            // Donc on créé un tableau avec cet objet
            let tabtemp = Array.isArray(data) ? data : [data];
            if(!tabtemp || tabtemp.length === 0){
                showNotFound();
                alert("No results found.");
                return ;
            } else {
                show(tabtemp, document.getElementById("searchType").value);
            }
        });
}

function show(tabtemp, searchType){
    if(!tabtemp || tabtemp.length === 0){
        showNotFound();
        return ;
    }

    if(searchType === "titleSearch")
    {
        console.log(tabtemp);
        tabtemp = tabtemp[0].data;
        console.log(tabtemp);
        if(!tabtemp || tabtemp.length === 0){
            showNotFound();
            return ;
        }
    }
    console.table(tabtemp);

    const animeShow = document.getElementById("animeShow");

    if( animeShow ){
      document.body.removeChild(animeShow); 
    }

    tabtemp.forEach(anime => {        
        
         // Clear existing anime show if present
        
        const template = document.getElementById("animeTemplate").content.cloneNode(true);

        template.querySelector("#animeTitle").textContent = anime.title;
        template.querySelector("#animeImage").src = anime.image;
        template.querySelector("#animeDescription").innerHTML = "<b>Synopsis: </b></br>" + anime.synopsis;
        if(!anime.genres || anime.genres.length === 0) {
          template.querySelector("#animeGenre").innerHTML = "<b>Genres: </b>N/A";
        } 
        else {
          template.querySelector("#animeGenre").innerHTML = "<b>Genres: </b></br>" + anime.genres.join(", ");
        }
        template.querySelector("#animeRank").innerHTML = "<b>Rank: </b>" + anime.ranking;
        template.querySelector("#animeID").innerHTML = "<b>ID: </b>" + anime._id;

        document.body.appendChild(template);
    });
}

reset.addEventListener("click", (event) => {
    window.location.reload();
});

function showNotFound(){
    const template = document
      .getElementById("animeTemplate")
      .content.cloneNode(true);
    template.querySelector("#animeTitle").textContent = "Not Found";
    template.querySelector("#animeImage").alt = "";
    document.body.appendChild(template);
  }