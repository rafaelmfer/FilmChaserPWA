"use strict";

import { checkSession } from "./auth.js";
import { createCarousel, initializeCarousel, networkInfo } from "./common.js";
import { getInfoDb } from "./firestore.js";
import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

networkInfo();

let arrayTrending = [];
let arrayUpcoming = [];

let arrayAction = [];
let arrayAnimation = [];
let arrayComedy = [];
let arrayCrime = [];
let arrayDocumentary = [];
let arrayDrama = [];
let arrayFamily = [];
let arrayAdventure = [];
let arrayHistory = [];
let arrayHorror = [];
let arrayMusic = [];
let arrayMystery = [];
let arrayRomance = [];
let arraySciFantasy = [];
let arrayTvMovie = [];
let arrayThriller = [];
let arrayReality = [];
let arrayWar = [];

const user = await checkSession();
let documentId = user.uid;

const userDoc = await getInfoDb(`users/${documentId}`);
document.getElementById("userName").innerHTML = userDoc.name;
document.getElementById("userPicture").src =
    userDoc.profile_photo || "../resources/imgs/profile/profile2.png";

// Function to call with delay and pair functions
function callWithDelayAndPairs(func1, func2, delay) {
    setTimeout(() => {
        func1();
        func2();
    }, delay);
}

// Function to call the next 2 functions with delay
function callNextTwoFunctions(index, delay) {
    // Check if all the functions were called
    if (index >= genreFunctions.length) return;

    const func1 = genreFunctions[index];
    const func2 = genreFunctions[index + 1];

    callWithDelayAndPairs(func1, func2, delay);

    // Calling the next 2 functions
    setTimeout(() => {
        callNextTwoFunctions(index + 2, delay);
    }, delay * 2);
}

const genreFunctions = [
    () =>
        theMovieDb.discover.getMoviesTvShowsTrendingDay(
            {},
            (data) => successCB(data, "You Might Like", arrayTrending),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMoviesTvShowsTrendingDay(
            { page: 2 },
            (data) => successCB(data, "You Might Like", arrayTrending),
            errorCB
        ),

    // Gênero Adventure
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 12 },
            (data) => successCB(data, "Adventure", arrayAdventure),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 12, page: 2 },
            (data) => successCB(data, "Adventure", arrayAdventure),
            errorCB
        ),

    // Gênero Drama
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 18 },
            (data) => successCB(data, "Drama", arrayDrama),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 18 },
            (data) => successCB(data, "Drama", arrayDrama),
            errorCB
        ),

    // Gênero Animation
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 16 },
            (data) => successCB(data, "Animation", arrayAnimation),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 16 },
            (data) => successCB(data, "Animation", arrayAnimation),
            errorCB
        ),

    // Upcoming
    () =>
        theMovieDb.discover.getMovies(
            {
                with_release_type: 2 | 3,
                "release_date.gte": "2025-03-30",
                "release_date.lte": "2030-12-31",
            },
            (data) => successCB(data, "Upcoming", arrayUpcoming),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            {
                with_release_type: 2 | 3,
                "release_date.gte": "2025-03-30",
                "release_date.lte": "2030-12-31",
            },
            (data) => successCB(data, "Upcoming", arrayUpcoming),
            errorCB
        ),

    // Gênero Horror
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 27 },
            (data) => successCB(data, "Horror", arrayHorror),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 27, page: 2 },
            (data) => successCB(data, "Horror", arrayHorror),
            errorCB
        ),

    // Gênero Action
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 28 },
            (data) => successCB(data, "Action", arrayAction),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 10759 },
            (data) => successCB(data, "Action", arrayAction),
            errorCB
        ),

    // Gênero Crime
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 80 },
            (data) => successCB(data, "Crime", arrayCrime),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 80 },
            (data) => successCB(data, "Crime", arrayCrime),
            errorCB
        ),

    // Gênero Romance
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10749 },
            (data) => successCB(data, "Romance", arrayRomance),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10749, page: 2 },
            (data) => successCB(data, "Romance", arrayRomance),
            errorCB
        ),

    // Gênero Family
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10751 },
            (data) => successCB(data, "Family", arrayFamily),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 10751 },
            (data) => successCB(data, "Family", arrayFamily),
            errorCB
        ),

    // Gênero History
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 36 },
            (data) => successCB(data, "History", arrayHistory),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 36, page: 2 },
            (data) => successCB(data, "History", arrayHistory),
            errorCB
        ),

    // Gênero Music
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10402 },
            (data) => successCB(data, "Music", arrayMusic),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10402, page: 2 },
            (data) => successCB(data, "Music", arrayMusic),
            errorCB
        ),

    // Gênero Comedy
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 35 },
            (data) => successCB(data, "Comedy", arrayComedy),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 35 },
            (data) => successCB(data, "Comedy", arrayComedy),
            errorCB
        ),

    // Gênero Mystery
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 9648 },
            (data) => successCB(data, "Mystery", arrayMystery),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 9648, page: 2 },
            (data) => successCB(data, "Mystery", arrayMystery),
            errorCB
        ),

    // Gênero Science Fiction
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 878 },
            (data) => successCB(data, "Science Fiction", arraySciFantasy),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 10765 },
            (data) => successCB(data, "Sci-Fi & Fantasy", arraySciFantasy),
            errorCB
        ),

    // Gênero TV Movie
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10770 },
            (data) => successCB(data, "TV Movie", arrayTvMovie),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10770, page: 2 },
            (data) => successCB(data, "TV Movie", arrayTvMovie),
            errorCB
        ),

    // Gênero Thriller
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 53 },
            (data) => successCB(data, "Thriller", arrayThriller),
            errorCB
        ),
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 53, page: 2 },
            (data) => successCB(data, "Thriller", arrayThriller),
            errorCB
        ),

    // Gênero Reality
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 10764 },
            (data) => successCB(data, "Reality", arrayReality),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 10764, page: 2 },
            (data) => successCB(data, "Reality", arrayReality),
            errorCB
        ),

    // Gênero War & Politics
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 10752 },
            (data) => successCB(data, "War", arrayWar),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 10768 },
            (data) => successCB(data, "War & Politics", arrayWar),
            errorCB
        ),

    // Gênero Documentary
    () =>
        theMovieDb.discover.getMovies(
            { with_genres: 99 },
            (data) => successCB(data, "Documentary", arrayDocumentary),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            { with_genres: 99 },
            (data) => successCB(data, "Documentary", arrayDocumentary),
            errorCB
        ),
];

