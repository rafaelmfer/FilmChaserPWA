// import { theMovieDb } from '../z_ext_libs/themoviedb/themoviedb.js';

//https://github.com/cavestri/themoviedb-javascript-library/wiki/Movies

// theMovieDb.movies.getRecommendations;
//theMovieDb.movies.getSimilarMovies({"id":76203 }, successCB, errorCB)
//theMovieDb.tv.getRecommendations({"id":1396 }, successCB, errorCB)

// theMovieDb.movies.getRecommendations({"id":76203 }, successCB, errorCB)

// function successCB(data) {
// 	console.log(data)
//     let myArray = [];
//     myArray.map((str,index)=>({value: str, id: index}))

//     const obj = JSON.parse(data);
//     console.log(obj)
// };
        
// function errorCB(data) {
//         	console.log("Error callback: " + data);
//     };

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTA0NDM0NmI0NmFlYzc2OTQ3YjdiMTJjMjJmMDM3YiIsInN1YiI6IjY1YTFiOWIyOWFlNjEzMDEyZWI3NzQ5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xhyB4idFFjVhxXuovbo9sMLpO-4mqhTcPy_C04WIIsg'
    }
  };
  
  fetch('https://api.themoviedb.org/3/search/person?query=steve&include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));