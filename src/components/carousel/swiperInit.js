import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function initializeSwiper() {
  new Swiper('.progress-slide-carousel', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.progress-slide-carousel .swiper-pagination',
      type: 'progressbar',
    },
  });
}
