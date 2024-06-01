// Function to load dashboard data
function loadDashboard() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        // Redirect to login if not logged in
        window.location.href = "login.html";
        return;
    }

    // Display welcome message
    $("#welcome-message").text(`Hi! ${user.name}`);

    // Fetch domain order data
    $.getJSON("order.json", function(data) {
        var domainOrders = data.domain_info;
        var $domainOrders = $("#domain-orders");
        if (domainOrders.length > 0) {
            domainOrders.forEach(domain => {
                var orderCard = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${domain.domain_name}</h5>
                            <p class="card-text">Registrar: ${domain.registrar}</p>
                            <p class="card-text">Expiry Date: ${domain.expiry_date}</p>
                            <p class="card-text">Domain Status: ${getStatusLabel(domain.expiry_date)}</p>
                            <a href="domain.html" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                `;
                $domainOrders.append(orderCard);
            });
        } else {
            $domainOrders.append('<p>No domain orders found</p>');
        }
    });
}

// Function to get status label based on expiry date
function getStatusLabel(expiryDate) {
    var expiryTimestamp = new Date(expiryDate).getTime();
    var currentTimestamp = Date.now();
    if (expiryTimestamp > currentTimestamp) {
        return '<span class="badge badge-success">Active</span>';
    } else {
        return '<span class="badge badge-danger">Expired</span>';
    }
}

// Check if user is logged in
$(document).ready(function() {
    var loginTime = localStorage.getItem("loginTime");
    if (!loginTime || (Date.now() - loginTime) >= 24 * 60 * 60 * 1000) {
        localStorage.clear();
        window.location.href = "login.html";
    } else {
        loadDashboard();
    }
});
