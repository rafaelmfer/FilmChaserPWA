import { ACCESS_TOKEN_TMDB } from "../local_properties.js";

// ==search by category: genres==

const searchButtongenres = document.querySelector("#searchButtonGenres");
const inputGenres= document.getElementById("search-by-genres")

function searchBygenres() {
  
  var inputValue = inputGenres.value.toLowerCase();
  var genresName = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War"];

  var foundGenres = genresName.filter(function(text) {
    return text.toLowerCase().startsWith(inputValue);
  });  

  return foundGenres;
}

searchButtongenres.addEventListener(
  "click", () => {

    let resultOfGenres = searchBygenres();

    createGenresResult(resultOfGenres[0]);

    console.log(resultOfGenres);
    
  },
  1000
);

function createGenresResult(genres) {

  var genresContainer = document.querySelector(".genres-container")

  var genresDiv = document.createElement("div");
  genresDiv.classList.add("genres-tags-container");

  var cross = document.createElement("i")
  cross.classList.add("fa-solid", "fa-circle-xmark")

  var tag = document.createElement("p");
  tag.classList.add("genres-name");
  tag.textContent = genres

  // put the element created inside genress-images-container
  genresDiv.appendChild(cross);
  genresDiv.appendChild(tag);

  genresContainer.appendChild(genresDiv);
}

// click on "cross" icon to remove items

document.addEventListener("DOMContentLoaded", function () {
  function removeParentDiv(event) {
      const parentDiv = event.target.closest(".genres-tag");
      if (parentDiv) {
          parentDiv.remove();
      }
  }

  document.body.addEventListener("click", function (event) {
      if (event.target.classList.contains("fa-circle-xmark")) {
          removeParentDiv(event);
      }
  });
});




// ==search by category: actors==
const inputActor= document.getElementById("search-by-actor")
const searchButtonActor = document.querySelector("#searchButtonActor");

async function searchByActor() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        ACCESS_TOKEN_TMDB,
        
    },
  };

  let searchApi = await fetch(
    "https://api.themoviedb.org/3/search/person?query="+
    inputActor.value +
    "&include_adult=false&language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => console.error(err));

  return searchApi;
}

searchButtonActor.addEventListener(
  "click",
  async () => {

    let resultOfTheApi = await searchByActor();

    createActorResult(resultOfTheApi.results[0]);

    console.log(resultOfTheApi);
    
  },
  1000
);

function createActorResult(actor) {

  var actorContainer = document.querySelector(".actors-images-container")
  var actorDiv = document.createElement("div");
  actorDiv.classList.add("actor-image");

  var cross = document.createElement("i")
  cross.classList.add("fa-solid", "fa-circle-xmark")

  const base_url = "https://image.tmdb.org/t/p/";
  const file_size ="w154"; 

  var img = document.createElement("img");
  img.src = base_url + file_size + actor.profile_path;
  img.alt = actor.name;

  var name = document.createElement("p");
  name.classList.add("actor-name");
  name.textContent = actor.name 

  // put the element created inside actors-images-container
  actorDiv.appendChild(cross);
  actorDiv.appendChild(img);
  actorDiv.appendChild(name);

  actorContainer.appendChild(actorDiv);
}

// click on "cross" icon to remove items

document.addEventListener("DOMContentLoaded", function () {
  function removeParentDiv(event) {
      const parentDiv = event.target.closest(".actor-image");
      if (parentDiv) {
          parentDiv.remove();
      }
  }

  document.body.addEventListener("click", function (event) {
      if (event.target.classList.contains("fa-circle-xmark")) {
          removeParentDiv(event);
      }
  });
});



// ==search by category: directors==
const inputDirector= document.getElementById("search-by-director")
const searchButtonDirector = document.querySelector("#searchButtonDirector");

async function searchByDirector() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
       ACCESS_TOKEN_TMDB,
    },
  };

  let searchApi = await fetch(
    "https://api.themoviedb.org/3/search/person?query="+
    inputDirector.value +
    "&include_adult=false&language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => console.error(err));

  return searchApi;
}

searchButtonDirector.addEventListener(
  "click",
  async () => {

    let resultOfTheApi = await searchByDirector();

    createDirectorResult(resultOfTheApi.results[0]);

    console.log(resultOfTheApi);
    
  },
  1000
);

function createDirectorResult(director) {

  var directorContainer = document.querySelector(".directors-images-container")
  var directorDiv = document.createElement("div");
  directorDiv.classList.add("director-image");

  var cross = document.createElement("i")
  cross.classList.add("fa-solid", "fa-circle-xmark")

  const base_url = "https://image.tmdb.org/t/p/";
  const file_size ="w154"; 

  var img = document.createElement("img");
  img.src = base_url + file_size + director.profile_path;
  img.alt = director.name;

  var name = document.createElement("p");
  name.classList.add("director-name");
  name.textContent = director.name 

  // put the element created inside directors-images-container
  directorDiv.appendChild(cross);
  directorDiv.appendChild(img);
  directorDiv.appendChild(name);

  directorContainer.appendChild(directorDiv);
}

// click on "cross" icon to remove items

document.addEventListener("DOMContentLoaded", function () {
  function removeParentDiv(event) {
      const parentDiv = event.target.closest(".director-image");
      if (parentDiv) {
          parentDiv.remove();
      }
  }

  document.body.addEventListener("click", function (event) {
      if (event.target.classList.contains("fa-circle-xmark")) {
          removeParentDiv(event);
      }
  });
});