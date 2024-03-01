import { ACCESS_TOKEN_TMDB } from '../local_properties.js'
import { inicia } from '../js/common.js'


const btnSearch = document.getElementById("btnSearch")

const mainDiscover = document.querySelector("#mainDiscover")
const mainSearch   = document.querySelector("#mainSearch")
const search_field = document.querySelector("#search_field")
const mainDiscover2 = document.querySelector("#mainDiscover2")








btnSearch.addEventListener("click",()=>{

    mainDiscover.classList.add("notActive")
    mainSearch.classList.add("Active")
    mainDiscover2.classList.remove("notActive")

    inicia(search_field.value, 1)
        .then(e=>e.json())
        .then(res=>{
            showResult(res);
            
        })
        .catch(err => console.error(err));

});

let aname = fetch
let an



export function showResult(res){
    let result_array = res.results;
    let detail = document.querySelector(".div-grid-detail")

    detail.innerHTML = "";

    console.log(result_array);

    result_array.forEach((element, index)=>{
        let link = document.createElement("a")
        let div = document.createElement("div")
        let img = document.createElement("img")
        let h4  = document.createElement("h4")



        let Image = element.poster_path ? "https://image.tmdb.org/t/p/original"+element.poster_path:"../resources/imgs/logo.png";

        img.setAttribute("src",Image);
    
        h4.innerHTML = element.name != undefined? element.name:element.title;

        div.setAttribute("class","movie-detail")
        div.appendChild(img)
        div.appendChild(h4);
    
        link.setAttribute("href","id="+element.id)
        link.appendChild(div)

        detail.appendChild(link)

 
    });

}








//**********************SEARCH--->MOVIE********************************** */
export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
};













