const all = document.querySelector(".all");
const allP = document.querySelector(".all-p");

const movies = document.querySelector(".movies");
const moviesP = document.querySelector(".movies-p");


const tv = document.querySelector(".tv");
const tvP = document.querySelector(".tv-p");


all.addEventListener("click", (e) => {
    e.preventDefault();
    all.classList.add("active");
    allP.classList.add("active");
  
    try {
      movies.classList.remove("active");
      moviesP.classList.remove("active");

      tv.classList.remove("active");
      tvP.classList.remove("active");

    } catch (error) {}
  });

  movies.addEventListener("click", (e) => {
    e.preventDefault();
    movies.classList.add("active");
    moviesP.classList.add("active");

    try {
      all.classList.remove("active");
      allP.classList.remove("active");

      tv.classList.remove("active");
      tvP.classList.remove("active");

    } catch (error) {}
  });
  
  tv.addEventListener("click", (e) => {
    e.preventDefault();
    tv.classList.add("active");
    tvP.classList.add("active");

    try {
      all.classList.remove("active");
      allP.classList.remove("active");

      movies.classList.remove("active");
      moviesP.classList.remove("active");

    } catch (error) {}
});



const platform = document.querySelector(".filter-platform");

platform.addEventListener("click", (e) => {
    e.preventDefault();
    platform.classList.toggle("active");
});
