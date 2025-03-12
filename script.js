// Example of basic JavaScript logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        const username = form.querySelector('input[name="username"]').value;
        const password = form.querySelector('input[name="password"]').value;
        
        console.log("Username: " + username);
        console.log("Password: " + password);
        
        // Any additional client-side handling (optional)
    });
});