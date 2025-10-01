let valueResearch;
const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ea73e965f1mshdf06bb0c4f075d8p14f93djsne0faf0bc3c19',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

document.getElementById("search").addEventListener("submit", function(event) {
    event.preventDefault();
    let valueResearch = document.getElementById("param").value;
    alert("Valeur saisie : " + valueResearch);
});

/*
try {
    const ulElement = document.getElementById('animeList');
    fetch(url, options)
    .then(response => {
        return response.json();
    }).then(data => {
        for(const anime of data.data) {
            const liElement = document.createElement("li");
            const imgElement = document.createElement("img");
            imgElement.src = anime.image;
            liElement.appendChild(imgElement);
            liElement.innerText =
            " \n Titre: " + anime.title + " | Rang: " + anime.ranking + 
            " \n Année: " + anime.year + 
            " \n Note: " + anime.rating + 
            " \n Genre(s): " + anime.genres + 
            " \n Synopsis: " + anime.synopsis;

            ulElement.appendChild(liElement);
        }
    });
} catch (error) {
	console.error(error);
}*/