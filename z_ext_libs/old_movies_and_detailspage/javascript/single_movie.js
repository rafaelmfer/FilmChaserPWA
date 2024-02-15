// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string into a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const id_search = urlParams.get('id');
console.log(id_search); // shirt


const watchedMovie = document.getElementById("watchedMovie")


watchedMovie.addEventListener("click",()=>{
  const checkboxResult = document.getElementById("checkboxResult")

  if(watchedMovie.checked){
    checkboxResult.innerHTML= "true";
  }else{
    checkboxResult.innerHTML= "false";
  }
})


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY
    }
  };
  



  fetch(`https://api.themoviedb.org/3/movie/${id_search}?language=en-US`, options)
    .then(response => response.json())
    .then(response =>{ 
        console.log(response)

        console.log(response.homepage);

        const divImage = document.createElement("div")
        const main = document.querySelector(".main")
        const overview = document.createElement("p")
        const homepage = document.createElement("p")
        const releaseDate = document.createElement("p")

        overview.innerHTML = response.overview;

        let image = document.createElement("img")
        image.src = `https://image.tmdb.org/t/p/original${response.poster_path}`;
        image.setAttribute("class","movieImage");


        divImage.setAttribute("class","divImage")
        divImage.appendChild(image)


        homepage.innerHTML = "HOMEPAGE: "+response.homepage;

        releaseDate.innerHTML = "Release Date: "+response.release_date;


        let title = document.createElement("h1")
        title.innerHTML = response.title;

        main.appendChild(divImage)
        main.appendChild(title);
        main.appendChild(overview);
        main.appendChild(releaseDate);

      

   

    })
    .catch(err => console.error(err));
