"use strict";

import { checkSession } from "./auth.js";
import { updateInfoDb } from "./firestore.js";

async function saveUsername() {
    const user = await checkSession();
    let userId = user.uid;

    let location = `users/${userId}`;
    await updateInfoDb(location, {
        name: username,
    });
    window.location.replace("set-profile-pic.html");
}

const nextBtn = document.querySelector("#btn-next");
nextBtn.addEventListener("click", saveUsername);
