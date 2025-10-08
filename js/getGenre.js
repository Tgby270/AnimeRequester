async function getGenresList(){
    const url = 'https://anime-db.p.rapidapi.com/genre';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c74efe75ecmsh9faeb3881b181bbp1ad151jsn0f8c61a1d5e1',
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

async function showGenres() {
    try {
        lab = document.getElementById('genresLab');
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

function hideGenres() {
    lab = document.getElementById('genresLab');
    lab.style.display = 'none';
    const container = document.getElementById('genrediv');
    container.innerHTML = '';
}
