"use strict";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";
import { ACCOUNT_ID, SESSION_ID } from "../local_properties.js";

import { checkSession } from "./auth.js";
import {
    getInfoDb,
    getAllDocsInSubcollection,
    getDocsByQuery,
} from "./firestore.js";

// related to SPA ============================================================
const allPages = document.querySelectorAll("div.page");
navigateToPage();

//init handler for hash navigation
window.addEventListener("hashchange", navigateToPage);

function navigateToPage(event) {
    const pageId = location.hash ? location.hash : "#watchlist";
    for (let page of allPages) {
        if (pageId === "#" + page.id) {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    }
    return;
}

// ============================================================================
const user = await checkSession();
let documentId = user.uid;
// let documentId = "j7hBgo46ATgnYVdRRGTAA9hyBmB2";
// let shogoId = " j7hBgo46ATgnYVdRRGTAA9hyBmB2";
let documentDbPath = `users/${documentId}`;
let watchlistPath = `users/${documentId}/watchlist`;
let documentDb = await getInfoDb(`${watchlistPath}/1668`);
console.log(documentDb);

let watchlistArray = await getAllDocsInSubcollection(watchlistPath, {});
// console.log(watchlistTest);
// let watchlistArray = [];

let upcomingArray = watchlistArray.filter(function (item) {
    if (
        new Date() - new Date(item.release_date) < 0 ||
        item.first_air_date === "" ||
        item.in_production == true
    ) {
        return item;
    }
});

// Come up with the way to find if the user already started to watch the series
let alreadyWatching = watchlistArray.filter(function (item) {
    if (
        item.seasons !== undefined &&
        checkIfEpisodeIsWatched(item.seasons) == true
    ) {
        return item;
    }
});

let haventStarted = watchlistArray.filter(function (item) {
    if (
        (new Date() - new Date(item.release_date) > 0 ||
            item.first_air_date === "" ||
            item.in_production == true) &&
        item.media_type === "movie"
    ) {
        return item;
    }
});

// WATCHLIST PAGE ==============================================================
// Watching - only series that you already saw at least one episode
alreadyWatching.forEach(function (series) {
    createMovieSeriesCard(series, ".watching-cards-container");
});

// Haven't Watched - series that you didnt see any episode and movies
haventStarted.forEach(function (movie) {
    createMovieSeriesCard(movie, ".havent-started-cards-container");
});

// UPCOMING PAGE ================================================================
upcomingArray.forEach(function (item) {
    createMovieSeriesCard(item, ".upcoming-container");
});

// COMPLETED PAGE ===============================================================
let watchlistCompletedArray = await getDocsByQuery(
    watchlistPath,
    "completed",
    "==",
    true,
    {}
);
watchlistCompletedArray.forEach(function (item) {
    createMovieSeriesCard(item, ".completed-container");
});

// GENERAL FUNCTIONS ================================================================
// Function that check if there is any episode in array of episodes that are watched
function checkIfEpisodeIsWatched(json) {
    for (let i = 0; i < json.length; i++) {
        console.log(`Season ${i + 1}`);
        const season = json[i];
        for (let j = 0; j < season.episodes.length; j++) {
            console.log(
                ` Episode ${season.episodes[j].episode_number}: ${
                    season.episodes[j].watched ? "Yes" : "No"
                }`
            );
            if (season.episodes[j].watched === true) return true;
        }
    }
    return false;
}

// Function that writes the HTML code
function createMovieSeriesCard(item, locationId) {
    if (item.media_type == "tv") {
        var path = "single_series.html?id=";
    } else {
        var path = "single_movie.html?id=";
    }
    // Create the <article> element
    var article = document.createElement("article");
    article.classList.add("film-chaser", "card-movie-series");

    // Add the movie image
    var hyperlinkImg = document.createElement("a");
    hyperlinkImg.setAttribute("href", path + item.id);
    var img = document.createElement("img");
    img.src = "http://image.tmdb.org/t/p/w154" + item.poster_path;
    img.alt = item.original_name;
    img.width = 154;
    img.height = 231;
    hyperlinkImg.appendChild(img);
    article.appendChild(hyperlinkImg);

    // Create a <div> for the movie information
    var infoDiv = document.createElement("div");
    infoDiv.classList.add("film-chaser", "movie-series-info");
    article.appendChild(infoDiv);

    // Add the movie title
    var hyperlinkTitle = document.createElement("a");
    hyperlinkTitle.setAttribute("href", path + item.id);
    var title = document.createElement("h6");
    title.classList.add("film-chaser", "movie-series-title");
    title.textContent = item.title || item.name;
    hyperlinkTitle.appendChild(title);
    infoDiv.appendChild(hyperlinkTitle);

    // Create a <div> for the year, rating, and duration of the movie
    var yearRateTimeDiv = document.createElement("div");
    yearRateTimeDiv.classList.add("film-chaser", "year-rate-time");
    infoDiv.appendChild(yearRateTimeDiv);

    // Add the movie year
    var year = document.createElement("p");
    year.classList.add("small-one");
    year.textContent = (item.release_date || item.first_air_date).split("-")[0];
    yearRateTimeDiv.appendChild(year);

    // Add the movie rating
    var rate = document.createElement("p");
    rate.classList.add("small-one");
    rate.textContent = Number(item.vote_average).toFixed(1) + "/10";
    yearRateTimeDiv.appendChild(rate);

    // Add the movie duration
    var duration = document.createElement("p");
    duration.classList.add("small-one");
    duration.textContent = "2h30min";
    yearRateTimeDiv.appendChild(duration);

    // Add the movie synopsis
    var synopsis = document.createElement("p");
    synopsis.classList.add("film-chaser", "synopsis");
    synopsis.textContent = item.overview;
    infoDiv.appendChild(synopsis);

    // Add the "Watch Now" button
    var watchNowBtn = document.createElement("button");
    watchNowBtn.classList.add("film-chaser", "watch-now");
    infoDiv.appendChild(watchNowBtn);

    var watchNowImg = document.createElement("img");
    watchNowImg.src = ""; // Place the URL of the "Watch Now" button image if available
    watchNowImg.alt = "Watch Now";
    watchNowImg.width = 18;
    watchNowImg.height = 18;
    watchNowBtn.appendChild(watchNowImg);

    var watchNowText = document.createElement("p");
    watchNowText.classList.add("small-one");
    watchNowText.textContent = "Watch Now";
    watchNowBtn.appendChild(watchNowText);

    // Add the movie card to the page
    var container = document.querySelector(locationId);
    container.appendChild(article);
}

// Function that handles the search bar functionality
