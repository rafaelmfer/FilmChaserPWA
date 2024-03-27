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
        docExists(location, success, errorSocial);
    } catch (error) {
        console.log(error);
    }
}

async function emailAndPasswordLogIn() {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("psswd").value;

        let result = await loginWithEmailAndPassword(email, password);

        let location = `users/${result.user.uid}`;
        docExists(location, success, error);
    } catch (error) {
        console.log(error);
    }
}

function success() {
    console.log("User already exist on Database");
    window.location.replace("home.html");
}

async function error() {
    console.log("Create User");
    document.getElementById("Message").style.color = "Red";
    document.getElementById("Message").innerHTML =
        "Account not found! Create an account";
}

async function errorSocial() {
    console.log("Create User");
    await saveInfoDb(location, result.user.uid, {
        email: result.user.email,
    });
    window.location.replace("create-user-name.html");
}

const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);

const loginBtn = document.querySelector("#btn-login");
loginBtn.addEventListener("click", emailAndPasswordLogIn);
