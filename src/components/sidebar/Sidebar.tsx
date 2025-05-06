"use client";

import Link from "next/link";
import Image from "next/image";
import { IoCalculator, IoLogoReact } from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { FaUserCog } from "react-icons/fa";

const menuItems = [
  {
    path: "/dashboard/main",
    icon: <FaUserCog size={40} />,
    title: "Dashboard",
    subTitle: "Visualización",
  },
  {
    path: "/dashboard/employeeList",
    icon: <IoCalculator size={40} />,
    title: "Empleados",
    subTitle: "Lista de empleados",
  },
];

export const Sidebar = () => {
  return (
    <div className="w-[400px] min-h-screen bg-gray-900 text-slate-300 flex flex-col">
      <div className="px-6 py-4">
        <h1 className="flex items-center text-lg font-bold text-white md:text-2xl">
          <IoLogoReact className="mr-2" />
          <span> Dashboard</span>
          <span className="text-blue-500">8</span>.
        </h1>
        <p className="text-sm text-slate-500">Vista de administración</p>
      </div>

      <div className="px-6 py-4">
        <p className="text-slate-500">Bienvenido,</p>
        <Link href="/perfil" className="inline-flex items-center space-x-2">
          <Image
            className="w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
            alt="User avatar"
            width={50}
            height={50}
            priority
          />
          <span className="text-sm font-bold md:text-base">Gustavo</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};