callNextTwoFunctions(0, 200);

function errorCB(data) {
    console.log("Error callback: " + data);
}

function successCB(data, title, array) {
    array.push(...JSON.parse(data).results);
    createGenreCarouselWithTitle(array, title);
}

function createGenreCarouselWithTitle(array, title) {
    let actionCompleted = false;

    let sortedArray = [];
    if (array.length > 20) {
        array.forEach((objeto) => {
            if (objeto.name !== undefined) {
                objeto.media_type = "tv";
            } else if (objeto.title !== undefined) {
                objeto.media_type = "movie";
            }
        });

        sortedArray = alternateTvMovieInArray(array);

        let limit = Math.min(30, sortedArray.length);
        sortedArray = sortedArray.slice(0, limit);

        actionCompleted = true;
        console.log(sortedArray);
    }
    if (actionCompleted) {
        createSectionWithFilms(title, sortedArray);
    }
}

function alternateTvMovieInArray(array) {
    let interleavedArray = [];

    const tvArray = array.filter((obj) => obj.media_type === "tv");
    const movieArray = array.filter((obj) => obj.media_type === "movie");
    for (let i = 0; i < Math.max(tvArray.length, movieArray.length); i++) {
        if (tvArray[i]) {
            interleavedArray.push(tvArray[i]);
        }
        if (movieArray[i]) {
            interleavedArray.push(movieArray[i]);
        }
    }
    return interleavedArray;
}

function createSectionWithFilms(name, films) {
    // Creating the section
    var section = document.createElement("section");
    section.classList.add("component-carousel-no-profile");

    // Creating the section header
    var headerDiv = document.createElement("div");
    headerDiv.classList.add("section-header");

    var nameHeader = document.createElement("h4");
    nameHeader.textContent = name;

    headerDiv.appendChild(nameHeader);

    // Creating the content of the section
    var contentDiv = document.createElement("div");
    contentDiv.classList.add("section-content");

    // Creating the carousel
    var carousel = createCarousel(films, createCarouselItem);
    contentDiv.appendChild(carousel.container);

    // Adding header and content to the section
    section.appendChild(headerDiv);
    section.appendChild(contentDiv);

    // Adding the section to the main element
    var mainFriends = document.querySelector(".home-carousel");
    mainFriends.appendChild(section);

    // Initialize carousel
    initializeCarousel(carousel);
}

function createCarouselItem(film) {
    var filmDiv = document.createElement("div");
    filmDiv.classList.add("item");

    var link = document.createElement("a");
    link.classList.add("link-item-container");
    if (film.media_type == "movie") {
        link.setAttribute("href", "single_movie.html?id=" + film.id);
    } else {
        link.setAttribute("href", "single_series.html?id=" + film.id);
    }

    var img = document.createElement("img");
    img.classList.add("movie-series-placeholder");
    img.src = theMovieDb.common.images_uri + "w154" + film.poster_path;
    img.alt = film.name || film.title;

    var p = document.createElement("p");
    p.classList.add("small-one");
    p.textContent = film.name || film.title;

    link.appendChild(img);
    link.appendChild(p);

    filmDiv.appendChild(link);

    return filmDiv;
}
