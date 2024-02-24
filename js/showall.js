import { allMovies} from '../js/common.js'
import { showResult } from '../js/search.js'



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