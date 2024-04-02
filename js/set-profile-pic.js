import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";

networkInfo();

const pic_Upload = document.querySelector('input[type="file"]');
let user_upload_pic = document.getElementById("myfile");
const showPicture = document.querySelector(".show-Picture");
const showLogo = document.querySelector(".show-Logo");
const user_photo = document.querySelector("#user-photo");
const btn_save_profile = document.querySelector("#btn-save-profile");
const btn_user_upload_pic = document.querySelector("#user-upload-pic")
const btn_cancel = document.querySelector("#btn-cancel")
const off_screen = document.querySelector(".off-screen");
let box_chose_photo = document.querySelector(".box-chose-photo")
const btn_take_photo = document.querySelector("#btn-take-photo")
const take_picture_box = document.querySelector(".take-picture-box")

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





btn_cancel.addEventListener("click",()=>{
    off_screen.classList.remove("active")
    take_picture_box.classList.remove("active");
    box_chose_photo.classList.remove("active")
})


btn_user_upload_pic.addEventListener("click",()=>{

    off_screen.classList.add("active")
    box_chose_photo.classList.add("active")
})

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

document.querySelector(".btn_skip").addEventListener("click",()=>{
    window.location.replace("streamingServices.html");
})

document.getElementById("btn_skip_photo").addEventListener("click",()=>{
    window.location.replace("streamingServices.html");
})











// TAKE PICTURE


    btn_take_photo.addEventListener("click",(e)=>{
        e.preventDefault();

        let snap = document.getElementById("snap");
        snap.classList.add("active");
        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true })
        .then( (stream) => {
            video.srcObject = stream;
            // video.play();  // or autplay
        }).catch( (error) => {
            console.log("failed to get media stream", error);
        });
    
        } else {
        console.log("media devices not available in this browser");
        }
    });



  // Elements for taking the snapshot
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.scale(0.4, 0.5, 25, 25);



  // Trigger photo take
document.getElementById("snap").addEventListener("click",  () => {
    context.drawImage(video, 0, 0);
  
    // document.getElementById("image").value = canvas.toDataURL();
    console.log("---FOTO---")
    console.log(canvas.toDataURL())

    user_photo.src = canvas.toDataURL();

    // TURN OFF CAMERA
    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());

    showLogo.style.display = "none";
    showPicture.style.display = "flex";
});


    document.getElementById("btn-cancel").addEventListener("click",  () => {
        let snap = document.getElementById("snap");
        snap.classList.remove("active");
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    });




// document.getElementById("btn-cancel").addEventListener("click",  () => {
//     const tracks = video.srcObject.getTracks();
//     tracks.forEach(track => track.stop());
//   });