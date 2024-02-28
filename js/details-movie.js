'use strict';
import { ACCESS_TOKEN_TMDB } from '../local_properties.js';

import { urlInfo } from './common.js';
var movieId = urlInfo("id");

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

// TODO import inicia function

const movieHeader = document.querySelector(".js-movie-header");
const movieTitle = document.querySelector(".js-movie--title");
const movieGralInfo = document.querySelector(".js-movie--general-info");
const movieInfoDetails = document.querySelector(".js-section--movie-info-details");

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN_TMDB,
    }
  };
  

// SECTION: HERO IMAGE 

// BUILDING THE PATH TO THE IMAGE POSTER
const base_url = "https://image.tmdb.org/t/p/";

// POSTER SIZES
// These are the available poster sizes.
// const poster_sizes = ["w92", "w154", "w185","w342","w500","w780","original"];

// This is the horizontal size, and needs to be use with the backdrop_path
const file_size ="w1000_and_h450_multi_faces"; 

theMovieDb.movies.getById({"id":movieId }, successCB_movie, errorCB);

function successCB_movie (data) {
    const image_path = base_url + file_size + JSON.parse(data).backdrop_path;

    movieHeader.style.backgroundImage = `url(${image_path})`;
    movieHeader.style.backgroundSize = "cover";


    movieTitle.innerHTML = JSON.parse(data).title;
    const movieYear = document.createElement("p");
    movieYear.innerHTML = JSON.parse(data).release_date.slice(0,4);
    movieGralInfo.appendChild(movieYear);

    const movieInfoDetails_child = document.createElement("div");
    const movieYear_second = document.createElement("p");
    movieYear_second.innerHTML = JSON.parse(data).release_date.slice(0,4);
    movieInfoDetails_child.appendChild(movieYear_second);
    movieInfoDetails.appendChild(movieInfoDetails_child);

    const movie_categories = document.createElement("p");
    let category = "";
    for (let i in JSON.parse(data).genres){
        category = category + JSON.parse(data).genres[i].name + ", ";   
    }
    movie_categories.innerHTML = category.substring(0,category.length-2);
    movieInfoDetails_child.appendChild(movie_categories);

    const movie_duration = document.createElement("p");
    const hours = Math.floor(JSON.parse(data).runtime / 60);
    const minutes = JSON.parse(data).runtime % 60;
    movie_duration.innerHTML = `${hours}h ${minutes}m`;
    movieGralInfo.appendChild(movie_duration);

    const movieInfoDetails_votes = document.createElement("div");
    const movie_vote_average = document.createElement("p");
    const movie_vote_stars = document.createElement("p");

    let vote_average = JSON.parse(data).vote_average * 5 / 10 ;
    movie_vote_average.innerHTML = vote_average.toFixed(2) + "/5 (" + JSON.parse(data).vote_count + ")";

    let star = "";
    let i = 1;
    while (i <= 5) {
        if (i < vote_average+0.5){
            star += '&#9733;';    
        } else {
            star += '&#9734;';
        }
        i++;
    }
    movie_vote_stars.innerHTML = star ;

    movieInfoDetails_votes.appendChild(movie_vote_stars);
    movieInfoDetails_votes.appendChild(movie_vote_average);
    movieInfoDetails.appendChild(movieInfoDetails_votes);

    const movie_paragraph = document.createElement("p");
    movie_paragraph.innerHTML = JSON.parse(data).overview;       
    movieInfoDetails.appendChild(movie_paragraph);

    const movie_duration_second = document.createElement("p");
    movie_duration_second.innerHTML =`<span class="material-symbols-outlined">
    timer</span> ${hours}h ${minutes}m`;
    movieInfoDetails.appendChild(movie_duration_second);
}

// SECTION: HERO IMAGE -> call to get the certification  
theMovieDb.movies.getReleases({"id":movieId}, successCB_release, errorCB);

function successCB_release (data) {
    const movie_certification = document.createElement("p");
    for (let i in JSON.parse(data).results){
        // TODO filter with the profile info. 
        
        if (JSON.parse(data).results[i].iso_3166_1 === 'CA' || JSON.parse(data).results[i].iso_3166_1 === 'US'){
            
            for (let j in  JSON.parse(data).results[i].release_dates){
                
                if ( JSON.parse(data).results[i].release_dates[j].certification != null) {
                    movie_certification.innerHTML = JSON.parse(data).results[i].release_dates[j].certification;
                    movieGralInfo.appendChild(movie_certification);
                    break;               
                }
                j++;
            }
    }}       
};
    
