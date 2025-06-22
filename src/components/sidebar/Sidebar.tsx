"use client";
import { useEffect, useState } from "react"; // Importamos useState y useEffect
import Link from "next/link";
import Image from "next/image";
import { IoLogoReact } from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { FaUserCog } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";

const menuItems = [
  {
    path: "/dashboard/main",
    icon: <MdDashboardCustomize size={28} />,
    title: "Inicio",
    subTitle: "Panel de control",
  },
  {
    path: "/dashboard/employeeList",
    icon: <FaUsersGear size={28} />,
    title: "Empleados",
    subTitle: "",
  },
  {
    path: "/dashboard/userList",
    icon: <FaUserCog size={28} />,
    title: "Usuarios",
    subTitle: "",
  },
  {
    path: "/dashboard/employeeControl",
    icon: <FaUserCog size={28} />,
    title: "Control de Empleados",
    subTitle: "Gestión de empleados",
  },
];

type User = {
  username?: string;
  photoUrl?: string;
  // Agrega aquí otras propiedades si es necesario
};

export const Sidebar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //obtenemos el usuario del localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  if (!user) {
    return null; // Si no se ha cargado el usuario, no renderizamos nada
  }

  return (
    <div className="w-[300px] min-h-screen bg-gray-900 text-slate-300 flex flex-col">
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
            src={user.photoUrl || "/images/default-avatar.png"}
            alt="User avatar"
            width={50}
            height={50}
            priority
          />
          <span className="text-sm font-bold md:text-base">
            {user.username || "Usuario"}{" "}
            {/* Mostrar nombre de usuario o 'Usuario' si no existe */}
          </span>
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
