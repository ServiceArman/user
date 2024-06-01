// Function to load domain details
function loadDomainDetails() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        // Redirect to login if not logged in
        window.location.href = "login.html";
        return;
    }

    // Fetch domain data from order.json
    $.getJSON("order.json", function(data) {
        var domainInfo = data.domain_info.find(domain => domain.owner.name === user.name);
        if (domainInfo) {
            // Display domain details
            $("#domain-name").text(domainInfo.domain_name);
            $("#registration-date").text(domainInfo.registration_date);
            $("#expiry-date").text(domainInfo.expiry_date);
            // Other details to be loaded similarly
        } else {
            alert("Domain details not found!");
            window.location.href = "dashboard.html";
        }
    });
}

// Function to handle domain renewal
function renewDomain() {
    // Renew domain functionality
}

// Function to handle domain cancellation
function cancelDomain() {
    // Cancel domain functionality
}

// Function to handle domain name server update
function updateNameServers() {
    // Update name servers functionality
}

// Function to handle domain transfer
function transferDomain() {
    // Domain transfer functionality
}

// Check if user is logged in and load domain details
$(document).ready(function() {
    var loginTime = localStorage.getItem("loginTime");
    if (!loginTime || (Date.now() - loginTime) >= 24 * 60 * 60 * 1000) {
        localStorage.clear();
        window.location.href = "login.html";
    } else {
        loadDomainDetails();
    }
});
