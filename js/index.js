import { loginWithGoogle, loginWithEmailAndPassword, loginWithFacebook } from "./auth.js";
import { saveInfoDb } from "./firestore.js";

async function test() {
    try {
        let result = await loginWithGoogle();

        let location = `users`;
        saveInfoDb(location, result.user.uid, result.user);
    } catch (error) {
        console.log(error);
    }
}

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", test);
