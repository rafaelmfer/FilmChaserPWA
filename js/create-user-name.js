"use strict";

import { checkSession } from "./auth.js";
import { updateInfoDb } from "./firestore.js";

const usernameInput = document.getElementById("username");

async function saveUsernameAndGoToNextPage() {
    await saveUserName(usernameInput.value);

    window.location.replace("set-profile-pic.html");
}

async function saveUserName(username) {
    let user = JSON.parse(localStorage.getItem("user")) || {};

    user.name = username;
    localStorage.setItem("user", JSON.stringify(user));
}

const nextBtn = document.querySelector("#btn-next");
nextBtn.addEventListener("click", saveUsernameAndGoToNextPage);

const nextDesktopBtn = document.querySelector("#btn-next-desktop");
nextDesktopBtn.addEventListener("click", saveUsernameAndGoToNextPage);
