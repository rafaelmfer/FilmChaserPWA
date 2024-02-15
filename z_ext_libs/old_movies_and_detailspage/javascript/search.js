import { ACCESS_TOKEN_TMDB } from './local_properties.js'

// SEARCH MOVIES FROM RATING
// fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc', options)
// HAVE MORE OPTIONS ON DISCOVER -> MOVIES




// Get the query string from the URL
const queryString = window.location.search;


//*************************************** */
const result_text = document.querySelector(".result_text")
const field_search = document.getElementById("search_field")
const total_results = document.querySelector(".total_results")
const results = document.querySelector(".results")


// Parse the query string into a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const user_search = urlParams.get('search');
console.log(user_search); // shirt




const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };


  


  //**********************SEARCH--->MOVIE********************************** */
    function inicia(page){
        results.innerHTML = "";
        // Get the value of a specific parameter from URL
        result_text.innerHTML = user_search;

        fetch('https://api.themoviedb.org/3/search/movie?query='+user_search+'&include_adult=false&language=en-US&page='+page, options)
        .then(response => response.json())
        .then(response =>{             

            movies(response,page)
    
        })
        .catch(err => console.error(err));
    
        // https://www.primevideo.com/genre/action/ref=atv_hm_fin_c_YyAsEb_1_1?jic=8%7CEgNhbGw%3D     
            
    }




    function movies(resp,page){
        const results = document.querySelector(".results")

        total_results.innerHTML = resp.total_results;
        
        

        resp.results.forEach(element => {
            let image_path = "https://image.tmdb.org/t/p/original"+element.poster_path;
            
            if(element.poster_path == null){
                image_path = "../Faces/no_image.jpg"    
            }

            const image = document.createElement("img");
            image.src = image_path;

            const div_show_result = document.createElement("div")
            div_show_result.setAttribute("class","show_result")
            div_show_result.append(image);

            results.appendChild(div_show_result);

        });

                    // CREATE SEARCH NAVIGATION LINK
        create_link_page(resp.total_pages,page)

        console.log(resp);
    }





function create_link_page(pages, actual_page){
    console.log(pages)
    console.log(actual_page);
    const footer_search = document.querySelector(".footer_search_links")
    footer_search.innerHTML="";


    if(pages > 5){        
        const arrow_left = document.createElement("li")
        const arrow_right = document.createElement("li")

        arrow_left.innerHTML = "&#8592";
        footer_search.appendChild(arrow_left)

       for(var n=1; n<6; n++){            
            const li = document.createElement("li")    
            li.setAttribute("onClick","search_page("+n+")")
            li.innerHTML = n;
            footer_search.appendChild(li)
        }

        arrow_right.innerHTML = "&#8594";
        arrow_right.setAttribute("onClick","search_page("+(actual_page+1)+")")
        footer_search.appendChild(arrow_right);

    }else{
        for(var n=1; n<=pages; n++){
            const li = document.createElement("li")
            li.innerHTML = n;
            footer_search.appendChild(li)
        }
    }

    


}



function search_page(page){
    console.log("pagina ",page)
    inicia(page)
}






//******************* SEARCH BUTTON ************************************
    btn_search.addEventListener("click",()=>{
        
        
        const search = field_search.value;
    
        window.open("search.html?search="+search,"_self")
    })
    


    


inicia(1);