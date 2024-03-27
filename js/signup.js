import { loginWithGoogle, loginWithEmailAndPassword, loginWithFacebook, createAccountEmailAndPassword } from "./auth.js";
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


async function signUp() {
    try {
        const email = document.getElementById("email").value

        const password = document.getElementById("psswd").value

        const password2 = document.getElementById("psswd2").value

        if(password === password2){
            let result = await createAccountEmailAndPassword(email, password);
            console.log(result);

            let location = `users`;
            
            saveInfoDb(location, result.user.uid, { 
                // name: result.user.displayName,
                email: result.user.email
            });
        
        }else{
            document.getElementById("Message").style.color = "Red";
            document.getElementById("Message").innerHTML = "Passwords do NOT match!";
        }
        
        
        
    } catch (error) {
        console.log(error);
    }
}


const googleBtn = document.querySelector("#btn-google");
googleBtn.addEventListener("click", googleLogIn);

const signupBtn = document.querySelector("#btn-create");
signupBtn.addEventListener("click", signUp);