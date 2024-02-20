import { ACCESS_TOKEN_TMDB } from '../../../local_properties.js'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };
  
  function create_div(i){
    // const create_div=(i)=>{
        const new_div = document.createElement("div")
        
        new_div.setAttribute("class","swiper-slide")
        new_div.setAttribute("role","group")
        new_div.setAttribute("aria-label",(i+1)+" / 9")
        new_div.setAttribute("style","width: 402.667px; margin-right: 30px;")
        new_div.setAttribute("title",i)
        return new_div;
    }


    // ADD IMAGE
    // https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png  



//  fetch('https://api.themoviedb.org/3/tv/popular?id=603', options)
// with_genres=35,53,27


// need id
// go on movies and details to find de movies

//vai no discover e movies tem a opcao with_genres e outras opcoes para adicionar na url e fazer a pesquisa

// fetch('https://api.themoviedb.org/3/search/keyword?id=257890', options)




    // MOVIES ID
//         "id": 28,
//         "name": "Action"
//       },
//       {
//         "id": 12,
//         "name": "Adventure"
//       },
//       {
//         "id": 16,
//         "name": "Animation"
//       },
//       {
//         "id": 35,
//         "name": "Comedy"
//       },
//       {
//         "id": 80,
//         "name": "Crime"
//       },
//       {
//         "id": 99,
//         "name": "Documentary"
//       },
//       {
//         "id": 18,
//         "name": "Drama"
//       },
//       {
//         "id": 10751,
//         "name": "Family"
//       },
//       {
//         "id": 14,
//         "name": "Fantasy"
//       },
//       {
//         "id": 36,
//         "name": "History"
//       },
//       {
//         "id": 27,
//         "name": "Horror"
//       },
//       {
//         "id": 10402,
//         "name": "Music"
//       },
//       {
//         "id": 9648,
//         "name": "Mystery"
//       },
//       {
//         "id": 10749,
//         "name": "Romance"
//       },
//       {
//         "id": 878,
//         "name": "Science Fiction"
//       },
//       {
//         "id": 10770,
//         "name": "TV Movie"
//       },
//       {
//         "id": 53,
//         "name": "Thriller"
//       },
//       {
//         "id": 10752,
//         "name": "War"

//         "id": 37,
//         "name": "Western"




//CODIGO 35=COMEDY
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_genres=35', options)
    .then(response => response.json())
    .then(response =>{
        
        setTimeout(() => {
            const car = ".swiper-wrapper";
            exibir_movies(response)    
        }, 1000);
        

    })
    .catch(err => console.error(err));


// ACTION 28=ACTION
    // fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_genres=28', options)
    // .then(response => response.json())
    // .then(response =>{
        
    //     console.log(response)

    // })
    // .catch(err => console.error(err));



// show 10 movies on main screen.... on carousel     
function exibir_movies(movies,car){    

    movies.results.slice(0,9).forEach((element, index) => {
        
        const swiper_slide = document.querySelector(".swiper-wrapper")                
        const movie_image = document.createElement("img")
        movie_image.src = "https://image.tmdb.org/t/p/original"+element.backdrop_path;

        //create a new div with attributes
        const element_div = create_div(index);
        element_div.appendChild(movie_image)

        swiper_slide.appendChild(element_div)
    });       
    
}







{/* <div class="swiper-slide" role="group" aria-label="1 / 9" style="width: 402.667px; margin-right: 30px;">
<img src="/Faces/face-1.jpg" alt="" srcset="">
</div> */}