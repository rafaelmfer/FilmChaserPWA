"use strict";

import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";

networkInfo();

// Selecting all checkboxes
const checkboxes = document.querySelectorAll(".checkbox");

// Selecting the element to display the selected count
const selectedCountElement = document.querySelector(".streaming-title h6");

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
        const selectedServices = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.classList.contains("checked")) {
                // Getting the service name associated with the checkbox
                const serviceName = checkbox
                    .closest(".streaming-service-container")
                    .querySelector(".body-text").textContent;
                selectedServices.push(serviceName);
            }
        });

        await saveStreamingServices(selectedServices);

        goToNextPage();
    });
});

async function saveStreamingServices(selectedStreamingServices) {
    let user = JSON.parse(localStorage.getItem("user")) || {};

    user.streamingServices = selectedStreamingServices;
    localStorage.setItem("user", JSON.stringify(user));
}

// Selecting the "Skip" button
const btnSkip = document.querySelectorAll(".btn-skip");

// Adding an event listener to the "Skip" button
btnSkip.forEach((button) => {
    button.addEventListener("click", function () {
        goToNextPage();
    });
});

function goToNextPage() {
    window.location.replace("genres.html");
}
