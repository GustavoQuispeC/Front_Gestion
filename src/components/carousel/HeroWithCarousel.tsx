"use client";

import { useEffect } from "react";
import { initializeSwiper } from "./swiperInit";
import "./carousel.css";
import Image from "next/image";

const CarouselDemo = () => {
  useEffect(() => {
    initializeSwiper(); // llamada a funcion js
  }, []);

  return (
    <div className="w-full relative dark:bg-neutral-700">
  <div className="swiper progress-slide-carousel swiper-container relative">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="bg-indigo-50  h-96 flex justify-center items-center relative overflow-hidden">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F3361eea4-843d-4ad4-ae2e-3abead2762e9.jpg?alt=media&token=fc63b7a1-e1fe-4db7-8876-7a5f6508e7ee"
            className="object-cover"
            alt="Slide 1"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="swiper-slide">
        <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center relative">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F4179908.jpg?alt=media&token=4ff2ac91-ea16-40cc-86fc-2331d91b1c79"
            className="object-cover"
            alt="Slide 2"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="swiper-slide">
        <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center relative">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F5282029.jpg?alt=media&token=17249251-6204-4bc4-8430-744e7fb0efa0"
            className="object-cover"
            alt="Slide 3"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="swiper-slide">
        <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center relative">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F6281161.jpg?alt=media&token=31f4196c-ec66-4b64-9f5e-053ab0661883"
            className="object-cover"
            alt="Slide 4"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
    <div className="swiper-pagination !bottom-2 !top-auto !w-80 right-0 mx-auto bg-gray-100"></div>
  </div>
</div>

  );
};

export default CarouselDemo;
