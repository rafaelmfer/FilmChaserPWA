import { ACCESS_TOKEN_TMDB } from "../local_properties.js";

/**
 * Function to fetch data from a specified URL.
 * @param {string} url - The URL from which to fetch the data.
 * @param {Object} options - (Optional) Additional options to include in the fetch request.
 * @returns {Promise} - A Promise that resolves to the fetched data.
 */
export async function fetchData(url, options = {}) {
    // Fetch data from the specified URL
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    // Check if the response is OK, otherwise throw an error
    if (!response.ok) {
        throw new Error(`Error in request: ${response.statusText}`);
    }

    // Parse and return the JSON response
    return response.json();
}

export function networkInfo() {
    const messageDiv = document.querySelector(".no-network-information");

    function updateConnectionStatus() {
        if (!navigator.onLine) {
            messageDiv.classList.add("show");
        } else {
            messageDiv.classList.remove("show");
        }
    }

    updateConnectionStatus();

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);
}

/**
 * Function to retrieve information from the URL query string.
 * @param {string} parameter - The parameter name to retrieve from the URL.
 * @returns {string|null} - The value of the parameter in the URL query string, or null if not found.
 */
export function urlInfo(parameter) {
    // Get the query string from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Return the value of the specified parameter
    return urlParams.get(parameter);
}

/**
 * Function to create a carousel component with the provided films.
 * @param {Array} films - An array of films to display in the carousel.
 * @param {Function} createItemFunction - The function used to create each item in the carousel.
 * @returns {Object} - An object containing the carousel components.
 */
export function createCarousel(films, createItemFunction) {
    // Creating the carousel container
    var carouselContainer = document.createElement("div");
    carouselContainer.classList.add("component-carousel");

    // Creating the carousel element
    var carousel = document.createElement("div");
    carousel.classList.add("carousel-container");

    // Creating the carousel items container
    var carouselItems = document.createElement("div");
    carouselItems.classList.add("carousel-items");

    // Adding films to the carousel
    films.forEach(function (film) {
        var filmDiv = createItemFunction(film);
        carouselItems.appendChild(filmDiv);
    });

    // Adding buttons to navigate the carousel
    var prevButton = document.createElement("button");
    prevButton.classList.add("prev-button");

    var arrowLeft = document.createElement("img");
    arrowLeft.src = "../resources/icons/icons-default/default-arrow-left.svg";
    prevButton.appendChild(arrowLeft);

    var nextButton = document.createElement("button");
    nextButton.classList.add("next-button");

    var arrowRight = document.createElement("img");
    arrowRight.src = "../resources/icons/icons-default/default-arrow-right.svg";
    nextButton.appendChild(arrowRight);

    carouselContainer.appendChild(carousel);
    carousel.appendChild(carouselItems);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    // Returning carousel components
    return {
        container: carouselContainer,
        carousel: carousel,
        items: carouselItems,
        prevButton: prevButton,
        nextButton: nextButton,
    };
}

/**
 * Function to initialize the behavior of a carousel.
 * @param {Object} carousel - An object containing the carousel components.
 * @param {Number} widthItem - A number representing the item's width in pixels.
 * @param {Number} marginItem - A number  representing the space between items in pixels.
 */
export function initializeCarousel(carousel, widthItem, marginItem) {
    // Constants for carousel
    var itemWidth = widthItem || 154;
    var itemMargin = marginItem || 8;
    var currentIndex = 0;

    // Function to update carousel visibility
    function updateCarousel() {
        var containerWidth = carousel.container.offsetWidth;
        var numVisibleItems = Math.floor(
            containerWidth / (itemWidth + itemMargin)
        );
        var maxIndex = Math.max(
            0,
            carousel.items.children.length - numVisibleItems
        );
        carousel.nextButton.classList.toggle("hide", currentIndex >= maxIndex);
        carousel.prevButton.classList.toggle("hide", currentIndex <= 0);
    }

    // Function to update carousel position
    function updateCarouselPosition() {
        var newPosition = -1 * (itemWidth + itemMargin) * currentIndex;
        carousel.items.style.transform = `translateX(${newPosition}px)`;
        updateCarousel();
    }

    // Event listeners for previous and next buttons
    carousel.prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });

    carousel.nextButton.addEventListener("click", function () {
        var containerWidth = carousel.container.offsetWidth;
        var numVisibleItems = Math.floor(
            containerWidth / (itemWidth + itemMargin)
        );
        var maxIndex = Math.max(
            0,
            carousel.items.children.length - numVisibleItems
        );
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarouselPosition();
        }
    });

    // Event listener for window resize
    window.addEventListener("resize", function () {
        updateCarousel();
    });

    // Initialize carousel

    updateCarousel();
}

//**********************SEARCH--->MOVIE********************************** */
export const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: ACCESS_TOKEN_TMDB,
    },
};

/**
 * Function to initialize a search for movies and TV shows on TMDB.
 * @param {string} user_search - The search query entered by the user.
 * @param {number} page - The page number of the search results.
 * @returns {Promise} - A Promise that resolves to the search results.
 */
export async function inicia(user_search, page) {
    var result;

    //VARIABLE PAGE IS RETURNING 20 RESULTS FROM FETCH
    result = await fetch(
        "https://api.themoviedb.org/3/search/multi?query=" +
            user_search +
            "&include_adult=false&language=en-US&page=" +
            page,
        options
    );

    return result;
}

/**
 * Function to retrieve a list of all movies based on a specified category or query.
 * @param {string} user_search - The category or query to search for.
 * @param {number} page - The page number of the search results.
 * @returns {Promise} - A Promise that resolves to the list of movies.
 */
export async function allMovies(user_search, page) {
    var result;
    let fetching;

    //VARIABLE PAGE IS RETURNING 20 RESULTS FROM FETCH

    if (user_search == "animation") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16";
    } else if (user_search == "action") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28";
    } else if (user_search == "comedy") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35";
    } else if (user_search == "horror") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27";
    } else if (user_search == "upcomming") {
        fetching =
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    } else if (user_search == "recommendation") {
        // LINK FOR RECOMMENDATION IS NOT WORKING... TRY AGAIN LATER
        // IT IS SHOWING POPULAR MOVIES...
        // 'https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1'

        fetching =
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    } else {
        fetching =
            "https://api.themoviedb.org/3/trending/" +
            user_search +
            "/day?language=en-US";
    }
    console.log(fetching);
    result = await fetch(fetching, options);

    return result;
}
