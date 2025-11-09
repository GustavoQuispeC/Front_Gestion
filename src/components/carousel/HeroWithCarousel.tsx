"use client";

import { useEffect } from "react";
import { initializeSwiper } from "./swiperInit";
import "./carousel.css";
import Image from "next/image";

const CarouselDemo = () => {
  useEffect(() => {
    initializeSwiper();
  }, []);

  const images = [
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2FGemini_Generated_Image_daf050daf050daf0.png?alt=media&token=6a37171e-f773-4d95-bc90-db2ff800eda9",
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F4179908.jpg?alt=media&token=4ff2ac91-ea16-40cc-86fc-2331d91b1c79",
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F5282029.jpg?alt=media&token=17249251-6204-4bc4-8430-744e7fb0efa0",
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/imagenes-ui%2Fcarousel%2F6281161.jpg?alt=media&token=31f4196c-ec66-4b64-9f5e-053ab0661883",
  ];

  return (
    <div className="w-full relative">
      <div className="swiper progress-slide-carousel">
        <div className="swiper-wrapper">
          {images.map((src, idx) => (
            <div className="swiper-slide" key={idx}>
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                sizes="100vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Paginación (puntos) */}
        <div className="swiper-pagination"></div>

        {/* Flechas */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
};

export default CarouselDemo;
