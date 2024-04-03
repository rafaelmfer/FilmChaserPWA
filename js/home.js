"use strict";

import { checkSession } from "./auth.js";
import { createCarousel, initializeCarousel, networkInfo } from "./common.js";
import { getInfoDb, listenToCollectionChanges } from "./firestore.js";
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

let watchlistPath = `users/${documentId}/watchlist`;

const userDoc = await getInfoDb(`users/${documentId}`);
document.getElementById("userName").innerHTML = userDoc.name;
document.getElementById("userPicture").src =
    userDoc.profile_photo ||
    "../resources/imgs/Placeholder/Placeholder_actor.png";
document.querySelector(".user-profile").src =
    userDoc.profile_photo ||
    "../resources/imgs/Placeholder/Placeholder_actor.png";

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
                "release_date.gte": "2024-06-10",
                "release_date.lte": "2030-12-31",
            },
            (data) => successCB(data, "Upcoming", arrayUpcoming),
            errorCB
        ),
    () =>
        theMovieDb.discover.getTvShows(
            {
                with_release_type: 2 | 3,
                "release_date.gte": "2024-06-10",
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
        // console.log(sortedArray);
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


  filmDiv.appendChild(create_heart())
  filmDiv.appendChild(create_heart_active())
  

    filmDiv.appendChild(link);

    return filmDiv;
}

const watchlist = listenToCollectionChanges(
    watchlistPath,
    "completed",
    "==",
    false,
    createWatchlist,
    errorWatchlist
);

function createWatchlist(data) {
    // Creating the watchlist carousel
    let alreadyReleased = [];

    var containerWatchlist = document.querySelector(
        ".component-carousel-no-profile.watchlist"
    );

    if (data.length > 0) {
        data.forEach(function (item) {
            if (
                new Date() - new Date(item.release_date) < 0 ||
                item.first_air_date === "" ||
                item.in_production == true
            ) {
                // do nothing
            } else {
                alreadyReleased.push(item);
            }
        });

        var carousel = createCarousel(alreadyReleased, createCarouselItem);
        var sectionContentWatchlist = document.querySelector(
            ".component-carousel-no-profile.watchlist .section-content"
        );
        sectionContentWatchlist.appendChild(carousel.container);

        containerWatchlist.style.display = "block";

        // Initialize carousel
        initializeCarousel(carousel);
    } else {
        containerWatchlist.style.display = "none";
    }
}

function errorWatchlist(error) {
    console.log(error);
}

function create_heart(){
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  // svg.setAttribute("class","icon-heart active")

  // First path element
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M13 18.5C12.8385 18.594 11.6868 18.9895 11.5 18.9895C11.3132 18.9895 11.1297 18.94 10.9682 18.8459C9.58044 18.0384 8.28427 17.0828 7.10238 15.996C5.73196 14.6324 4.27291 12.7097 4.03428 10.7734C3.76156 8.48255 5.12516 6.0008 7.80464 6.0008C8.35521 5.98909 8.9009 6.10631 9.3981 6.34307C9.89531 6.57983 10.3303 6.92959 10.6682 7.3644C10.7671 7.49055 10.8933 7.59257 11.0374 7.66272C11.1815 7.73287 11.3397 7.76933 11.5 7.76933C11.6603 7.76933 11.8185 7.73287 11.9626 7.66272C12.1067 7.59257 12.2329 7.49055 12.3318 7.3644C12.6697 6.92959 13.1047 6.57983 13.6019 6.34307C14.0991 6.10631 14.6448 5.98909 15.1954 6.0008C17.8748 6.0008 19.2384 8.48255 18.9657 10.7734");
  path1.setAttribute("stroke", "#9E9BAC");
  path1.setAttribute("stroke-width", "2");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");


  // Second path element
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("fill-rule", "evenodd");
  path2.setAttribute("clip-rule", "evenodd");
  path2.setAttribute("d", "M17.75 12.25C17.75 11.6977 17.3023 11.25 16.75 11.25C16.1977 11.25 15.75 11.6977 15.75 12.25V13.75H14.25C13.6977 13.75 13.25 14.1977 13.25 14.75C13.25 15.3023 13.6977 15.75 14.25 15.75H15.75V17.25C15.75 17.8023 16.1977 18.25 16.75 18.25C17.3023 18.25 17.75 17.8023 17.75 17.25V15.75H19.25C19.8023 15.75 20.25 15.3023 20.25 14.75C20.25 14.1977 19.8023 13.75 19.25 13.75H17.75V12.25Z");
  path2.setAttribute("fill", "#9E9BAC");


  let div = document.createElement("div")
  div.setAttribute("class","empty-heart active");
  div.addEventListener("click",(e)=>{
    console.log(e)
    e.target.parentNode.nextSibling.classList.add("active")
    e.target.parentElement.classList.remove("active")

  })


  // Append paths to the SVG
  svg.appendChild(path1);
  svg.appendChild(path2);


  div.appendChild(svg);

  return div;
}



function create_heart_active(){
  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  // svg.setAttribute("class","icon-heart-active active")

  // Create path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M15.1954 6.0008C14.6448 5.98909 14.0991 6.10631 13.6019 6.34307C13.1047 6.57983 12.6697 6.92959 12.3318 7.3644C12.2329 7.49055 12.1067 7.59257 11.9626 7.66272C11.8185 7.73287 11.6603 7.76933 11.5 7.76933C11.3397 7.76933 11.1815 7.73287 11.0374 7.66272C10.8933 7.59257 10.7671 7.49055 10.6682 7.3644C10.3303 6.92959 9.8953 6.57983 9.3981 6.34307C8.9009 6.10631 8.35521 5.98909 7.80464 6.0008C5.12516 6.0008 3.76156 8.48255 4.03428 10.7734C4.27291 12.7097 5.73196 14.6324 7.10238 15.996C8.28427 17.0828 9.58044 18.0384 10.9682 18.8459C11.1297 18.94 11.3132 18.9895 11.5 18.9895C11.6868 18.9895 11.8703 18.94 12.0318 18.8459C13.4196 18.0384 14.7157 17.0828 15.8976 15.996C17.2612 14.6324 18.7271 12.7097 18.9657 10.7734C19.2384 8.48255 17.8748 6.0008 15.1954 6.0008Z");
  path.setAttribute("fill", "url(#paint0_linear_206_21634)");
  path.setAttribute("stroke", "url(#paint1_linear_206_21634)");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  // Append path to SVG
  svg.appendChild(path);

  // Create linearGradient elements
  const linearGradient0 = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  linearGradient0.setAttribute("id", "paint0_linear_206_21634");
  linearGradient0.setAttribute("x1", "18.3421");
  linearGradient0.setAttribute("y1", "34.813");
  linearGradient0.setAttribute("x2", "-8.99381");
  linearGradient0.setAttribute("y2", "28.4526");
  linearGradient0.setAttribute("gradientUnits", "userSpaceOnUse");

  const stop0 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop0.setAttribute("stop-color", "#EC764F");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0.396134");
  stop1.setAttribute("stop-color", "#72465D");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "1");
  stop2.setAttribute("stop-color", "#2E5DF3");

  linearGradient0.appendChild(stop0);
  linearGradient0.appendChild(stop1);
  linearGradient0.appendChild(stop2);

  const linearGradient1 = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  linearGradient1.setAttribute("id", "paint1_linear_206_21634");
  linearGradient1.setAttribute("x1", "18.3421");
  linearGradient1.setAttribute("y1", "34.813");
  linearGradient1.setAttribute("x2", "-8.99381");
  linearGradient1.setAttribute("y2", "28.4526");
  linearGradient1.setAttribute("gradientUnits", "userSpaceOnUse");

  const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop3.setAttribute("stop-color", "#EC764F");

  const stop4 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop4.setAttribute("offset", "0.396134");
  stop4.setAttribute("stop-color", "#72465D");

  const stop5 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop5.setAttribute("offset", "1");
  stop5.setAttribute("stop-color", "#2E5DF3");

  linearGradient1.appendChild(stop3);
  linearGradient1.appendChild(stop4);
  linearGradient1.appendChild(stop5);

  let div = document.createElement("div")
  div.setAttribute("class","color-heart");

  div.addEventListener("click",(e)=>{
    console.log(e.target.parentElement.className)
    console.log(e)

    e.target.parentElement.parentElement.classList.remove("active")
    e.target.parentNode.parentNode.previousElementSibling.classList.add("active")


  })

  // Append linearGradients to SVG
  svg.appendChild(linearGradient0);
  svg.appendChild(linearGradient1);

  div.appendChild(svg)
  // Append SVG to DOM
  return div;
}