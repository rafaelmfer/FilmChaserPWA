const watchList = document.querySelector(".watchList");
const upcoming = document.querySelector(".upcoming");
const completed = document.querySelector(".completed");

watchList.addEventListener("click", (e) => {
  e.preventDefault();
  watchList.querySelector(".tab-underline").classList.add("active");

  try {
    upcoming.querySelector(".tab-underline").classList.remove("active");
    completed.querySelector(".tab-underline").classList.remove("active");
  } catch (error) {}
});

upcoming.addEventListener("click", (e) => {
  e.preventDefault();
  upcoming.querySelector(".tab-underline").classList.add("active");

  try {
    watchList.querySelector(".tab-underline").classList.remove("active");
    completed.querySelector(".tab-underline").classList.remove("active");
  } catch (error) {}
});

completed.addEventListener("click", (e) => {
  e.preventDefault();
  completed.querySelector(".tab-underline").classList.add("active");

  try {
    watchList.querySelector(".tab-underline").classList.remove("active");
    upcoming.querySelector(".tab-underline").classList.remove("active");
  } catch (error) {}
});
