// Function to display cart items
function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Clear existing content

    // Check if localStorage is available
    if (typeof Storage !== 'undefined') {
        // Retrieve cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Iterate over each item in the cart and display it
        cartItems.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartContainer.appendChild(cartItemElement);
        });
    } else {
        console.error('localStorage is not supported. Unable to retrieve cart items.');
    }
}

// Function to create a cart item element
function createCartItemElement(item) {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    // Create elements for item details
    const img = document.createElement('img');
    img.classList.add('cart-item-img');
    img.src = item.image.url;

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('detailsContainer');

    const title = document.createElement('h2');
    title.classList.add('cart-item-title');
    title.textContent = item.title;

    const price = document.createElement('p');
    price.classList.add('cart-item-price');
    price.textContent = item.discountedPrice < item.price ? `$${item.discountedPrice}` : `$${item.price}`;

    // Append elements to item container
    detailsContainer.append(title, price);
    cartItemElement.append(img, detailsContainer);

    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
        removeFromCart(item);
    });
    cartItemElement.appendChild(removeBtn);

    return cartItemElement;
}

// Function to remove item from cart
function removeFromCart(item) {
    // Check if localStorage is available
    if (typeof Storage !== 'undefined') {
        // Retrieve cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove the item from the cart
        cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);

        // Store the updated cart items in localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Refresh the cart display
        displayCartItems();

        // Update the total price display
        displayTotalPrice();
    } else {
        console.error('localStorage is not supported. Unable to remove item from cart.');
    }
}

// Function to calculate and display the total price
function displayTotalPrice() {
    // Check if localStorage is available
    if (typeof Storage !== 'undefined') {
        // Retrieve cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Calculate total price
        let totalPrice = 0;
        cartItems.forEach(item => {
            // Use discounted price if available, otherwise use regular price
            const price = item.discountedPrice || item.price;
            totalPrice += price;
        });

        // Display total price
        const totalPriceElement = document.querySelector('.total-price');
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
        console.error('localStorage is not supported. Unable to retrieve cart items.');
    }
}


// Call function to display total price when the page loads
window.addEventListener('load', () => {
    displayTotalPrice();
    console.log('Cart page loaded');
});

// Function to add product to cart
function addToCart(product) {
    // Check if localStorage is available
    if (typeof Storage !== 'undefined') {
        // Retrieve existing cart items from localStorage or initialize an empty array
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the product to the cart
        cartItems.push(product);

        // Store the updated cart items in localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Refresh the cart display
        displayCartItems();
    } else {
        console.error('localStorage is not supported. Unable to add item to cart.');
    }
}

// Call function to display cart items when the page loads
window.addEventListener('load', () => {
    displayCartItems();
    console.log('Cart page loaded');
});

// Function to handle clicking on "Continue Shopping" button
function continueShopping() {
    window.location.href = '../Games/index.html'; // Redirect to the games page
}

// Add event listener to the "Continue Shopping" button
document.getElementById('continue-shopping-btn').addEventListener('click', continueShopping);





