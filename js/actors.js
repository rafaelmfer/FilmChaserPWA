let StreamingOptions = document.querySelector(".StreamingOptions");
let search = document.querySelector("#search");
let search_mobile = document.querySelector("#search_mobile");

const streamingsArray = [];

import { options } from "./common.js";
import { updateMapInDb } from "../js/firestore.js";
import { checkSession } from "./auth.js";

let actor = [
    {
        adult: false,
        gender: 2,
        id: 6193,
        known_for_department: "Acting",
        name: "Leonardo DiCaprio",
        original_name: "Leonardo DiCaprio",
        popularity: 44.4,
        profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 6384,
        known_for_department: "Acting",
        name: "Keanu Reeves",
        original_name: "Keanu Reeves",
        popularity: 87.286,
        profile_path: "/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 287,
        known_for_department: "Acting",
        name: "Brad Pitt",
        original_name: "Brad Pitt",
        popularity: 67.536,
        profile_path: "/eAOtKAc4p2C3DV8TGJQJzw8DeRv.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 31,
        known_for_department: "Acting",
        name: "Tom Hanks",
        original_name: "Tom Hanks",
        popularity: 83.745,
        profile_path: "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 2888,
        known_for_department: "Acting",
        name: "Will Smith",
        original_name: "Will Smith",
        popularity: 58.894,
        profile_path: "/1QqaRZ8neYlqLx7ODZC4as47wUV.jpg",
    },
    {
        adult: false,
        gender: 2,
        id: 1158,
        known_for_department: "Acting",
        name: "Al Pacino",
        original_name: "Al Pacino",
        popularity: 53.963,
        profile_path: "/2dGBb1fOcNdZjtQToVPFxXjm4ke.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 4491,
        known_for_department: "Acting",
        name: "Jennifer Aniston",
        original_name: "Jennifer Aniston",
        popularity: 59.717,
        profile_path: "/shIlZZpOu2L4sT2ohKlBMp9MUWG.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 1813,
        known_for_department: "Acting",
        name: "Anne Hathaway",
        original_name: "Anne Hathaway",
        popularity: 115.444,
        profile_path: "/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 18277,
        known_for_department: "Acting",
        name: "Sandra Bullock",
        original_name: "Sandra Bullock",
        popularity: 73.094,
        profile_path: "/5pyso6iXs4nGz55tCOU6AfmPspZ.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 11701,
        known_for_department: "Acting",
        name: "Angelina Jolie",
        original_name: "Angelina Jolie",
        popularity: 50.697,
        profile_path: "/nXA9vMvskmIDB5NqHCkTQPmemep.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 3149,
        known_for_department: "Acting",
        name: "Marilyn Monroe",
        original_name: "Marilyn Monroe",
        popularity: 25.078,
        profile_path: "/6UmSYSgAVpL2Q4ya2rHXpglxZbw.jpg",
    },
    {
        adult: false,
        gender: 1,
        id: 1204,
        known_for_department: "Acting",
        name: "Julia Roberts",
        original_name: "Julia Roberts",
        popularity: 40.089,
        profile_path: "/AhQMyQ10kz5g8Y3Fp54GPhgDxQS.jpg",
    },
];

function load_all_actors() {
    insert_actors(actor);
}

search_mobile.addEventListener("keyup", async () => {
    console.log(search_mobile.value);
    let value = search_mobile.value;
    filter_movie(value);
});

search.addEventListener("keyup", async () => {
    let value = search.value;

    if (value == "") {
        load_all_actors();
    } else {
        filter_movie(value);
    }
});

async function filter_movie(value) {
    await fetch(
        "https://api.themoviedb.org/3/search/person?query=" +
            value +
            "&include_adult=false&language=en-US&page=1",
        options
    )
        .then((response) => response.json())
        .then((response) => {
            insert_actors(response.results);
        })
        .catch((err) => console.error(err));
}

