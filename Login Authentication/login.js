document.addEventListener("DOMContentLoaded", function() {
    // Mock database (array of objects for simplicity)
    let users = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" }
    ];
  
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerLink = document.getElementById('registerLink');
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const securedPage = document.getElementById('securedPage');
    const logoutBtn = document.getElementById('logoutBtn');
  
    // Event listener for login form submission
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (authenticateUser(username, password)) {
        // Show secured page and alert login successful
        showSecuredPage(username);
        alert('Login successful!');
      } else {
        // Alert login unsuccessful
        alert('Invalid username or password. Please try again.');
      }
    });
  
    // Event listener for register link click
    registerLink.addEventListener('click', function(event) {
      event.preventDefault();
      registerModal.show();
    });
  
    // Event listener for registration form submission
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const newUsername = document.getElementById('newUsername').value;
      const newPassword = document.getElementById('newPassword').value;
  
      // Check if username already exists
      if (isUsernameTaken(newUsername)) {
        alert('Username already taken. Please choose a different one.');
      } else {
        // Register new user and alert registration successful
        registerUser(newUsername, newPassword);
        registerModal.hide();
        alert('Registration successful! Please login with your new credentials.');
      }
    });
  
    // Event listener for logout button click
    logoutBtn.addEventListener('click', function() {
      // Hide secured page and show login form
      securedPage.classList.add('d-none');
      loginForm.reset();
    });
  
    // Function to authenticate user
    function authenticateUser(username, password) {
      const user = users.find(user => user.username === username && user.password === password);
      return user !== undefined;
    }
  
    // Function to check if username is already taken
    function isUsernameTaken(username) {
      return users.some(user => user.username === username);
    }
  
    // Function to register new user
    function registerUser(username, password) {
      users.push({ username: username, password: password });
    }
  
    // Function to show secured page
    function showSecuredPage(username) {
      // Hide login form and show secured page
      loginForm.reset();
      securedPage.classList.remove('d-none');
    }
  });
  