"use strict";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

import {
    getAllDocsInSubcollection,
    getDocsByQuery,
} from "./firestore.js";
import {
    createCarousel,
    initializeCarousel,
    networkInfo,
    options,
    userDoc,
} from "./common.js";

networkInfo();

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

// TAB LAYOUT ============================================================================
const watchList = document.querySelector(".firstTab");
const upcoming = document.querySelector(".secondTab");
const completed = document.querySelector(".thirdTab");

watchList.addEventListener("click", (e) => {
    watchList.querySelector(".tab-underline").classList.add("active");

    try {
        upcoming.querySelector(".tab-underline").classList.remove("active");
        completed.querySelector(".tab-underline").classList.remove("active");
    } catch (error) {
        console.log(error);
    }
});

upcoming.addEventListener("click", (e) => {
    upcoming.querySelector(".tab-underline").classList.add("active");

    try {
        watchList.querySelector(".tab-underline").classList.remove("active");
        completed.querySelector(".tab-underline").classList.remove("active");
    } catch (error) {
        console.log(error);
    }
});

completed.addEventListener("click", (e) => {
    completed.querySelector(".tab-underline").classList.add("active");

    try {
        watchList.querySelector(".tab-underline").classList.remove("active");
        upcoming.querySelector(".tab-underline").classList.remove("active");
    } catch (error) {
        console.log(error);
    }
});

// ============================================================================
let documentId = userDoc.id;

let watchlistPath = `users/${documentId}/watchlist`; 
let watchlistArray;

if (userDoc !== null) {
    document.getElementById("userName").innerHTML = userDoc.name;
    document.getElementById("userPicture").src =
        userDoc.profile_photo ||
        "../resources/imgs/Placeholder/placeholder_actor.png";
    document.querySelector(".user-profile").src =
        userDoc.profile_photo ||
        "../resources/imgs/Placeholder/placeholder_actor.png";

    
    watchlistArray = await getDocsByQuery(
        watchlistPath,
        "completed",
        "==",
        false,
        errorQuery
    );
}

function errorQuery(data) {}

var alreadyReleased = [];
let upcomingArray = [];

watchlistArray.forEach(function (item) {
    if (
        new Date() - new Date(item.release_date) < 0 ||
        item.first_air_date === "" ||
        item.in_production == true
    ) {
        upcomingArray.push(item);
    } else {
        alreadyReleased.push(item);
    }
});

let alreadyWatching = [];
let haventStarted = [];

alreadyReleased.forEach(async function (item) {
    if (item.media_type === "tv") {
        let seasonsPath = `${watchlistPath}/${item.id}/seasons`;
        let seasonsArray = await getAllDocsInSubcollection(seasonsPath, {});
        if (
            seasonsArray !== undefined &&
            seasonsArray !== null &&
            seasonsArray.length !== 0
        ) {
            alreadyWatching.push(item);
        } else {
            haventStarted.push(item);
        }
    } else {
        haventStarted.push(item);
    }
});

