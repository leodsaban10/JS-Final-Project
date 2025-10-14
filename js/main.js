// Main page functionality for movie app
// This file handles all the dynamic content loading

// Wait for page to load before running any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main page loaded, initializing...');
    initializePage();
});

// Initialize the page with movie data
async function initializePage() {
    try {
        console.log('Loading popular movies...');
        await loadPopularMovies();
        
        console.log('Loading top rated movies...');
        await loadTopRatedMovies();
        
        console.log('Loading saved movies...');
        loadSavedMovies();
        
        console.log('Page initialization complete!');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Load popular movies into the popular-container
async function loadPopularMovies() {
    const container = document.getElementById('popular-container');
    if (!container) {
        console.error('Popular container not found');
        return;
    }
    
    try {
        const movies = await movieAPI.getPopularMovies();
        console.log('Popular movies received:', movies.length);
        
        if (movies.length > 0) {
            displayMovies(movies.slice(0, 8), container); // Show first 8 movies
        } else {
            container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Unable to load popular movies</p>';
        }
    } catch (error) {
        console.error('Error loading popular movies:', error);
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Error loading popular movies</p>';
    }
}

// Load top rated movies into the recommended-container
async function loadTopRatedMovies() {
    const container = document.getElementById('recommended-container');
    if (!container) {
        console.error('Recommended container not found');
        return;
    }
    
    try {
        const movies = await movieAPI.getTopRatedMovies();
        console.log('Top rated movies received:', movies.length);
        
        if (movies.length > 0) {
            displayMovies(movies.slice(0, 8), container); // Show first 8 movies
        } else {
            container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Unable to load recommended movies</p>';
        }
    } catch (error) {
        console.error('Error loading top rated movies:', error);
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Error loading recommended movies</p>';
    }
}

// Search for movies
async function searchMovies() {
    const searchInput = document.getElementById('search-input');
    const popularContainer = document.getElementById('popular-container');
    const searchContainer = document.getElementById('search-container');
    const searchSection = document.getElementById('search-section');
    
    if (!searchInput || !popularContainer || !searchContainer || !searchSection) {
        console.error('Search elements not found');
        return;
    }
    
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a movie title to search');
        return;
    }
    
    try {
        console.log('Searching for:', query);
        
        // Hide the separate search section (we'll use popular container)
        searchSection.style.display = 'none';
        
        // Update the popular movies section to show search results
        const popularSection = popularContainer.closest('.popular-movies');
        if (popularSection) {
            const popularTitle = popularSection.querySelector('h2');
            if (popularTitle) {
                popularTitle.textContent = `Search Results for "${query}"`;
            }
        }
        
        // Show loading message in popular container
        popularContainer.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Searching...</p>';
        
        const movies = await movieAPI.searchMovies(query);
        console.log('Search results:', movies.length);
        
        if (movies.length > 0) {
            displayMovies(movies.slice(0, 12), popularContainer); // Show search results in popular container
            
            // Add a "Back to Popular Movies" button
            addBackToPopularButton(popularContainer);
        } else {
            popularContainer.innerHTML = `
                <p style="color: white; text-align: center; width: 100%;">No movies found for "${query}"</p>
                <button onclick="restorePopularMovies()" style="margin: 20px auto; display: block; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Back to Popular Movies</button>
            `;
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error searching movies:', error);
        popularContainer.innerHTML = `
            <p style="color: white; text-align: center; width: 100%;">Error searching movies</p>
            <button onclick="restorePopularMovies()" style="margin: 20px auto; display: block; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Back to Popular Movies</button>
        `;
    }
}

// Add a "Back to Popular Movies" button after search results
function addBackToPopularButton(container) {
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Popular Movies';
    backButton.style.cssText = `
        margin: 20px auto;
        display: block;
        padding: 10px 20px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    `;
    backButton.onclick = restorePopularMovies;
    
    container.appendChild(backButton);
}

// Restore popular movies to the top section
async function restorePopularMovies() {
    const popularContainer = document.getElementById('popular-container');
    const searchInput = document.getElementById('search-input');
    
    if (!popularContainer) {
        console.error('Popular container not found');
        return;
    }
    
    // Clear search input
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Restore the section title
    const popularSection = popularContainer.closest('.popular-movies');
    if (popularSection) {
        const popularTitle = popularSection.querySelector('h2');
        if (popularTitle) {
            popularTitle.textContent = 'Popular Movies';
        }
    }
    
    // Show loading message
    popularContainer.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Loading popular movies...</p>';
    
    // Reload popular movies
    await loadPopularMovies();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display movies in a container
function displayMovies(movies, container) {
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">No movies to display</p>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}

// Create a movie card element
function createMovieCard(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'box-1';
    movieDiv.style.cursor = 'pointer';
    
    // Get year from release date
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    
    // Create movie card HTML
    movieDiv.innerHTML = `
        <img src="${movieAPI.getImageUrl(movie.poster_path)}" 
             alt="${movie.title}" 
             style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px 10px 0 0;">
        <div class="box-content" style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; font-size: 16px; color: black;">${movie.title}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">Year: ${year}</p>
            <p style="margin: 0; font-size: 12px; color: #666;">Rating: ${movie.vote_average.toFixed(1)}/10</p>
        </div>
    `;
    
    // Add click event to navigate to movie details (we'll implement this later)
    movieDiv.addEventListener('click', function() {
        console.log('Movie clicked:', movie.title);
        // TODO: Navigate to movie details page
        alert('Movie details coming soon!\nClicked: ' + movie.title);
    });
    
    return movieDiv;
}

// Load saved movies from localStorage
function loadSavedMovies() {
    const container = document.getElementById('saved-container');
    const savedSection = document.getElementById('saved-section');
    const savedMessage = document.getElementById('saved-message');
    
    if (!container || !savedSection) {
        console.error('Saved container not found');
        return;
    }
    
    try {
        const savedMovies = getSavedMovies();
        console.log('Saved movies:', savedMovies.length);
        
        if (savedMovies.length > 0) {
            // Show the saved section
            savedSection.style.display = 'block';
            if (savedMessage) savedMessage.style.display = 'none';
            displayMovies(savedMovies, container);
        } else {
            // Hide the saved section if no movies
            savedSection.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading saved movies:', error);
    }
}

// Get saved movies from localStorage
function getSavedMovies() {
    try {
        const saved = localStorage.getItem('savedMovies');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error reading saved movies:', error);
        return [];
    }
}

// Save a movie to localStorage
function saveMovie(movie) {
    try {
        const savedMovies = getSavedMovies();
        
        // Check if movie is already saved
        if (!savedMovies.find(saved => saved.id === movie.id)) {
            savedMovies.push(movie);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            console.log('Movie saved:', movie.title);
            
            // Refresh saved movies display
            loadSavedMovies();
            
            return true;
        } else {
            console.log('Movie already saved:', movie.title);
            return false;
        }
    } catch (error) {
        console.error('Error saving movie:', error);
        return false;
    }
}

// Remove a movie from localStorage
function removeSavedMovie(movieId) {
    try {
        let savedMovies = getSavedMovies();
        savedMovies = savedMovies.filter(movie => movie.id !== movieId);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        
        // Refresh saved movies display
        loadSavedMovies();
        
        console.log('Movie removed from saved list');
        return true;
    } catch (error) {
        console.error('Error removing saved movie:', error);
        return false;
    }
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchMovies();
            }
        });
    }
});