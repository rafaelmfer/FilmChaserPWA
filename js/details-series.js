'use strict';

import { urlInfo,
        createCarousel,
        initializeCarousel,
        options, 
} from './common.js';
import { checkSession } from "./auth.js";
import {
    getInfoDb,
    saveTvShowInDb2,
    updateInfoDb,
    deleteInfoDb,
    listenToDocumentChanges,
} from "./firestore.js";

import { theMovieDb } from "../z_ext_libs/themoviedb/themoviedb.js";

  var seriesId = urlInfo("id");
  let seriesDetails = {};
  const movieHeader = document.querySelector(".js-movie-header");
  const mediaTitle = document.querySelector(".js-media--title");
  const movieGralInfo = document.querySelector(".js-movie--general-info");
  const movieInfoDetails = document.querySelector(".js-section--movie-info-details");  

// SECTION: HERO IMAGE ==================================

// PATH TO THE IMAGE POSTER
const base_url = "https://image.tmdb.org/t/p/";

// This is the horizontal size, and needs to be use with the backdrop_path
const file_size ="w1000_and_h450_multi_faces"; 
let number_of_seasons = 0;

theMovieDb.tv.getById({"id":seriesId }, successCB_series, errorCB);

function successCB_series (data) {
    seriesDetails = JSON.parse(data);

    const image_path = base_url + file_size + JSON.parse(data).backdrop_path;
    
    movieHeader.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 3.57%, rgba(0, 0, 0, 0.52) 30.06%, #000 100%), url(${image_path})`;

    mediaTitle.innerHTML = JSON.parse(data).name;

    const mediaType = document.createElement("p");
    mediaType.innerHTML = JSON.parse(data).type;
    movieGralInfo.appendChild(mediaType);

    const mediaYear = document.createElement("p");
    mediaYear.innerHTML = JSON.parse(data).first_air_date.slice(0,4);
    movieGralInfo.appendChild(mediaYear);

    const movieInfoDetails_child = document.createElement("div");
    const mediaYear_second = document.createElement("p");
    mediaYear_second.innerHTML = JSON.parse(data).first_air_date.slice(0,4);
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
    movieInfoDetails_votes.classList.add("small-size-font");
    const movie_vote_average = document.createElement("p");
    const movie_vote_stars = document.createElement("p");

    
    let vote_average = JSON.parse(data).vote_average * 5 / 10 ;
    movie_vote_average.innerHTML = vote_average.toFixed(2) + " / 5 (" + JSON.parse(data).vote_count + ")";

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

// SECTION BUTTONS (Watchlist, Completed)
const user = await checkSession();
let documentId = user.uid;

const userDoc = await getInfoDb(`users/${documentId}`);
document.getElementById("userName").innerHTML = userDoc.name;
document.getElementById("userPicture").src = userDoc.profile_photo || "../resources/imgs/profile/profile2.png";

const watchlistPathInFirebase = `users/${documentId}/watchlist`;

const btWatchlist = document.getElementById("js-add-watchlist");
const btCompleted = document.getElementById("js-completed");

const watchlistImg = btWatchlist.querySelector("img");
const completedImg = btCompleted.querySelector("img");

let itemAdded = {};

const unsub = listenToDocumentChanges(
    watchlistPathInFirebase,
    seriesId,
    handleDocumentChanges,
    {}
);

function handleDocumentChanges(data) {
    console.log("Documento atualizado:", data);
    // Faça o que você precisa com os dados atualizados do documento aqui
    itemAdded = data;

    watchlistImg.src = itemAdded
        ? "../resources/icons/icons-active/active-heart.svg"
        : "../resources/icons/icons-default/default-heart.svg";

    completedImg.src = itemAdded
        ? itemAdded.completed
            ? "../resources/icons/icons-active/active-completed.svg"
            : "../resources/icons/icons-default/default-completed.svg"
        : "../resources/icons/icons-default/default-completed.svg";
}

btWatchlist.addEventListener("click", async function (event) {
    event.preventDefault();

    if (itemAdded && itemAdded.id === Number(seriesId)) {
        await deleteInfoDb(`${watchlistPathInFirebase}/${seriesId}`);
    } else {
        await saveTvShowInDb2(
            watchlistPathInFirebase,
            seriesId,
            seriesDetails,
            false
        );
    }
});

btCompleted.addEventListener("click", async function (event) {
    event.preventDefault();

    if (itemAdded && itemAdded.id === Number(seriesId)) {
        const updatedCompletedState =
            itemAdded.completed === true ? false : true;
        await updateInfoDb(`${watchlistPathInFirebase}/${seriesId}`, {
            completed: updatedCompletedState,
        });
    } else {
        await saveTvShowInDb2(
            watchlistPathInFirebase,
            seriesId,
            seriesDetails,
            true
        );
    }
});



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

// =====================================
function display() {
    theMovieDb.tv.getCredits({"id":seriesId}, data => successCB_Cast(data,theMovieDb.tv.getSimilar({"id":seriesId }, data => successCB_Similar2(data, theMovieDb.tv.getRecommendations({"id":seriesId }, data => successCB_Popular(data), errorCB)), errorCB) ), errorCB);
}

display ();

// SECTION: SERIE CAST PICTURES
// theMovieDb.tv.getCredits({"id":seriesId}, successCB_Cast, errorCB);

function successCB_Cast (data,xx) {
    if (JSON.parse(data).cast.length > 0){
        createSectionWithFilms("Cast", JSON.parse(data).cast); 
    }
  
    xx;   
}



// theMovieDb.tv.getSimilar({"id":seriesId }, successCB_Similar, errorCB);

function successCB_Similar(data) {
    if (JSON.parse(data).results.length >0){
        createSectionWithFilms("Related Series", JSON.parse(data).results);
    }
}

function successCB_Similar2(data, xx) {
    if (JSON.parse(data).results.length >0){
        createSectionWithFilms("Related Series", JSON.parse(data).results);
    }
    
    xx;
}

// SECTION: RECOMMENDATIONS / PEOPLE ALSO WATCHED
// theMovieDb.tv.getRecommendations({"id":seriesId }, successCB_Popular, errorCB);

function successCB_Popular(data) {
    if (JSON.parse(data).results.length > 0) {
        createSectionWithFilms("People Also Watched", JSON.parse(data).results);
    }    
}

// FUNCTIONS OF THE CAROUSEL
const sectionPictures = document.querySelector(".section-pictures");
function createSectionWithFilms(name, films) {
    // Creating the section
    var section = document.createElement("section");
    section.classList.add("component-carousel-no-profile");

    // Creating the section header
    var headerDiv = document.createElement("div");
    headerDiv.classList.add("section-header");

    var nameHeader = document.createElement("h4");
    nameHeader.textContent = name;

    headerDiv.appendChild(nameHeader);

    // Creating the content of the section
    var contentDiv = document.createElement("div");
    contentDiv.classList.add("section-content");

    // Creating the carousel
    var carousel = createCarousel(films, createCarouselItem);   
    contentDiv.appendChild(carousel.container);

    // Adding header and content to the section
    section.appendChild(headerDiv);
    section.appendChild(contentDiv);

    // Adding the section to the main element
    sectionPictures.appendChild(section);

    // Initialize carousel
    initializeCarousel(carousel, 124, 8);
    
}

function createCarouselItem(film) {
    
        var filmDiv = document.createElement("div");
        filmDiv.classList.add("item");

        var link = document.createElement("a");
        link.classList.add("link-item-container");
        if (film.media_type == "movie") {
            link.setAttribute("href", "single_movie.html?id=" + film.id);
        } else if (film.media_type == "tv" || (film.media_type == null & film.first_air_date != null)){
            link.setAttribute("href", "single_series.html?id=" + film.id);
        } else {
         link.setAttribute("href", "#");
        }

        var img = document.createElement("img");
        img.classList.add("movie-series-placeholder");
        if (film.poster_path != undefined) {
            img.src = theMovieDb.common.images_uri + "w154" + film.poster_path  
        } else if (film.profile_path != undefined) {
            img.src = theMovieDb.common.images_uri + "w154" + film.profile_path;
        } else if (film.profile_path == undefined ) {
            img.src = "../resources/imgs/Placeholder/Placeholder_actor(1).png"
        }

        img.alt = film.name || film.title;

        var p = document.createElement("p");
        p.classList.add("small-one");
        p.textContent = film.name || film.title;

        link.appendChild(img);
        link.appendChild(p);

        filmDiv.appendChild(link);
        return filmDiv;
}


// ----------------------------------------------------------

function errorCB(data) {
    console.log("Error callback: " + data);
}


// SPA ======================================
const allPages = document.querySelectorAll('div.page');

allPages[0].style.display = 'grid';

function navigateToPage() {
  const pageId = window.location.hash ? window.location.hash : '#page1';
  for (let page of allPages) {
    if (pageId === '#' + page.id) {
        document.querySelector(`.${page.id}`).classList.toggle('active-tab');
        page.style.display = 'grid';
      
    } else {
        document.querySelector(`.${page.id}`).classList.toggle('active-tab');
      page.style.display = 'none';
      
    }
  }
  return;
}
navigateToPage();

//init handler for hash navigation
window.addEventListener('hashchange', navigateToPage);

// CARROUSEL SEASONS ================================================
// Last season that the user watched
const uSeasonNum = 1;
theMovieDb.tvSeasons.getById({"id":seriesId, "season_number": uSeasonNum}, successCB_tracking, errorCB);


function successCB_tracking (data){
    // Creating the section
    var section = document.createElement("section");
    section.classList.add("section-content--external-wrapper");

    // Creating the content of the section
    var contentDiv = document.createElement("div");
    contentDiv.classList.add("section-content");
    
    // Creating the carousel
    var carousel = createCarousel(JSON.parse(data).episodes, createEpisodesCard2);
    contentDiv.appendChild(carousel.container);
    contentDiv.classList.add(`season${JSON.parse(data).season_number}`)

    section.appendChild(contentDiv);

    // Adding the section to the main element
    var sectionTracking = document.querySelector(".section-tracking");
    sectionTracking.appendChild(section);

    // Initialize carousel
    // initializeCarousel_episodes(carousel);
    initializeCarousel(carousel, 304, 8)
}

 function createEpisodesCard2 (object){
        
        const card = document.createElement("div");
        card.classList.add("item");
         
        card.addEventListener("click", ()=>{
            const sisterCard = document.querySelector(`.season${object.season_number} .episodeCard.episode${object.episode_number}`);
            const cards = document.querySelectorAll(`.season${object.season_number} .item`);
            const divAll = document.querySelector(`.season${object.season_number} .selectAll`);

            const quantity = document.querySelector(`.season${object.season_number} .quantity`); 
            card.classList.toggle("checked");
            sisterCard.classList.toggle("checked");  

            var watched = document.querySelectorAll(`.section-all-seasons .season${object.season_number} div.checked`);
            quantity.innerHTML = `${watched.length}`;
        
            if (watched.length === cards.length){
                 divAll.classList.add("Allchecked");
             } else {
                 divAll.classList.remove("Allchecked");
            }  
        });
    
        const poster = document.createElement("img"),
              innerDiv = document.createElement("div");
        innerDiv.classList.add("inputField");

        const label = document.createElement("label");
        const episodeNumber = object.episode_number;
        
        card.classList.add(`episode${object.episode_number}`);
    
        label.setAttribute("for",'episode' + episodeNumber);

        const box = document.createElement("div");
        box.setAttribute("class","checkbox");
        
        poster.src = object.still_path ? base_url + 'w92' + object.still_path : base_url + 'w92' + object.poster_path;
        

        label.innerHTML = `<p>S${object.season_number} | E${object.episode_number}</p> <p>${object.name.substr(0, 14)}...</p> `;

        
        card.appendChild(poster);       
        innerDiv.appendChild(label);
        innerDiv.appendChild(box);
        card.appendChild(innerDiv);
        
        return card;
    }




// SECTION: EPISODES =================================
const AllSeasons = document.querySelector('.section-all-seasons')

// CREATING THE ACCORDION

theMovieDb.tv.getById({"id":seriesId }, successCB_numSeasons, errorCB);

function successCB_numSeasons (data) {
    
    number_of_seasons = JSON.parse(data).number_of_seasons;

    for (let j=1; j <= number_of_seasons; j++){
        CreateAccordion(j);
    
        // SERIE SELECIONADA
        theMovieDb.tvSeasons.getById({"id":seriesId, "season_number": j}, successCB_season, errorCB);
    
        const allBox = document.getElementById(`season${j}-box`);
        allBox.addEventListener('click', (e) =>{
            e.stopPropagation();
            AllEpisodesSelected(j)
        });
    }

    function successCB_season (data){
        createEpisodesCard(JSON.parse(data));
    
        const numberOfEpisodes = document.querySelector(`.season${JSON.parse(data).season_number} .numberOfEpisodes`);
        numberOfEpisodes.innerText = ` / ${JSON.parse(data).episodes.length}`;
    }

    // ACCORDION =============================================
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
}

async function CreateAccordion (season){
    const seasonDiv = document.createElement("div");
    seasonDiv.classList.add(`season${season}`);

    const accordion = document.createElement("div");
    accordion.classList.add("accordion");

    const selectAll = document.createElement("div");
    selectAll.classList.add("selectAll");

    const seasonTitle = document.createElement("p");
    seasonTitle.classList.add("heading6");
    seasonTitle.innerText = `Season ${season}`;

    const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("checkbox-container");
        const quantity = document.createElement("span");
        quantity.classList.add("quantity");
        quantityContainer.appendChild(quantity);
        
        const numberOfEpisodes = document.createElement("span");
        numberOfEpisodes.classList.add("numberOfEpisodes");
        quantityContainer.appendChild(numberOfEpisodes);

        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");
        checkbox.setAttribute("id",`season${season}-box`);
        quantityContainer.appendChild(checkbox);

        const panel = document.createElement("div");
        panel.classList.add("panel");

    selectAll.appendChild(seasonTitle);
    selectAll.appendChild(quantityContainer);
    accordion.appendChild(selectAll);
    seasonDiv.appendChild(accordion);
    seasonDiv.appendChild(panel);
    AllSeasons.appendChild(seasonDiv); 

}
    
async function createEpisodesCard (object){
        const panel = document.querySelector(`.season${object.season_number} .panel`);
    
        for (let i = 0; i < object.episodes.length; i++) {
            
            const card = document.createElement("div");
            card.classList.add("episodeCard");
            card.classList.add(`episode${i+1}`);
             
            card.addEventListener("click", (event)=>{
                
                const divAll = document.querySelector(`.season${object.season_number} .selectAll`); 
                const cards = document.querySelectorAll(`.season${object.season_number} .episodeCard`); 
                const quantity = document.querySelector(`.season${object.season_number} .quantity`);

                
                event.currentTarget.classList.toggle("checked");

                // CARD ON SECTION TRACKING:
                const section = document.querySelector('.section-tracking .section-content');
                
                if (section.classList.contains(`season${object.season_number}`)) {
                    const sisterCard = document.querySelector(`.section-tracking .season${object.season_number} .episode${object.episodes[i].episode_number}`);
                    sisterCard.classList.toggle("checked");
                }
                


                var watched = document.querySelectorAll(`.section-all-seasons .season${object.season_number} div.checked`);
                quantity.innerHTML = `${watched.length}`;
            
                if (watched.length === cards.length){
                    divAll.classList.add("Allchecked");
                } else {
                    divAll.classList.remove("Allchecked");
                }  
            });

            // I've to do it inside an arrow function to correctly target the element. 
            // episodeCounter(object.season_number));

            const poster = document.createElement("img"),
                  innerDiv = document.createElement("div");
            innerDiv.classList.add("inputField");
    
            const label = document.createElement("label");
            const episodeNumber = object.episodes[i].episode_number;
            label.setAttribute("for",'episode' + episodeNumber);
    
            const box = document.createElement("div");
            box.setAttribute("class","checkbox");
            
            poster.src = object.episodes[i].still_path ? base_url + 'w154' + object.episodes[i].still_path : base_url + 'w154' + object.poster_path;
            
            label.innerHTML = `<p>S${object.season_number} | E${object.episodes[i].episode_number}</p> <p>${object.episodes[i].name}</p> `;
    
            
            card.appendChild(poster);       
            innerDiv.appendChild(label);
            innerDiv.appendChild(box);
            card.appendChild(innerDiv);
            panel.appendChild(card);  
            
        }
}


function AllEpisodesSelected (seasonNum){
    const quantity = document.querySelector(`.season${seasonNum} .quantity`);
    const divAll = document.querySelector(`.season${seasonNum} .selectAll`);
    
    divAll.classList.toggle("Allchecked");

    const episodes = document.querySelectorAll(`.season${seasonNum} .episodeCard`);
    const clones = document.querySelectorAll(`.season${seasonNum} .item`);

    if (divAll.classList.contains("Allchecked") ) {
        if(clones != null){
            for (let clone of clones){
                clone.classList.add("checked");
            }
        }
        for (let episode of episodes){
            episode.classList.add("checked");
        }
    } else {
        if(clones != null){
            for (let clone of clones){
                clone.classList.remove("checked");
            }
        }
        for (let episode of episodes){
            episode.classList.remove("checked");
        }
    }
    var watched = document.querySelectorAll(`.section-all-seasons .season${seasonNum} div.checked`);
    
    quantity.innerHTML = `${watched.length}` ;
}


