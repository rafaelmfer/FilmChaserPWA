"use strict";

import { urlInfo, options } from "./common.js";
import { checkSession } from "./auth.js";
import {
    saveMovieInDb,
    saveTvShowInDb,
    saveTvShowInDb2,
    updateInfoDb,
    deleteInfoDb,
    listenToDocumentChanges,
} from "./firestore.js";
import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

var movieId = urlInfo("id");
let movieDetails = {};
// TODO import inicia function

let seriesDetails = {
    adult: false,
    backdrop_path: "/8U42J8z7ZqnrzfljJTDul9JfDNH.jpg",
    episode_run_time: [22],
    first_air_date: "2017-09-25",
    homepage: "http://www.cbs.com/shows/young-sheldon/",
    id: 71728,
    in_production: true,
    languages: ["en"],
    last_air_date: "2024-02-29",
    name: "Young Sheldon",
    number_of_episodes: 141,
    number_of_seasons: 7,
    origin_country: ["US"],
    original_language: "en",
    original_name: "Young Sheldon",
    overview:
        "The early life of child genius Sheldon Cooper, later seen in The Big Bang Theory.",
    popularity: 770.604,
    poster_path: "/tKwjkqTSq5fJdSxIk4yOh61tOKD.jpg",
    seasons: [
        {
            air_date: "2017-05-27",
            episode_count: 3,
            id: 177893,
            name: "Specials",
            overview: "",
            poster_path: "/oeKzhbF1sPKieHe5ZviNo0AajYl.jpg",
            season_number: 0,
            vote_average: 0,
        },
        {
            air_date: "2017-09-25",
            episode_count: 22,
            id: 88399,
            name: "Season 1",
            overview: "",
            poster_path: "/rRVeKYBGm2PjVtsPdzFY5OGReJc.jpg",
            season_number: 1,
            vote_average: 6.9,
        },
        {
            air_date: "2018-09-24",
            episode_count: 22,
            id: 108333,
            name: "Season 2",
            overview: "",
            poster_path: "/huYP7tDwpjRcmsTjsADO2WmmZ7P.jpg",
            season_number: 2,
            vote_average: 7.1,
        },
        {
            air_date: "2019-09-26",
            episode_count: 21,
            id: 129338,
            name: "Season 3",
            overview: "",
            poster_path: "/iI9dpn3K5hvKdJgy9AelhkqVraX.jpg",
            season_number: 3,
            vote_average: 6.5,
        },
        {
            air_date: "2020-11-05",
            episode_count: 18,
            id: 165705,
            name: "Season 4",
            overview: "",
            poster_path: "/epQNlTqhGCM6vdXM4sE3Nn0enJR.jpg",
            season_number: 4,
            vote_average: 7,
        },
        {
            air_date: "2021-10-07",
            episode_count: 22,
            id: 202005,
            name: "Season 5",
            overview: "",
            poster_path: "/5Gf83qYgLY8Qivn7jpv5nxxZPu6.jpg",
            season_number: 5,
            vote_average: 6.9,
        },
        {
            air_date: "2022-09-29",
            episode_count: 22,
            id: 298442,
            name: "Season 6",
            overview: "",
            poster_path: "/MpdROQ5XxQqOMKhJlLUf7PTxIC.jpg",
            season_number: 6,
            vote_average: 7.4,
        },
        {
            air_date: "2024-02-15",
            episode_count: 14,
            id: 365600,
            name: "Season 7",
            overview: "",
            poster_path: "/xhFmVtH5x1yu4XqFWRmtc4NYVRG.jpg",
            season_number: 7,
            vote_average: 7.1,
        },
    ],
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
        },
    ],
    status: "Returning Series",
    tagline: "It all started with a big bang...or rather, in East Texas.",
    type: "Scripted",
    vote_average: 8.054,
    vote_count: 2249,
};
console.log(seriesDetails);

