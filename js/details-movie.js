"use strict";

import { urlInfo,
    createCarousel,
    initializeCarousel,
    options,
    networkInfo,
} from './common.js';
import { checkSession } from "./auth.js";
import {
    getInfoDb,
    saveMovieInDb,
    updateInfoDb,
    deleteInfoDb,
    listenToDocumentChanges,
} from "./firestore.js";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

networkInfo();

var movieId = urlInfo("id");
let movieDetails = {};

const movieHeader = document.querySelector(".js-movie-header");
const movieTitle = document.querySelector(".js-movie--title");
const movieGralInfo = document.querySelector(".js-movie--general-info");
const movieInfoDetails = document.querySelector(".js-section--movie-info-details");
const btnBack = document.querySelector(".btn-go-back");

btnBack.addEventListener("click", history_back);

function history_back() {
    window.history.back();
}

// SECTION: HERO IMAGE

// BUILDING THE PATH TO THE IMAGE POSTER
const base_url = "https://image.tmdb.org/t/p/";

// POSTER SIZES
// These are the available poster sizes.
// const poster_sizes = ["w92", "w154", "w185","w342","w500","w780","original"];

// This is the horizontal size, and needs to be use with the backdrop_path
const file_size = "w1000_and_h450_multi_faces";

theMovieDb.movies.getById({ id: movieId }, successCB_movie, errorCB);

function successCB_movie(data) {
    console.log("DAATAAAAA",JSON.parse(data));
    movieDetails = JSON.parse(data);
    
    const image_path = base_url + file_size + movieDetails.backdrop_path;

    movieHeader.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 3.57%, rgba(0, 0, 0, 0.52) 30.06%, #000 100%), url(${image_path})`;

    movieTitle.innerHTML = movieDetails.title;
    const movieYear = document.createElement("p");
    movieYear.innerHTML = movieDetails.release_date.slice(0, 4)+ " - ";
    movieGralInfo.appendChild(movieYear);

    const movieInfoDetails_child = document.createElement("div");
    const movieYear_second = document.createElement("p");
    movieYear_second.innerHTML = movieDetails.release_date.slice(0, 4);
    movieInfoDetails_child.appendChild(movieYear_second);
    movieInfoDetails.appendChild(movieInfoDetails_child);

    const movie_categories = document.createElement("p");
    let category = "";
    for (let i in movieDetails.genres) {
        category = category + movieDetails.genres[i].name + ", ";
    }
    movie_categories.innerHTML = category.substring(0, category.length - 2);
    movieInfoDetails_child.appendChild(movie_categories);

    const movie_duration = document.createElement("p");
    const hours = Math.floor(movieDetails.runtime / 60);
    const minutes = movieDetails.runtime % 60;
    movie_duration.innerHTML = `${hours}h ${minutes}m - `;
    movieGralInfo.appendChild(movie_duration);

    const movieInfoDetails_votes = document.createElement("div");
    movieInfoDetails_votes.classList.add("small-size-font");
    const movie_vote_average = document.createElement("p");
    const movie_vote_stars = document.createElement("p");

    let vote_average = (movieDetails.vote_average * 5) / 10;
    movie_vote_average.innerHTML =
        vote_average.toFixed(2) + " / 5 (" + movieDetails.vote_count + ")";

    let star = "";
    let i = 1;
    while (i <= 5) {
        if (i < vote_average + 0.5) {
            star += "&#9733;";
        } else {
            star += "&#9734;";
        }
        i++;
    }
    movie_vote_stars.innerHTML = star;

    movieInfoDetails_votes.appendChild(movie_vote_stars);
    movieInfoDetails_votes.appendChild(movie_vote_average);
    movieInfoDetails.appendChild(movieInfoDetails_votes);

    const movie_paragraph = document.createElement("p");
    movie_paragraph.innerHTML = movieDetails.overview;
    movieInfoDetails.appendChild(movie_paragraph);

    const movie_duration_second = document.createElement("p");
    movie_duration_second.innerHTML = `<span class="material-symbols-outlined">
    timer</span> ${hours}h ${minutes}m`;
    movieInfoDetails.appendChild(movie_duration_second);
}

// SECTION: HERO IMAGE -> call to get the certification
theMovieDb.movies.getReleases({ id: movieId }, successCB_release, errorCB);

