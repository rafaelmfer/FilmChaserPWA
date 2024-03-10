import { checkSession } from "./auth.js";
import {
    getInfoDb,
    getAllDocsInSubcollection,
    getDocsByQuery,
} from "./firestore.js";

let mainFriends = document.getElementById("main-Friends");
let mainDiscover = document.getElementById("mainDiscover");
let mainDiscover2 = document.getElementById("mainDiscover2");

let activeShowsMovies = document.querySelector("#active-shows-movies");
let activeFriends = document.querySelector("#active-friends");

activeFriends.addEventListener("click", () => {
    mainFriends.classList.add("active");
    mainDiscover.classList.add("notActive");
    mainDiscover2.classList.add("notActive");
});

activeShowsMovies.addEventListener("click", () => {
    mainFriends.classList.remove("active");
    mainDiscover.classList.remove("notActive");
    mainDiscover2.classList.add("notActive");
});

//need delete after getting the data from FIREBASE
let myObj = [
    {
        id: 1668,
        name: "Series",
        media_type: "tv",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
        poster_path: "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
    },
    {
        id: 1669,
        title: "Movie",
        media_type: "movie",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
        poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    },
    {
        id: 1668,
        name: "Series",
        media_type: "tv",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
        poster_path: "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
    },
    {
        id: 1669,
        title: "Movie",
        media_type: "movie",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
        poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    },
    {
        id: 1668,
        name: "Series",
        media_type: "tv",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
        poster_path: "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
    },
    {
        id: 1669,
        title: "Movie",
        media_type: "movie",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
        poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    },
    {
        id: 1668,
        name: "Series",
        media_type: "tv",
        release_date: "2023-12-07",
        vote_average: 8.42342,
        overview:
            "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
        poster_path: "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
    },
];

let res = [...myObj];

createCarousel(res);

//CREATE FRIENDS CAROUSEL
function createCarousel(friend) {
    // Create section element
    var section = document.createElement("section");
    section.className = "section_movies";

    // Create div.div_movies element
    var divMovies = document.createElement("div");
    divMovies.className = "div_movies";

    // Create div.movies_title_h2 element
    var divTitle = document.createElement("div");
    divTitle.className = "movies_title_h2";

    // Create h2 element
    var h2 = document.createElement("h2");
    h2.textContent = "User Name ";

    // Create span element
    var span = document.createElement("span");
    var a = document.createElement("a");
    a.href = "#";
    a.textContent = "See More ";
    span.appendChild(a);
    h2.appendChild(span);
    divTitle.appendChild(h2);

    // Append div.movies_title_h2 to div.div_movies
    divMovies.appendChild(divTitle);

    // Create div.swiper.mySwiper.mySwiper1 element
    var divSwiper = document.createElement("div");
    divSwiper.className = "swiper mySwiper mySwiper1";

    // Create div.swiper-wrapper element
    var divSwiperWrapper = document.createElement("div");
    divSwiperWrapper.className = "swiper-wrapper";

    // Create multiple swiper-slide elements
    for (var i = 0; i < friend.length; i++) {
        var swiperSlide = document.createElement("div");
        swiperSlide.className = "swiper-slide";

        var documentaryImg = document.createElement("div");
        documentaryImg.className = "documentary_img4";

        var a = document.createElement("a");
        a.href = "single_movie.html?id=1011985";

        var divImage = document.createElement("div");
        divImage.className = "div_image";

        var img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/original" + friend[i].poster_path;

        var p = document.createElement("p");
        p.textContent = "Kung Fu Panda 4";

        divImage.appendChild(img);
        divImage.appendChild(p);
        a.appendChild(divImage);
        documentaryImg.appendChild(a);
        swiperSlide.appendChild(documentaryImg);
        divSwiperWrapper.appendChild(swiperSlide);
    }

    // Append div.swiper-wrapper to div.swiper.mySwiper.mySwiper1
    divSwiper.appendChild(divSwiperWrapper);

    // Create div.swiper-button-next and div.swiper-button-prev elements
    var divNextButton = document.createElement("div");
    divNextButton.className = "swiper-button-next";

    var divPrevButton = document.createElement("div");
    divPrevButton.className = "swiper-button-prev";

    // Append div.swiper-button-next and div.swiper-button-prev to div.swiper.mySwiper.mySwiper1
    divSwiper.appendChild(divNextButton);
    divSwiper.appendChild(divPrevButton);

    // Append div.swiper.mySwiper.mySwiper1 to div.div_movies
    divMovies.appendChild(divSwiper);

    // Append div.div_movies to section.section_movies
    section.appendChild(divMovies);

    if (mainFriends) {
        mainFriends.appendChild(section);
    }
}
