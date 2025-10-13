const VALID_USERNAME = "username";
const VALID_PASSWORD = "password123";

function handleLogin() {
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.style.display = 'none';
    
    if (!username || !password) {
        showError("Please enter both username and password");
        return;
    }
    
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        window.location.href = 'mainpage.html';
    } else {
        showError("Invalid username or password");
    }
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Optional: Allow Enter key to trigger login
document.addEventListener('DOMContentLoaded', function() {
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    
    // Add enter key listener to both fields
    [usernameField, passwordField].forEach(field => {
        field.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleLogin();
            }
        });
    });
});