async function insert_actors(actors) {
    StreamingOptions.innerHTML = "";

    let total = actors.length;
    if (actors.length > 12) {
        total = 12;
    }

    for (let x = 0; x < total; x++) {
        // Create the div element
        var divElement = document.createElement("div");
        divElement.classList.add("Streaming2Columns");

        // Create the img element
        var imgElement = document.createElement("img");
        imgElement.src =
            "https://image.tmdb.org/t/p/original" + actors[x].profile_path;
        imgElement.alt = "";

        // Create the p element
        var pElement = document.createElement("p");
        pElement.textContent = actors[x].original_name;

        // Create the label element
        var labelElement = document.createElement("label");
        labelElement.classList.add("container");

        // Create the input element
        var inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.classList.add("streamingCheckboxes");
        inputElement.name = actors[x].id;
        inputElement.id = actors[x].id;

        // Create the span element
        var spanElement = document.createElement("span");
        spanElement.classList.add("checkmark");

        // Append the input element to the label element
        labelElement.appendChild(inputElement);
        // Append the span element to the label element
        labelElement.appendChild(spanElement);

        // Append the img, p, and label elements to the div element
        divElement.appendChild(imgElement);
        divElement.appendChild(pElement);
        divElement.appendChild(labelElement);

        // Append the div element to the document body or any desired parent element
        StreamingOptions.appendChild(divElement);
    } //END FOR

    // AFTER APPEND ALL CHILD IT WILL APPEND THE BUTTONS AT THE BOTTOM

    // Create the div element with class "buttons_mobile_size"
    var divElement = document.createElement("div");
    divElement.classList.add("buttons_mobile_size");

    // Create the first div element with class "buttons"
    var firstButtonsDivElement = document.createElement("div");
    firstButtonsDivElement.classList.add("buttons");

    // Create the input element for the "Skip" button
    var skipButton = document.createElement("input");
    skipButton.type = "button";
    skipButton.value = "Add";
    skipButton.setAttribute("id", "btn_Add");
    skipButton.classList.add("btn_Skip");

    // Append the "Skip" button input element to the first div
    firstButtonsDivElement.appendChild(skipButton);

    // Create the second div element with class "buttons"
    var secondButtonsDivElement = document.createElement("div");
    secondButtonsDivElement.classList.add("buttons");

    // Create the input element for the "Next" button
    var nextButton = document.createElement("input");
    nextButton.type = "button";
    nextButton.value = "Next";
    nextButton.id = "streaming_services";
    nextButton.classList.add("btn_signin");

    // Append the "Next" button input element to the second div
    secondButtonsDivElement.appendChild(nextButton);

    // Append the div elements to the main div
    divElement.appendChild(firstButtonsDivElement);
    divElement.appendChild(secondButtonsDivElement);

    // Append the main div to the document body or any desired parent element

    StreamingOptions.appendChild(divElement);

    let btn_next = document.querySelector("#streaming_services");
    let btn_Add = document.querySelector("#btn_Add");

    btn_next.addEventListener("click", () => {
        adding_actor_array();
        add_actors_db();
    });

    btn_Add.addEventListener("click", () => {
        adding_actor_array();
    });
}

function adding_actor_array() {
    const streamings = document.querySelectorAll(".streamingCheckboxes");

    console.log(streamings);

    streamings.forEach((x, i) => {
        // console.log(streamings[i].checked)
        if (streamings[i].checked) {
            let actor = {
                id: streamings[i].id,
                photo: streamings[i].parentNode.parentNode.firstChild.src,
                name: streamings[i].parentNode.parentNode.innerText,
            };
            streamingsArray.push(actor);
        }
    });

    console.log(streamingsArray);
}

async function add_actors_db() {
    const user = await checkSession();
    let documentId = user.uid;

    if (streamingsArray.length > 0) {
        await updateMapInDb(`users/${documentId}`, 'interests.actors', [...streamingsArray]);
    }

    window.location.replace("director.html");
}

load_all_actors();
