// Array of movie objects
const movies = [
    {
      id: 1,
      title: 'Interstellar',
      description: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
      movie_year: 2014,
      director: "Christopher Nolan",
      actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Casey Affleck", "Mackenzie Foy", "John Lithgow", "Ellen Burstyn", "Matt Damon"],
      poster_url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      price: '120.00',
    },
    {
      id: 2,
      title: 'Dangal',
      description: 'The inspiring true story of a father who trains his daughters to become world-class wrestlers, defying all odds and societal norms.',
      movie_year: 2016,
      director: "Nitesh Tiwari",
      actors: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra", "Zaira Wasim", "Suhi Choudhary"],
      poster_url: 'https://www.bollywoodhungama.com/wp-content/uploads/2016/03/Dangale.jpg',
      price: '100.00',
    },
    {
        id: 3,
        title: "The Wall",
        description: "Two American soldiers are trapped by a lethal sniper, with only an unsteady wall between them.",
        movie_year: 2017,
        director: "Doug Liman",
        actors: ["Aaron Taylor-Johnson", "John Cena", "Laith Nakli"],
        poster_url: 'https://m.media-amazon.com/images/I/81hQX9dJBhL._AC_UF894,1000_QL80_.jpg',
        price: '120.00',
    },
    {
      id: 4,
      title: 'Parasite',
      description: 'A dark comedy thriller about a poor family who schemes to become employed by a wealthy family and infiltrate their household. Winner of the 2020 Academy Award for Best Picture.',
      movie_year: 2019,
      director: "Bong Joon-ho",
      actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"],
      poster_url: 'https://www.originalfilmart.com/cdn/shop/files/parasite_2019_french_original_film_art_5000x.jpg?v=1716935881',
      price: '150.00',
    },
    {
      id: 5,
      title: 'Godzilla: King of the Monsters',
      description: 'The crypto-zoological agency Monarch faces off against a battery of God-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.',
      movie_year: 2019,
      director: "Michael Dougherty",
      actors: ["Kyle Chandler", "Vera Farmiga", "Millie Bobby Brown", "Bradley Whitford", "Sally Hawkins"],
      poster_url: 'https://i.ebayimg.com/images/g/JMQAAOSwpupgR9jm/s-l1600.webp',
      price: '110.00',
    }
  ];
  
  // Function to display the movie card
  function displayMovieCard(movie) {
    const movieContainer = document.getElementById('movie-container');
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
        
    movieCard.innerHTML = `
      <img src="${movie.poster_url}" alt="${movie.title} poster" class="movie-poster">
      <h3>${movie.title} (${movie.movie_year})</h3>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Actors:</strong> ${movie.actors.join(", ")}</p>
      <p><strong>Description:</strong> ${movie.description}</p>
      <p><strong>Price:</strong> $${movie.price}</p>
  
      <!-- Add comment section -->
      <div class="comment-section">
        <input type="text" id="comment-input-${movie.id}" placeholder="Add a comment...">
        <button onclick="addComment(${movie.id})">Submit Comment</button>
        <div id="comments-display-${movie.id}"></div>
      </div>
  
      <!-- Add rating section -->     
<div class="rating-section">
  <label for="rating">Rate this Movie: </label>
  <div id="rating-stars-${movie.id}">
    <span class="star" onclick="rateMovie(${movie.id}, 1)">&#9733;</span>
    <span class="star" onclick="rateMovie(${movie.id}, 2)">&#9733;</span>
    <span class="star" onclick="rateMovie(${movie.id}, 3)">&#9733;</span>
    <span class="star" onclick="rateMovie(${movie.id}, 4)">&#9733;</span>
    <span class="star" onclick="rateMovie(${movie.id}, 5)">&#9733;</span>
  </div>
  <div id="rating-display-${movie.id}"></div>
</div>

    `;
movieContainer.appendChild(movieCard);
  }

  // Function to add a comment
  function addComment(movieId) {
    const commentInput = document.getElementById(`comment-input-${movieId}`);
    const commentDisplay = document.getElementById(`comments-display-${movieId}`);
    const comment = commentInput.value;
  
    if (comment) {
      const commentElement = document.createElement('p');
      commentElement.textContent = comment;
      commentDisplay.appendChild(commentElement);
      commentInput.value = ''; 
    }
  }
  
let selectedRatings = {};

// Function to handle movie rating
function rateMovie(movieId, starRating) {
    selectedRatings[movieId] = starRating; // Store selected rating
    updateStars(movieId, starRating); // Update UI to highlight stars
    document.getElementById(`rating-display-${movieId}`).textContent = `You rated this movie ${starRating} stars.`;
}

// Function to update star highlighting
function updateStars(movieId, starRating) {
    const stars = document.querySelectorAll(`#rating-stars-${movieId} .star`);
    stars.forEach((star, index) => {
        // Highlight stars up to the selected rating
        star.classList.toggle("active", index < starRating);
    });
}
 
   
  
  // Display all the movie cards on page load
  window.onload = function() {
    movies.forEach(movie => {
      displayMovieCard(movie);
    });
  };
  
  
  // Function to search for movies by title keyword
function searchMovies(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const searchInput = document.querySelector('.inputbox').value.trim(); 
  const movieContainer = document.getElementById('movie-container');

  // Clear previous results
  movieContainer.innerHTML = '';

  // Filter movies based on search input
  const searchResults = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Display results
  if (searchResults.length > 0) {
    searchResults.forEach(movie => displayMovieCard(movie));
  } else {
    movieContainer.innerHTML = '<p>No movies found.</p>';
  }
}

// Attach event listener to the form
document.querySelector('.search-form').addEventListener('submit', searchMovies);

// Function to sort movies by selected property and order
function sortMoviesByProperty(property, order = 'asc') {
  movies.sort((a, b) => {
      let valueA = a[property];
      let valueB = b[property];

      // Convert prices to numbers if sorting by price
      if (property === "price") {
          valueA = parseFloat(valueA);
          valueB = parseFloat(valueB);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
          return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
          return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      return 0;
  });

  // Refresh the displayed movies after sorting
  document.getElementById("movie-container").innerHTML = "";
  movies.forEach(movie => displayMovieCard(movie));
}

// Event listener for sorting
document.getElementById("sortButton").addEventListener("click", () => {
  const selectedProperty = document.getElementById("sortProperty").value;
  const selectedOrder = document.getElementById("sortOrder").value;

  sortMoviesByProperty(selectedProperty, selectedOrder);
});

let movieTimer; // Store the timeout reference

function startMovieTimer() {
    let timeLeft = parseInt(document.getElementById("movie-time").value);
    const display = document.getElementById("movie-timer-display");

    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    // Clear any existing countdown before starting a new one
    clearTimeout(movieTimer);

    function countdown(callback) {
        display.textContent = timeLeft;
        
        if (timeLeft > 0) {
            timeLeft--;
            movieTimer = setTimeout(() => countdown(callback), 1000);
        } else {
            callback(); // Alert when time is up
        }
    }

    countdown(() => {
        alert("⏰ Time's up! Pick your movie now!");
        document.getElementById('alarm-sound').play();
    });
}
//Tracks time spent on page
(function () {
    let elapsedTime = 0;

    function updateElapsedTime() {
        document.getElementById("elapsed-time").textContent = elapsedTime;
        elapsedTime++;
        setTimeout(updateElapsedTime, 1000); // Recursive callback
    }

    updateElapsedTime(); // Start the timer when the page loads
})();
