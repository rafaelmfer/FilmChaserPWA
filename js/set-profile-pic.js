import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";

const video = document.getElementById("video");

// Canvas - Elements for taking the snapshot
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.scale(0.415, 0.415);

const off_screen = document.querySelector(".off-screen");
const box_chose_photo = document.querySelector(".box-chose-photo");

const btn_take_photo = document.getElementById("btn-take-photo");
const btn_choose_photo = document.getElementById("btn-my-file");
const btn_cancel = document.querySelector("#btn-cancel");

const btn_snap = document.getElementById("btn-snap");
const btn_cancel_snap = document.getElementById("btn-cancel-snap");

const btn_save = document.getElementById("btn-save");
const btn_cancel_save = document.getElementById("btn-cancel-save");

const myFileResult = document.querySelector(".my-file-result");

const user = await checkSession();
let documentId = user.uid;

document.getElementById("btn-upload").addEventListener("click", () => {
    off_screen.classList.add("active");
    box_chose_photo.classList.add("active");
});

document.getElementById("btn-skip").addEventListener("click", () => {
    goToStreamingServices();
});

//load image into canvas
btn_take_photo.addEventListener("click", async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            video.srcObject = stream;
            video.style.display = "block";
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

btn_choose_photo.addEventListener("click", () => {
    document.getElementById("my-file").click();
});

document.getElementById("my-file").addEventListener("change", (e) => {
    // Get the selected file
    const file = e.target.files[0];
    // Create a FileReader object
    const reader = new FileReader();

    reader.onload = async function (event) {
        let image = new Image();
        image.src = event.target.result;

        image.onload = function () {
            let maxWidth = 180;
            let maxHeight = 180;
            let width = image.width;
            let height = image.height;
            let aspectRatio = width / height;

            // Redimensionar proporcionalmente a imagem
            if (width > height) {
                // Largura maior que altura
                height = maxHeight;
                width = maxHeight * aspectRatio;
            } else if (height > width) {
                // Altura maior que largura
                width = maxWidth;
                height = maxWidth / aspectRatio;
            } else {
                // Ambas as dimensões são iguais
                width = maxWidth;
                height = maxHeight;
            }

            myFileResult.src = event.target.result;

            // reset margins
            myFileResult.style.marginLeft = `0px`;
            myFileResult.style.marginTop = `0px`;

            myFileResult.style.maxWidth = `${width}px`;
            myFileResult.style.maxHeight = `${height}px`;

            myFileResult.style.display = "block";
            myFileResult.style.marginTop = "-255px";

            let diff;
            if (width > 180) {
                diff = (width - 180) / 2;
                myFileResult.style.marginLeft = `-${diff}px`;
            }
            if (height > 180) {
                diff = (height - 180) / 2 + 255;
                myFileResult.style.marginTop = `-${diff}px`;
            }
        };
    };

    reader.readAsDataURL(file);

    dismissDialog();
    showButtonGroupSave();
});

btn_cancel.addEventListener("click", () => {
    dismissDialog();
});

// Trigger photo take
btn_snap.addEventListener("click", async () => {
    canvas.style.display = "block";
    context.drawImage(video, 0, 0);

    // console.log(canvas.toDataURL());

    stopCamera();

    showButtonGroupSave();
});

btn_cancel_snap.addEventListener("click", async () => {
    stopCamera();

    showButtonNormal();
});

btn_save.addEventListener("click", async () => {
    await updateInfoDb(`users/${documentId}`, {
        profile_photo: canvas.toDataURL(),
    });

    goToStreamingServices();
});

btn_cancel_save.addEventListener("click", () => {
    showButtonNormal();

    myFileResult.src = "";
    myFileResult.style.display = "none";

    canvas.style.display = "none";
    stopCamera();
});

function goToStreamingServices() {
    window.location.replace("streaming-services.html");
}

function dismissDialog() {
    off_screen.classList.remove("active");
    box_chose_photo.classList.remove("active");
}

function stopCamera() {
    //stop the camera
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    video.style.display = "none";
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
