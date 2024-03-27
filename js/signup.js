import {
    loginWithGoogle,
    loginWithFacebook,
    createAccountEmailAndPassword,
} from "./auth.js";
import { docExists, saveInfoDb } from "./firestore.js";

let result;
async function googleLogIn() {
    try {
        result = await loginWithGoogle();

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
    console.log(result);
    await saveInfoDb(location, result.user.uid, {
        email: result.user.email,
    });
    window.location.replace("create-user-name.html");
}

async function facebookLogIn() {
    try {
        result = await loginWithFacebook();

        let location = `users/${result.user.uid}`;
        docExists(location, success, error);
    } catch (error) {
        console.log(error);
    }
}

async function signUp() {
    try {
        const email = document.getElementById("email").value;

        const password = document.getElementById("psswd").value;
        const password2 = document.getElementById("psswd2").value;

        if (password === password2) {
            let result = await createAccountEmailAndPassword(email, password);
            
            let location = `users`;

            saveInfoDb(location, result.user.uid, {
                email: result.user.email,
            });
        } else {
            document.getElementById("Message").style.color = "Red";
            document.getElementById("Message").innerHTML =
                "Passwords do NOT match!";
        }
    } catch (error) {
        console.log(error);
    }
}

const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);

const signupBtn = document.querySelector("#btn-create");
signupBtn.addEventListener("click", signUp);
