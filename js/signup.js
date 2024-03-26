import { loginWithGoogle, loginWithEmailAndPassword, loginWithFacebook } from "./auth.js";
import { saveInfoDb } from "./firestore.js";

async function googleLogIn() {
    try {
        let result = await loginWithGoogle();

        let location = `users`;
        saveInfoDb(location, result.user.uid, { 
            // name: result.user.displayName,
            email: result.user.email
        });
    } catch (error) {
        console.log(error);
    }
}


const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);