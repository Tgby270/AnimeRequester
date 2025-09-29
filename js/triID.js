

const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ea73e965f1mshdf06bb0c4f075d8p14f93djsne0faf0bc3c19',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

try {
    fetch(url, options)
    .then(response => {
        return response.json();
    }).then(data => {
        data.forEach(anime => {
            console.log(anime._id);
        });
    });
} catch (error) {
	console.error(error);
}