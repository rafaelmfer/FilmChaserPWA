import { allMovies} from '../js/common.js'
import { showResult } from '../js/search.js'
import {  myMovieTvArray, myMovieArray, myTvArray } from '../js/recommendation.js'


let filterMovies = document.getElementById("filterMovies")
let filterTv     = document.getElementById("filterTv")
let search_field = document.getElementById("search_field")



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTA0NDM0NmI0NmFlYzc2OTQ3YjdiMTJjMjJmMDM3YiIsInN1YiI6IjY1YTFiOWIyOWFlNjEzMDEyZWI3NzQ5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xhyB4idFFjVhxXuovbo9sMLpO-4mqhTcPy_C04WIIsg'
    }
  };
  


filterAll.addEventListener("click",(e)=>{
    if(search_field.value != ""){
        fetch('https://api.themoviedb.org/3/search/multi?query='+search_field.value+'&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response =>{ showResult(response); })
        .catch(err => console.error(err));
 
    }else{
        noFilter("all");
    }
})


filterMovies.addEventListener("click",(e)=>{
    if(search_field.value != ""){
        fetch('https://api.themoviedb.org/3/search/movie?query='+search_field.value+'&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response =>{ showResult(response); })
        .catch(err => console.error(err));
    }else{
        noFilter("movie");
    }
})

filterTv.addEventListener("click",(e)=>{
    if(search_field.value != ""){
        fetch('https://api.themoviedb.org/3/search/tv?query='+search_field.value+'&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response =>{ showResult(response); })
        .catch(err => console.error(err));
    }else{
        noFilter("tv");
    }
})




// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string into a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const user_search = urlParams.get('search') != null? urlParams.get('search') : "all";

console.log(user_search); // shirt




    function noFilter(search){
            document.querySelector("main").style.display="block";


            let resultArray = [];
            setTimeout(()=>{

            let myMovies = allMovies(search,1);

            console.log(myMovies);
            if(search=="tv" || search=="movie" || search=="recommendation"){
                console.log("============recommendation")
                for(let x=0; x<10; x++){
                    if(search=="tv"){
                        resultArray.push(myTvArray[x]);
                    }else if(search=="movie"){
                        resultArray.push(myMovieArray[x]);
                    }else if(search == "all"){
                        //IIMPORTANT NEED RANDOM ARRAY
                        resultArray.push(myMovieTvArray[x]);
                    }else{
                        //have to fix... find the movies according to search url
                        console.log("fix need to find the movies from the search url")
    
                        resultArray.push(myMovieTvArray[x]);
                    }
                }
            }

            myMovies
            .then((e)=>{  console.log(e); return e.json(); })
            .then((e)=>{ 
                console.log(e.results);
                showResult({results: e.results});
            })
            console.log(resultArray)
            console.log(resultArray);
            showResult({results: resultArray});
            },1500)
        // })

    }
console.log(user_search);


async function startPage(){

    noFilter(user_search)
}

startPage()

