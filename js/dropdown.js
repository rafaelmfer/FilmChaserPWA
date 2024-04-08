"use strict";

import { logout } from "./auth.js";

var btnProfile = document.getElementById("btn-profile");
var btnProfileMobile = document.querySelector(".user-profile");
let dropdown;
let timer;

function createDropdown() {
    dropdown = document.createElement("div");
    dropdown.id = "dropdown-content";
    dropdown.className = "body-text dropdown-content";
    dropdown.innerText = "Logout";

    document.body.appendChild(dropdown);
}

createDropdown();

dropdown.addEventListener("click", function (event) {
    logout(() => {
        window.location.href = "signin.html";
    });
});

document.body.onclick = function () {
    if (dropdown.classList.contains("active") && timer === undefined) {
        dropdown.classList.remove("active");
    }
};

function showDropdown(event) {
    event.preventDefault();

    dropdown.classList.add("active");
    startTimer();
}

function startTimer() {
    timer = setTimeout(function () {
        clearTimeout(timer);
        timer = undefined;
    }, 5000);
}

if (window.innerWidth > 450) {
    btnProfile.addEventListener("click", showDropdown);
} else {
    btnProfileMobile.addEventListener("click", showDropdown);
}