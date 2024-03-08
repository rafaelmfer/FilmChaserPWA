'use strict';
import { ACCESS_TOKEN_TMDB } from '../local_properties.js';

import { urlInfo } from './common.js';
var seriesId = urlInfo("id");

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

const movieHeader = document.querySelector(".js-movie-header");
const mediaTitle = document.querySelector(".js-media--title");
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

theMovieDb.tv.getById({"id":seriesId }, successCB_series, errorCB);

function successCB_series (data) {
    const image_path = base_url + file_size + JSON.parse(data).backdrop_path;
    
    // INFO THAT NEEDS TO BE STORE GLOBALLY
    // ###########
    const number_of_seasons = JSON.parse(data).number_of_seasons;
    const in_production = JSON.parse(data).in_production; //This is a boolean
    

    movieHeader.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0),rgba(0, 0, 0, 0.95)),url(${image_path})`;
    movieHeader.style.backgroundSize = "cover";

    mediaTitle.innerHTML = JSON.parse(data).name;

    const mediaType = document.createElement("p");
    mediaType.innerHTML = JSON.parse(data).type;
    movieGralInfo.appendChild(mediaType);

    const mediaYear = document.createElement("p");
    mediaYear.innerHTML = JSON.parse(data).seasons[0].air_date.slice(0,4);
    movieGralInfo.appendChild(mediaYear);

    const movieInfoDetails_child = document.createElement("div");
    const mediaYear_second = document.createElement("p");
    mediaYear_second.innerHTML = JSON.parse(data).seasons[0].air_date.slice(0,4);
    movieInfoDetails_child.appendChild(mediaYear_second);
    movieInfoDetails.appendChild(movieInfoDetails_child);

    const movie_categories = document.createElement("p");
    let category = "";
    for (let i in JSON.parse(data).genres){
        category = category + JSON.parse(data).genres[i].name + ", ";   
    }
    movie_categories.innerHTML = category.substring(0,category.length-2);
    movieInfoDetails_child.appendChild(movie_categories);

    

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

    if (JSON.parse(data).episode_run_time.length != 0) {
        const episode_duration = document.createElement("p");
        episode_duration.innerHTML = `${JSON.parse(data).episode_run_time[0]} m`;
        movieGralInfo.appendChild(episode_duration);

        const episode_duration_second = document.createElement("p");
        episode_duration_second.innerHTML =`<span class="material-symbols-outlined">timer</span> ${JSON.parse(data).episode_run_time[0]}m`;
        movieInfoDetails.appendChild(episode_duration_second);
    }


}

//Call to get the certification  
theMovieDb.tv.getContentRatings({"id":seriesId }, successCB_rating, errorCB)

function successCB_rating (data) {
    const media_certification = document.createElement("p");
    for (let i in JSON.parse(data).results){
        // TODO filter with the profile info. 
        if (JSON.parse(data).results[i].iso_3166_1 === 'CA' || JSON.parse(data).results[i].iso_3166_1 === 'US'){
            media_certification.innerHTML = JSON.parse(data).results[i].rating;
            movieGralInfo.appendChild(media_certification);
    }}       
};

// SECTION: STREAMING SERVICES
const mediaStreaming_not = document.querySelector(".js-not-subscribed");

const media_url_providers = 'https://api.themoviedb.org/3/tv/' + seriesId + '/watch/providers';

fetch(media_url_providers, options)
    .then(response => response.json())
    .then(response => {
        media_info_providers(response.results);    
    })
    .catch(err => console.error(err));

function media_info_providers(providers){
    // TODO the country initials could be taken from the profile info.
    if (providers.CA != null){
        if (providers.CA.flatrate != undefined) {
            iterate_media_provider (providers.CA.flatrate);
        } else if (providers.CA.rent != undefined) {
            iterate_media_provider (providers.CA.rent);
        } else if (providers.CA.buy != undefined) {
            iterate_media_provider (providers.CA.buy)
        }
    } else {
        console.log ("There is not providers for this country");
    }
}

function iterate_media_provider (array){
    for (let i in array)  {
        const logo_streaming = document.createElement("img");
        logo_streaming.classList.add("js-streaming-logo");

        logo_streaming.src = base_url + 'w92' + array[i].logo_path;
        logo_streaming.alt = array[i].provider_name;

        mediaStreaming_not.appendChild(logo_streaming);
    }
}


// SECTION: COMMENTS /  REVIEWS
const media_comments = document.querySelector(".js-movie-comments");
theMovieDb.tv.getReviews({"id":seriesId }, successCB_Reviews, errorCB);

function successCB_Reviews (data) {
    // TODO Fix the structure to include the hyperlink
    media_comments.innerHTML = JSON.parse(data).total_results;

}

// SECTION: MOVIE CAST PICTURES
const mediaCast = document.querySelector(".js-media-cast-pictures");
theMovieDb.tv.getCredits({"id":seriesId}, successCB_Cast, errorCB)

function successCB_Cast (data) {
    let i = 0;
    JSON.parse(data).cast.forEach(function (artist) { 
        
        if (i <= 4) {
            const divSwiper = document.createElement("div");

            divSwiper.classList.add ="swiper-slide";

            divSwiper.setAttribute("role","group");
            divSwiper.setAttribute("aria-labe",`${i+1} / 9`);
            // divSwiper.style.width = "380.333px";
            divSwiper.style.marginRight = "30px";

            if (i == 0){    
                divSwiper.classList.add = "swiper-slide-active" ;
            } else if (i == 1){
                divSwiper.classList.add = "swiper-slide-next" ;
            }


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
            divSwiper.appendChild(hyperlink);
            mediaCast.appendChild(divSwiper);
            i++;
        }
    });
}

// SECTION: SIMILAR MOVIES / RELATED MOVIES
const movie_related = document.querySelector(".js-movie-related-pictures");
theMovieDb.tv.getSimilar({"id":seriesId }, successCB_Similar, errorCB);


function successCB_Similar(data) {
    let i = 0;
    JSON.parse(data).results.forEach(function (media) {        
        if (i < 4) {
            let hyperlink = createFigureHyperlink (media, "single_series.html?id=");
            movie_related.appendChild(hyperlink);
            i++;
        } 
    });
}

// SECTION: RECOMMENDATIONS / PEOPLE ALSO WATCHED
const tv_recommended = document.querySelector(".js-movie-also-pictures");
theMovieDb.tv.getRecommendations({"id":seriesId }, successCB_Popular, errorCB)

function successCB_Popular(data) {
    let i = 0;
    JSON.parse(data).results.forEach(function (media) {        
        if (i < 4) {
            let hyperlink = createFigureHyperlink (media, "single_series.html?id=");

            tv_recommended.appendChild(hyperlink);
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
    title.innerHTML = object.name;

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




// SPA
const allPages = document.querySelectorAll('div.page');
allPages[0].style.display = 'grid';

function navigateToPage() {
  const pageId = window.location.hash ? window.location.hash : '#page1';
  for (let page of allPages) {
    if (pageId === '#' + page.id) {
      page.style.display = 'grid';
    } else {
      page.style.display = 'none';
    }
  }
  return;
}
navigateToPage();

//init handler for hash navigation
window.addEventListener('hashchange', navigateToPage);

// ##########################################################
// SECTION: EPISODES

// ACCORDION
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


const  allSelect = document.querySelector("form .selectAll input");
const quantity = document.querySelector(".quantity");
const numberOfEpisodes = document.querySelector(".numberOfEpisodes");

document.addEventListener("DOMContentLoaded", function (){

    // ESTO ESTABA AFUERA
    theMovieDb.tvSeasons.getById({"id":seriesId, "season_number": 1}, successCB_season, errorCB)
    

    const panels = document.getElementsByClassName("panel");

    function successCB_season (data){
        createEpisodesCard(JSON.parse(data));
        console.log("SEASON INFO:",JSON.parse(data));
        numberOfEpisodes.innerText = ` / ${JSON.parse(data).episodes.length}`;
    }
    function createEpisodesCard (object){
    
        for (i = 0; i < object.episodes.length; i++) {
            
            const card = document.createElement("div");
            card.classList.add("episodeCard");
            card.addEventListener("click", episodeCounter);

            const poster = document.createElement("img"),
                  innerDiv = document.createElement("div");
            innerDiv.classList.add("inputField");
    
            const label = document.createElement("label");
            const episodeNumber = object.episodes[i].episode_number;
            label.setAttribute("for",'episode' + episodeNumber);
    
            const input = document.createElement("input");
            // CREATED TO TRY TO BLOCK input eventlistener behaviour
            input.addEventListener("click", (e)=>{
                e.preventDefault();
            })
            input.setAttribute("type","checkbox");
            input.setAttribute("id",'episode' + episodeNumber);
            input.setAttribute("name",`season${object.season_number}`);
            
            poster.src = object.episodes[i].still_path ? base_url + 'w154' + object.episodes[i].still_path : base_url + 'w154' + object.poster_path;
            
            label.innerHTML = `<p>S${object.season_number} | E${object.episodes[i].episode_number}</p> <p>${object.episodes[i].name}</p> `;
    
            
            card.appendChild(poster);       
            innerDiv.appendChild(label);
            innerDiv.appendChild(input);
            card.appendChild(innerDiv);
            panels[0].appendChild(card);  
            
        }
    }
});


allSelect.addEventListener('click', (event)=>{
    console.log("ALL SELECTED CLASS:",event.target);
    
    const episodes = document.querySelectorAll("episodeCard");
    for (let episode in episodes){
        episode.toggle("checked");
        episode.childNodes[1].lastElementChild.toggleAttribute("checked");
        var watched = document.querySelectorAll("div.checked");
        quantity.innerHTML = `${watched.length}` ;
    }
    

})

function episodeCounter (event){
    this.classList.toggle("checked");
    this.childNodes[1].lastElementChild.toggleAttribute("checked");


    var watched = document.querySelectorAll("div.checked");
    quantity.innerHTML = `${watched.length}` ;
    
}
