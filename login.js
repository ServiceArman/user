// Function to handle login
function login() {
    var email = $("#email").val();
    var password = $("#password").val();

    // Fetch user data from JSON file
    $.getJSON("users.json", function(users) {
        var user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login successful!");
            // Save user data in localStorage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("loginTime", Date.now());
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}

// Check if user is already logged in
$(document).ready(function() {
    var loginTime = localStorage.getItem("loginTime");
    if (loginTime && (Date.now() - loginTime) < 24 * 60 * 60 * 1000) {
        window.location.href = "dashboard.html";
    }
});
