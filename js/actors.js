"use strict";

import { updateMapInDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";
import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

networkInfo();

// FUNCTIONS TO FETCH actors FROM THE API TO INITIALIZE THE SCREEN
// IT IS NOT EFFECTIVE BECAUSE IT TAKES TOO LONG TO LOAD THE PAGE
// THAT'S WHY WE USED THE DATA ALREADY STORED ON THE ARRAY actors BELOW
// let actorsArray = [];
// let pageNumber = 1;

// function callPersonPopularAPI(pageNumber) {
//     theMovieDb.people.getPopular({ page: pageNumber }, successCB, errorCB);
// }

// function successCB(data) {
//     console.log("successCB: ", JSON.parse(data));

//     let newArray = JSON.parse(data).results.filter(
//         (actor) =>
//             actor.known_for_department === "Acting" &&
//             actor.profile_path !== null
//     );

//     if (newArray.length > 0) {
//         actorsArray.push(...newArray);
//     }

//     if (actorsArray.length < 12) {
//         pageNumber++;
//         callPersonPopularAPI(pageNumber);
//     } else {
//         // Calling the function to add actors to the page
//         addactorsToPage(actorsArray);
//         console.log(JSON.stringify(actorsArray));
//     }
// }

// function errorCB(error) {
//     console.log("errorCB: ", error);
// }

// callPersonPopularAPI(pageNumber);

let actors = [
    {
        adult: false,
        gender: 2,
        id: 6193,
        known_for_department: "Acting",
        name: "Leonardo DiCaprio",
        original_name: "Leonardo DiCaprio",
        popularity: 44.4,
        profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 6384,
        known_for_department: "Acting",
        name: "Keanu Reeves",
        original_name: "Keanu Reeves",
        popularity: 87.286,
        profile_path: "/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 287,
        known_for_department: "Acting",
        name: "Brad Pitt",
        original_name: "Brad Pitt",
        popularity: 67.536,
        profile_path: "/eAOtKAc4p2C3DV8TGJQJzw8DeRv.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 31,
        known_for_department: "Acting",
        name: "Tom Hanks",
        original_name: "Tom Hanks",
        popularity: 83.745,
        profile_path: "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 2888,
        known_for_department: "Acting",
        name: "Will Smith",
        original_name: "Will Smith",
        popularity: 58.894,
        profile_path: "/1QqaRZ8neYlqLx7ODZC4as47wUV.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 1158,
        known_for_department: "Acting",
        name: "Al Pacino",
        original_name: "Al Pacino",
        popularity: 53.963,
        profile_path: "/2dGBb1fOcNdZjtQToVPFxXjm4ke.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 4491,
        known_for_department: "Acting",
        name: "Jennifer Aniston",
        original_name: "Jennifer Aniston",
        popularity: 59.717,
        profile_path: "/shIlZZpOu2L4sT2ohKlBMp9MUWG.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 1813,
        known_for_department: "Acting",
        name: "Anne Hathaway",
        original_name: "Anne Hathaway",
        popularity: 115.444,
        profile_path: "/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 18277,
        known_for_department: "Acting",
        name: "Sandra Bullock",
        original_name: "Sandra Bullock",
        popularity: 73.094,
        profile_path: "/5pyso6iXs4nGz55tCOU6AfmPspZ.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 11701,
        known_for_department: "Acting",
        name: "Angelina Jolie",
        original_name: "Angelina Jolie",
        popularity: 50.697,
        profile_path: "/nXA9vMvskmIDB5NqHCkTQPmemep.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 3149,
        known_for_department: "Acting",
        name: "Marilyn Monroe",
        original_name: "Marilyn Monroe",
        popularity: 25.078,
        profile_path: "/6UmSYSgAVpL2Q4ya2rHXpglxZbw.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 1204,
        known_for_department: "Acting",
        name: "Julia Roberts",
        original_name: "Julia Roberts",
        popularity: 40.089,
        profile_path: "/AhQMyQ10kz5g8Y3Fp54GPhgDxQS.jpg",
    },
];

// Array to store selected actors
let selectedActors = [];

// Function to add actors to the page
function addactorsToPage(actors) {
    const allactors = document.querySelector(".all-actors-services");

    actors.forEach((actor) => {
        // Creating the container element
        const container = document.createElement("div");
        container.classList.add("actors-service-container");

        // Creating the actor's image
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
        img.alt = actor.name;
        img.width = 50;
        img.height = 50;

        const wrapperNameAndCheckbox = document.createElement("div");
        wrapperNameAndCheckbox.classList.add("actors-service-field");

        // Creating the actor's text field
        const text = document.createElement("p");
        text.classList.add("body-text");
        text.textContent = actor.name;

        // Creating the checkbox div
        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");

        wrapperNameAndCheckbox.appendChild(text);
        wrapperNameAndCheckbox.appendChild(checkbox);

        // Adding elements to the container
        container.appendChild(img);
        container.appendChild(wrapperNameAndCheckbox);

        // Adding the container to the wrapper
        allactors.appendChild(container);

        // Adding click event to the checkbox
        checkbox.addEventListener("click", function () {
            // Toggle actor selection
            toggleactorselection(actor);
            // Update selected actors count
            updateSelectedCount();
            // Toggle "checked" class to change checkbox appearance
            checkbox.classList.toggle("checked");
        });
    });
}

// Function to add or remove selected actors
function toggleactorselection(actor) {
    const index = selectedActors.findIndex((d) => d.id === actor.id);
    if (index === -1) {
        let actorReduced = {
            id: actor.id,
            name: actor.name,
            photo: actor.profile_path,
        };
        // If actor is not selected, add to the list
        selectedActors.push(actorReduced);
    } else {
        // If actor is selected, remove from the list
        selectedActors.splice(index, 1);
    }
}

// Function to update the selected actors count
function updateSelectedCount() {
    const selectedCountElement = document.querySelector(".actors-title h6");
    selectedCountElement.textContent = `${selectedActors.length} Selected`;
}

// Calling the function to add actors to the page
addactorsToPage(actors);

// Selecting the "Next" button
const btnNext = document.querySelectorAll(".btn-next");

// Adding an event listener to the "Next" button
btnNext.forEach((button) => {
    button.addEventListener("click", async function () {
        await saveActors(selectedActors);

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

async function saveActors(selected) {
    let user = JSON.parse(localStorage.getItem("user")) || {};

    user.interests.actors = selected;
    localStorage.setItem("user", JSON.stringify(user));
}

function goToNextPage() {
    window.location.replace("director.html");
}
