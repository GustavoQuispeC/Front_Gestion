import Image from "next/image";
import React from "react";

export const CategoriasGrid = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center my-8 gap-12">
        {[
          {
            href: "/herramientas",
            img: "/images/herramientas.jpg",
            label: "Herramientas1",
          },
          {
            href: "/alumbrado",
            img: "/images/alumbrado.jpg",
            label: "Alumbrado",
          },
          { href: "/fierros", img: "/images/fierros.jpg", label: "Fierros" },
          {
            href: "/ladrillos",
            img: "/images/ladrillos.jpg",
            label: "Ladrillos",
          },
          {
            href: "/herramientas",
            img: "/images/herramientas.jpg",
            label: "Herramientas",
          },
        ].map(({ href, img, label }) => (
          <a href={href} className="text-center" key={label}>
            <div className="group transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden rounded-full w-[162px] h-[162px] mx-auto">
                <Image
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover object-center rounded-full"
                  width={172}
                  height={172}
                />
              </div>
            </div>
            <span className="mt-4 block text-lg font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-600">
              {label}
            </span>
          </a>
        ))}
      </div>

      <div className="py-2 px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-10">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/herramientas.jpg"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
                width={132}
                height={132}
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                Up To 40% OFF
              </h4>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/alumbrado.jpg"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                Fresh Looks
              </h4>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <img
                src="https://readymadeui.com/images/fashion-img-7.webp"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                Up To 30% OFF
              </h4>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <img
                src="https://readymadeui.com/images/fashion-img-4.webp"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                Exclusive Fashion
              </h4>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <img
                src="https://readymadeui.com/images/fashion-img-5.webp"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                Top Picks for Less
              </h4>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <img
                src="https://readymadeui.com/images/fashion-img-6.webp"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-slate-900 text-sm font-semibold">
                Shop & Save 40%
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriasGrid;
