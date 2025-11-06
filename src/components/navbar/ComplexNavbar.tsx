"use client";
import { useEffect } from "react";
import { CircleUser, Mail, Menu, Phone, ShoppingCart, X } from "lucide-react";

import { setupNavbarToggle } from "@/components/navbar/setupNavbarToggle";
import Link from "next/link";


const ComplexNavbar = () => {
  useEffect(() => {
    setupNavbarToggle(); // Llama a la función para configurar el menú colapsable
  }, []); //solo se ejecuta 1 vez

  return (
    <header className="min-h-[60px] tracking-wide relative z-50">
      <section className="bg-gray-100 min-h-[40px] dark:bg-neutral-800 px-4 py-2 sm:px-10 flex items-center max-sm:flex-col">
        <button type="button" className="text-gray-800 dark:text-blue-500 text-sm flex items-center">
          <Phone width={16} className="mr-2" />
          +180-548-2588
        </button>
        <span className="border-l h-3 mx-6 max-sm:hidden"></span>
        <button
          type="button"
          className="text-gray-800 dark:text-blue-500 text-sm max-sm:my-2 flex items-center"
        >
          <Mail width={18} className="mr-2" />
          gusstavocta@gmail.com
        </button>
        <div className="sm:ml-auto text-gray-800 dark:text-blue-500 flex items-center">
          <Link href="/login" className="text-gray-800 dark:text-blue-500 text-sm mr-1">
            Iniciar Sesión
          </Link>
          /
          <a href="javscript:void(0)" className="text-gray-800 dark:text-blue-500 text-sm ml-1 mr-8">
            Salir
          </a>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between py-3 px-4 sm:px-10 bg-white dark:bg-blue-950 lg:gap-y-4 gap-y-6 gap-x-4">
        <a href ="#">
          {/* <Image
            src="/images/LogoFamet.png"
            alt="logo"
            className="sm:w-[140px] w-[130px]"
            width={140}
            height={40}
          /> */}
          <h4 className="text-blue-200 font-bold">gusstavodev.help</h4>
        </a>

        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-100 cursor-pointer"
          >
            <X width={48} className="text-black" />
          </button>

          <ul className="lg:!flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-gray-900 max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="#">
                {/* <Image
                  src="https://readymadeui.com/readymadeui-white.svg"
                  alt="logo"
                  className="w-36"
                  width={144}
                  height={36}
                /> */}
                <h4 className="text-blue-600 font-bold">gusstavodev.help</h4>
              </a>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-100 max-lg:py-3 relative lg:after:absolute lg:after:bg-orange-500 lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <Link
                href="/"
                className="text-orange-500 block text-[15px] font-semibold hover:text-orange-400"
              >
                Inicio
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-100 max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-orange-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <a
                href="#"
                className="text-gray-800 block text-[15px] font-semibold hover:text-orange-400"
              >
                Nosotros
              </a>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-100 max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-orange-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <a
                href="#"
                className="text-gray-800 block text-[15px] font-semibold hover:text-orange-400"
              >
                Historia
              </a>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-100 max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-orange-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <a
                href="#"
                className="text-gray-800 block text-[15px] font-semibold hover:text-orange-400"
              >
                Productos
              </a>
            </li>
           
            <li className="max-lg:border-b max-lg:border-gray-100 max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-orange-500 lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <Link
                href="/contact"
                className="text-gray-800 block text-[15px] font-semibold hover:text-orange-400"
              >
                Contáctanos
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center max-sm:ml-auto">
          <ul className="flex space-x-4">
            <li className="relative px-1 lg:hover:after:absolute lg:after:bg-white lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <CircleUser
                width={36}
                className="text-orange-500 hover:text-orange-400"
              />
            </li>
            <li className="relative px-1 lg:hover:after:absolute lg:after:bg-white lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300">
              <span className="relative">
                <ShoppingCart
                  width={36}
                  className="text-orange-500 hover:text-orange-400"
                />
                <span className="absolute left-auto ml-4 -top-1 rounded-full bg-red-600 px-1 py-0 text-xs text-white">
                  0
                </span>
              </span>
            </li>
          </ul>

          <button id="toggleOpen" className="lg:hidden ml-6 cursor-pointer">
            <Menu className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ComplexNavbar;
