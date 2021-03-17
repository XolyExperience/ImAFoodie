// Variables
const menuRow = document.querySelector('.menuRow');
const menuBtn = document.querySelector('.menu-btn');
const sortBtn = document.querySelector('.sort-btn');

const menu = document.querySelector('.menu');
const sortMenu = document.querySelector('.menu-sort');

let menuOpen = false;
let sortMenuOpen = false;

var errorText = document.getElementById('errorText');
var userLat = 40.71;
var userLong = -74.0;
var userDist = document.getElementById('distance').value;
const APIURL = `https://api.documenu.com/v2/restaurants/search/geo`;

// Functions
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addPosition);
    } else {
        errorText.innerHTML = 'Geolocation is not supported by this browser.';
    }
}
function addPosition(position) {
    userLat = position.coords.latitude.toFixed(6);
    userLong = position.coords.longitude.toFixed(6);
}
function sort() {
    getRestaurants(userLat, userLong, userDist, APIURL);

}
function getRestaurants(lat, long, dist, url) {
    let endpoint = url += `?lat=${lat}&lon=${long}&distance=${dist}`;
    // Fetch data from the API
    fetch(`${endpoint}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'c51a4f7b9a4fbf37731d16fd26245c73',
            },
        })
        .then(response => response.json())
        .then(restaurants => {
            restaurants.data.forEach(restaurant => {
                // Create card element
                const cardElement = document.createElement("div");
                // Create title element
                const titleElement = document.createElement("h3");
                titleElement.textContent = restaurant.restaurant_name;
                // Create content element
                const contentElement = document.createElement("p");
                contentElement.textContent = restaurant.restaurant_phone;
                // Add title and content to the page
                const restaurantsElement = document.getElementById("restaurants");
                restaurantsElement.appendChild(cardElement);
                cardElement.classList.add("card");
                cardElement.appendChild(titleElement);
                cardElement.appendChild(contentElement);
            });
        })
        .catch(err => {
            console.error(err.message);
        });
}

// Main
getRestaurants(userLat, userLong, userDist, APIURL);

// EventListeners
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuRow.classList.add('open');
        menu.classList.add('open');
        menuOpen = true;
    } else {
        menuRow.classList.remove('open');
        menu.classList.remove('open');
        menuOpen = false;
    }
});

sortBtn.addEventListener('click', () => {
    if (!sortMenuOpen) {
        sortMenu.classList.add('open');
        menuRow.classList.add('open');
        sortMenuOpen = true;
    } else {
        sortMenu.classList.remove('open');
        menuRow.classList.remove('open');
        sortMenuOpen = false;
    }
});