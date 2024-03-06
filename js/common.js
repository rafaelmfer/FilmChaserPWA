import { ACCESS_TOKEN_TMDB } from "../local_properties.js";

// Function Fetch for calling the API
export async function fetchData(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return response.json();
}

// Function to get information from the URL

export function urlInfo(parameter) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameter);
}

//**********************SEARCH--->MOVIE********************************** */
export const options = {
    method: 'GET',
    headers: {
        accept: "application/json",
        Authorization: ACCESS_TOKEN_TMDB,
    },
};

export async function inicia(user_search, page) {
    var result;

    //VARIABLE PAGE IS RETURNING 20 RESULTS FROM FETCH
    result = await fetch(
        "https://api.themoviedb.org/3/search/multi?query=" +
            user_search +
            "&include_adult=false&language=en-US&page=" +
            page,
        options
    );

    return result;
}

export async function allMovies(user_search, page) {
    var result;
    let fetching;

    //VARIABLE PAGE IS RETURNING 20 RESULTS FROM FETCH

    if (user_search == "animation") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16";
    } else if (user_search == "action") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28";
    } else if (user_search == "comedy") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35";
    } else if (user_search == "horror") {
        fetching =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27";
    } else if (user_search == "upcomming") {
        fetching =
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    } else if (user_search == "recommendation") {
        // LINK FOR RECOMMENDATION IS NOT WORKING... TRY AGAIN LATER
        // IT IS SHOWING POPULAR MOVIES...
        // 'https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1'

        fetching =
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    } else {
        fetching =
            "https://api.themoviedb.org/3/trending/" +
            user_search +
            "/day?language=en-US";
    }
    console.log(fetching);
    result = await fetch(fetching, options);

    return result;
}