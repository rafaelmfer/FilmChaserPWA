import { options } from "./common.js";
import { updateInfoDb } from '../js/firestore.js';



let StreamingOptions = document.querySelector(".StreamingOptions")
let search = document.querySelector("#search")
let search_mobile = document.querySelector("#search_mobile")

let streamingsArray = [];
let streamingDirectors = [];

let directors = [
    {      
        "adult": false,
        "gender": 2,
        "id": 1032,
        "known_for_department": "Directing",
        "name": "Martin Scorsese",
        "original_name": "Martin Scorsese",
        "popularity": 56.98,
        "profile_path": "/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg"
    },
    {      
        "adult": false,
        "gender": 2,
        "id": 240,
        "known_for_department": "Directing",
        "name": "Stanley Kubrick",
        "original_name": "Stanley Kubrick",
        "popularity": 24.839,
        "profile_path": "/yFT0VyIelI9aegZrsAwOG5iVP4v.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 488,
        "known_for_department": "Directing",
        "name": "Steven Spielberg",
        "original_name": "Steven Spielberg",
        "popularity": 52.003,
        "profile_path": "/tZxcg19YQ3e8fJ0pOs7hjlnmmr6.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 1776,
        "known_for_department": "Directing",
        "name": "Francis Ford Coppola",
        "original_name": "Francis Ford Coppola",
        "popularity": 26.673,
        "profile_path": "/3Pblihd6KjXliie9vj4iQJwbNPU.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 7467,
        "known_for_department": "Directing",
        "name": "David Fincher",
        "original_name": "David Fincher",
        "popularity": 22.053,
        "profile_path": "/yV36WTsLBAGyYVUQshNdI8hyk9l.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 138,
        "known_for_department": "Directing",
        "name": "Quentin Tarantino",
        "original_name": "Quentin Tarantino",
        "popularity": 72.121,
        "profile_path": "/1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 5026,
        "known_for_department": "Directing",
        "name": "Akira Kurosawa",
        "original_name": "Akira Kurosawa",
        "popularity": 21.699,
        "profile_path": "/eGexa6MZ22T1MZxce1qR3RcAYaS.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 40,
        "known_for_department": "Directing",
        "name": "Orson Welles",
        "original_name": "Orson Welles",
        "popularity": 23.935,
        "profile_path": "/e9lGmqQq3EsHeUQgQLByo275hcc.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 5281,
        "known_for_department": "Directing",
        "name": "Spike Lee",
        "original_name": "Spike Lee",
        "popularity": 16.282,
        "profile_path": "/2KOHXgk2uoRXl6u7V9xpAIo3uay.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 3556,
        "known_for_department": "Directing",
        "name": "Roman Polanski",
        "original_name": "Roman Polanski",
        "popularity": 23.582,
        "profile_path": "/yHwHSXdZatkoLgIjPeW14GKlrZs.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 578,
        "known_for_department": "Directing",
        "name": "Ridley Scott",
        "original_name": "Ridley Scott",
        "popularity": 36.798,
        "profile_path": "/zABJmN9opmqD4orWl3KSdCaSo7Q.jpg"
    },
    {
        "adult": false,
        "gender": 2,
        "id": 5602,
        "known_for_department": "Directing",
        "name": "David Lynch",
        "original_name": "David Lynch",
        "popularity": 26.605,
        "profile_path": "/b6TnSpuqeOlbq7aHH9G4inmQ1v9.jpg"
    }
];



function load_all_directors(){
    insert_directors(directors);
}




search_mobile.addEventListener("keyup",async ()=>{    
 
    console.log(search_mobile.value);
    let value = search_mobile.value;

    console.log(value)
    // filter_movie(value);
})


search.addEventListener("keyup",  ()=>{

    if(search.value == ""){
        load_all_directors();
    }else{
        filter_director();
    }

})


