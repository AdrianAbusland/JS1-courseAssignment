// Function to display cart items and calculate total price
function displayCartItemsAndTotal() {
    // Get the container for order items
    const orderItemsContainer = document.querySelector('.order-items');
    // Clear existing content
    orderItemsContainer.innerHTML = '';

    // Initialize total price
    let totalPrice = 0;

    // Check if localStorage is available
    if (typeof Storage !== 'undefined') {
        // Retrieve cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Iterate over each item in the cart and display it
        cartItems.forEach(item => {
            // Create a new element for the item
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');

            // Display the title of the item
            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;

            // Calculate the price to be displayed
            const price = item.discountedPrice < item.price ? item.discountedPrice : item.price;

            // Display the price of the item
            const priceElement = document.createElement('p');
            priceElement.textContent = `$${price.toFixed(2)}`;

            // Add the item element to the order items container
            itemElement.appendChild(titleElement);
            itemElement.appendChild(priceElement);
            orderItemsContainer.appendChild(itemElement);

            // Add the price of the item to the total price
            totalPrice += price;
        });

        // Display the total price
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
        console.error('localStorage is not supported. Unable to retrieve cart items.');
    }
}

// Function to display full-screen overlay with a message
function displayOverlayWithMessage(message) {
    // Create overlay elements
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', redirectToCart);
    const messageElement = document.createElement('h2');
    messageElement.textContent = message;

    // Append elements to overlay content
    overlayContent.appendChild(closeBtn);
    overlayContent.appendChild(messageElement);
    overlay.appendChild(overlayContent);

    // Append overlay to main section
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = ''; // Clear existing content
    mainContent.appendChild(overlay);
}


// Function to close full-screen overlay
function closeOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.parentNode.removeChild(overlay); // Remove the overlay
}

// Function to handle clicking on "Proceed to Checkout" button
function proceedToCheckout(event) {
    event.preventDefault(); // Prevent form submission if the button is inside a form
    displayOverlayWithMessage('Thank You for Your Purchase!');
    const mainContent = document.querySelector('main');
}

// Function to redirect to cart
function redirectToCart() {
    window.location.href = '../Cart/index.html'; // Redirect to the cart
    // Clear the cart
    localStorage.removeItem('cart');
}

// Call the function to display cart items and calculate total price when the page loads
window.addEventListener('load', () => {
    displayCartItemsAndTotal();
    console.log('Checkout page loaded');
});

// Add event listener to the "Proceed to Checkout" button
document.querySelector('.buy-button').addEventListener('click', proceedToCheckout);
