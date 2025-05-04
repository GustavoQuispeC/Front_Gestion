"use client";

import React, { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <>
      <div className="bg-slate-50 h-screen flex">
        {/* Toggle Button (Solo visible en dispositivos móviles) */}
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

          {/* User Profile */}
          <div className="user flex items-center justify-center flex-col gap-4 border-b border-slate-50 py-1">
            <img
              className="w-12 rounded-full shadow-xl"
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="Avatar"
            />
            <div className="text-center">
              <span className="font-semibold text-md text-emerald-500">
                Gustavo Q.C.
              </span>
              <p className="text-slate-300 text-sm">Desarrollador</p>
            </div>
          </div>

          {/* Menu with Submenus */}
          <ul className="px-6 space-y-2 flex flex-col">
            <li>
              <a
                className="flex items-center gap-2 px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-600 hover:text-white rounded-lg transition duration-150 ease-in-out"
                href="#"
              >
                <MdDashboard size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2 px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-600 hover:text-white rounded-lg transition duration-150 ease-in-out"
                href="/employeeList"
              >
                <FaUserCog size={20} />
                Empleados
              </a>
            </li>
            <li>
              <button
                className="flex items-center gap-2 px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-600 hover:text-white rounded-lg transition duration-150 ease-in-out w-full text-left"
                onClick={toggleSubmenu}
              >
                <svg
                  className="w-6 h-6 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                </svg>
                Reports
              </button>
              {submenuOpen && (
                <ul className="ml-6 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-slate-200 hover:bg-teal-600 hover:text-white rounded-md px-4 py-2"
                    >
                      Report 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-200 hover:bg-teal-600 hover:text-white rounded-md px-4 py-2"
                    >
                      Report 2
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto mb-6 px-4">
            <button
              onClick={() => alert("Logging out...")}
              className="w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="right w-full flex gap-2 flex-col p-4"></div>
      </div>
    </>
  );
};

export default Dashboard;
