import { allMovies} from '../js/common.js'
import { showResult } from '../js/search.js'

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
        noFilter();
    }
})


filterMovies.addEventListener("click",(e)=>{
    if(search_field.value != ""){
        fetch('https://api.themoviedb.org/3/search/movie?query='+search_field.value+'&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response =>{ showResult(response); })
        .catch(err => console.error(err));
    }else{
        noFilter();
    }
})

filterTv.addEventListener("click",(e)=>{
    if(search_field.value != ""){
        fetch('https://api.themoviedb.org/3/search/tv?query='+search_field.value+'&include_adult=false&language=en-US&page=1', options)
        .then(response => response.json())
        .then(response =>{ showResult(response); })
        .catch(err => console.error(err));
    }else{
        noFilter();
    }
})




// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string into a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const user_search = urlParams.get('search');
console.log(user_search); // shirt

btnSearch;






    allMovies(user_search,1)
        .then((e)=>e.json())
        .then(res=>{
            console.log(res)
            document.querySelector("main").style.display="block";
            showResult(res);


        })


    function noFilter(){
        allMovies(user_search,1)
        .then((e)=>e.json())
        .then(res=>{
            console.log(res)
            document.querySelector("main").style.display="block";
            showResult(res);


        })
    }