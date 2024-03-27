"use strict";

import {
    loginWithGoogle,
    loginWithEmailAndPassword,
    loginWithFacebook,
} from "./auth.js";
import { docExists, saveInfoDb, updateInfoDb } from "./firestore.js";

async function googleLogIn() {
    try {
        let result = await loginWithGoogle();

        let location = `users/${result.user.uid}`;
        if (docExists(location)) {
            window.location.replace("home.html");
        } else {
            // await saveInfoDb(location, result.user.uid, {
            //     email: result.user.email,
            // });
            window.location.replace("create-user-name.html");
        }
    } catch (error) {
        console.log(error);
    }
}

const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);
