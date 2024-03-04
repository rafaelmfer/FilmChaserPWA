

        let tela = window.innerWidth;
        let n = 5;

        if (tela < 500) {
            n = 2;
        }

        


        if (tela < 500) {
            n = 2;
        }


    //INITIALIZE CAROUSEL FROM HOME HTML
    export function inicialize_Home_Carousel(){
        for(let x=1; x<8; x++){
            var swiper = new Swiper(".swiper-home-"+x, {
                slidesPerView: n,
                spaceBetween: 30,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            }
            );
        }
    }

  
    export function inicialize_discover_Carousel(){

        for(let x=1; x<8; x++){
            new Swiper(".discover-swiper-"+x, {
                slidesPerView: n,
                spaceBetween: 30,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            }
            );
        }    



        //INITIALIZE CAROUSEL
        new Swiper(".mySwiper1", {
            watchSlidesProgress: true,
            slidesPerView: n,
        //   rewind: true,
            navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            },
        });


        //INITIALIZE CAROUSEL
        new Swiper(".mySwiper2", {
            watchSlidesProgress: true,
            slidesPerView: n,
         //   rewind: true,
            navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            },
        });

        }   




