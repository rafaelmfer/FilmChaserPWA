import {
    loginWithGoogle,
    loginWithFacebook,
    createAccountEmailAndPassword,
} from "./auth.js";
import { docExists, saveInfoDb, getInfoDb } from "./firestore.js";

let result;

async function googleLogIn() {
    try {
        result = await loginWithGoogle();

        if (result.user.uid === "CAzA3gdJrwddCWoLoyQSW3gnaRt1") {
            console.log(
                "You are logged in as the test user. Demo mode is enabled."
            );
            goToCreateUsername();
        } else {
            let location = `users/${result.user.uid}`;
            docExists(location, success, error);
        }
    } catch (error) {
        console.log(error);
    }
}

async function success() {
    console.log("User already exist on Database");
    const userDoc = await getInfoDb(`users/${result.user.uid}`);

    localStorage.setItem("user", JSON.stringify(userDoc));
    goToHome();
}

async function error() {
    console.log("Create User");
    console.log(result);

    await saveUserIdAndEmail(result.user.uid, result.user.email);
    goToCreateUsername();
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

            await saveUserIdAndEmail(result.user.uid, result.user.email);
            goToCreateUsername();
        } else {
            document.getElementById("Message").style.color = "Red";
            document.getElementById("Message").innerHTML =
                "Passwords do NOT match!";
        }
    } catch (error) {
        console.log(error);
    }
}

async function saveUserIdAndEmail(uid, userEmail) {
    let user = {
        id: uid,
        email: userEmail,
    };
    localStorage.setItem("user", JSON.stringify(user));
}

function goToHome() {
    window.location.replace("home.html");
}

function goToCreateUsername() {
    window.location.replace("create-user-name.html");
}

const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);

const signupBtn = document.querySelector("#btn-create");
signupBtn.addEventListener("click", signUp);
