
const btn_streaming = document.querySelector(".btn_streaming")

btn_streaming.addEventListener("click",()=>{
    console.log("exibir")
    const section_genre = document.querySelector(".section_genre");
    const section_streaming = document.querySelector(".section_streaming")

    
    section_streaming.classList.toggle("hide");
    section_genre.classList.toggle("show");
})