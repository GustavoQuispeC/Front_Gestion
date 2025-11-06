"use client";

import { useState } from "react";
import Image from "next/image";
import { Products } from "..";
import { Search } from "lucide-react";

const ProductFilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Ejemplo de imágenes de promoción (puedes cambiarlas por las reales)
  const promociones = [
    { id: 1, src: "/images/promo1.jpg", alt: "Descuento en zapatillas" },
    { id: 2, src: "/images/promo2.jpg", alt: "Ofertas en polos" },
  ];

  return (
    <div className="flex dark:bg-neutral-800 relative">
      {/* --- Sidebar --- */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-neutral-800 shadow-xl z-40 transition-transform duration-300 ease-in-out
        w-[270px] sm:static sm:translate-x-0 sm:w-full sm:max-w-[320px] sm:shadow-md sm:px-8
        ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center border-b border-gray-300 pb-2 mb-6 px-6 pt-4 sm:px-0 sm:pt-0">
          <h3 className="text-blue-900 dark:text-blue-500 text-lg font-semibold tracking-wide">
            Filtrar
          </h3>
          {/* <button
            type="button"
            className="text-sm text-red-500 dark:text-orange-400 font-semibold ml-auto cursor-pointer hover:underline"
          >
            Limpiar todo
          </button> */}

          {/* Botón cerrar solo visible en móvil */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-gray-500 ml-2"
          >
            ✕
          </button>
        </div>

        {/* Contenido filtros */}
        <div className="px-6 sm:px-0 overflow-y-auto max-h-[75vh]">
          <h6 className="text-blue-900 dark:text-blue-500 text-sm font-semibold">
            Producto
          </h6>

          <div className="flex px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 overflow-hidden mt-2">
            <input
              type="text"
              placeholder="Buscar marca"
              className="w-full bg-transparent outline-none text-gray-900 text-sm"
            />
            <Search width={18} className="text-gray-400 dark:text-gray-500" />
          </div>

          <ul className="mt-6 space-y-4">
            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="zara"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="zara"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Zara
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="hm"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="hm"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                H&M
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="uniqlo"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="uniqlo"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Uniqlo
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="levis"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="levis"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Levi’s
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="nike"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="nike"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Nike
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="adidas"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="adidas"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Adidas
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="puma"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="puma"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Puma
              </label>
            </li>

            <li className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-700 p-1 rounded-md transition">
              <input
                id="tommy"
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="tommy"
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer select-none"
              >
                Tommy Hilfiger
              </label>
            </li>
          </ul>
        </div>

        {/* --- Sección de promociones --- */}
        <div className="mt-6 border-t border-gray-300 pt-4 px-6 sm:px-0 pb-4">
          <h6 className="text-blue-900 dark:text-blue-500 text-sm font-semibold mb-3">
            Promociones
          </h6>
          <div className="space-y-4">
            {promociones.map((promo) => (
              <div
                key={promo.id}
                className="rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-200"
              >
                <Image
                  src={promo.src}
                  alt={promo.alt}
                  width={260}
                  height={160}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Solapa móvil (botón flotante) --- */}
      <button
        onClick={toggleSidebar}
        className={`sm:hidden fixed top-1/2 left-0 transform -translate-y-1/2 z-50 bg-orange-500 text-white p-2 rounded-r-md shadow-md hover:bg-orange-600 transition ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <Search size={20} />
      </button>

      {/* --- Overlay oscuro cuando sidebar está abierto en móvil --- */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* --- Contenido principal --- */}
      <div className="w-full p-6">
        <Products />
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