// SECTION: STREAMING SERVICES
const movieStreaming_not = document.querySelector(".js-not-subscribed");

const movie_url_providers = 'https://api.themoviedb.org/3/movie/' + movieId + '/watch/providers';

fetch(movie_url_providers, options)
    .then(response => response.json())
    .then(response => {
        movie_info_providers(response.results);    
    })
    .catch(err => console.error(err));

function movie_info_providers(providers){
    // TODO the country initials could be taken from the profile info.
    if (providers.CA != null){
        if (providers.CA.flatrate != undefined) {
            iterate_movie_provider (providers.CA.flatrate);
        } else if (providers.CA.rent != undefined) {
            iterate_movie_provider (providers.CA.rent);
        } else if (providers.CA.buy != undefined) {
            iterate_movie_provider (providers.CA.buy)
        }
    } else {
        console.log ("There is not providers for this country");
    }
}

function iterate_movie_provider (array){
    for (let i in array)  {
        const logo_streaming = document.createElement("img");
        logo_streaming.classList.add("js-streaming-logo");

        logo_streaming.src = base_url + 'w92' + array[i].logo_path;
        logo_streaming.alt = array[i].provider_name;

        movieStreaming_not.appendChild(logo_streaming);
    }
}

// SECTION: COMMENTS /  REVIEWS
const movie_comments = document.querySelector(".js-movie-comments");
theMovieDb.movies.getReviews({"id":movieId }, successCB_Reviews, errorCB)

function successCB_Reviews (data) {
    // TODO Fix the structure to include the hyperlink
    movie_comments.innerHTML = JSON.parse(data).total_results;

}

// SECTION: MOVIE CAST PICTURES
const movieCast = document.querySelector(".js-movie-cast-pictures");

theMovieDb.movies.getCredits({"id":movieId }, successCB_Cast, errorCB);

function successCB_Cast (data) {
    let i = 0;
    JSON.parse(data).cast.forEach(function (artist) { 
        
        if (i < 4) {
            const hyperlink = document.createElement("a");
            const figure = document.createElement("figure");
            const picture = document.createElement("img");
            const name = document.createElement("figcaption");

            if (artist.profile_path != null) {
                picture.src = base_url + 'w154' + artist.profile_path;
                picture.alt = 'Picture of the actor/actress';
            } else {
                // TODO change the placeholder image
                picture.src = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg';  
                picture.alt = 'no image provide for the artist';
                picture.style.width = "154px";                
            }
            
            name.innerHTML = artist.name;
            
            figure.appendChild(picture);       
            figure.appendChild(name);
            hyperlink.appendChild(figure);
            movieCast.appendChild(hyperlink);
            i++;
        }
    });
}

// SECTION: SIMILAR MOVIES / RELATED MOVIES
const movie_related = document.querySelector(".js-movie-related-pictures");

theMovieDb.movies.getSimilarMovies({"id":movieId }, successCB_Similar, errorCB)

function successCB_Similar(data) {
    let i = 0;
    JSON.parse(data).results.forEach(function (movie) {        
        if (i < 4) {
            let hyperlink = createFigureHyperlink (movie, "single_movie.html?id=");
            movie_related.appendChild(hyperlink);
            i++;
        } 
    });
}

// SECTION: RECOMMENDATIONS / PEOPLE ALSO WATCHED
const movie_recommended = document.querySelector(".js-movie-also-pictures");
theMovieDb.movies.getPopular({}, successCB_Popular, errorCB);

function successCB_Popular(data) {
    let i = 0;
    JSON.parse(data).results.forEach(function (movie) {        
        if (i < 4) {
            let hyperlink = createFigureHyperlink (movie, "single_movie.html?id=");
            movie_recommended.appendChild(hyperlink);
            i++;
        } 
    });
}

function createFigureHyperlink (object, path){
    const hyperlink = document.createElement("a");
    const figure = document.createElement("figure");
    const poster = document.createElement("img");
    const title = document.createElement("figcaption");

    // TODO: Place holder poster
    poster.src = base_url + 'w154' + object.poster_path;
    title.innerHTML = object.title;

    hyperlink.setAttribute("href",path + object.id);

    figure.appendChild(poster);       
    figure.appendChild(title);
    hyperlink.appendChild(figure);
    return hyperlink;
}

// ----------------------------------------------------------
function errorCB(data) {
    console.log("Error callback: " + data);
}