// WATCHLIST PAGE ==============================================================
// Watching - only series that you already saw at least one episode
setTimeout(() => {
    console.log(alreadyWatching);
    console.log(haventStarted);

    if (alreadyWatching.length === 0) {
        var paragraph = document.createElement("p");
        paragraph.className = "empty-state body-text";
        paragraph.style.height = "225px";
        paragraph.style.display = "flex";
        paragraph.style.alignItems = "center";
        paragraph.textContent = "You didn't start to watch anything yet. :(";
        document
            .querySelector(".watching-cards-container")
            .appendChild(paragraph);
    } else {
        createListOfMoviesSeries(
            alreadyWatching,
            "watching-cards-container",
            ".list-watching"
        );
    }

    // Haven't Watched - series that you didnt see any episode and movies
    createListOfMoviesSeries(
        haventStarted,
        "havent-started-cards-container",
        ".list-havent-started"
    );

    var watchList = document.querySelector(".list-watching");
    var divContainerWatching = document.createElement("div");
    divContainerWatching.classList.add("watching-cards-container-mobile");
    watchList.appendChild(divContainerWatching);

    var haventStartedList = document.querySelector(".list-havent-started");
    var divContainerHaventStarted = document.createElement("div");
    divContainerHaventStarted.classList.add(
        "havent-started-cards-container-mobile"
    );
    haventStartedList.appendChild(divContainerHaventStarted);

    if (alreadyWatching.length === 0) {
        var paragraph = document.createElement("p");
        paragraph.className = "empty-state body-text";
        paragraph.style.height = "30px";
        paragraph.style.display = "flex";
        paragraph.style.alignItems = "center";
        paragraph.textContent = "You didn't start to watch anything yet. :(";
        document
            .querySelector(".watching-cards-container-mobile")
            .appendChild(paragraph);
    }

    alreadyWatching.forEach(function (item) {
        var div = createItemMovieSeriesCard(item, false);
        document
            .querySelector(".watching-cards-container-mobile")
            .appendChild(div);
    });

    haventStarted.forEach(function (item) {
        var div = createItemMovieSeriesCard(item, false);
        document
            .querySelector(".havent-started-cards-container-mobile")
            .appendChild(div);
    });

    upcomingArray.sort(function (a, b) {
        // Check if release_date exists and is not empty
        if (a.release_date && b.release_date) {
            // Convert release_date strings to Date objects
            var dateA = new Date(a.release_date);
            var dateB = new Date(b.release_date);

            // Compare the dates
            return dateA - dateB;
        } else if (!a.release_date && b.release_date) {
            // If a's release_date is empty or non-existent, move it to the end
            return 1;
        } else if (a.release_date && !b.release_date) {
            // If b's release_date is empty or non-existent, move it to the end
            return -1;
        } else {
            // If both release_dates are empty or non-existent, maintain the order
            return 0;
        }
    });
    // UPCOMING PAGE ================================================================
    upcomingArray.forEach(function (item) {
        var div = createItemMovieSeriesCard(item, true);
        document.querySelector(".upcoming-container").appendChild(div);
    });
}, 500);

// COMPLETED PAGE ===============================================================
let watchlistCompletedArray = await getDocsByQuery(
    watchlistPath,
    "completed",
    "==",
    true,
    {}
);
watchlistCompletedArray.forEach(function (item) {
    var div = createItemMovieSeriesCard(item, false);
    document.querySelector(".completed-container").appendChild(div);
});

// GENERAL FUNCTIONS ================================================================
// function to order elements according to date, leaving those with a blank date last.
function compareReleaseDates(a, b) {
    // Handle blank release dates by moving them to the end
    if (a.release_date === "" && b.release_date === "") {
        return 0;
    } else if (a.release_date === "") {
        return 1;
    } else if (b.release_date === "") {
        return -1;
    }

    // Convert release_date strings to Date objects
    var dateA = new Date(a.release_date);
    var dateB = new Date(b.release_date);

    // Compare release dates
    if (dateA < dateB) {
        return -1;
    } else if (dateA > dateB) {
        return 1;
    } else {
        return 0;
    }
}

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

function createListOfMoviesSeries(films, className, locationId) {
    // Creating the content of the section
    var contentDiv = document.createElement("div");
    contentDiv.classList.add(className);

    // Creating the carousel
    var carousel = createCarousel(films, createItemMovieSeriesCard);
    contentDiv.appendChild(carousel.container);

    // Adding the section to the main element
    var main = document.querySelector(locationId);
    main.appendChild(contentDiv);

    // Initialize carousel
    initializeCarousel(carousel, 360, 8);
}

