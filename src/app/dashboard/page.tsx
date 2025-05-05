'use client";';

import Link from "next/link";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation"; // Para acceder a la ruta actual

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Usar usePathname para obtener la ruta actual

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-slate-50 h-screen flex">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 bg-teal-500 text-white rounded-md sm:hidden absolute top-4 left-4 z-30"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
            strokeWidth="2"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <nav
        className={`bg-sky-950 w-72 h-screen flex flex-col gap-3 border-r border-slate-100 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-80"
        } sm:translate-x-0`}
      >
        {/* Logo */}
        <div className="logo text-2xl font-bold text-center flex items-center justify-center">
          Greeny
        </div>

        {/* Menu */}
        <ul className="px-6 space-y-2 flex flex-col">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-600 hover:text-white rounded-lg transition duration-150 ease-in-out ${
                pathname === "/dashboard" ? "bg-teal-600" : ""
              }`}
            >
              <MdDashboard size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/employeeList"
              className={`flex items-center gap-2 px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-600 hover:text-white rounded-lg transition duration-150 ease-in-out ${
                pathname === "/dashboard/employeeList" ? "bg-teal-600" : ""
              }`}
            >
              Employee List
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/employeeRegister"
              className={`flex items-center gap-2 px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-600 hover:text-white rounded-lg transition duration-150 ease-in-out ${
                pathname === "/dashboard/employeeRegister" ? "bg-teal-600" : ""
              }`}
            >
              Employee Register
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content Area */}
      <div className="w-full p-4">
        {/* Renderiza el contenido dependiendo de la ruta */}
        {pathname === "/dashboard" && (
          <div>
            <h1 className="text-xl">Dashboard Home</h1>
            {/* Aquí va el contenido de la página principal del Dashboard */}
          </div>
        )}

        {pathname === "/dashboard/employeeList" && (
          <div>
            <h1 className="text-xl">Employee List</h1>
            {/* Aquí va el contenido de la lista de empleados */}
          </div>
        )}

        {pathname === "/dashboard/employeeRegister" && (
          <div>
            <h1 className="text-xl">Employee Register</h1>
            {/* Aquí va el contenido del registro de empleados */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