function successCB_release(data) {
    const movie_certification = document.createElement("p");
    for (let i in JSON.parse(data).results) {
        // TODO filter with the profile info.

        if (
            JSON.parse(data).results[i].iso_3166_1 === "CA" ||
            JSON.parse(data).results[i].iso_3166_1 === "US"
        ) {
            for (let j in JSON.parse(data).results[i].release_dates) {
                if (
                    JSON.parse(data).results[i].release_dates[j]
                        .certification != null
                ) {
                    movie_certification.innerHTML =
                        JSON.parse(data).results[i].release_dates[
                            j
                        ].certification;
                    movieGralInfo.appendChild(movie_certification);
                    break;
                }
                j++;
            }
        }
    }
}

// SECTION BUTTONS (Watchlist, Completed)
const user = await checkSession();;
let documentId = user.uid;

const userDoc = await getInfoDb(`users/${documentId}`);
document.getElementById("userName").innerHTML = userDoc.name;
document.getElementById("userPicture").src = userDoc.profile_photo || "../resources/imgs/profile/profile2.png";

const watchlistPathInFirebase = `users/${documentId}/watchlist`;

const btWatchlist = document.getElementById("js-add-watchlist");
const btCompleted = document.getElementById("js-completed");

const watchlistImg = btWatchlist.querySelector("img");
const completedImg = btCompleted.querySelector("img");

let itemAdded = {};

const unsub = listenToDocumentChanges(
    watchlistPathInFirebase,
    movieId,
    handleDocumentChanges,
    {}
);

function handleDocumentChanges(data) {
    console.log("Documento atualizado:", data);
    // Faça o que você precisa com os dados atualizados do documento aqui
    itemAdded = data;

    watchlistImg.src = itemAdded
        ? "../resources/icons/icons-active/active-heart.svg"
        : "../resources/icons/icons-default/default-heart.svg";

    completedImg.src = itemAdded
        ? itemAdded.completed
            ? "../resources/icons/icons-active/active-completed.svg"
            : "../resources/icons/icons-default/default-completed.svg" 
        : "../resources/icons/icons-default/default-completed.svg";
}

btWatchlist.addEventListener("click", async function (event) {
    event.preventDefault();

    if (itemAdded && itemAdded.id === Number(movieId)) {
        await deleteInfoDb(`${watchlistPathInFirebase}/${movieId}`);
    } else {
        await saveMovieInDb(
            watchlistPathInFirebase,
            movieId,
            movieDetails,
            false
        );
    }
});

btCompleted.addEventListener("click", async function (event) {
    event.preventDefault();

    if (itemAdded && itemAdded.id === Number(movieId)) {
        const updatedCompletedState =
            itemAdded.completed === true ? false : true;
        await updateInfoDb(`${watchlistPathInFirebase}/${movieId}`, {
            completed: updatedCompletedState,
        });
    } else {
        await saveMovieInDb(
            watchlistPathInFirebase,
            movieId,
            movieDetails,
            true
        );
    }
});

// SECTION: STREAMING SERVICES
const movieStreaming_not = document.querySelector(".js-not-subscribed");
const movieStreaming_yes = document.querySelector(".subscribed");
let userSNS = userDoc.streamingServices;

const movie_url_providers =
    "https://api.themoviedb.org/3/movie/" + movieId + "/watch/providers";

fetch(movie_url_providers, options)
    .then((response) => response.json())
    .then((response) => {
        movie_info_providers(response.results);
    })
    .catch((err) => console.error(err));

function movie_info_providers(providers) {
    // TODO the country initials could be taken from the profile info.
    if (providers.CA != null) {
        if (providers.CA.flatrate != undefined) {
            iterate_movie_provider(providers.CA.flatrate);
        } else if (providers.CA.rent != undefined) {
            iterate_movie_provider(providers.CA.rent);
        } else if (providers.CA.buy != undefined) {
            iterate_movie_provider(providers.CA.buy);
        }
    } else {
        console.log("There is not providers for this country");
    }
}

function iterate_movie_provider(array) {
    let netflix = 0,
        amc = 0,
        paramount = 0,
        crunchyroll = 0;
    for (let i in array) {
        if (array[i].provider_name.includes("Netflix") && netflix === 0) {
            compareSNS(array[i], array[i].provider_name);
            netflix++;
        } else if (array[i].provider_name.includes("AMC") && amc === 0) {
            compareSNS(array[i], array[i].provider_name);
            amc++;
        } else if (array[i].provider_name.includes("Paramount") && paramount === 0) {
            compareSNS(array[i], array[i].provider_name);
            paramount++;
        } else if (array[i].provider_name.includes("Crunchyroll") && crunchyroll === 0) {
            compareSNS(array[i], array[i].provider_name);
            crunchyroll++;
        } else if (!array[i].provider_name.includes("Netflix") && !array[i].provider_name.includes("AMC") && !array[i].provider_name.includes("Paramount") && !array[i].provider_name.includes("Crunchyroll")) {
            compareSNS(array[i], array[i].provider_name);
        }
    }
}

