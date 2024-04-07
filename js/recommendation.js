import { theMovieDb } from '../z_ext_libs/themoviedb/themoviedb.js';
import { options } from '../js/search.js'


// let tvArray = [12971,226342,12971];
let tvArray = [126308,52814,52814];
let movieArray = [1072790,1096197,969492];
// let movieArray = [116776];


export let myMovieArray = [];
export let myTvArray = [];
export let myMovieTvArray = [];
let movieId = 0;


if(movieArray.length>1){
    //HAVE TO GET RANDOM NUMBER FROM ARRAY TV 
    let num = Math.floor(Math.random() * movieArray.length);
    movieId = movieArray[num];
    console.log("MOVIE ID==="+movieId)
}else{
    movieId = 116776;
}


// ***********THIS LIBRARRY IS NOT WORKIING **************************;
// for (let x = 0; x < tvArray.length; x++) {
//     theMovieDb.tv.getRecommendations({ id:tvArray[x] }, successCB, errorCB)
// }

// function successCBTV(data){
//     console.log(data);
// }

theMovieDb.movies.getRecommendations({ id: 126308 }, successCB, errorCB)

async function successCB(data) {
    const obj = JSON.parse(data);
    console.log("Recomendations: " + data);
        let tvId = 0;
        if(tvArray.length>1){
            let num = Math.floor(Math.random() * tvArray.length);        
            tvId = tvArray[num];
        }else{
            tvId = 126308;
        }
        console.log("TV==="+tvId)
        fetch('https://api.themoviedb.org/3/tv/'+tvId+'/recommendations?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response =>{
            let r= [];

            for(let x=0; x<10; x++){
                if(x % 2 === 0){
                    r.push(response.results[x])
                }else{
                    r.push(obj.results[x])
                }
            }
            console.log(r)
            response.results = r;
            saveTvMovies(response );
        })
        .catch(err => console.error(err));
    verifyIdRepetition();

};







export function fRecommendation() {

    for (let x = 0; x < movieArray.length; x++) {
        theMovieDb.movies.getRecommendations({ "id": movieArray[x] }, successCB, errorCB)
        theMovieDb.tv.getRecommendations({ "id": tvArray[x] }, successCB, errorCB)
        console.log(x)
    }

    // return new Promise((resp)=>{ resp(myMovieArray) })

    return new Promise(function (myResolve, myReject) {
        myResolve(myMovieTvArray)
    });
}


function errorCB(data) {
    console.log("Error callback: " + data);
};


function saveTvMovies(obj) {
    console.log(obj);
    for (let x = 0; x < obj.results.length; x++) {
        if (obj.results[x].media_type == "movie") {
            myMovieArray.push(obj.results[x]);
            myMovieTvArray.push(obj.results[x])
        } else
            if (obj.results[x].media_type == "tv") {
                myTvArray.push(obj.results[x]);
                myMovieTvArray.push(obj.results[x])
            }
    }
    console.log("fim")
}


function verifyIdRepetition() {

    for (let x = 0; x < myMovieArray.length; x++) {
        for (let y = 0; y < myTvArray.length; y++) {
            if (myMovieArray[x].id == myTvArray[y].id) {
                console.log("===Iguais===")
                alert("")
            } else {

            }
        }
    }
    // console.log(myMovieArray);
    // console.log(myTvArray);
    //+ console.log(myMovieTvArray.sort(function(){return 0.5 - Math.random()}))
    return myMovieTvArray;
}