async function filter_director(){
    
    fetch('https://api.themoviedb.org/3/search/person?query='+search.value+'&include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response =>{ 

        for(let x=0; x<response.total_pages; x++){
            let show = response.results.find( (e)=> e.known_for_department == "Directing");
            // console.log(show)
      
            if(show){
                // console.log(streamingsArray)
                let teste = streamingsArray.find( (f)=> f.name == show.name);
                // console.log(teste)
                if(!teste){
                //     console.log(teste)
                    console.log("ADICIONADO COM SUCESSO")
                    // console.log(show)
                    streamingsArray.push(show)
                    console.log(streamingsArray)
                    
                    console.log("+++++++++++++++++++++++")

                }
            }

        }

        insert_directors(streamingsArray);
    })
    .catch(err => console.error(err));

}






async function insert_directors(director){
    StreamingOptions.innerHTML = "";
    console.log("EXECUTANDO CAROUSEL")
    streamingsArray = [];
    console.log(streamingsArray)
    let total = director.length;
    if(director.length> 12){
        total = 12;
    }
    

    for(let x=0; x<total; x++){
        
        // Create the div element
        var divElement = document.createElement('div');
        divElement.classList.add('Streaming2Columns');

        // Create the img element
        var imgElement = document.createElement('img');
        imgElement.src = "https://image.tmdb.org/t/p/original"+director[x].profile_path;
        imgElement.alt = '';

        // Create the p element
        var pElement = document.createElement('p');
        pElement.textContent = director[x].original_name;

        // Create the label element
        var labelElement = document.createElement('label');
        labelElement.classList.add('container');

        // Create the input element
        var inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
        inputElement.classList.add('streamingCheckboxes');
        inputElement.name = director[x].id;
        inputElement.id = director[x].id;

        // Create the span element
        var spanElement = document.createElement('span');
        spanElement.classList.add('checkmark');

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
    
    }//END FOR


    // AFTER APPEND ALL CHILD IT WILL APPEND THE BUTTONS AT THE BOTTOM


    // Create the div element with class "buttons_mobile_size"
    var divElement = document.createElement('div');
    divElement.classList.add('buttons_mobile_size');

    // Create the first div element with class "buttons"
    var firstButtonsDivElement = document.createElement('div');
    firstButtonsDivElement.classList.add('buttons');

    // Create the input element for the "Skip" button
    var skipButton = document.createElement('input');
    skipButton.type = 'button';
    skipButton.value = 'Add';
    skipButton.setAttribute('id','btn_Add')
    skipButton.classList.add('btn_Skip');

    // Append the "Skip" button input element to the first div
    firstButtonsDivElement.appendChild(skipButton);

    // Create the second div element with class "buttons"
    var secondButtonsDivElement = document.createElement('div');
    secondButtonsDivElement.classList.add('buttons');

    // Create the input element for the "Next" button
    var nextButton = document.createElement('input');
    nextButton.type = 'button';
    nextButton.value = 'Next';
    nextButton.id = 'streaming_services';
    nextButton.classList.add('btn_signin');

    // Append the "Next" button input element to the second div
    secondButtonsDivElement.appendChild(nextButton);

    // Append the div elements to the main div
    divElement.appendChild(firstButtonsDivElement);
    divElement.appendChild(secondButtonsDivElement);

    // Append the main div to the document body or any desired parent element
    
    StreamingOptions.appendChild(divElement);

    let btn_next = document.querySelector("#streaming_services")
    let btn_Add = document.querySelector("#btn_Add")

    btn_next.addEventListener("click",()=>{
        adding_director_array();
        add_actors_db();
    })

    btn_Add.addEventListener("click",()=>{
        adding_director_array();
    })

}



function adding_director_array(){
    const streamings = document.querySelectorAll(".streamingCheckboxes");
 
    console.log(streamings);

    streamings.forEach((x, i)=>{
        // console.log(streamings[i].checked)
        if(streamings[i].checked){
            let actor = {
                "id" : streamings[i].id,
                "photo" : streamings[i].parentNode.parentNode.firstChild.src,
                "name" : streamings[i].parentNode.parentNode.innerText
            }
            streamingDirectors.push(actor);
        }
    })

    console.log(streamingDirectors)
}


async function add_actors_db(){

    let id = "j7hBgo46ATgnYVdRRGTAA9hyBmB2";
    
    if(streamingDirectors.length>0){
        await updateInfoDb(`users/${id}`, 
        {
            interests: {directors : streamingDirectors}        
        });
    }

    // console.log(streamingsArray)
    window.location.replace("home.html");
}



load_all_directors()