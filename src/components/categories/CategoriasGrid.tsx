import Image from "next/image";
import React from "react";

export const CategoriasGrid = () => {
  return (
    <>
      <div className="py-2 px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-10">Categorias</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer relative group hover:scale-105  transition-transform duration-300 ease-in-out">
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
              <h4 className="text-blue-900 text-sm font-semibold">
                Herramientas
              </h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200  shadow-sm overflow-hidden cursor-pointer relative group hover:scale-105  transition-transform duration-300 ease-in-out">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/alumbrado.jpg"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
                width={132}
                height={132}
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-blue-900 text-sm font-semibold">
                Alumbrado
              </h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200  shadow-sm overflow-hidden cursor-pointer relative group hover:scale-105  transition-transform duration-300 ease-in-out">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/fierros.jpg"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
                width={132}
                height={132}
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-blue-900 text-sm font-semibold">Fierros</h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200  shadow-sm overflow-hidden cursor-pointer relative group hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/ladrillos.jpg"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
                width={132}
                height={132}
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-blue-900 text-sm font-semibold">
                Ladrillos
              </h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200  shadow-sm overflow-hidden cursor-pointer relative group hover:scale-105 transition-transform duration-300 ease-in-out">
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
              <h4 className="text-blue-900 text-sm font-semibold">
                Top Picks for Less
              </h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200  shadow-sm overflow-hidden cursor-pointer relative group hover:scale-105  transition-transform duration-300 ease-in-out">
            <div className="aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src="/images/alumbrado.jpg"
                alt="product1"
                className="h-full w-full object-cover object-top rounded-lg"
                width={132}
                height={132}
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-blue-900 text-sm font-semibold">
                40% Off or More
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriasGrid;
