import React from "react";

export const CategoriasGrid = () => {
  return (
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
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
          </div>
          <span className="mt-4 block text-lg font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-600">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default CategoriasGrid;
