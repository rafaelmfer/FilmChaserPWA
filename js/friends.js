import { checkSession } from "./auth.js";
import { getInfoDb, getDocsByQuery } from "./firestore.js";
import { createCarousel, initializeCarousel } from "./common.js";
import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

let mainFriends = document.getElementById("main-Friends");
let mainDiscover2 = document.getElementById("mainDiscover2");
let mainFilmChaser = document.getElementById("main-film-chaser");

let activeShowsMovies = document.querySelector("#active-shows-movies");
let activeFriends = document.querySelector("#active-friends");

activeFriends.addEventListener("click", () => {
    mainFriends.classList.add("active");
    mainDiscover2.classList.add("notActive");
    mainFilmChaser.classList.add("notActive");
    console.log("clicado friends ");
});

activeShowsMovies.addEventListener("click", () => {
    mainFriends.classList.remove("active");
    mainDiscover2.classList.add("notActive");
    mainFilmChaser.classList.remove("notActive");
    console.log("clicado show ");
});

const user = await checkSession();
let documentId = user.uid;
let documentDbPath = `users/${documentId}`;

let documentDb = await getInfoDb(documentDbPath);
console.log(documentDb.friends);

processFriends();

async function processFriends() {
    for (const friendRef of documentDb.friends) {
        const friendDoc = await getInfoDb(friendRef.reference.path);

        let watchlistPath = `${friendRef.reference.path}/watchlist`;
        let watchlistArrayNotCompleted = await getDocsByQuery(
            watchlistPath,
            "completed",
            "==",
            false,
            {}
        );

        if (watchlistArrayNotCompleted.length > 0) {
            createSectionWithFilms(friendDoc.name, watchlistArrayNotCompleted);
        }
    }
}

function createSectionWithFilms(name, films) {
    // Creating the section
    var section = document.createElement("section");
    section.classList.add("component-carousel-with-profile");

    // Creating the section header
    var headerDiv = document.createElement("div");
    headerDiv.classList.add("section-header");

    var nameHeader = document.createElement("h4");
    nameHeader.textContent = `${name.toLowerCase()}'s Watchlist`;

    nameHeader.style.textTransform = "capitalize";

    var viewProfileDiv = document.createElement("div");
    viewProfileDiv.classList.add("view-profile");

    var viewProfileText = document.createElement("p");
    viewProfileText.classList.add("small-one");
    viewProfileText.textContent = "View Profile";

    var arrowsImg = document.createElement("img");
    arrowsImg.classList.add("arrows");
    arrowsImg.src = "../resources/icons/icons-default/default-arrow-right.svg";
    arrowsImg.alt = "arrow-right";

    viewProfileDiv.appendChild(viewProfileText);
    viewProfileDiv.appendChild(arrowsImg);

    headerDiv.appendChild(nameHeader);
    headerDiv.appendChild(viewProfileDiv);

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
    var mainFriends = document.getElementById("main-Friends");
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
