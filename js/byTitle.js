async function fetchByTitle() {
  const url =
    "https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c74efe75ecmsh9faeb3881b181bbp1ad151jsn0f8c61a1d5e1",
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
    },
  };

  try {
    ul = document.getElementById('animeList');

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        tabtemp = data.data;
        tabtemp.forEach(element => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = element.image;
            img.alt = element.title;
            li.innerText = "Titre: " + element.title + '\n\n ID: ' + element._id + '\n\n Synopsis: ' + element.synopsis + '\n\n Genres: ' + element.genres + '\n\n Ranking: ' + element.ranking + '\n\n';
            li.appendChild(img);
            ul.appendChild(li);
        });
    });
  } catch (error) {
    console.error(error);
  }
}
