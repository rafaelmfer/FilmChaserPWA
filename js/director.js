"use strict";

import { saveInfoDb } from "../js/firestore.js";
import { networkInfo } from "./common.js";
import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

networkInfo();

// FUNCTIONS TO FETCH DIRECTORS FROM THE API TO INITIALIZE THE SCREEN
// IT IS NOT EFFECTIVE BECAUSE IT TAKES TOO LONG TO LOAD THE PAGE
// THAT'S WHY WE USED THE DATA ALREADY STORED ON THE ARRAY directors BELOW
// let directorsArray = [];
// let pageNumber = 100;

// function callPersonPopularAPI(pageNumber) {
//     theMovieDb.people.getPopular({ page: pageNumber }, successCB, errorCB);
// }

// function successCB(data) {
//     console.log("successCB: ", JSON.parse(data));

//     let newArray = JSON.parse(data).results.filter(
//         (director) =>
//             director.known_for_department === "Directing" &&
//             director.profile_path !== null
//     );

//     if (newArray.length > 0) {
//         directorsArray.push(...newArray);
//     }

//     if (directorsArray.length < 12) {
//         pageNumber++;
//         callPersonPopularAPI(pageNumber);
//     } else {
//         // Calling the function to add directors to the page
//         addDirectorsToPage(directorsArray);
//         console.log(JSON.stringify(directorsArray));
//     }
// }

// function errorCB(error) {
//     console.log("errorCB: ", error);
// }

// callPersonPopularAPI(pageNumber);

let directors = [
    {
        adult: false,
        gender: 2,
        id: 1032,
        known_for_department: "Directing",
        name: "Martin Scorsese",
        original_name: "Martin Scorsese",
        popularity: 56.98,
        profile_path: "/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 240,
        known_for_department: "Directing",
        name: "Stanley Kubrick",
        original_name: "Stanley Kubrick",
        popularity: 24.839,
        profile_path: "/yFT0VyIelI9aegZrsAwOG5iVP4v.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 488,
        known_for_department: "Directing",
        name: "Steven Spielberg",
        original_name: "Steven Spielberg",
        popularity: 52.003,
        profile_path: "/tZxcg19YQ3e8fJ0pOs7hjlnmmr6.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 525,
        known_for_department: "Directing",
        name: "Christopher Nolan",
        original_name: "Christopher Nolan",
        popularity: 20.664,
        profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 7467,
        known_for_department: "Directing",
        name: "David Fincher",
        original_name: "David Fincher",
        popularity: 22.053,
        profile_path: "/yV36WTsLBAGyYVUQshNdI8hyk9l.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 138,
        known_for_department: "Directing",
        name: "Quentin Tarantino",
        original_name: "Quentin Tarantino",
        popularity: 72.121,
        profile_path: "/1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 7623,
        known_for_department: "Directing",
        name: "Sam Raimi",
        original_name: "Sam Raimi",
        popularity: 19.909,
        profile_path: "/8gssvwiPrFRuFRlr5ruKx68k1Jl.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 956,
        known_for_department: "Directing",
        name: "Guy Ritchie",
        original_name: "Guy Ritchie",
        popularity: 20.664,
        profile_path: "/9pLUnjMgIEWXi0mlHYzie9cKUTD.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 5281,
        known_for_department: "Directing",
        name: "Spike Lee",
        original_name: "Spike Lee",
        popularity: 16.282,
        profile_path: "/2KOHXgk2uoRXl6u7V9xpAIo3uay.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 18865,
        known_for_department: "Directing",
        name: "Louis Leterrier",
        original_name: "Louis Leterrier",
        popularity: 15.228,
        profile_path: "/bpqqRRyCLeoAup2OAv1Dtm5C8Tn.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 578,
        known_for_department: "Directing",
        name: "Ridley Scott",
        original_name: "Ridley Scott",
        popularity: 36.798,
        profile_path: "/zABJmN9opmqD4orWl3KSdCaSo7Q.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 5602,
        known_for_department: "Directing",
        name: "David Lynch",
        original_name: "David Lynch",
        popularity: 26.605,
        profile_path: "/b6TnSpuqeOlbq7aHH9G4inmQ1v9.jpg",
    },
];

// Array to store selected directors
let selectedDirectors = [];

// Function to add directors to the page
function addDirectorsToPage(directors) {
    const allDirectors = document.querySelector(".all-directors-services");

    directors.forEach((director) => {
        // Creating the container element
        const container = document.createElement("div");
        container.classList.add("directors-service-container");

        // Creating the director's image
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original${director.profile_path}`;
        img.alt = director.name;
        img.width = 50;
        img.height = 50;

        const wrapperNameAndCheckbox = document.createElement("div");
        wrapperNameAndCheckbox.classList.add("directors-service-field");

        // Creating the director's text field
        const text = document.createElement("p");
        text.classList.add("body-text");
        text.textContent = director.name;

        // Creating the checkbox div
        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");

        wrapperNameAndCheckbox.appendChild(text);
        wrapperNameAndCheckbox.appendChild(checkbox);

        // Adding elements to the container
        container.appendChild(img);
        container.appendChild(wrapperNameAndCheckbox);

        // Adding the container to the wrapper
        allDirectors.appendChild(container);

        // Adding click event to the checkbox
        checkbox.addEventListener("click", function () {
            // Toggle director selection
            toggleDirectorSelection(director);
            // Update selected directors count
            updateSelectedCount();
            // Toggle "checked" class to change checkbox appearance
            checkbox.classList.toggle("checked");
        });
    });
}

// Function to add or remove selected directors
function toggleDirectorSelection(director) {
    const index = selectedDirectors.findIndex((d) => d.id === director.id);
    if (index === -1) {
        let directorReduced = {
            id: director.id,
            name: director.name,
            photo: director.profile_path,
        };
        // If director is not selected, add to the list
        selectedDirectors.push(directorReduced);
    } else {
        // If director is selected, remove from the list
        selectedDirectors.splice(index, 1);
    }
}

// Function to update the selected directors count
function updateSelectedCount() {
    const selectedCountElement = document.querySelector(".directors-title h6");
    selectedCountElement.textContent = `${selectedDirectors.length} Selected`;
}

// Calling the function to add directors to the page
addDirectorsToPage(directors);

// Selecting the "Next" button
const btnNext = document.querySelectorAll(".btn-next");

// Adding an event listener to the "Next" button
btnNext.forEach((button) => {
    button.addEventListener("click", async function () {
        await saveDirectors(selectedDirectors);

        // Going to the next page
        goToNextPage();
    });
});

// Selecting the "Skip" button
const btnSkip = document.querySelectorAll(".btn-skip");

// Adding an event listener to the "Skip" button
btnSkip.forEach((button) => {
    button.addEventListener("click", function () {
        goToNextPage();
    });
});

async function saveDirectors(selected) {
    let user = JSON.parse(localStorage.getItem("user")) || {};

    user.interests.directors = selected;
    localStorage.setItem("user", JSON.stringify(user));

    let location = `users`;
    await saveInfoDb(location, user.id, {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_photo: user.profile_photo,
        streamingServices: user.streamingServices,
        interests: {
            genres: user.interests.genres,
            actors: user.interests.actors,
            directors: selected
        }
    });
}

function goToNextPage() {
    window.location.replace("home.html");
}
