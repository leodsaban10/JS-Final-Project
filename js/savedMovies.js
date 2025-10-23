// Saved Movies Management
class SavedMovies {
    constructor() {
        this.storageKey = 'savedMovies';
    }

    // Get all saved movies from localStorage
    getSavedMovies() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error getting saved movies:', error);
            return [];
        }
    }

    // Save a movie to localStorage
    saveMovie(movie) {
        try {
            const savedMovies = this.getSavedMovies();
            
            // Check if movie is already saved
            const isAlreadySaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);
            
            if (isAlreadySaved) {
                return { success: false, message: 'Movie is already saved!' };
            }

            // Add movie with timestamp
            const movieToSave = {
                ...movie,
                savedAt: new Date().toISOString()
            };

            savedMovies.push(movieToSave);
            localStorage.setItem(this.storageKey, JSON.stringify(savedMovies));
            
            return { success: true, message: 'Movie saved successfully!' };
        } catch (error) {
            console.error('Error saving movie:', error);
            return { success: false, message: 'Error saving movie. Please try again.' };
        }
    }

    // Remove a movie from saved list
    removeMovie(movieId) {
        try {
            const savedMovies = this.getSavedMovies();
            const filteredMovies = savedMovies.filter(movie => movie.id !== movieId);
            
            if (filteredMovies.length === savedMovies.length) {
                return { success: false, message: 'Movie not found in saved list!' };
            }

            localStorage.setItem(this.storageKey, JSON.stringify(filteredMovies));
            return { success: true, message: 'Movie removed from saved list!' };
        } catch (error) {
            console.error('Error removing movie:', error);
            return { success: false, message: 'Error removing movie. Please try again.' };
        }
    }

    // Check if a movie is saved
    isMovieSaved(movieId) {
        const savedMovies = this.getSavedMovies();
        return savedMovies.some(movie => movie.id === movieId);
    }

    // Get saved movies count
    getSavedMoviesCount() {
        return this.getSavedMovies().length;
    }

    // Clear all saved movies
    clearAllSavedMovies() {
        try {
            localStorage.removeItem(this.storageKey);
            return { success: true, message: 'All saved movies cleared!' };
        } catch (error) {
            console.error('Error clearing saved movies:', error);
            return { success: false, message: 'Error clearing saved movies.' };
        }
    }
}

// Create global instance
const savedMoviesManager = new SavedMovies();

// Debug: Log that savedMoviesManager is ready
console.log('SavedMoviesManager initialized:', savedMoviesManager);

// Make sure it's globally available
window.savedMoviesManager = savedMoviesManager;

// Global functions for button interactions
function saveMovie(movieElement) {
    console.log('saveMovie called');
    console.log('window.savedMoviesManager exists:', typeof window.savedMoviesManager !== 'undefined');
    
    // Check if savedMoviesManager is available
    if (typeof window.savedMoviesManager === 'undefined') {
        console.error('savedMoviesManager is undefined');
        showNotification('Save system not ready yet. Please try again.', 'error');
        return;
    }

    const movieId = parseInt(movieElement.dataset.movieId);
    const title = movieElement.dataset.movieTitle;
    const posterPath = movieElement.dataset.moviePoster;
    const overview = movieElement.dataset.movieOverview;
    const releaseDate = movieElement.dataset.movieRelease;
    const voteAverage = parseFloat(movieElement.dataset.movieRating);

    console.log('Movie data:', { movieId, title, posterPath, overview, releaseDate, voteAverage });

    const movie = {
        id: movieId,
        title: title,
        poster_path: posterPath,
        overview: overview,
        release_date: releaseDate,
        vote_average: voteAverage
    };

    console.log('Calling window.savedMoviesManager.saveMovie with:', movie);
    const result = window.savedMoviesManager.saveMovie(movie);
    console.log('Save result:', result);
    
    if (result.success) {
        // Update button to show "saved" state
        updateSaveButton(movieElement, true);
        showNotification(result.message, 'success');
    } else {
        showNotification(result.message, 'error');
    }
}

function removeMovie(movieElement) {
    console.log('removeMovie called');
    console.log('window.savedMoviesManager exists:', typeof window.savedMoviesManager !== 'undefined');
    
    // Check if savedMoviesManager is available
    if (typeof window.savedMoviesManager === 'undefined') {
        console.error('savedMoviesManager is undefined');
        showNotification('Save system not ready yet. Please try again.', 'error');
        return;
    }

    const movieId = parseInt(movieElement.dataset.movieId);
    console.log('Removing movie with ID:', movieId);
    
    const result = window.savedMoviesManager.removeMovie(movieId);
    console.log('Remove result:', result);
    
    if (result.success) {
        // Update button to show "unsaved" state
        updateSaveButton(movieElement, false);
        showNotification(result.message, 'success');
        
        // If we're viewing saved movies, remove the card from display
        const savedSection = document.getElementById('saved-section');
        if (savedSection && savedSection.style.display !== 'none') {
            // Smooth removal animation
            movieElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            movieElement.style.opacity = '0';
            movieElement.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                movieElement.remove();
                // Check if there are no more saved movies and reload the section
                const savedContainer = document.getElementById('saved-container');
                if (savedContainer && savedContainer.children.length === 0) {
                    savedContainer.innerHTML = '<p style="color: white; text-align: center; width: 100%;">No saved movies yet. Start saving movies by clicking the heart button on any movie!</p>';
                }
            }, 300);
        }
    } else {
        showNotification(result.message, 'error');
    }
}

