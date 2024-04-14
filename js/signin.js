"use strict";

import {
    loginWithGoogle,
    loginWithEmailAndPassword,
    loginWithFacebook,
} from "./auth.js";
import { docExists, saveInfoDb, updateInfoDb, getInfoDb } from "./firestore.js";

let result;

async function googleLogIn() {
    try {
        result = await loginWithGoogle();

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

        result = await loginWithEmailAndPassword(email, password);

        let location = `users/${result.user.uid}`;
        docExists(location, success, error);
    } catch (error) {
        console.log(error);
    }
}

async function success() {
    console.log("User already exist on Database");

    const userDoc = await getInfoDb(`users/${result.user.uid}`);
    localStorage.setItem("user", JSON.stringify(userDoc));

    setTimeout(() => {
        window.location.replace("home.html");
    }, 1000);
}

async function error() {
    console.log("Create User");
    document.getElementById("Message").style.color = "Red";
    document.getElementById("Message").innerHTML =
        "Account not found! Create an account";
}

async function errorSocial() {
    console.log("Create User");

    await saveUserEmail(result.user.email);

    window.location.replace("create-user-name.html");
}

async function saveUserEmail(userEmail) {
    user = {
        email: userEmail,
    };
    localStorage.setItem("user", JSON.stringify(user));
}

const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);

const loginBtn = document.querySelector("#btn-login");
loginBtn.addEventListener("click", emailAndPasswordLogIn);
