let movies = [];

async function fetchMovies() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/SathiC1990/sathic1990/8aef22725944fc1b37339a22f5535fdbd1541813/data/movies.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }

    movies = await response.json(); // Update the global movies array
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    document.getElementById("movie-container").innerHTML =
      "<p>Error loading movies. Please try again later.</p>";
  }
}

// Function to display all movies
function displayMovies(movies) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    displayMovieCard(movie);
  });
}

// Function to display the movie card
function displayMovieCard(movie) {
  const movieContainer = document.getElementById("movie-container");
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
      <img src="${movie.poster_url}" alt="${
    movie.title
  } poster" class="movie-poster">
      <h3>${movie.title} (${movie.movie_year})</h3>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Actors:</strong> ${movie.actors.join(", ")}</p>
      <p><strong>Description:</strong> ${movie.description}</p>
      <p><strong>Price:</strong> $${movie.price}</p>
  
      <!-- Add comment section -->
      <div class="comment-section">
        <input type="text" id="comment-input-${
          movie.id
        }" placeholder="Add a comment...">
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
    const commentElement = document.createElement("p");
    commentElement.textContent = comment;
    commentDisplay.appendChild(commentElement);
    commentInput.value = "";
  }
}

const selectedRatings = {};

// Function to handle movie rating
function rateMovie(movieId, starRating) {
  selectedRatings[movieId] = starRating; // Store selected rating
  updateStars(movieId, starRating); // Update UI to highlight stars
  document.getElementById(
    `rating-display-${movieId}`
  ).textContent = `You rated this movie ${starRating} stars.`;
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
window.onload = function () {
  movies.forEach((movie) => {
    displayMovieCard(movie);
  });
};

// Function to search for movies by title keyword
function searchMovies(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const searchInput = document.querySelector(".inputbox").value.trim();
  const movieContainer = document.getElementById("movie-container");

  // Clear previous results
  movieContainer.innerHTML = "";

  // Filter movies based on search input
  const searchResults = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Display results
  if (searchResults.length > 0) {
    searchResults.forEach((movie) => displayMovieCard(movie));
  } else {
    movieContainer.innerHTML = "<p>No movies found.</p>";
  }
}

// Attach event listener to the form
document.querySelector(".search-form").addEventListener("submit", searchMovies);

// Function to sort movies by selected property and order
function sortMoviesByProperty(property, order = "asc") {
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
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  // Refresh the displayed movies after sorting
  document.getElementById("movie-container").innerHTML = "";
  movies.forEach((movie) => displayMovieCard(movie));
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
    document.getElementById("alarm-sound").play();
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

//  Filter Function
document.getElementById("filterButton").addEventListener("click", function () {
  const filterYear = parseInt(document.getElementById("filterYear").value);

  if (!filterYear) {
    alert("Please enter a valid year to filter.");
    return;
  }

  const filteredMovies = movies.filter(
    (movie) => movie.movie_year === filterYear
  );
  displayMovies(filteredMovies);
});

window.onload = fetchMovies;
