document.getElementById('search-btn').addEventListener('click', searchMovie);

function searchMovie() {
    const movieInput = document.getElementById('movie-input').value;
    if (!movieInput) {
        alert('Please enter a movie name');
        return;
    }

    const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your OMDb API key
    const url = `https://www.omdbapi.com/?s=${movieInput}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                document.getElementById('movie-results').innerHTML = '<p>No movies found</p>';
            }
        })
        .catch(error => console.log('Error fetching data:', error));
}

function displayMovies(movies) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        
        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;

        resultsContainer.appendChild(movieElement);
    });
}

