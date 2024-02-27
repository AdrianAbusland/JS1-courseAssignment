import { API_GAMES_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

// Function to fetch product details based on ID
async function fetchProductDetails(productId) {
    try {
        const response = await doFetch(`${API_GAMES_URL}/${productId}`);
        return response.data; // Assuming response contains a 'data' property with the product details
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch product details');
    }
}

// Function to generate HTML for product details
function generateProductDetails(product) {
    const productContainer = document.createElement('div');
    productContainer.classList.add('product');

    // Create elements for product details
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('product-img-container');
    const img = document.createElement('img');
    img.classList.add('product-img', 'gamecover');
    img.src = product.image.url;
    imgContainer.appendChild(img);

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('product-content-container');

    const h1 = document.createElement('h1');
    h1.classList.add('product-h1');
    h1.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('product-price-container');
    const price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = product.discountedPrice < product.price ? `$${product.discountedPrice}` : `$${product.price}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', async () => {
        try {
            const response = await addToCart(product);
            if (response.success) {
                // Redirect to cart page upon successful addition
                window.location.href = '../cart/';
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    });

    // Append elements to containers
    priceContainer.appendChild(price);
    contentContainer.append(h1, description, priceContainer, addToCartBtn);
    productContainer.append(imgContainer, contentContainer);

    return productContainer;
}

// Function to add product to cart
async function addToCart(product) {
    // Check if localStorage is available
    if (typeof Storage !== 'undefined') {
        // Retrieve existing cart items from localStorage or initialize an empty array
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the product to the cart
        cartItems.push(product);

        // Store the updated cart items in localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        return { success: true };
    } else {
        return { success: false, error: 'localStorage is not supported. Unable to add item to cart.' };
    }
}

// Function to display product details
function displayProduct(productId) {
    const productContainer = document.querySelector('.product');
    productContainer.innerHTML = ''; // Clear existing content

    // Fetch product details and display them
    fetchProductDetails(productId)
        .then(product => {
            const productElement = generateProductDetails(product);
            productContainer.appendChild(productElement);
        })
        .catch(error => {
            console.error('Error fetching or displaying product details:', error);
        });
}

// Main function
async function main() {
    try {
        // Get the product ID from the query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        // Display product details
        displayProduct(productId);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the main function
main();



