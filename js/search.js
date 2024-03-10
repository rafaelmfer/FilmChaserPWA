import { ACCESS_TOKEN_TMDB } from "../local_properties.js";
import { inicia } from "../js/common.js";
import { activeScreen } from "./showall.js";

const btnSearch = document.getElementById("btnSearch");
const search_field = document.querySelector("#search_field");

btnSearch.addEventListener("click", () => {
    activeScreen();

    inicia(search_field.value, 1)
        .then((e) => e.json())
        .then((res) => {
            showResult(res);
        })
        .catch((err) => console.error(err));
});

export function showResult(res) {
    let result_array = res.results;
    let detail = document.querySelector(".div-grid-detail");

    if (detail) {
        detail.innerHTML = "";

        console.log(result_array);

        result_array.forEach((element, index) => {
            let link = document.createElement("a");
            let div = document.createElement("div");
            let img = document.createElement("img");
            let h4 = document.createElement("h4");

            let Image = element.poster_path
                ? "https://image.tmdb.org/t/p/original" + element.poster_path
                : "../resources/imgs/logo.png";

            img.setAttribute("src", Image);

            h4.innerHTML =
                element.name != undefined ? element.name : element.title;

            div.setAttribute("class", "movie-detail");
            div.appendChild(img);
            div.appendChild(h4);
            if (element.media_type == "movie") {
                link.setAttribute("href", "single_movie.html?id=" + element.id);
            } else {
                link.setAttribute("href", "single_series.html?id=" + element.id);
            }
            link.appendChild(div);

            detail.appendChild(link);
        });
    }
}

//**********************SEARCH--->MOVIE********************************** */
export const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: ACCESS_TOKEN_TMDB,
    },
};
