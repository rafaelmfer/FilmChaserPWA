import { updateInfoDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";
import { networkInfo } from "./common.js";


const video = document.getElementById('video');

// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);


//load image into canvas




document.getElementById("start").addEventListener("click", async () => {
    console.log("working")
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            // video.play();  // or autplay
            console.log("media stream started");
        } catch (error) {
            console.log("failed to get media stream", error);
        }

    } else {
        console.log("media devices not available in this browser");
    }
});


// Trigger photo take
document.getElementById("snap").addEventListener("click", async () => {
    context.drawImage(video, 0, 0,);

    console.log(canvas.toDataURL());
    const user = await checkSession();
    let documentId = user.uid;

    //stop the camera
    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());

    await updateInfoDb(`users/${documentId}`, { profile_photo: canvas.toDataURL() });

    window.location.replace("streamingServices.html");

    //alternatively
    //const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
});




document.getElementById("myFile").addEventListener("change", (e) => {

    const file = e.target.files[0]; // Obter o arquivo selecionado
    const reader = new FileReader(); // Criar um objeto FileReader

    // Evento que é acionado quando a leitura do arquivo é concluída
    reader.onload = async function (event) {
        console.log(event.target.result); // Mostrar o conteúdo do arquivo no console.log
        let image = new Image();
        image.src = event.target.result;
        
        image.onload = function() {
            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);
        };


        const user = await checkSession();
        let documentId = user.uid;
        
        await updateInfoDb(`users/${documentId}`, { profile_photo: canvas.toDataURL() });

        window.location.replace("streamingServices.html");
    };

    // Ler o conteúdo do arquivo como uma URL de dados
    reader.readAsDataURL(file);
});


document.getElementById("btn-upload-pic").addEventListener("click",()=>{
    console.log("clicado")
    document.querySelector(".camera-buttons").classList.add("active");
})

document.querySelector(".btn_skip").addEventListener("click",()=>{
    window.location.replace("streamingServices.html");
})