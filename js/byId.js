function IDresearch(id, api_key) {
  const urlById = "https://anime-db.p.rapidapi.com/anime/by-id/" + id;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": api_key, // ea73e965f1mshdf06bb0c4f075d8p14f93djsne0faf0bc3c19
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
    },
  };

  const animeShow = document.getElementById("animeShow");
  if (animeShow) {
    document.body.removeChild(animeShow);
  }

  try {
    fetch(urlById, options)
      .then((response) => {
        if(!response.ok){
          showIdNotFound();
        } else {
          return response.json();
        }
      })
      .then((data) => {
          showId(data);
      });
  } catch (error) {
    console.error(error);
  }
}

function showId(data){
  console.log(data);
  const template = document
    .getElementById("animeTemplate")
    .content.cloneNode(true);
  template.querySelector("#animeTitle").textContent = data.title;
  template.querySelector("#animeImage").src = data.image;
  template.querySelector("#animeDescription").innerHTML =
    "<b>Synopsis: </b></br>" + data.synopsis;
  if (data.genres.length === 0) {
    template.querySelector("#animeGenre").innerHTML =
      "<b>Genres: </b>N/A";
  } else {
    template.querySelector("#animeGenre").innerHTML =
      "<b>Genres: </b></br>" + data.genres.join(", ");
  }
  template.querySelector("#animeRank").innerHTML =
    "<b>Rank: </b>" + data.ranking;
  template.querySelector("#animeID").innerHTML = "<b>ID: </b>" + data._id;
  template.querySelector("#nbEpisodes").innerHTML =
  "<b>Number of Episodes: </b>" + data.episodes;
  document.body.appendChild(template);
}

function showIdNotFound(){
  const template = document
    .getElementById("animeTemplate")
    .content.cloneNode(true);
  template.querySelector("#animeTitle").textContent = "Not Found";
  template.querySelector("#animeImage").alt = "";
  document.body.appendChild(template);
}