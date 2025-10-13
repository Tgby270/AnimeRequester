/**
 * Call the API to get the list of genres.
 * @returns {Promise<Array>} A promise that resolves to an array of genres.
 * @throws {Error} If the fetch operation fails.
 */
export async function getGenresList(){
  let url = 'https://anime-db.p.rapidapi.com/genre';
  let options = {
  method: 'GET',
  headers: {
           'x-rapidapi-key': window.sessionStorage.getItem("api_key"),
           'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };
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
 * Create and display checkboxes (and their labels) for each genre.
 * Checkboxes are added to the template and displayed in the UI.
 * The parameter input field is hidden when genres are displayed for a more user-friendly experience.
 * This function is called when the user selects the "search by genre" option.
 */
export async function showGenres() {
    try {
        let lab = document.getElementById('genreContainer');
        let param = document.getElementById('param');
        let paramLabel = document.getElementById('paramLabel');
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
 * Hide the genre checkboxes and shows the parameter input field.
 * This function is called when the user switches back to a search type that requires a parameter input.
 */
export function hideGenres() {
    let lab = document.getElementById('genreContainer');
    let param = document.getElementById('param');
    let paramLabel = document.getElementById('paramLabel');
    paramLabel.style.display = 'block';
    param.style.display = 'block';
    lab.style.display = 'none';
    const container = document.getElementById('genrediv');
    container.innerHTML = '';
}


/**
 * Saves every checked genre in an array and returns it.
 * @returns {Array} An array of selected genre values.
 */
export function getSelectedGenres() {
    const container = document.getElementById('genrediv');
    return Array.from(container.querySelectorAll('input[name="genres"]:checked'))
        .map(input => input.value);
}