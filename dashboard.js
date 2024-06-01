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

    // Fetch order data
    $.getJSON("orders.json", function(orders) {
        var userOrders = orders.filter(order => order.customer.customer_id === user.user_id);
        var $orderHistory = $("#order-history");
        if (userOrders.length > 0) {
            userOrders.forEach(order => {
                var orderItems = order.items.map(item => `${item.product_name} (x${item.quantity})`).join(", ");
                $orderHistory.append(`<li class="list-group-item">
                    Order ID: ${order.order_id}<br>
                    Items: ${orderItems}<br>
                    Total: $${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </li>`);
            });
        } else {
            $orderHistory.append('<li class="list-group-item">No orders found</li>');
        }
    });
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
