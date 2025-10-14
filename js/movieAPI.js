// TMDB API Service
const API_KEY = '8679fd3b7842f69e0b9cb1564884809c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// API Service Object
const movieAPI = {
    
    // Get popular movies
    getPopularMovies: async function() {
        try {
            const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            if (!response.ok) {
                throw new Error('Failed to fetch popular movies');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            return [];
        }
    },

    // Search movies by title
    searchMovies: async function(query) {
        try {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
            if (!response.ok) {
                throw new Error('Failed to search movies');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error searching movies:', error);
            return [];
        }
    },

    // Get movie details by ID
    getMovieDetails: async function(movieId) {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    },

    // Get top rated movies
    getTopRatedMovies: async function() {
        try {
            const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            if (!response.ok) {
                throw new Error('Failed to fetch top rated movies');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
            return [];
        }
    },

    // Helper function to get full image URL
    getImageUrl: function(posterPath) {
        return posterPath ? `${IMAGE_BASE_URL}${posterPath}` : 'https://via.placeholder.com/500x750?text=No+Image';
    }
};

// Test function - call this to verify API is working
async function testAPI() {
    console.log('Testing TMDB API connection...');
    const movies = await movieAPI.getPopularMovies();
    console.log('Popular movies:', movies);
    
    if (movies.length > 0) {
        console.log('✅ API is working! First movie:', movies[0].title);
        return true;
    } else {
        console.log('❌ API test failed. Check your API key.');
        return false;
    }
}