function updateSaveButton(movieElement, isSaved) {
    const saveBtn = movieElement.querySelector('.save-btn');
    if (saveBtn) {
        if (isSaved) {
            saveBtn.textContent = '❤️ Saved';
            saveBtn.className = 'save-btn saved';
            saveBtn.style.background = '#4CAF50';
            saveBtn.onclick = (event) => {
                event.stopPropagation();
                removeMovie(movieElement);
            };
            saveBtn.onmouseover = () => saveBtn.style.background = '#45a049';
            saveBtn.onmouseout = () => saveBtn.style.background = '#4CAF50';
        } else {
            saveBtn.textContent = '🤍 Save';
            saveBtn.className = 'save-btn';
            saveBtn.style.background = 'rgba(0,0,0,0.7)';
            saveBtn.onclick = (event) => {
                event.stopPropagation();
                saveMovie(movieElement);
            };
            saveBtn.onmouseover = () => saveBtn.style.background = 'rgba(0,0,0,0.9)';
            saveBtn.onmouseout = () => saveBtn.style.background = 'rgba(0,0,0,0.7)';
        }
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        max-width: 300px;
        word-wrap: break-word;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to load and display saved movies on page load
function loadAndDisplaySavedMovies() {
    const container = document.getElementById('saved-container');
    
    if (!container) {
        console.error('Saved container not found');
        return;
    }
    
    try {
        // Wait for savedMoviesManager to be available
        if (typeof window.savedMoviesManager === 'undefined') {
            console.log('savedMoviesManager not ready, waiting...');
            setTimeout(() => {
                loadAndDisplaySavedMovies();
            }, 100);
            return;
        }
        
        const savedMovies = window.savedMoviesManager.getSavedMovies();
        console.log('Loading saved movies:', savedMovies.length);
        
        if (savedMovies.length > 0) {
            displaySavedMovies(savedMovies, container);
        } else {
            container.innerHTML = '<p style="color: white; text-align: center; width: 100%; margin-top: 50px;">No saved movies yet. Start saving movies by clicking the heart button on any movie!</p>';
        }
    } catch (error) {
        console.error('Error loading saved movies:', error);
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%; margin-top: 50px;">Error loading saved movies</p>';
    }
}

// Function to display saved movies in a grid layout
function displaySavedMovies(movies, container) {
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">No movies to display</p>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create a grid container for saved movies
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    `;
    
    movies.forEach(movie => {
        const movieCard = createSavedMovieCard(movie);
        gridContainer.appendChild(movieCard);
    });
    
    container.appendChild(gridContainer);
}

// Function to create a movie card for saved movies page
function createSavedMovieCard(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'box-1';
    movieDiv.style.position = 'relative';
    
    // Add data attributes
    movieDiv.dataset.movieId = movie.id;
    movieDiv.dataset.movieTitle = movie.title;
    movieDiv.dataset.moviePoster = movie.poster_path || '';
    movieDiv.dataset.movieOverview = movie.overview || '';
    movieDiv.dataset.movieRelease = movie.release_date || '';
    movieDiv.dataset.movieRating = movie.vote_average || 0;
    
    // Get year from release date
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    
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
            <button class="save-btn saved" 
                    style="
                        position: absolute; 
                        top: 8px; 
                        right: 8px; 
                        background: #f44336; 
                        color: white; 
                        border: none; 
                        padding: 6px 10px; 
                        border-radius: 15px; 
                        cursor: pointer; 
                        font-size: 11px;
                        font-weight: bold;
                        transition: background-color 0.3s ease;
                    ">🗑️ Remove</button>
        </div>
    `;
    
    // Add remove button event listener
    const removeBtn = movieDiv.querySelector('.save-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            removeSavedMovie(movieDiv);
        });
        
        // Add hover effects
        removeBtn.addEventListener('mouseover', function() {
            removeBtn.style.background = '#d32f2f';
        });
        
        removeBtn.addEventListener('mouseout', function() {
            removeBtn.style.background = '#f44336';
        });
    }
    
    // Add click event for movie details
    movieDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('save-btn')) {
            return;
        }
        console.log('Movie clicked:', movie.title);
        alert('Movie details coming soon!\nClicked: ' + movie.title);
    });
    
    return movieDiv;
}

// Function to remove a movie from the saved movies page
function removeSavedMovie(movieElement) {
    const movieId = parseInt(movieElement.dataset.movieId);
    const movieTitle = movieElement.dataset.movieTitle;
    
    if (confirm(`Are you sure you want to remove "${movieTitle}" from your saved movies?`)) {
        const result = window.savedMoviesManager.removeMovie(movieId);
        
        if (result.success) {
            // Animate removal
            movieElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            movieElement.style.opacity = '0';
            movieElement.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                movieElement.remove();
                
                // Check if container is now empty
                const container = document.getElementById('saved-container');
                const remainingMovies = container.querySelectorAll('[data-movie-id]');
                if (remainingMovies.length === 0) {
                    container.innerHTML = '<p style="color: white; text-align: center; width: 100%; margin-top: 50px;">No saved movies yet. Start saving movies by clicking the heart button on any movie!</p>';
                }
            }, 300);
            
            showNotification(`"${movieTitle}" removed from saved movies!`, 'success');
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// Initialize the saved movies page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Saved movies page loaded, initializing...');
    loadAndDisplaySavedMovies();
});