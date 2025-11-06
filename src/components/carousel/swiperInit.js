import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function initializeSwiper() {
  new Swiper(".progress-slide-carousel", {
    loop: true,
    autoplay: {
      delay: 3000, // movimiento cada 3 segundos
      disableOnInteraction: false, // no se detiene al hacer clic
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets", // puntos en la parte inferior
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 800,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "slide",
  });
}
