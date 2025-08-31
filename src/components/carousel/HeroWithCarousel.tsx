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
    <div className="w-full relative">
      <div className="swiper progress-slide-carousel swiper-container relative">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="bg-indigo-50  h-96 flex justify-center items-center relative overflow-hidden">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2Fherrramientas2.png?alt=media&token=5bb9609c-e3e1-4454-a609-e4916cc72653"
                className=" object-cover"
                alt="Slide 1"
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2Fherramientas3.png?alt=media&token=1413896b-19e2-4e5b-a579-eaedb77091dd"
                className=" object-cover"
                alt="Slide 1"
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2Fcemento.png?alt=media&token=b5f84e75-8c30-429e-bcd3-a41e807aafe6"
                className=" object-cover"
                alt="Slide 1"
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div className="swiper-slide">
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2Fcemento.png?alt=media&token=b5f84e75-8c30-429e-bcd3-a41e807aafe6"
                className=" object-cover"
                alt="Slide 1"
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
