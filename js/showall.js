
import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";
import { options, allMovies } from "../js/common.js";
import { showResultall, showResult } from "../js/search.js";



let arrayMovies = [];

let mainFriends = document.getElementById("main-Friends");
let mainDiscover2 = document.getElementById("mainDiscover2");
let filterMovies = document.getElementById("filterMovies");
let mainFilmChaser = document.getElementById("main-film-chaser")

let filterTv = document.getElementById("filterTv");
let filterAll = document.getElementById("filterAll");
let search_field = document.getElementById("search_field");

//ACTIVE SCREEN MAIN-DISCOVER2
export function activeScreen() {
    mainFriends.classList.remove("active");
    mainDiscover2.classList.remove("notActive");
    mainFilmChaser.classList.add("notActive")
}

// function executeFetch(movieTv, searchValue) {
//     arrayMovies = [];
//     fetch(
//         "https://api.themoviedb.org/3/search/" +
//             movieTv +
//             "?query=" +
//             search_field.value +
//             "&include_adult=false&language=en-US&page=1",
//         options
//     )
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response)
//             showResult(response);
//         })
//         .catch((err) => console.error(err));
// }

if (filterAll) {
    filterAll.addEventListener("click",()=>{
                //ACTIVE SCREEN MAIN-DISCOVER2
                arrayMovies = []
                activeScreen();
                if (search_field.value != "") {
                    // executeFetch("tv", search_field.value);
                                //GETTING RESULT FROM MOVIES
                                theMovieDb.search.getMulti({ query: search_field.value }, successCB, errorCB)
                                function successCB(data){
                                    arrayMovies.push(...JSON.parse(data).results);
                        
                                    console.log("clicado All === "+search_field.value)
                                    activeScreen();
        
                                    console.log(arrayMovies)
                        
                                    showResultall(arrayMovies);                        
                                }                                        
                            
                                function errorCB(data) {
                                    console.log("Error callback: " + data);
                                }   
                    
                } else {
                    noFilter("movie");
                }
    })
}

if (filterMovies) {
    filterMovies.addEventListener("click", (e) => {

                //ACTIVE SCREEN MAIN-DISCOVER2
                arrayMovies = []
                activeScreen();
                console.log("botao filter movie clicado")
                if (search_field.value != "") {
                    // executeFetch("tv", search_field.value);
                                //GETTING RESULT FROM MOVIES
                                theMovieDb.search.getMovie({ query: search_field.value }, successCB, errorCB)
          
                                function successCB(data){
                                    arrayMovies.push(...JSON.parse(data).results);
                        
                                    console.log("clicado movie === "+search_field.value)
                                    activeScreen();
        
                                    console.log(arrayMovies)
                        
                                    showResult("movie",arrayMovies);
                        
                                }                                        
                            
                                function errorCB(data) {
                                    console.log("Error callback: " + data);
                                }   
                    
                } else {
                    noFilter("movie");
                }


    });
}

if (filterTv) {
    filterTv.addEventListener("click", (e) => {
        //ACTIVE SCREEN MAIN-DISCOVER2
        arrayMovies = []
        activeScreen();
        console.log("botao filter tv clicado")
        if (search_field.value != "") {
            // executeFetch("tv", search_field.value);
                        //GETTING RESULT FROM MOVIES
                        theMovieDb.search.getTv({ query: search_field.value }, successCB, errorCB)
  
                        function successCB(data){
                            arrayMovies.push(...JSON.parse(data).results);
                
                            console.log("clicado tv === "+search_field.value)
                            activeScreen();

                            console.log(arrayMovies)
                
                            showResult("tv",arrayMovies);
                
                        }                                        
                    
                        function errorCB(data) {
                            console.log("Error callback: " + data);
                        }   
            
        } else {
            noFilter("tv");
        }
    });



}

// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string into a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const user_search =
    urlParams.get("search") != null ? urlParams.get("search") : "all";

function noFilter(search) {
    document.querySelector("main").style.display = "block";

    let resultArray = [];
    setTimeout(() => {
        let myMovies = allMovies(search, 1);

        if (search == "tv" || search == "movie" || search == "recommendation") {
            for (let x = 0; x < 10; x++) {
                if (search == "tv") {
                    resultArray.push(myTvArray[x]);
                } else if (search == "movie") {
                    resultArray.push(myMovieArray[x]);
                } else if (search == "all") {
                    //IIMPORTANT NEED RANDOM ARRAY
                    resultArray.push(myMovieTvArray[x]);
                } else {
                    //have to fix... find the movies according to search url
                    console.log(
                        "fix need to find the movies from the search url"
                    );

                    resultArray.push(myMovieTvArray[x]);
                }
            }
        }

        myMovies
            .then((e) => {
                console.log(e);
                return e.json();
            })
            .then((e) => {
                console.log(e);
                showResult("",e.results);
            });

        if (resultArray > 0) {
            showResult("".e.results);
        }
    }, 2500);
}

async function startPage() {
    noFilter(user_search);
}

startPage();
