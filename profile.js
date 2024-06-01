// Function to load profile data
function loadProfile() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        // Redirect to login if not logged in
        window.location.href = "login.html";
        return;
    }
    $("#name").val(user.name);
    $("#email").val(user.email);
    $("#phone").val(user.phone);
    $("#password").val(user.password);
}

// Function to update profile data
function updateProfile() {
    var user = JSON.parse(localStorage.getItem("user"));
    user.name = $("#name").val();
    user.phone = $("#phone").val();
    user.password = $("#password").val();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
}

// Function to handle logout
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// Check if user is logged in
$(document).ready(function() {
    var loginTime = localStorage.getItem("loginTime");
    if (!loginTime || (Date.now() - loginTime) >= 24 * 60 * 60 * 1000) {
        localStorage.clear();
        window.location.href = "login.html";
    } else {
        loadProfile();
    }
});
