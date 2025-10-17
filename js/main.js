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
        popularContainer.innerHTML = '<div class="swiper-slide"><p style="color: white; text-align: center; width: 100%;">Searching...</p></div>';
        
        const movies = await movieAPI.searchMovies(query);
        console.log('Search results:', movies.length);
        
        if (movies.length > 0) {
            displayMovies(movies.slice(0, 12), popularContainer); // Show search results in popular container
            
            // Add a "Back to Popular Movies" button
            addBackToPopularButton(popularContainer);
        } else {
            // Show popup for no results and restore popular movies
            alert(`No movies found for "${query}"`);
            await restorePopularMovies();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error searching movies:', error);
        // Show popup for error and restore popular movies
        alert('Error searching movies. Please try again.');
        await restorePopularMovies();
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
    
    // Create a swiper slide for the button if it's a swiper container
    if (container.classList.contains('swiper-wrapper')) {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide';
        slideDiv.style.width = 'auto';
        slideDiv.appendChild(backButton);
        container.appendChild(slideDiv);
    } else {
        container.appendChild(backButton);
    }
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
    popularContainer.innerHTML = '<div class="swiper-slide"><p style="color: white; text-align: center; width: 100%;">Loading popular movies...</p></div>';
    
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
    
    // Check if this is a Swiper container
    const isSwiper = container.classList.contains('swiper-wrapper');
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        
        if (isSwiper) {
            // Wrap in swiper-slide for Swiper containers
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            slideDiv.appendChild(movieCard);
            container.appendChild(slideDiv);
        } else {
            // Regular container
            container.appendChild(movieCard);
        }
    });
    
    // Initialize Swiper if it's a swiper container
    if (isSwiper) {
        initializeSwiper(container.closest('.swiper'));
    }
}

// Initialize Swiper for a container
function initializeSwiper(swiperElement) {
    if (!swiperElement) return;
    
    // Destroy existing swiper if it exists
    if (swiperElement.swiper) {
        swiperElement.swiper.destroy();
    }
    
    new Swiper(swiperElement, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,
        navigation: {
            nextEl: swiperElement.querySelector('.swiper-button-next'),
            prevEl: swiperElement.querySelector('.swiper-button-prev'),
        },
        pagination: {
            el: swiperElement.querySelector('.swiper-pagination'),
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            320: {
                spaceBetween: 15,
            },
            768: {
                spaceBetween: 18,
            },
            1024: {
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 25,
            }
        }
    });
}

// Create a movie card element
function createMovieCard(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'box-1';
    movieDiv.style.position = 'relative';
    
    // Add data attributes for saving functionality
    movieDiv.dataset.movieId = movie.id;
    movieDiv.dataset.movieTitle = movie.title;
    movieDiv.dataset.moviePoster = movie.poster_path || '';
    movieDiv.dataset.movieOverview = movie.overview || '';
    movieDiv.dataset.movieRelease = movie.release_date || '';
    movieDiv.dataset.movieRating = movie.vote_average || 0;
    
    // Get year from release date
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    
    // Check if movie is already saved (safe check)
    let isSaved = false;
    try {
        if (typeof window.savedMoviesManager !== 'undefined' && window.savedMoviesManager) {
            isSaved = window.savedMoviesManager.isMovieSaved(movie.id);
        }
    } catch (error) {
        console.log('SavedMoviesManager not available yet:', error);
        isSaved = false;
    }
    
    // Create movie card HTML
    movieDiv.innerHTML = `
        <img src="${movieAPI.getImageUrl(movie.poster_path)}" 
             alt="${movie.title}" 
             style="width: 100%; height: 260px; object-fit: cover; border-radius: 10px 10px 0 0; flex-shrink: 0;">
        <div class="box-content" style="padding: 10px; background: rgba(255, 255, 255, 0.3); border-radius: 0 0 10px 10px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <h3 style="margin: 0 0 8px 0; font-size: 14px; color: black; line-height: 1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${movie.title}</h3>
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #666;">Year: ${year}</p>
                <p style="margin: 0; font-size: 11px; color: #666;">Rating: ${movie.vote_average.toFixed(1)}/10</p>
            </div>
            <button class="save-btn ${isSaved ? 'saved' : ''}" 
                    style="
                        position: absolute; 
                        top: 8px; 
                        right: 8px; 
                        background: ${isSaved ? '#4CAF50' : 'rgba(0,0,0,0.7)'}; 
                        color: white; 
                        border: none; 
                        padding: 6px 10px; 
                        border-radius: 15px; 
                        cursor: pointer; 
                        font-size: 11px;
                        font-weight: bold;
                        transition: background-color 0.3s ease;
                    ">${isSaved ? '❤️ Saved' : '🤍 Save'}</button>
        </div>
    `;
    
    // Add save button event listener
    const saveBtn = movieDiv.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            console.log('Save button clicked, isSaved:', isSaved);
            
            if (isSaved || saveBtn.classList.contains('saved')) {
                console.log('Removing movie');
                removeMovie(movieDiv);
            } else {
                console.log('Saving movie');
                saveMovie(movieDiv);
            }
        });
        
        // Add hover effects
        saveBtn.addEventListener('mouseover', function() {
            if (saveBtn.classList.contains('saved')) {
                saveBtn.style.background = '#45a049';
            } else {
                saveBtn.style.background = 'rgba(0,0,0,0.9)';
            }
        });
        
        saveBtn.addEventListener('mouseout', function() {
            if (saveBtn.classList.contains('saved')) {
                saveBtn.style.background = '#4CAF50';
            } else {
                saveBtn.style.background = 'rgba(0,0,0,0.7)';
            }
        });
    }
    
    // Add click event to navigate to movie details (we'll implement this later)
    movieDiv.addEventListener('click', function(event) {
        // Don't trigger if save button was clicked
        if (event.target.classList.contains('save-btn')) {
            return;
        }
        console.log('Movie clicked:', movie.title);
        // TODO: Navigate to movie details page
        alert('Movie details coming soon!\nClicked: ' + movie.title);
    });
    
    return movieDiv;
}

