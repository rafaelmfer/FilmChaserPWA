import { ACCESS_TOKEN_TMDB } from './local_properties.js'

const btn_search = document.getElementById("btn_search");
const field_search = document.getElementById("search_field")


const options_comedy = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };

  const options_action = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };

        
  const options_documentary = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };



  const options_horror = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };




  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options_comedy)
    .then(response => response.json())
    .then(response =>{ 
      console.log(response);
      const img1 = document.querySelector(".recommendation_img1")
      const img2 = document.querySelector(".recommendation_img2")
      const img3 = document.querySelector(".recommendation_img3")
      const img4 = document.querySelector(".recommendation_img4")
      const img5 = document.querySelector(".recommendation_img5")
      const img6 = document.querySelector(".recommendation_img6")
      const img7 = document.querySelector(".recommendation_img7")
      const img8 = document.querySelector(".recommendation_img8")
      const img9 = document.querySelector(".recommendation_img9")
  
      const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]
  
      exibir_movies(response, my_array)    
    })
    .catch(err => console.error(err));



  
  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options_comedy)
    .then(response => response.json())
    .then(response =>{
        console.log(response);
        const img1 = document.querySelector(".upcoming_img1")
        const img2 = document.querySelector(".upcoming_img2")
        const img3 = document.querySelector(".upcoming_img3")
        const img4 = document.querySelector(".upcoming_img4")
        const img5 = document.querySelector(".upcoming_img5")
        const img6 = document.querySelector(".upcoming_img6")
        const img7 = document.querySelector(".upcoming_img7")
        const img8 = document.querySelector(".upcoming_img8")
        const img9 = document.querySelector(".upcoming_img9")
    
        const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]
    
        exibir_movies(response, my_array)    

    })
    .catch(err => console.error(err));






  //TRENDING
  fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options_comedy)
    .then(response => response.json())
    .then(response =>{

        console.log(response);
        const img1 = document.querySelector(".trending_img1")
        const img2 = document.querySelector(".trending_img2")
        const img3 = document.querySelector(".trending_img3")
        const img4 = document.querySelector(".trending_img4")
        const img5 = document.querySelector(".trending_img5")
        const img6 = document.querySelector(".trending_img6")
        const img7 = document.querySelector(".trending_img7")
        const img8 = document.querySelector(".trending_img8")
        const img9 = document.querySelector(".trending_img9")
    
        const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]
    
        exibir_movies(response, my_array)    

    })
    .catch(err => console.error(err));




//CODIGO 35=COMEDY
// fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_genres=80', options_comedy)
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35', options_comedy)
.then(response => response.json())
.then(response =>{
    console.log(response);
    const img1 = document.querySelector(".img1")
    const img2 = document.querySelector(".img2")
    const img3 = document.querySelector(".img3")
    const img4 = document.querySelector(".img4")
    const img5 = document.querySelector(".img5")
    const img6 = document.querySelector(".img6")
    const img7 = document.querySelector(".img7")
    const img8 = document.querySelector(".img8")
    const img9 = document.querySelector(".img9")

    const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

    exibir_movies(response, my_array)    

})
.catch(err => console.error(err));








// ACTION 27=HORROR
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27', options_horror)
.then(response => response.json())
.then(response =>{
    console.log(response);
    const img1 = document.querySelector(".horror_img1")
    const img2 = document.querySelector(".horror_img2")
    const img3 = document.querySelector(".horror_img3")
    const img4 = document.querySelector(".horror_img4")
    const img5 = document.querySelector(".horror_img5")
    const img6 = document.querySelector(".horror_img6")
    const img7 = document.querySelector(".horror_img7")
    const img8 = document.querySelector(".horror_img8")
    const img9 = document.querySelector(".horror_img9")

    const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

    exibir_movies(response, my_array)    

})
.catch(err => console.error(err));










// ACTION 28=ACTION
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28', options_action)
.then(response => response.json())
.then(response =>{
    console.log(response);
    const img1 = document.querySelector(".action_img1")
    const img2 = document.querySelector(".action_img2")
    const img3 = document.querySelector(".action_img3")
    const img4 = document.querySelector(".action_img4")
    const img5 = document.querySelector(".action_img5")
    const img6 = document.querySelector(".action_img6")
    const img7 = document.querySelector(".action_img7")
    const img8 = document.querySelector(".action_img8")
    const img9 = document.querySelector(".action_img9")

    const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

    exibir_movies(response, my_array)    

})
.catch(err => console.error(err));
 



// ACTION 16=ANIMATION
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16', options_comedy)
.then(response => response.json())
.then(response =>{
    console.log(response);
    const img1 = document.querySelector(".documentary_img1")
    const img2 = document.querySelector(".documentary_img2")
    const img3 = document.querySelector(".documentary_img3")
    const img4 = document.querySelector(".documentary_img4")
    const img5 = document.querySelector(".documentary_img5")
    const img6 = document.querySelector(".documentary_img6")
    const img7 = document.querySelector(".documentary_img7")
    const img8 = document.querySelector(".documentary_img8")
    const img9 = document.querySelector(".documentary_img9")
                                          
    const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

    exibir_movies(response, my_array)    

})
.catch(err => console.error(err));


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











// show 10 movies on main screen.... on carousel     
function exibir_movies(movies, my_array){    

    console.log(movies.results.length)

    for (let i = 0; i < movies.results.length; i++) {
        console.log(i)
    }

    

    movies.results.forEach((element, index) => {        
        // const swiper_slide = document.querySelector(".swiper-wrapper")                
        const movie_image = document.createElement("img")
        movie_image.src = "https://image.tmdb.org/t/p/original"+element.backdrop_path;
        
        const div_image = document.createElement("div");
        div_image.setAttribute("class","div_image")


        const paragraph = document.createElement("p")
        paragraph.innerHTML = element.title;

        // const movie_link = document.createElement("a")

        console.log(index)

        // movie_link.setAttribute("href",element.id);
        //     div_image.appendChild(movie_image);
        //     div_image.appendChild(paragraph)
        //     movie_link.appendChild(div_image)
        //     my_array[index].appendChild(movie_link);           
        


        if(index == 1){            
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[0].appendChild(movie_link);              
            
        }
        if(index == 2){            
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[1].appendChild(movie_link);            
            // my_array[1].appendChild(movie_image);
        }else
        if(index == 3){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[2].appendChild(movie_link);
        }else
        if(index == 4){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[3].appendChild(movie_link);
            // my_array[3].appendChild(movie_image);
        }else
        if(index == 5){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[4].appendChild(movie_link);
            // my_array[4].appendChild(movie_image);
        }else
        if(index == 6){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[5].appendChild(movie_link);
            // my_array[5].appendChild(movie_image);
        }else
        if(index == 7){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[6].appendChild(movie_link);
            // my_array[6].appendChild(movie_image);
        }else
        if(index == 8){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[7].appendChild(movie_link);
            // my_array[7].appendChild(movie_image);
        }else
        if(index == 9){
            const movie_link = document.createElement("a")
            movie_link.setAttribute("href","single_movie.html?id="+element.id);
            div_image.appendChild(movie_image);
            div_image.appendChild(paragraph)
            movie_link.appendChild(div_image)
            my_array[8].appendChild(movie_link);
            // my_array[8].appendChild(movie_image);
        }
    });       
    
}






btn_search.addEventListener("click",()=>{
    console.log("producnar")
    console.log(field_search.value)
    
    const search = field_search.value;

    window.open("search.html?search="+search,"_self")
})

