const form = document.getElementById("requestForm");
const reset = document.getElementById("reset");


searchType = document.getElementById("searchType");
searchType.addEventListener("change", (event) => {
    if (event.target.value === "genreSearch") {
        showGenres();
    } else {
        hideGenres();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    
   

    if(window.sessionStorage.getItem("api_key") == null){
        console.log("No API key found in session storage, setting new key.");
         //request api key
        api_key = prompt("Veuillez entrer votre clé API:");
        window.sessionStorage.setItem("api_key", api_key);
        console.log("API key stored : " + window.sessionStorage.getItem("api_key"));
    }

    const formData = new FormData(form);
    const searchType = formData.get("searchType");
    const searchValue = formData.get("param"); // Changé de "searchValue" à "param"

    switch(searchType){
        case "titleSearch":
            console.log("Title search for: " + searchValue);
            showTitle(searchValue, window.sessionStorage.getItem("api_key"));
            break;
        case "IDSearch":
            console.log("Title search for: " + searchValue);
            IDresearch(searchValue, window.sessionStorage.getItem("api_key"));
            break;
        case "rankSearch":
            console.log("Rank search for: " + searchValue);
            showRank(searchValue, window.sessionStorage.getItem("api_key"));
            break;
        case "genreSearch":
            showByGenres();
            break;
        case "genreList":
            // hassoul
            break;
    }
});

reset.addEventListener("click", (event) => {
    window.location.reload();
});
