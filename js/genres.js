import { updateInfoDb } from '../js/firestore.js';

const streamingServices = [...document.getElementsByClassName("streamingCheckboxes")]
const btn_next = document.querySelector("#streaming_services");


let streamingsArray = [];


btn_next.addEventListener("click", async () => {
    const streamings = document.querySelectorAll(".streamingCheckboxes");

    localStorage.clear();

    console.log(streamings);

    streamings.forEach((x, i) => {
        // console.log(streamings[i].checked)
        if (streamings[i].checked) {
            streamingsArray.push(streamings[i].id);
            console.log(streamings[i].id)
        }

    })

    let id = "j7hBgo46ATgnYVdRRGTAA9hyBmB2";


    await updateInfoDb(`users/${id}`,
        {
            interests: {
                genres: streamingsArray,
            }
        }
    );


    console.log(streamingsArray)

    window.location.replace("actors.html");
})
