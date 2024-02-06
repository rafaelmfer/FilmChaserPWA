import { firebase } from "./firebase-config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    OAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Authentication reference
const auth = getAuth(firebase);

async function createAccountEmailAndPassword(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // UserCredential - https://firebase.google.com/docs/reference/js/v8/firebase.auth#usercredential;
            return userCredential;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function loginWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // UserCredential - https://firebase.google.com/docs/reference/js/v8/firebase.auth#usercredential;
            return userCredential;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
        .then((userCredential) => {
            // UserCredential - https://firebase.google.com/docs/reference/js/v8/firebase.auth#usercredential;
            return userCredential;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function loginWithFacebook() {
    const provider = new FacebookAuthProvider();

    return signInWithPopup(auth, provider)
        .then((userCredential) => {
            // UserCredential - https://firebase.google.com/docs/reference/js/v8/firebase.auth#usercredential;
            return userCredential;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function loginWithApple() {
    const provider = new OAuthProvider("apple.com");

    return signInWithPopup(auth, provider)
        .then((userCredential) => {
            // UserCredential - https://firebase.google.com/docs/reference/js/v8/firebase.auth#usercredential;
            return userCredential;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function logout() {
    return signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            console.error(error);
        });
}

export {
    createAccountEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithFacebook,
    loginWithApple,
    logout,
};