let notificationsEnabled = true;

function toggleNotifications() {
    const toggleBtn = document.getElementById('notificationToggle');
    const toggleText = document.getElementById('toggleText');
    
    notificationsEnabled = !notificationsEnabled;
    
    if (notificationsEnabled) {
        toggleText.textContent = 'Notifications: ON';
        toggleBtn.classList.remove('off');
        toggleBtn.classList.add('on');
    } else {
        toggleText.textContent = 'Notifications: OFF';
        toggleBtn.classList.remove('on');
        toggleBtn.classList.add('off');
    }
}

// Initialize the button state when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('notificationToggle');
    if (toggleBtn) {
        toggleBtn.classList.add('on');
    }
});

// Email preferences update functionality
function updateEmailPreferences() {
    // Get current email from the page dynamically
    const emailDisplay = document.getElementById('email-display');
    const currentEmailText = emailDisplay.textContent;
    const currentEmail = currentEmailText.replace('Email: ', ''); // Extract just the email part
    
    // Ask user for new email
    const newEmail = prompt("Enter your new email address:", currentEmail);
    
    // Check if user clicked Cancel or entered nothing
    if (newEmail === null || newEmail.trim() === "") {
        return; // Do nothing if cancelled or empty
    }
    
    // Simple email validation
    if (!newEmail.includes("@") || !newEmail.includes(".")) {
        alert("Please enter a valid email address!");
        return;
    }
    
    // Update the email display on the page
    emailDisplay.textContent = "Email: " + newEmail;
    
    // Show success message
    alert("Email preferences updated successfully!\nNew email: " + newEmail);
}