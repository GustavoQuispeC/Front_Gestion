"use client";

import React, { useState } from "react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
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
          className={`bg-white w-80 h-screen flex flex-col gap-10 border-r border-slate-100 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-80"
          } sm:translate-x-0`}
        >
          <div className="logo text-2xl font-bold text-center h-16 flex items-center justify-center">
            Greeny
          </div>

          <div className="user flex items-center justify-center flex-col gap-4 border-b border-slate-50 py-4">
            <img
              className="w-24 rounded-full shadow-xl"
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="Avatar"
            />
            <div className="text-center">
              <span className="font-semibold text-lg text-emerald-700">
                Muhammed YEŞİLMEN
              </span>
              <p className="text-slate-400 text-sm">Developer</p>
            </div>
            <div className="text-sm text-slate-400">
              <span className="font-semibold text-slate-500">
                Yönlendirilmiş Ticket Sayısı
              </span>{" "}
              (20)
            </div>
          </div>

          <ul className="px-6 space-y-2">
            <li>
              <a
                className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-teal-500 hover:text-white rounded-lg transition duration-150 ease-in-out"
                href="#"
              >
                Haber Yönetimi
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-teal-500 hover:text-white rounded-lg transition duration-150 ease-in-out"
                href="#"
              >
                CMS Hesapları
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-teal-500 hover:text-white rounded-lg transition duration-150 ease-in-out"
                href="#"
              >
                Destek Talepleri
              </a>
            </li>
            <li className="bg-slate-50 pb-2 rounded-lg border">
              <a
                className="block px-4 py-2.5 text-slate-200 font-semibold hover:bg-teal-500 hover:text-white rounded-lg bg-emerald-950"
                href="#"
              >
                Loglar & Kayıtlar
              </a>
              <ol className="text-sm text-slate-700 space-y-4 pl-6 my-2.5">
                <li>
                  <a className="block text-slate-500 hover:text-slate-950">
                    Karakter Transfer Talepleri
                  </a>
                </li>
                <li>
                  <a className="block text-slate-500 hover:text-slate-950">
                    Silah Yükseltme Talepleri
                  </a>
                </li>
                <li>
                  <a className="block text-slate-500 hover:text-slate-950">
                    İsim Değiştirme Kayıtları
                  </a>
                </li>
                <li>
                  <a className="block text-slate-500 hover:text-slate-950">
                    Klan Değiştirme Kayıtları
                  </a>
                </li>
              </ol>
            </li>
            <li>
              <a
                className="block px-4 py-2.5 text-slate-800 font-semibold hover:bg-teal-500 hover:text-white rounded-lg transition duration-150 ease-in-out"
                href="#"
              >
                Etkinlik Yönetimi
              </a>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <div className="right w-full flex gap-2 flex-col">
          <header className="h-16 w-full flex items-center p-4 text-slate-400">
            <ol className=" text-slate-400 flex flex-wrap gap-1 text-sm [&>li:last-child]:font-semibold [&>li:not(:first-child)]:before:content-['\00bb']">
              <li className="before:content-['\2616'] before:mx-2">
                <a href="#">Homepage</a>
              </li>
              <li className="before:mx-2">
                <a href="#">Category Name</a>
              </li>
              <li className="before:mx-2">Page name</li>
            </ol>
          </header>

          <div className="p-4">
            <h1 className="text-xl font-semibold text-slate-500 page-title">
              Page Name
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
