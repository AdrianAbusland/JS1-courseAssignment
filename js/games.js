// Main idea is to display items from our gamehub api
// 1. Get the data
// 2. Loop through the data
// 3. Create HTML for the individual items
// 4. Append the HTML to the document

import { API_GAMES_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

// Generate HTML for a single game
function generateGameElement(game) {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('games-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('game-image-container');
    const imageLink = document.createElement('a');
    imageLink.href = `../product/index.html?id=${game.id}`; // Include the game ID in the href
    const image = document.createElement('img');
    image.classList.add('gamecover');
    image.src = game.image.url;
    imageLink.appendChild(image);
    imageContainer.appendChild(imageLink);

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('games-prices-container');
    const titleLink = document.createElement('a');
    titleLink.classList.add('games-sw');
    titleLink.href = `../product/index.html?id=${game.id}`; // Include the game ID in the href
    titleLink.textContent = game.title;
    const price = document.createElement('p');
    price.classList.add('game-price');
    price.textContent = game.discountedPrice < game.price ? `$${game.discountedPrice}` : `$${game.price}`;
    detailsContainer.append(titleLink, price);

    gameContainer.append(imageContainer, detailsContainer);

    return gameContainer;
}

// Filter games based on genre
function filterGamesByGenre(games, genre) {
    if (genre === 'All') {
        return games;
    }
    return games.filter(game => game.genre.toLowerCase() === genre.toLowerCase());
}

// Generate filter options dynamically
function generateFilterOptions(genres) {
    const selectElement = document.createElement('select');
    selectElement.id = 'genreFilter';
    selectElement.addEventListener('change', () => {
        const selectedGenre = selectElement.value;
        displayFilteredGames(selectedGenre);
    });

    // Remove the "All" option
    genres = genres.filter(genre => genre.toLowerCase() !== 'all');

    // Add "No filter" option
    const noFilterOption = document.createElement('option');
    noFilterOption.value = 'NoFilter';
    noFilterOption.textContent = 'No filter';
    selectElement.appendChild(noFilterOption);

    // Add genre options
    genres.forEach(genre => {
        const optionElement = document.createElement('option');
        optionElement.value = genre.toLowerCase();
        optionElement.textContent = genre;
        selectElement.appendChild(optionElement);
    });

    const filterContainer = document.getElementById('filterContainer');
    filterContainer.appendChild(selectElement);
}

// Display filtered games
async function displayFilteredGames(genre) {
    try {
        const games = await fetchGames();
        let filteredGames;
        
        if (genre === 'NoFilter') {
            // If "No filter" is selected, display all games
            filteredGames = games;
        } else {
            // Otherwise, filter games by genre
            filteredGames = filterGamesByGenre(games, genre);
        }
        
        displayGames(filteredGames);
    } catch (error) {
        console.error('Error fetching or displaying games:', error);
    }
}

// Fetch games from the API using the doFetch function
async function fetchGames() {
    try {
        const response = await doFetch(API_GAMES_URL);
        return response.data; // Assuming response contains a 'data' property with the games
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games');
    }
}

// Display games
function displayGames(games) {
    const displayContainer = document.querySelector('#display-container');
    displayContainer.innerHTML = ''; // Clear existing content
    games.forEach(game => {
        const gameElement = generateGameElement(game);
        displayContainer.appendChild(gameElement);
    });
}

// Main function
async function main() {
    try {
        const games = await fetchGames();
        const genres = ['All', ...new Set(games.map(game => game.genre))];
        generateFilterOptions(genres);
        displayGames(games);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the main function
main();
