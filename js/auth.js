import { firebase } from "./firebase-config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    OAuthProvider,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Authentication reference
const auth = getAuth(firebase);
let userId;

async function createAccountEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // UserCredential - https://firebase.google.com/docs/reference/js/v8/firebase.auth#usercredential;
            userId = userCredential.user.uid;
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
            userId = userCredential.user.uid;
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
            userId = userCredential.user.uid;
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
            userId = userCredential.user.uid;
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
            userId = userCredential.user.uid;
            return userCredential;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function logout(callbackSuccess) {
    return signOut(auth)
        .then(() => {
            callbackSuccess();
        })
        .catch((error) => {
            console.error(error);
        });
}

async function checkSession() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Logged
                userId = user.uid;
                resolve(user);
            } else {
                // Not logged
                reject((window.location.href = "signin.html"));
            }
        });
    });
}

export {
    createAccountEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithFacebook,
    loginWithApple,
    logout,
    checkSession,
    userId,
};
