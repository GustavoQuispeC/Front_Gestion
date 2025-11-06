"use client";
import { useEffect } from "react";
import { CircleUser, Mail, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { setupNavbarToggle } from "@/components/navbar/setupNavbarToggle";
import Link from "next/link";

const ComplexNavbar = () => {
  const pathname = usePathname();

  useEffect(() => {
    setupNavbarToggle();
  }, []);

  const getLinkClasses = (href: string): string => {
    const isActive = pathname === href;
    const baseClasses =
      "block text-[15px] font-semibold hover:text-orange-500 transition-colors duration-200";
    const colorClass = isActive
      ? "text-orange-500"
      : "text-gray-800 dark:text-gray-300";
    return `${baseClasses} ${colorClass}`;
  };

  const getLiClasses = (href: string): string => {
    const isActive = pathname === href;
    const baseClasses =
      "max-lg:border-b max-lg:border-gray-100 max-lg:py-3 relative";
    const underlineClasses = isActive
      ? "lg:after:absolute lg:after:bg-orange-500 lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-4"
      : "lg:hover:after:absolute lg:after:bg-orange-500 lg:after:w-0 lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-4 lg:after:transition-all lg:after:duration-300";
    return `${baseClasses} ${underlineClasses}`;
  };

  return (
    <header
      className="
        lg:fixed lg:top-0 lg:left-0 lg:w-full lg:z-50 
        bg-white dark:bg-blue-950 
        lg:shadow-md lg:backdrop-blur-sm 
      "
    >
      {/* Sección superior */}
      <section className="bg-gray-100 dark:bg-neutral-800 px-4 py-2 sm:px-10 flex items-center max-sm:flex-col">
        <button
          type="button"
          className="text-gray-800 dark:text-blue-500 text-sm flex items-center"
        >
          <Phone width={16} className="mr-2 text-orange-500" />
          +180-548-2588
        </button>
        <span className="border-l h-3 mx-6 max-sm:hidden"></span>
        <button
          type="button"
          className="text-gray-800 dark:text-blue-500 text-sm max-sm:my-2 flex items-center"
        >
          <Mail width={18} className="mr-2 text-orange-500" />
          gusstavocta@gmail.com
        </button>
        <div className="sm:ml-auto text-gray-800 dark:text-blue-500 flex items-center">
          <Link
            href="/login"
            className="text-gray-800 dark:text-blue-500 text-sm mr-1"
          >
            Iniciar Sesión
          </Link>
          /
          <a
            href="javascript:void(0)"
            className="text-gray-800 dark:text-blue-500 text-sm ml-1 mr-8"
          >
            Salir
          </a>
        </div>
      </section>

      {/* Navbar principal */}
      <div className="flex flex-wrap items-center justify-between py-3 px-4 sm:px-10 lg:gap-y-4 gap-y-6 gap-x-4">
        <a href="#">
          <div className="flex items-center space-x-2">
            <h4 className="text-blue-600 font-extrabold m-0">GRUPO</h4>
            <h4 className="text-orange-500 m-0">Famet</h4>
          </div>
        </a>

        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!flex lg:items-center 
          max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 
          max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-100 cursor-pointer"
          >
            <X width={48} className="text-black" />
          </button>

          <ul
            className="lg:!flex lg:gap-x-10 
            max-lg:space-y-3 max-lg:fixed max-lg:bg-gray-900 
            max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 
            max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50"
          >
            <li className="mb-6 hidden max-lg:block">
              <a href="#">
                <div className="flex items-center space-x-2">
                  <h4 className="text-blue-600 font-extrabold m-0">GRUPO</h4>
                  <h4 className="text-orange-500 m-0">Famet</h4>
                </div>
              </a>
            </li>

            <li className={getLiClasses("/")}>
              <Link href="/" className={getLinkClasses("/")}>
                Inicio
              </Link>
            </li>
            |
            <li className={getLiClasses("/nosotros")}>
              <Link href="/nosotros" className={getLinkClasses("/nosotros")}>
                Nosotros
              </Link>
            </li>
            |
            <li className={getLiClasses("/historia")}>
              <Link href="/historia" className={getLinkClasses("/historia")}>
                Historia
              </Link>
            </li>
            |
            <li className={getLiClasses("/productos")}>
              <Link href="/productos" className={getLinkClasses("/productos")}>
                Productos
              </Link>
            </li>
            |
            <li className={getLiClasses("/contact")}>
              <Link href="/contact" className={getLinkClasses("/contact")}>
                Contáctanos
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center max-sm:ml-auto">
          <ul className="flex space-x-4">
            <li className="relative px-1">
              <CircleUser
                width={36}
                className="text-orange-500 hover:text-orange-400"
              />
            </li>
            <li className="relative px-1">
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
