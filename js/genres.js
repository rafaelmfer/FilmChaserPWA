"use strict";

import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";

networkInfo();

// Selecting all checkboxes
const checkboxes = document.querySelectorAll(".checkbox");

// Selecting the element to display the selected count
const selectedCountElement = document.querySelector(".genres-title h6");

// Function to update the selected count
function updateSelectedCount() {
    const selectedCount = document.querySelectorAll(".checkbox.checked").length;
    selectedCountElement.textContent = `${selectedCount} Selected`;
}

// Adding an event listener to each checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
        // Toggling the 'checked' class to change the checkbox image
        this.classList.toggle("checked");
        // Update the selected count
        updateSelectedCount();
    });
});

// Selecting the "Next" button
const btnNext = document.querySelectorAll(".btn-next");

// Adding an event listener to the "Next" button
btnNext.forEach((button) => {
    button.addEventListener("click", async function () {
        // Array to store selected services
        const selected = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.classList.contains("checked")) {
                // Getting the service name associated with the checkbox
                const serviceName = checkbox
                    .closest(".genres-service-container")
                    .querySelector(".body-text").textContent;
                selected.push(serviceName);
            }
        });

        await saveGenres(selected);

        // Logging selected services to console
        console.log(selected);

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

async function saveGenres(selectedGenres) {
    let user = JSON.parse(localStorage.getItem("user")) || {};
    let interests = {
        genres: selectedGenres
    };

    user.interests = interests;
    localStorage.setItem("user", JSON.stringify(user));
}

function goToNextPage() {
    window.location.replace("actors.html");
}