function compareSNS(object, name) {
    let foundMatch = false; 
    for (let service of userSNS) {
        // let serviceX = service.replace(/\s+/g, '');
        if (service === "Disney+"){
            service = "Disney Plus";
        }
        if (name.includes(service)) {
            createImageSNS(object, movieStreaming_yes);
            foundMatch = true; 
            break; 
        }
    }
    if (!foundMatch) {
        createImageSNS(object, movieStreaming_not);
    }
}

function createImageSNS (object, htmlElement){
    const logo_streaming = document.createElement("img");
    logo_streaming.classList.add("js-streaming-logo");

    logo_streaming.alt = object.provider_name;
    if (object.provider_name.includes("Crunchyroll")){
        logo_streaming.src = base_url + "w92" + "/mXeC4TrcgdU6ltE9bCBCEORwSQR.jpg";
    } else if (object.provider_name.includes("AMC")){
        logo_streaming.src = base_url + "w92" + "/ovmu6uot1XVvsemM2dDySXLiX57.jpg";
    } else  {
        logo_streaming.src = base_url + "w92" + object.logo_path;
    }

    htmlElement.appendChild(logo_streaming);
}

// SECTION: COMMENTS /  REVIEWS
const movie_comments = document.querySelector(".js-movie-comments");
theMovieDb.movies.getReviews({ id: movieId }, successCB_Reviews, errorCB);

function successCB_Reviews(data) {
    // TODO Fix the structure to include the hyperlink
    movie_comments.innerHTML = JSON.parse(data).total_results;
}
// CAROUSEL ==================

function callInOrder(func1,delay){
    setTimeout(()=>{
        func1();
    },delay);
}
// SECTION: MOVIE CAST PICTURES

function successCB_Cast(data) {
    if (JSON.parse(data).cast.length > 0){
        createSectionWithFilms("Cast", JSON.parse(data).cast); 
    }
}

// SECTION: SIMILAR MOVIES / RELATED MOVIES

function successCB_Similar(data) {
    if (JSON.parse(data).results.length > 0) {
        createSectionWithFilms("Related Movies", JSON.parse(data).results);
    }
 
}

// SECTION: RECOMMENDATIONS / PEOPLE ALSO WATCHED

function successCB_Popular(data) {
    if (JSON.parse(data).results.length > 0){
        createSectionWithFilms("People Also Watched", JSON.parse(data).results);
    }
}
// callInOrder(()=>theMovieDb.movies.getCredits({ id: movieId }, successCB_Cast, errorCB),
//             ()=>theMovieDb.movies.getSimilarMovies({ id: movieId }, successCB_Similar, errorCB),
//             ()=>theMovieDb.movies.getPopular({}, successCB_Popular, errorCB));
callInOrder(()=>theMovieDb.movies.getCredits({ id: movieId }, successCB_Cast, errorCB),100);
callInOrder(()=>theMovieDb.movies.getSimilarMovies({ id: movieId }, successCB_Similar, errorCB), 200);
callInOrder(()=>theMovieDb.movies.getPopular({}, successCB_Popular, errorCB), 400);

// FUNCTIONS OF THE CAROUSEL
const sectionPictures = document.querySelector(".section-pictures");
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
    sectionPictures.appendChild(section);

    // Initialize carousel
    initializeCarousel(carousel, 124, 8);
    
}

function createCarouselItem(film) {
    
        var filmDiv = document.createElement("div");
        filmDiv.classList.add("item");

        var link = document.createElement("a");
        link.classList.add("link-item-container");
        if (film.media_type == "movie" || film.poster_path != null ) {
            link.setAttribute("href", "single_movie.html?id=" + film.id);
        } else {
         link.setAttribute("href", "#");
        }

        var img = document.createElement("img");
        img.classList.add("movie-series-placeholder");
        if (film.poster_path != undefined) {
            img.src = theMovieDb.common.images_uri + "w154" + film.poster_path  
        } else if (film.profile_path != undefined) {
            img.src = theMovieDb.common.images_uri + "w154" + film.profile_path;
        } else if (film.profile_path == undefined ) {
            img.src = "../resources/imgs/Placeholder/Placeholder_actor(1).png"
        }

        img.alt = film.name || film.title;

        var p = document.createElement("p");
        p.classList.add("small-one");
        p.textContent = film.name || film.title;

        link.appendChild(img);
        link.appendChild(p);

        filmDiv.appendChild(link);
        return filmDiv;
}
// ----------------------------------------------------------
function errorCB(data) {
    console.log("Error callback: " + data);
}