// Load saved movies from localStorage
function loadSavedMovies() {
    const container = document.getElementById('saved-container');
    
    if (!container) {
        console.error('Saved container not found');
        return;
    }
    
    try {
        console.log('loadSavedMovies called');
        
        // Wait for savedMoviesManager to be available
        if (typeof window.savedMoviesManager === 'undefined') {
            console.log('savedMoviesManager not ready, waiting...');
            setTimeout(() => {
                loadSavedMovies();
            }, 100);
            return;
        }
        
        console.log('savedMoviesManager exists:', typeof window.savedMoviesManager !== 'undefined');
        
        const savedMovies = window.savedMoviesManager.getSavedMovies();
        console.log('Saved movies:', savedMovies.length, savedMovies);
        
        if (savedMovies.length > 0) {
            displayMovies(savedMovies, container);
        } else {
            container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">No saved movies yet. Start saving movies by clicking the heart button on any movie!</p>';
        }
    } catch (error) {
        console.error('Error loading saved movies:', error);
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Error loading saved movies</p>';
    }
}

// Show saved movies section
function showSavedMovies() {
    // Hide other sections
    const popularSection = document.querySelector('.popular-movies');
    const recommendedSection = document.querySelector('.recommended-movies');
    const searchSection = document.getElementById('search-section');
    
    if (popularSection) popularSection.style.display = 'none';
    if (recommendedSection) recommendedSection.style.display = 'none';
    if (searchSection) searchSection.style.display = 'none';
    
    // Show saved section
    const savedSection = document.getElementById('saved-section');
    savedSection.style.display = 'block';
    
    // Load saved movies into the saved container
    loadSavedMovies();
    
    // Add a "Back to Home" button at the top
    addBackToHomeButton();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add back to home button
function addBackToHomeButton() {
    const savedSection = document.getElementById('saved-section');
    if (savedSection) {
        // Remove existing back button if it exists
        const existingButton = savedSection.querySelector('.back-to-home-btn');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create back button
        const backButton = document.createElement('button');
        backButton.className = 'back-to-home-btn';
        backButton.textContent = '← Back to Home';
        backButton.style.cssText = `
            margin: 0 0 20px 0;
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        `;
        
        backButton.addEventListener('mouseover', () => {
            backButton.style.backgroundColor = '#45a049';
        });
        
        backButton.addEventListener('mouseout', () => {
            backButton.style.backgroundColor = '#4CAF50';
        });
        
        backButton.addEventListener('click', () => {
            showHomePage();
        });
        
        // Insert button at the top of saved section
        const savedTitle = savedSection.querySelector('h2');
        if (savedTitle) {
            savedTitle.parentNode.insertBefore(backButton, savedTitle.nextSibling);
        }
    }
}

// Show home page (restore default view)
function showHomePage() {
    // Show main sections
    const popularSection = document.querySelector('.popular-movies');
    const recommendedSection = document.querySelector('.recommended-movies');
    const searchSection = document.getElementById('search-section');
    const savedSection = document.getElementById('saved-section');
    
    if (popularSection) popularSection.style.display = 'block';
    if (recommendedSection) recommendedSection.style.display = 'block';
    if (searchSection) searchSection.style.display = 'none';
    if (savedSection) savedSection.style.display = 'none';
    
    // Clear search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Mobile hamburger menu functionality
function toggleMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navButtons = document.getElementById('nav-buttons');
    
    if (hamburgerBtn && navButtons) {
        hamburgerBtn.classList.toggle('active');
        navButtons.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navButtons = document.getElementById('nav-buttons');
    const topNav = document.querySelector('.top-nav');
    
    // If click is outside the nav area and menu is open, close it
    if (hamburgerBtn && navButtons && !topNav.contains(event.target)) {
        hamburgerBtn.classList.remove('active');
        navButtons.classList.remove('active');
    }
});

// Close mobile menu when nav button is clicked
function closeMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navButtons = document.getElementById('nav-buttons');
    
    if (hamburgerBtn && navButtons) {
        hamburgerBtn.classList.remove('active');
        navButtons.classList.remove('active');
    }
}