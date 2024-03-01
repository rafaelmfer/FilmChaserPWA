"use strict";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";
import { ACCOUNT_ID, SESSION_ID } from "../local_properties.js";

// related to SPA ============================================================
const allPages = document.querySelectorAll("div.page");
navigateToPage();

//init handler for hash navigation
window.addEventListener("hashchange", navigateToPage);

function navigateToPage(event) {
    const pageId = location.hash ? location.hash : "watchlist";
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
let arrayTvShows = [];
let arrayMovies = [];

theMovieDb.account.getTvShowsWatchlist(
    { id: ACCOUNT_ID, session_id: SESSION_ID },
    successSeriesWatchList,
    errorCB
);
theMovieDb.account.getMovieWatchlist(
    { id: ACCOUNT_ID, session_id: SESSION_ID },
    successMoviesWatchList,
    errorCB
);

function errorCB(data) {
    console.log("Error callback: " + data);
}

// Watching - only series that you already saw at least one episode
function successSeriesWatchList(data) {
    console.log("Result successSeriesWatchList: ", JSON.parse(data));

    JSON.parse(data).results.forEach(function (series) {
        createMovieSeriesCard(series, ".watching-cards-container");
    });

    let upcomingArray = arrayTvShows.filter(function(series) {
        return new Date() - new Date(series.release_date) < 0;
    });

    upcomingArray.forEach(function (movie) {
        createMovieSeriesCard(movie, ".upcoming-container");
    });
}

// Haven't Watched - series that you didnt see any episode and movies
function successMoviesWatchList(data) {
    console.log("Result successMoviesWatchList: ", JSON.parse(data));

    JSON.parse(data).results.forEach(function (movie) {
        createMovieSeriesCard(movie, ".havent-started-cards-container");
    });
    
    arrayMovies = JSON.parse(data).results

    let upcomingArray = arrayMovies.filter(function(movie) {
        return new Date() - new Date(movie.release_date) < 0;
    });

    upcomingArray.forEach(function (movie) {
        createMovieSeriesCard(movie, ".upcoming-container");
    });

}

function createMovieSeriesCard(item, locationId) {
    // Create the <article> element
    var article = document.createElement("article");
    article.classList.add("film-chaser", "card-movie-series");

    // Add the movie image
    var img = document.createElement("img");
    img.src = "http://image.tmdb.org/t/p/w154" + item.poster_path;
    img.alt = item.original_name;
    img.width = 154;
    img.height = 231;
    article.appendChild(img);

    // Create a <div> for the movie information
    var infoDiv = document.createElement("div");
    infoDiv.classList.add("film-chaser", "movie-series-info");
    article.appendChild(infoDiv);

    // Add the movie title
    var title = document.createElement("h6");
    title.classList.add("film-chaser", "movie-series-title");
    title.textContent = item.title || item.name;
    infoDiv.appendChild(title);

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


// MODEL ARRAY THAT IT WILL BE DELETED AFTER
var mockupJson = {
    "completed": [
        {
            "id": 1668,
            "name": "Series",
            "media_type": "tv",
            "release_date": "2023-12-07",
            "vote_average": 8.42342,
            "overview": "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
            "poster_path": "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg"
        },
        {
            "id": 1669,
            "title": "Movie",
            "media_type": "movie",
            "release_date": "2023-12-07",
            "vote_average": 8.42342,
            "overview": "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
            "poster_path": "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg"
        }
    ]
}

console.log(mockupJson);

mockupJson.completed.forEach(function(item) {
    createMovieSeriesCard(item, ".completed-container")
})