// Profile page JavaScript functionality
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