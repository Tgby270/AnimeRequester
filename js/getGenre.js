url = 'https://anime-db.p.rapidapi.com/genre';
options = {
    method: 'GET',
    headers: {
           'x-rapidapi-key': 'c74efe75ecmsh9faeb3881b181bbp1ad151jsn0f8c61a1d5e1',
           'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

/**
 * Fetch the list of genres from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of genres.
 * @throws {Error} If the fetch operation fails.
 */
async function getGenresList(){
    try {
        const response = await fetch(url, options);
        console.log("Response status:", response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Show the list of genres as checkboxes in the UI.
 * @throws {Error} If there is an error fetching or displaying genres.
 */
async function showGenres() {
    try {
        lab = document.getElementById('genreContainer');
        param = document.getElementById('param');
        paramLabel = document.getElementById('paramLabel');
        paramLabel.style.display = 'none';
        param.style.display = 'none';
        lab.style.display = 'flex';
        const genresResp = await getGenresList();
        console.log(genresResp);

        let container = document.getElementById('genrediv');
        
        const template = document.getElementById('genreTemplate');
        genresResp.forEach((g, i) => {
            const clone = template.content.cloneNode(true)
            const input = clone.querySelector('input');
            const label = clone.querySelector('label');

            const value = g._id ;
            const id = `genre_${i}`;

            input.id = id;
            input.value = value;
            input.name = 'genres';
            label.htmlFor = id;
            label.textContent = value;
            container.appendChild(clone);
        });
    } catch (err) {
        console.error('showGenres error:', err);
    }
}

/**
 * Hide the genres section in the UI.
 */
function hideGenres() {
    lab = document.getElementById('genreContainer');
    param = document.getElementById('param');
    paramLabel = document.getElementById('paramLabel');
    paramLabel.style.display = 'block';
    param.style.display = 'block';
    lab.style.display = 'none';
    const container = document.getElementById('genrediv');
    container.innerHTML = '';
}

/**
 * Get the selected genres from the checkboxes.
 * @returns {Array} An array of selected genre values.
 */
function getSelectedGenres() {
    const container = document.getElementById('genrediv');
    return Array.from(container.querySelectorAll('input[name="genres"]:checked'))
        .map(input => input.value);
}

/**
 * Fetch anime results based on selected genres.
 * @returns {Promise<Array>} A promise that resolves to an array of anime results.
 * @throws {Error} If the fetch operation fails.
 */
async function getResultsByGenres() {
    const selectedGenres = getSelectedGenres();
    genresSearch = selectedGenres.join('%2C');
    genresSearch = genresSearch.replaceAll(' ', '%20');
    console.log("Selected genres:", genresSearch);
    url = `https://anime-db.p.rapidapi.com/anime?genres=${genresSearch}&page=1&size=20&sortBy=ranking&sortOrder=asc`;
    try {
        const response = await fetch(url, options);
        console.log("Response status:", response.status);
        const data = await response.json();
        //console.log("Data received:", data.data);
        return data.data;
    } catch (error) {
        console.error("Error fetching results by genres:", error);
        return null;
    }
}

/**
 * Display anime results based on selected genres.
 * @throws {Error} If there is an error fetching or displaying results.
 */
async function showByGenres() {

        const existingShows = document.querySelectorAll("#animeShow");
        existingShows.forEach((show) => {
          if (show.parentNode) {
            show.parentNode.removeChild(show);
          }
        });

    const dat2 = await getResultsByGenres();

        dat2.forEach((anime) => {
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
}


