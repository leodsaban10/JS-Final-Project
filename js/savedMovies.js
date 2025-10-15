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