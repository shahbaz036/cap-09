document.addEventListener('DOMContentLoaded', () => {
    fetchCartData();
});

async function fetchCartData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        const data = await response.json();
        renderCartItems(data.items);
        updateCartTotals(data);
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

function renderCartItems(items) {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="product-info">
                <img src="${item.image}" alt="${item.title}">
                <h3 style="color: #898989">${item.title}</h3>
            </div>
            <div class="price" style="color: #898989">₹${formatPrice(item.price)}</div>
            <div class="quantity">
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                    onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <div class="subtotal">₹${formatPrice(item.final_line_price)}
            <i class="fas fa-trash delete-item" style="margin: 20px; color: #B88E2F" onclick="removeItem(${item.id})"></i></div>
            
        </div>
    `).join('');
}

function formatPrice(price) {
    return (price / 100).toLocaleString('en-IN');
}


function updateCartTotals(data) {
    if (!data || !Array.isArray(data.items)) {
        console.error("Invalid cart data received.");
        return;
    }

    let subtotal = 0;
    let total = 0;

    data.items.forEach(item => {
        subtotal += item.price * item.quantity;
        total += item.final_line_price; // Assuming `final_line_price` includes discounts, taxes, etc.
    });

    document.getElementById('subtotal').textContent = `₹${formatPrice(subtotal)}`;
    document.getElementById('total').textContent = `₹${formatPrice(total)}`;
}


async function updateQuantity(itemId, newQuantity) {
    try {
        newQuantity = parseInt(newQuantity);
        if (newQuantity < 1) return;

        // Fetch current cart data
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        let data = await response.json();

        // Find the item in the cart
        const item = data.items.find(item => item.id === itemId);
        if (!item) return;

        // Update quantity and subtotal
        item.quantity = newQuantity;
        item.final_line_price = item.price * newQuantity;

        // Re-render the cart with updated data
        renderCartItems(data.items);
        updateCartTotals(data);

        console.log(`Updated quantity for item ${itemId} to ${newQuantity}`);
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

async function removeItem(itemId) {
    if (!confirm('Are you sure you want to remove this item?')) return;

    try {
        // Fetch current cart data
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        let data = await response.json();

        // Remove item from cart data
        data.items = data.items.filter(item => item.id !== itemId);

        // Re-render cart with updated data
        renderCartItems(data.items);
        updateCartTotals(data);

        console.log(`Removed item ${itemId}`);
    } catch (error) {
        console.error('Error removing item:', error);
    }
}

document.querySelector('.checkout-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        let data = await response.json();

        if (data.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Proceeding to checkout...');
        console.log('Redirecting to checkout page...');
        window.location.href = "/checkout";
    } catch (error) {
        console.error('Error during checkout:', error);
    }
});
