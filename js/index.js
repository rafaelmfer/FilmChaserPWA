import { loginWithGoogle, loginWithEmailAndPassword, loginWithFacebook } from "./auth.js";
import { saveInfoDb } from "./firestore.js";

async function test() {
    try {
        let result = await loginWithGoogle();

        let array = ["users", result.user.uid];
        saveInfoDb(array, result.user);
    } catch (error) {
        console.log(error);
    }
}

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", test);
