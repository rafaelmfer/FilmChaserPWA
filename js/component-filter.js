const allP = document.querySelector(".all-p");
const moviesP = document.querySelector(".movies-p");
const tvP = document.querySelector(".tv-p");

allP.addEventListener("click", (e) => {
    allP.classList.add("active");
  
    try {
      moviesP.classList.remove("active");
      tvP.classList.remove("active");

    } catch (error) {}
  });

  moviesP.addEventListener("click", (e) => {
    moviesP.classList.add("active");

    try {
      allP.classList.remove("active");
      tvP.classList.remove("active");

    } catch (error) {}
  });
  
  tvP.addEventListener("click", (e) => {
    tvP.classList.add("active");

    try {
      allP.classList.remove("active");
      moviesP.classList.remove("active");

    } catch (error) {}
});

const platform = document.querySelector(".filter-platform");

platform.addEventListener("click", (e) => {
    platform.classList.toggle("active");
});
