document.addEventListener('DOMContentLoaded', () => { const form = document.querySelector('form');

form.addEventListener('submit', (event) => { // If you want to TEST locally without sending data to Netlify, // uncomment the next line: // event.preventDefault();

const username = form.querySelector('input[name="username"]').value;
const password = form.querySelector('input[name="password"]').value;

// Logs credentials in the browser console (for debugging).
console.log("Username:", username);
console.log("Password:", password);

}); });