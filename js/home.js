// 1. Make it work
// 2. Make it right
// 3. Make it fast

// Main idea is to display items from our gamehub api
// 1. Get the data
// 2. Loop through the data
// 3. Create HTML for the individual items
// 4. Append the HTML to the document

import { API_GAMES_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

// Function to add the game to the cart by its ID and navigate to the cart page
function addToCartAndNavigate(gameId, games) {
    // Retrieve existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the game in the games array based on its ID
    const game = games.find(game => game.id === gameId);

    // If the game is found, add it to the cart
    if (game) {
        cartItems.push(game);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        console.log(`Game with ID ${gameId} added to the cart.`);
    } else {
        console.error(`Game with ID ${gameId} not found.`);
    }

    // Redirect to the cart page
    window.location.href = `../cart/index.html`;
}

// Function to generate HTML for the news section
function generateNewsHTML(spaceWarGame) {
    // Create a container for the news section
    const newsContainer = document.createElement('div');
    newsContainer.classList.add('newsContainer')

    // Create elements for the news section
    const newsH1Container = document.createElement('div');
    newsH1Container.classList.add('news-h1-container', 'news-item');
    const newsH1 = document.createElement('h1');
    newsH1.classList.add('news-h1');
    newsH1.textContent = 'NEWS!';
    newsH1Container.appendChild(newsH1);

    // Create elements for displaying the Space War game
    const newsSWGCContainer = document.createElement('div');
    newsSWGCContainer.classList.add('news-sw-gc-container', 'news-item');
    const newsSWGCLink = document.createElement('a');
    newsSWGCLink.href = `../product/?id=${spaceWarGame.id}`;
    const newsSWGCImg = document.createElement('img');
    newsSWGCImg.classList.add('news-sw-gc', 'gamecover');
    newsSWGCImg.src = spaceWarGame.image.url;
    newsSWGCImg.alt = 'Space Wars cover image';
    newsSWGCLink.appendChild(newsSWGCImg);
    newsSWGCContainer.appendChild(newsSWGCLink);

    const newsH2PBBContainer = document.createElement('div');
    newsH2PBBContainer.classList.add('news-h2-p-bb-container', 'news-item');
    const newsH2PContainer = document.createElement('div');
    newsH2PContainer.classList.add('news-h2-p-container');
    const newsH2 = document.createElement('h2');
    newsH2.classList.add('news-sp-h2', 'news-h2-p-item');
    newsH2.textContent = spaceWarGame.title;
    const newsP = document.createElement('p');
    newsP.classList.add('news-p', 'news-h2-p-item');
    newsP.textContent = spaceWarGame.description;
    newsH2PContainer.append(newsH2, newsP);
    const newsBuyButtonContainer = document.createElement('div');
    newsBuyButtonContainer.classList.add('news-buy-button', 'buy-button-container');
    const newsPrice = document.createElement('p');
    newsPrice.classList.add('news-price');
    newsPrice.textContent = `$${spaceWarGame.price}`;
    const buyButton = document.createElement('button');
    buyButton.classList.add('buy-button', 'news-h2-p-item', 'button');
    // Add event listener to the "Buy Now" button
    buyButton.addEventListener('click', () => addToCartAndNavigate(spaceWarGame.id));
    buyButton.textContent = 'Buy Now';
    newsBuyButtonContainer.append(newsPrice, buyButton);
    newsH2PBBContainer.append(newsH2PContainer, newsBuyButtonContainer);

    // Append elements to news container
    newsContainer.append(newsH1Container, newsSWGCContainer, newsH2PBBContainer);
    return newsContainer;
}

// Function to generate HTML for displaying a game
function generateGameHtml(game) {
    const mpGameContainer = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    img.classList.add('gamecover');
    img.setAttribute("src", game.image.url);
    const imgLink = document.createElement('a');
    imgLink.href = `../product/?id=${game.id}`;
    const titlesPricesContainer = document.createElement('div'); 
    titlesPricesContainer.classList.add('mp-sw-prices-container');
    const heading = document.createElement('h3');
    heading.classList.add('mp-prices');
    heading.textContent = game.title;
    const gamePrice = document.createElement('p');
    gamePrice.classList.add('mp-prices');
    gamePrice.textContent = game.price + '$';
    imgLink.append(img);
    imgContainer.append(imgLink);
    titlesPricesContainer.append(heading, gamePrice);
    mpGameContainer.append(imgContainer, titlesPricesContainer);
    return mpGameContainer;
}

// Main function to fetch data and display content
async function main() {
    try {
        // Fetch the game data from the API
        const { data: games } = await doFetch(API_GAMES_URL);

        // Find the game with the title "Space War"
        const spaceWarGame = games.find(game => game.title === "Space War");

        // Display news section
        if (spaceWarGame) {
            const newsContainer = document.querySelector('.news');
            const newsHtml = generateNewsHTML(spaceWarGame);
            newsContainer.appendChild(newsHtml);
        } else {
            console.error("Space War game not found in API data.");
        }

        // Display favorite games section
        const favoriteGames = games.filter(game => game.favorite);
        const displayContainer = document.querySelector('#display-container');
        favoriteGames.slice(0, 3).forEach(game => {
            const gameHtml = generateGameHtml(game);
            displayContainer.appendChild(gameHtml);
        });

        // Add event listener to the "Buy Now" button in the news section
        const buyNowButton = document.querySelector('.buy-button');
        buyNowButton.addEventListener('click', () => addToCartAndNavigate(spaceWarGame.id, games));
    } catch (error) {
        console.error('Error fetching/displaying data:', error);
    }
}

// Call the main function to start the process
main();

