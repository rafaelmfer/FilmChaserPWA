import { ACCESS_TOKEN_TMDB } from '../local_properties.js'

const btnSearch = document.getElementById("btnSearch")

const mainDiscover = document.querySelector("#mainDiscover")
const mainSearch   = document.querySelector("#mainSearch")
const search_field = document.querySelector("#search_field")
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
};




btnSearch.addEventListener("click",()=>{
    console.log("searching")

    mainDiscover.classList.toggle("notActive")
    mainSearch.classList.toggle("Active")

    console.log(search_field.value);

    inicia(search_field.value, 1);
})





//**********************SEARCH--->MOVIE********************************** */
function inicia(user_search, page){
    
    fetch('https://api.themoviedb.org/3/search/movie?query='+user_search+'&include_adult=false&language=en-US&page='+page, options)
    .then(response => response.json())
    .then(response =>{             

        // movies(response,page)
        console.log(response, page)

    })
    .catch(err => console.error(err));

    // https://www.primevideo.com/genre/action/ref=atv_hm_fin_c_YyAsEb_1_1?jic=8%7CEgNhbGw%3D     
        
}


