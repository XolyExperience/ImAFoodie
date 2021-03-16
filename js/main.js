// Variables
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
let menuOpen = false;
var errorText = document.getElementById('errorText');
let userLat = 40.71;
let userLong = -74.0;
let userDist = 500;
const endpoint = `https://api.documenu.com/v2/restaurants/search/geo?lat=${userLat}&lon=${userLong}&distance=${userDist}`;

// MainCode
doFetch();

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

function sorter() {
    userDist = document.getElementById('distance').value;
    doFetch();
}

function doFetch() {
    // Fetch data from the API
    fetch(endpoint, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'c51a4f7b9a4fbf37731d16fd26245c73',
            },
        })
        .then(response => response.json())
        .then(restaurants => {
            restaurants.forEach(restaurant => {
                // Create title element
                const titleElement = document.createElement("h3");
                titleElement.textContent = data.data[1].restaurant_name;
                // Create content element
                const contentElement = document.createElement("p");
                contentElement.textContent = restaurant.content;
                // Add title and content to the page
                const restaurantsElement = document.getElementById("restaurants");
                restaurantsElement.appendChild(titleElement);
                restaurantsElement.appendChild(contentElement);
            });
        })
        .catch(err => {
            console.error(err.message);
        });
}

// EventListeners
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menu.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menu.classList.remove('open');
        menuOpen = false;
    }
});