const movieHeader = document.querySelector(".js-movie-header");
const movieTitle = document.querySelector(".js-movie--title");
const movieGralInfo = document.querySelector(".js-movie--general-info");
const movieInfoDetails = document.querySelector(
    ".js-section--movie-info-details"
);

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
    movieDetails = JSON.parse(data);
    const image_path = base_url + file_size + movieDetails.backdrop_path;

    movieHeader.style.backgroundImage = `url(${image_path})`;
    movieHeader.style.backgroundSize = "cover";

    movieTitle.innerHTML = movieDetails.title;
    const movieYear = document.createElement("p");
    movieYear.innerHTML = movieDetails.release_date.slice(0, 4);
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
    movie_duration.innerHTML = `${hours}h ${minutes}m`;
    movieGralInfo.appendChild(movie_duration);

    const movieInfoDetails_votes = document.createElement("div");
    const movie_vote_average = document.createElement("p");
    const movie_vote_stars = document.createElement("p");

    let vote_average = (movieDetails.vote_average * 5) / 10;
    movie_vote_average.innerHTML =
        vote_average.toFixed(2) + "/5 (" + movieDetails.vote_count + ")";

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
const user = await checkSession();
let documentId = user.uid;
// let documentId = "j7hBgo46ATgnYVdRRGTAA9hyBmB2";

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
        ? "../resources/icons/active-heart.svg"
        : "../resources/icons/default-heart.svg";

    completedImg.src = itemAdded
        ? itemAdded.completed
            ? "../resources/icons/active-heart.svg"
            : "../resources/icons/default-heart.svg"
        : "../resources/icons/default-heart.svg";
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

        // await saveTvShowInDb(
        //     watchlistPathInFirebase,
        //     "71728",
        //     seriesDetails,
        //     false
        // );

        await saveTvShowInDb2(
            watchlistPathInFirebase,
            "71728",
            seriesDetails,
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
    for (let i in array) {
        const logo_streaming = document.createElement("img");
        logo_streaming.classList.add("js-streaming-logo");

        logo_streaming.src = base_url + "w92" + array[i].logo_path;
        logo_streaming.alt = array[i].provider_name;

        movieStreaming_not.appendChild(logo_streaming);
    }
}

// SECTION: COMMENTS /  REVIEWS
const movie_comments = document.querySelector(".js-movie-comments");
theMovieDb.movies.getReviews({ id: movieId }, successCB_Reviews, errorCB);

function successCB_Reviews(data) {
    // TODO Fix the structure to include the hyperlink
    movie_comments.innerHTML = JSON.parse(data).total_results;
}

// SECTION: MOVIE CAST PICTURES
const movieCast = document.querySelector(".js-movie-cast-pictures");

theMovieDb.movies.getCredits({ id: movieId }, successCB_Cast, errorCB);

function successCB_Cast(data) {
    let i = 0;
    JSON.parse(data).cast.forEach(function (artist) {
        if (i < 4) {
            const hyperlink = document.createElement("a");
            const figure = document.createElement("figure");
            const picture = document.createElement("img");
            const name = document.createElement("figcaption");

            if (artist.profile_path != null) {
                picture.src = base_url + "w154" + artist.profile_path;
                picture.alt = "Picture of the actor/actress";
            } else {
                // TODO change the placeholder image
                picture.src =
                    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg";
                picture.alt = "no image provide for the artist";
                picture.style.width = "154px";
            }

            name.innerHTML = artist.name;

            figure.appendChild(picture);
            figure.appendChild(name);
            hyperlink.appendChild(figure);
            movieCast.appendChild(hyperlink);
            i++;
        }
    });
}

// SECTION: SIMILAR MOVIES / RELATED MOVIES
const movie_related = document.querySelector(".js-movie-related-pictures");

theMovieDb.movies.getSimilarMovies({ id: movieId }, successCB_Similar, errorCB);

function successCB_Similar(data) {
    let i = 0;
    JSON.parse(data).results.forEach(function (movie) {
        if (i < 4) {
            let hyperlink = createFigureHyperlink(
                movie,
                "single_movie.html?id="
            );
            movie_related.appendChild(hyperlink);
            i++;
        }
    });
}

// SECTION: RECOMMENDATIONS / PEOPLE ALSO WATCHED
const movie_recommended = document.querySelector(".js-movie-also-pictures");
theMovieDb.movies.getPopular({}, successCB_Popular, errorCB);

function successCB_Popular(data) {
    let i = 0;
    JSON.parse(data).results.forEach(function (movie) {
        if (i < 4) {
            let hyperlink = createFigureHyperlink(
                movie,
                "single_movie.html?id="
            );
            movie_recommended.appendChild(hyperlink);
            i++;
        }
    });
}

function createFigureHyperlink(object, path) {
    const hyperlink = document.createElement("a");
    const figure = document.createElement("figure");
    const poster = document.createElement("img");
    const title = document.createElement("figcaption");

    // TODO: Place holder poster
    poster.src = base_url + "w154" + object.poster_path;
    title.innerHTML = object.title;

    hyperlink.setAttribute("href", path + object.id);

    figure.appendChild(poster);
    figure.appendChild(title);
    hyperlink.appendChild(figure);
    return hyperlink;
}

// ----------------------------------------------------------
function errorCB(data) {
    console.log("Error callback: " + data);
}