// Function that writes the HTML code
function createItemMovieSeriesCard(item, isUpcoming) {
    var media_url_providers = "";
    var filmDiv = document.createElement("div");
    filmDiv.classList.add("film-chaser", "item", "card-movie-series");

    if (item.media_type == "tv") {
        var path = "single_series.html?id=";
        media_url_providers = `https://api.themoviedb.org/3/tv/${item.id}/watch/providers`;
    } else {
        var path = "single_movie.html?id=";
        media_url_providers = `https://api.themoviedb.org/3/movie/${item.id}/watch/providers`;
    }

    // Add the movie image
    var hyperlinkImg = document.createElement("a");
    hyperlinkImg.setAttribute("href", path + item.id);
    var img = document.createElement("img");
    img.classList.add("movie-series--poster");
    img.src = theMovieDb.common.images_uri + "w154" + item.poster_path;
    img.alt = item.original_name;
    img.width = 154;
    img.height = 231;
    hyperlinkImg.appendChild(img);
    filmDiv.appendChild(hyperlinkImg);

    // Create a <div> for the movie information
    var infoDiv = document.createElement("div");
    infoDiv.classList.add("film-chaser", "movie-series--info");
    filmDiv.appendChild(infoDiv);

    // Add the movie title
    var hyperlinkTitle = document.createElement("a");
    hyperlinkTitle.setAttribute("href", path + item.id);
    var title = document.createElement("h6");
    title.classList.add("film-chaser", "movie-series--title");
    title.textContent = item.title || item.name;
    hyperlinkTitle.appendChild(title);
    infoDiv.appendChild(hyperlinkTitle);

    // Create a <div> for the year and rating
    var yearRateTimeDiv = document.createElement("div");
    yearRateTimeDiv.classList.add("film-chaser", "year-rate-time");
    infoDiv.appendChild(yearRateTimeDiv);

    // Add the movie year
    var year = document.createElement("p");
    year.classList.add("small-one");
    if ((item.release_date || item.first_air_date).split("-")[0] !== "") {
        year.textContent = (item.release_date || item.first_air_date).split(
            "-"
        )[0];
    } else {
        year.textContent = "Prod";
    }
    yearRateTimeDiv.appendChild(year);

    // Add the movie rating
    var rate = document.createElement("p");
    rate.classList.add("small-one");
    rate.textContent = Number(item.vote_average).toFixed(1) + "/10";
    yearRateTimeDiv.appendChild(rate);

    // Add the movie synopsis
    var synopsis = document.createElement("p");
    synopsis.classList.add("film-chaser", "synopsis", "small-one");
    synopsis.textContent = item.overview;
    infoDiv.appendChild(synopsis);

    if (isUpcoming === true) {
        // Add the "X days" button
        var daysBtn = document.createElement("button");
        daysBtn.classList.add("film-chaser", "upcoming");
        infoDiv.appendChild(daysBtn);

        var daysTextParagraph = document.createElement("p");
        daysTextParagraph.classList.add("small-one");

        var numberOfdaysSpan = document.createElement("span");

        if (
            item.release_date === "" ||
            item.release_date === null ||
            item.release_date === undefined
        ) {
            numberOfdaysSpan.textContent = "Production";
            daysTextParagraph.appendChild(numberOfdaysSpan);
        } else {
            // item.release_date' is a string in the format 'YYYY-MM-DD'
            var releaseDate = new Date(item.release_date);

            // Get the current date
            var currentDate = new Date();

            // Calculate the difference in milliseconds between the two dates
            var differenceInMilliseconds = currentDate - releaseDate;

            // Convert the difference in milliseconds to days
            var differenceInDays =
                Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) *
                -1;

            numberOfdaysSpan.textContent = differenceInDays;
            daysTextParagraph.appendChild(numberOfdaysSpan);
            var daysText = document.createTextNode(" days");
            daysTextParagraph.appendChild(daysText);
        }

        daysBtn.appendChild(daysTextParagraph);
    } else {
        // Add the "Watch Now" button
        var watchNowBtn = document.createElement("button");
        watchNowBtn.classList.add("film-chaser", "watch-now");
        infoDiv.appendChild(watchNowBtn);

        // Call for providers
        let provider = {};
        fetch(media_url_providers, options)
            .then((response) => response.json())
            .then((response) => {
                provider = media_info_providers(response.results);

                if (provider != null) {
                    var watchNowImg = document.createElement("img");
                    watchNowImg.src =
                        theMovieDb.common.images_uri +
                        "w92" +
                        provider.logo_path;

                    watchNowImg.alt = "Watch Now";
                    watchNowImg.width = 18;
                    watchNowImg.height = 18;
                    watchNowBtn.appendChild(watchNowImg);
                }
            })
            .catch((err) => console.error(err));

        var watchNowText = document.createElement("p");
        watchNowText.classList.add("small-one");
        watchNowText.textContent = "Watch Now";
        watchNowBtn.appendChild(watchNowText);
    }

    return filmDiv;
}

function media_info_providers(providers) {
    if (providers.CA != null) {
        if (providers.CA.flatrate != undefined) {
            return providers.CA.flatrate[0];
        } else if (providers.CA.rent != undefined) {
            return providers.CA.rent[0];
        } else if (providers.CA.buy != undefined) {
            return providers.CA.buy[0];
        }
    } else {
        return null;
    }
}
