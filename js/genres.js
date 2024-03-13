import { updateInfoDb } from '../js/firestore.js';
import { checkSession } from "./auth.js";

const streamingServices = [...document.getElementsByClassName("streamingCheckboxes")]
const btn_next = document.querySelector("#streaming_services");


let streamingsArray = [];


btn_next.addEventListener("click", async () => {
    const streamings = document.querySelectorAll(".streamingCheckboxes");

    localStorage.clear();

    console.log(streamings);

    streamings.forEach((x, i) => {
        if (streamings[i].checked) {
            streamingsArray.push(streamings[i].id);
            console.log(streamings[i].id)
        }

    })

    const user = await checkSession();
    let documentId = user.uid;

    await updateInfoDb(`users/${documentId}`,
        {
            interests: {
                genres: streamingsArray,
            }
        }
    );


    console.log(streamingsArray)

    window.location.replace("actors.html");
})
