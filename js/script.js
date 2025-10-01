const form = document.getElementById("requestForm");
const reset = document.getElementById("reset");


form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    
    const formData = new FormData(form);
    const searchType = formData.get("searchType");
    const searchValue = formData.get("param"); // Changé de "searchValue" à "param"
    
    switch(searchType){
        case "titleSearch":
            // hassoul
            break;
        case "IDSearch":
            // hassoul
            break;
        case "rankSearch":
            console.log("Rank search for: " + searchValue);
            showRank(searchValue);
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