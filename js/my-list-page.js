"use strict";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";
import { ACCOUNT_ID, SESSION_ID } from '../local_properties.js'

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
    // console.log("Result successSeriesWatchList: ", JSON.parse(data));
    console.log("Result successSeriesWatchList: ", JSON.parse(data));

    JSON.parse(data).results.forEach(function (series) {
        createMovieSeriesCard(series, "watching-cards-container");
    });
}

// Haven't Watched - series that you didnt see any episode and movies
function successMoviesWatchList(data) {
    console.log("Result successMoviesWatchList: ", JSON.parse(data));

    JSON.parse(data).results.forEach(function (movie) {
        createMovieSeriesCard(movie, "havent-started-cards-container");
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
    var container = document.getElementById(locationId);
    container.appendChild(article);
}