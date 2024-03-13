import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";

const pic_Upload = document.querySelector('input[type="file"]');
let user_upload_pic = document.getElementById("myfile");
const showPicture = document.querySelector(".show-Picture");
const showLogo = document.querySelector(".show-Logo");
const user_photo = document.querySelector("#user-photo");
const btn_save_profile = document.querySelector("#btn-save-profile");
const btn_skip = document.getElementById("user-pic-upload");

const reader = new FileReader();
let imgResult = "";
user_upload_pic.addEventListener("change", (event) => {
    console.log(event);
    console.log(pic_Upload.files[0]);

    let mypic = pic_Upload.files[0];

    reader.readAsDataURL(mypic);

    console.log(reader);

    addListeners(reader);
});

function addListeners(reader) {
    reader.addEventListener("load", handleEvent);
}

async function handleEvent(event) {
    console.log(reader);
    console.log(reader.result);

    imgResult = reader.result;

    user_photo.src = imgResult;

    showLogo.style.display = "none";
    showPicture.style.display = "flex";
}

btn_save_profile.addEventListener("click", async () => {
    const user = await checkSession();
    let documentId = user.uid;

    await updateInfoDb(`users/${documentId}`, { profile_photo: imgResult });

    window.location.replace("streamingServices.html");
});

btn_skip.addEventListener("click", () => {
    window.location.replace("streamingServices.html");
});
