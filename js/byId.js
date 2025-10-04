function IDresearch(id){
    const urlById = 'https://anime-db.p.rapidapi.com/anime/by-id/' + id;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ea73e965f1mshdf06bb0c4f075d8p14f93djsne0faf0bc3c19',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };
    
    const animeShow = document.getElementById("animeShow");
    if(animeShow){
        document.body.removeChild(animeShow);
    }

    try {;
        fetch(urlById, options)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            let tab = data;
            //tab.forEach(anime => {
                const template = document.getElementById("animeTemplate").content.cloneNode(true);
                template.querySelector("#animeTitle").textContent = tab.title;
                template.querySelector("#animeImage").src = tab.image;
                template.querySelector("#animeDescription").innerHTML = "<b>Synopsis: </b></br>" + tab.synopsis;
                if(tab.genres.length === 0) {
                    template.querySelector("#animeGenre").innerHTML = "<b>Genres: </b>N/A";
                } else {
                    template.querySelector("#animeGenre").innerHTML = "<b>Genres: </b></br>" + tab.genres.join(", ");
                }
                template.querySelector("#animeRank").innerHTML = "<b>Rank: </b>" + tab.ranking;
                template.querySelector("#animeID").innerHTML = "<b>ID: </b>" + tab._id;

                document.body.appendChild(template);
            //});
        });
    } catch (error) {
        console.error(error);
    }
}