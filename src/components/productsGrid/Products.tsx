"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { listarProductosActivo } from "@/helpers/productGrid.helper";
import { toast } from "react-toastify";
import { ListarProductosActivoProps } from "@/types/productGrid";

const Products = () => {
  const [productos, setProductos] = useState<ListarProductosActivoProps[]>([]);
  //funcion para obtener los productos
  const getProductosActivo = useCallback(async () => {
    try {
      const productosData = await listarProductosActivo();
      setProductos(productosData);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      toast.error("Error al obtener los productos", { theme: "colored" });
    }
  }, []);

  useEffect(() => {
    getProductosActivo();
  }, [getProductosActivo]);

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-400 mb-8 text-center">
        Catálogo de productos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((producto, index) => (
          <div
            key={producto.idProducto || index}
            className="flex flex-col bg-white dark:bg-neutral-700 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-100 dark:border-neutral-600"
          >
            {/* Imagen */}
            <div className="w-full flex items-center justify-center p-3 dark:bg-white">
              <div className="max-w-[135px] max-h-[170px] w-full">
                {" "}
                {/* Reducido un 30% */}
                <Image
                  src={
                    producto.imageUrl && producto.imageUrl.trim() !== ""
                      ? producto.imageUrl
                      : "/images/not_found.jpg"
                  }
                  alt={producto.descripcion || "Imagen no disponible"}
                  className="w-full h-auto object-contain bg-white"
                  width={105}
                  height={140}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.src.includes("/images/not_found.jpg")) {
                      img.src = "/images/not_found.jpg";
                    }
                  }}
                />
              </div>
            </div>

            {/* Contenido */}
            <div className="p-3 flex flex-col flex-1">
              <h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight mb-1">
                {producto.descripcion}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                Marca:{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {producto.marca}
                </span>
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  S/ {producto.precio}
                </span>

                {/* Icono wishlist */}
                <button
                  type="button"
                  className="bg-indigo-50 dark:bg-neutral-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-100 dark:hover:bg-neutral-500 transition"
                  title="Agregar a favoritos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    className="fill-indigo-600 dark:fill-indigo-300"
                    viewBox="0 0 64 64"
                  >
                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                  </svg>
                </button>
              </div>

              <Button
                type="button"
                className="mt-3 w-full text-sm font-medium tracking-wide py-2 rounded-lg"
              >
                Cotizar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
