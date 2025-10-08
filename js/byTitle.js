function showAnimeAtTitle(researchName, api_key) {
  // Properly encode the search parameter to handle spaces and special characters
  const encodedSearch = encodeURIComponent(researchName);
  const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${encodedSearch}&sortBy=ranking&sortOrder=asc`;
  console.log("Requesting URL:", url);

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": api_key,
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
    },
  };

  try {
    fetch(url, options)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);

        // Clear all existing anime shows BEFORE the loop, not inside it
        const existingShows = document.querySelectorAll("#animeShow");
        existingShows.forEach((show) => {
          if (show.parentNode) {
            show.parentNode.removeChild(show);
          }
        });

        // Handle the API response structure properly
        let tabtemp = data.data;

        tabtemp.forEach((anime) => {
          const template = document
            .getElementById("animeTemplate")
            .content.cloneNode(true);

          template.querySelector("#animeTitle").textContent = anime.title;
          template.querySelector("#animeImage").src = anime.image;
          template.querySelector("#animeDescription").innerHTML =
            "<b>Synopsis: </b></br>" + anime.synopsis;
          if (anime.genres.length === 0) {
            template.querySelector("#animeGenre").innerHTML =
              "<b>Genres: </b>N/A";
          } else {
            template.querySelector("#animeGenre").innerHTML =
              "<b>Genres: </b></br>" + anime.genres.join(", ");
          }
          template.querySelector("#animeRank").innerHTML =
            "<b>Rank: </b>" + anime.ranking;
          template.querySelector("#animeID").innerHTML =
            "<b>ID: </b>" + anime._id;
          
          template.querySelector("#nbEpisodes").innerHTML =
            "<b>Number of Episodes: </b>" + anime.episodes;

          document.body.appendChild(template);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Error fetching anime data: " + error.message);
      });
  } catch (error) {
    console.error("General error:", error);
    alert("An error occurred: " + error.message);
  }
}

function showTitle(researchName, api_key) {
  if (
    researchName === undefined ||
    researchName === "" ||
    researchName === null
  ) {
    console.log(
      "No research name provided, using default URL: " + url.toString()
    );
  } else {
    showAnimeAtTitle(researchName, api_key);
  }
}
