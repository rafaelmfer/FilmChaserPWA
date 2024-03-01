import { ACCESS_TOKEN_TMDB } from '../../local_properties.js'
import { myMovieArray, myMovieTvArray, myTvArray } from '../js/recommendation.js'


const btn_search = document.getElementById("btn_search");
const field_search = document.getElementById("search_field")


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB
    }
  };



// ACTION 16=ANIMATION
async function animation(){
  try{                                                                                                                 

  
    //TRY TO USE PROMISE ALL. 
    let response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16', options)
    let movies = await response.json();
    let querySelected = ".documentary_img";
    createQuery(movies, querySelected);


    response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28', options)
    movies = await response.json();
    querySelected = ".action_img";
    createQuery(movies, querySelected);

    
    response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27', options)
    movies = await response.json();
    querySelected = ".horror_img";
    createQuery(movies, querySelected);


    response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35', options)
    movies = await response.json();
    querySelected = ".img";
    createQuery(movies, querySelected);

    
    response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    movies = await response.json();
    querySelected = ".trending_img";
    createQuery(movies, querySelected);

    response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
    movies = await response.json();
    querySelected = ".upcoming_img";
    createQuery(movies, querySelected);




    console.log(myMovieTvArray)
    console.log(myMovieArray)

    //procurar a funcao onde pega os ALL
    console.log(myTvArray)

    let sortedTvMovies = getRandomNumber(myMovieTvArray)

    console.log(sortedTvMovies)

    // response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    // movies = await response.json();
    querySelected = ".recommendation_img";
    console.log(movies);
    createQuery(sortedTvMovies, querySelected);
    // createQuery(movies, querySelected);


  }catch(e){
    console.log(e);
  }
}

//Get movie and array and sort into new array
function getRandomNumber(myMovieTv){

  let sortedArray = [];
  let check = [];
  let i = 0;
  
  while(i < 10){
    let n = Math.floor(Math.random() * 10)
  
    if(check.includes(n)){
      console.log("Number already existed"+n)
    }else{
      sortedArray.push(myMovieTv[n])
      check.push(n);
      i++;
    }


  }

  return {results: sortedArray};
}



function createQuery(response, myQuery){
  const img1 = document.querySelector(`${myQuery}1`)
  const img2 = document.querySelector(`${myQuery}2`)
  const img3 = document.querySelector(`${myQuery}3`)
  const img4 = document.querySelector(`${myQuery}4`)
  const img5 = document.querySelector(`${myQuery}5`)
  const img6 = document.querySelector(`${myQuery}6`)
  const img7 = document.querySelector(`${myQuery}7`)
  const img8 = document.querySelector(`${myQuery}8`)
  const img9 = document.querySelector(`${myQuery}9`)
                                        
  const my_array = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

  exibir_movies(response, my_array)  
}

// show 10 movies on main screen.... on carousel     
function exibir_movies(movies, my_array){    
    

    movies.results.forEach((element, index) => {        
        // const swiper_slide = document.querySelector(".swiper-wrapper")                
        const movie_image = document.createElement("img")
        movie_image.src = "https://image.tmdb.org/t/p/original"+element.backdrop_path;
        
        const div_image = document.createElement("div");
        div_image.setAttribute("class","div_image")


        const paragraph = document.createElement("p")
        paragraph.innerHTML = element.title;

        if(index == 1){           
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }
        if(index == 2){            
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);    
        }else
        if(index == 3){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }else
        if(index == 4){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }else
        if(index == 5){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }else
        if(index == 6){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }else
        if(index == 7){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }else
        if(index == 8){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }else
        if(index == 9){
          addAllResult(movie_image, paragraph, element.id, div_image, index-1, my_array);  
        }
        
    }
    
    );       
}



function addAllResult(movie_image, paragraph, elementID, div_image, index, my_array){
  const movie_link = document.createElement("a")
  movie_link.setAttribute("href","single_movie.html?id="+elementID);
  div_image.appendChild(movie_image);
  div_image.appendChild(paragraph)
  movie_link.appendChild(div_image)

  my_array[index].appendChild(movie_link)
}


animation();