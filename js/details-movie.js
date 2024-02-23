'use strict';
import { ACCESS_TOKEN_TMDB } from '../local_properties.js';
// TODO import inicia function

const movieHeader = document.querySelector(".movie-header");
const movieTitle = document.querySelector(".movie--title");
const movieGralInfo = document.querySelector(".js-movie--general-info");
const movieInfoDetails = document.querySelector(".section--movie-info-details");


// TODO get the ID from the home page selection or url
const movieId = "8392"; //Totoro movie
//"157336"; //Interestellar

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
const movie_url = 'https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US';

fetch(movie_url, options)
    .then(response => response.json())
    .then(response => {
        movie_info_write(response);  
    })
    .catch(err => console.error(err));

function movie_info_write (movie){    
        
    let image_path = base_url + file_size + movie.backdrop_path;

    movieHeader.style.backgroundImage = `url(${image_path})`;
    movieHeader.style.backgroundSize = "cover";
        
    movieTitle.innerHTML = movie.title;
    const movieYear = document.createElement("p");
    movieYear.innerHTML = movie.release_date.slice(0,4);
    movieGralInfo.appendChild(movieYear);

    const movieInfoDetails_child = document.createElement("div");
    const movieYear_second = document.createElement("p");
    movieYear_second.innerHTML = movie.release_date.slice(0,4);
    movieInfoDetails_child.appendChild(movieYear_second);
    movieInfoDetails.appendChild(movieInfoDetails_child);

    const movie_categories = document.createElement("p");
    let category = "";
    for (let i in movie.genres){
        category = category + movie.genres[i].name + ", ";   
    }
    movie_categories.innerHTML = category.substring(0,category.length-2);
    movieInfoDetails_child.appendChild(movie_categories);
    
    


    const movie_duration = document.createElement("p");
    const hours = Math.floor(movie.runtime / 60);
    const minutes = 86 % 60;
    movie_duration.innerHTML = `${hours}h ${minutes}m`;
    movieGralInfo.appendChild(movie_duration);

    const movieInfoDetails_votes = document.createElement("div");
    const movie_vote_average = document.createElement("p");
    const movie_vote_stars = document.createElement("p");

    let vote_average = movie.vote_average * 5 / 10 ;
    movie_vote_average.innerHTML = vote_average.toFixed(2) + "/5 (" + movie.vote_count + ")";

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
    movie_paragraph.innerHTML = movie.overview;       
    movieInfoDetails.appendChild(movie_paragraph);

    const movie_duration_second = document.createElement("p");
    movie_duration_second.innerHTML =`<span class="material-symbols-outlined">
    timer</span> ${hours}h ${minutes}m`;
    movieInfoDetails.appendChild(movie_duration_second);
}


// SECTION: HERO IMAGE -> call to get the certification  
const movie_release_url = 'https://api.themoviedb.org/3/movie/' + movieId + '/release_dates';
fetch(movie_release_url, options)
    .then(response => response.json())
    .then(response => {
        movie_info_certification(response.results);
        })
    .catch(err => console.error(err));

function movie_info_certification(results){

    for (let i in results){
        if (results[i].iso_3166_1 === 'CA' || results[i].iso_3166_1 === 'US'){
            console.log(results[i]);
            // TODO filter with the profile info. 
            const movie_certification = document.createElement("p");
            movie_certification.innerHTML = results[i].release_dates[3].certification;
            movieGralInfo.appendChild(movie_certification);
        }            
    }
}

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
    // But I don't know how to rename an object key
    // let country = 'CA';
    // only choose the streaming
    let country_base_url = providers.CA.link;
    
    for (let i in providers.CA.rent)  {
        const logo_streaming = document.createElement("img");
        logo_streaming.classList.add("js-streaming-logo");

        logo_streaming.src = base_url + 'w92' + providers.CA.rent[i].logo_path;
        logo_streaming.alt = providers.CA.rent[i].provider_name;

        movieStreaming_not.appendChild(logo_streaming);
    }
}

// SECTION: COMMENTS /  REVIEWS
const movie_comments = document.querySelector(".js-movie-comments");
const movie_review_url = 'https://api.themoviedb.org/3/movie/' + movieId + '/reviews?language=en-US'
fetch(movie_review_url, options)
    .then(response => response.json())
    .then(response => {
       movie_comments.innerHTML = response.total_results ;
    })
    .catch(err => console.error(err));

// SECTION: MOVIE CAST PICTURES
const movieCast = document.querySelector(".movie-cast-pictures");
const movie_url_credits = 'https://api.themoviedb.org/3/movie/' + movieId + '/credits?language=en-US';

fetch(movie_url_credits, options)
    .then(response => response.json())
    .then(response => {
        movie_info_cast(response); 
    })
    .catch(err => console.error(err));

function movie_info_cast (movie) {
    let cast = movie.cast;
    let i = 0;

    for (let artist of cast) {
        // console.log(artist.name, artist.id, artist.profile_path);
        if (i < 4) {
            const artist_figure = document.createElement("figure");
            const artist_picture = document.createElement("img");
            const artist_name = document.createElement("figcaption");

            if (artist.profile_path != null) {
                artist_picture.src = base_url + 'w154' + artist.profile_path;
                artist_picture.alt = 'Picture of the actor/actress';
            } else {
                // TODO change the placeholder image
                artist_picture.src = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg';  
                artist_picture.alt = 'no image provide for the artist';
            }
            
            artist_name.innerHTML = artist.name;
            
            artist_figure.appendChild(artist_picture);       
            artist_figure.appendChild(artist_name);
            movieCast.appendChild(artist_figure);
            i++;
        }
    }
}


// SECTION: SIMILAR MOVIES / RELATED MOVIES
const movie_related = document.querySelector(".movie-related-pictures");

const movie_url_similar = 'https://api.themoviedb.org/3/movie/' + movieId + '/similar?language=en-US&page=1';
fetch(movie_url_similar, options)
    .then(response => response.json())
    .then(response => {
        let i =0;
        for (let similar of response.results) {
            if (i < 4) {
                const similar_figure = document.createElement("figure");
                const similar_poster = document.createElement("img");
                const similar_title = document.createElement("figcaption");

                similar_poster.src = base_url + 'w154' + similar.poster_path;
                similar_title.innerHTML = similar.title;

                similar_figure.appendChild(similar_poster);       
                similar_figure.appendChild(similar_title);
                movie_related.appendChild(similar_figure);
                i++;
            }
        }
    })
    .catch(err => console.error(err));

// SECTION: RECOMMENDATIONS / PEOPLE ALSO WATCHED
const movie_recommended = document.querySelector(".movie-also-pictures");
// TAKE them from trending
const movie_url_recommended = 'https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?language=en-US&page=1';

fetch(movie_url_recommended, options)
    .then(response => response.json())
    .then(response => {
        let i =0;
        for (let recommend of response.results) {
            if (i < 4) {
                const recommend_figure = document.createElement("figure");
                const recommend_poster = document.createElement("img");
                const recommend_title = document.createElement("figcaption");

                recommend_poster.src = base_url + 'w154' + recommend.poster_path;
                recommend_title.innerHTML = recommend.title;

                recommend_figure.appendChild(recommend_poster);       
                recommend_figure.appendChild(recommend_title);
                movie_recommended.appendChild(recommend_figure);
                i++;
            }
        }
    })
    .catch(err => console.error(err));