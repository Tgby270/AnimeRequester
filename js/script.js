const form = document.getElementById("requestForm");
const reset = document.getElementById("reset");


form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    
    //request api key
    api_key = prompt("Veuillez entrer votre clé API:");

    const formData = new FormData(form);
    const searchType = formData.get("searchType");
    const searchValue = formData.get("param"); // Changé de "searchValue" à "param"
    
    switch(searchType){
        case "titleSearch":
            console.log("Title search for: " + searchValue);
            showTitle(searchValue, api_key);
            break;
        case "IDSearch":
            console.log("Title search for: " + searchValue);
            IDresearch(searchValue, api_key);
            break;
        case "rankSearch":
            console.log("Rank search for: " + searchValue);
            showRank(searchValue, api_key);
            break;
        case "genreSearch":
            // hassoul
            break;
        case "genreList":
            // hassoul
            break;
    }
});

reset.addEventListener("click", (event) => {
    window.location.reload();
});
