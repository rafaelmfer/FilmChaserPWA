import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";

const video = document.getElementById("video");
const btn_save = document.getElementById("btn-save");
const btn_cancel = document.querySelector("#btn-cancel");
const off_screen = document.querySelector(".off-screen");
const box_chose_photo = document.querySelector(".box-chose-photo");

const user = await checkSession();
let documentId = user.uid;

// Elements for taking the snapshot
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.scale(0.415, 0.415);

//load image into canvas
document
    .getElementById("btn-take-photo")
    .addEventListener("click", async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                video.srcObject = stream;
                // video.play();  // or autplay
                console.log("media stream started");
            } catch (error) {
                console.log("failed to get media stream", error);
            }
        } else {
            console.log("media devices not available in this browser");
        }

        dismissDialog();

        showButtonGroupCamera();
    });

// Trigger photo take
document.getElementById("btn-snap").addEventListener("click", async () => {
    context.drawImage(video, 0, 0);

    console.log(canvas.toDataURL());

    //stop the camera
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());

    showButtonGroupSave();
});

document.getElementById("btn-my-file").addEventListener("change", (e) => {
    // obtain the file
    const file = e.target.files[0];
    // create object file reader
    const reader = new FileReader();

    reader.onload = async function (event) {
        let image = new Image();
        image.src = event.target.result;

        image.onload = function () {
            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);
        };
    };

    reader.readAsDataURL(file);
});

document.getElementById("btn-upload").addEventListener("click", () => {
    off_screen.classList.add("active");
    box_chose_photo.classList.add("active");
});

document.getElementById("btn-skip").addEventListener("click", () => {
    goToStreamingServices();
});

btn_save.addEventListener("click", async () => {
    await updateInfoDb(`users/${documentId}`, {
        profile_photo: canvas.toDataURL(),
    });

    goToStreamingServices();
});

document
    .getElementById("btn-cancel-snap")
    .addEventListener("click", async () => {
        //stop the camera
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());

        showButtonNormal();
    });

document.getElementById("btn-cancel-save").addEventListener("click", () => {
    showButtonNormal();
});

btn_cancel.addEventListener("click", () => {
    dismissDialog();
});

function goToStreamingServices() {
    window.location.replace("streaming-services.html");
}

function dismissDialog() {
    off_screen.classList.remove("active");
    box_chose_photo.classList.remove("active");
}

function showButtonNormal() {
    document.querySelector(".buttons-group-camera").classList.remove("visible");
    document.querySelector(".buttons-group-save").classList.remove("visible");

    document.querySelector(".buttons-group-normal").classList.add("visible");
}

function showButtonGroupSave() {
    document.querySelector(".buttons-group-normal").classList.remove("visible");
    document.querySelector(".buttons-group-camera").classList.remove("visible");

    document.querySelector(".buttons-group-save").classList.add("visible");
}

function showButtonGroupCamera() {
    document.querySelector(".buttons-group-normal").classList.remove("visible");
    document.querySelector(".buttons-group-save").classList.remove("visible");

    document.querySelector(".buttons-group-camera").classList.add("visible");
}
