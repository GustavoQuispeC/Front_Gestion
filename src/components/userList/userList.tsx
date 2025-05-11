"use client";
import { getAllUsers } from "@/helpers/user.helpers";
import { UserListProps } from "@/types/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

export default function UserList() {
  const [users, setUsers] = useState<UserListProps[]>([]);

  // Función para obtener todos los empleados
  const GetUsers = async () => {
    try {
      const employeeData = await getAllUsers();
      setUsers(employeeData); // Actualizamos el estado con los empleados
      console.log("Empleados obtenidos:", employeeData);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Listado de Usuarios
        </h1>

        <Link
          href="/dashboard/userRegister"
          className="inline-flex items-center text-blue-600 hover:underline font-medium text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Id</th>
              <th className="p-4 text-left text-sm font-medium">
                Apellidos y Nombres
              </th>
              <th className="p-4 text-left text-sm font-medium">Correo</th>
              <th className="p-4 text-left text-sm font-medium">Estado</th>
              <th className="p-4 text-left text-sm font-medium">Rol</th>
              <th className="p-4 text-left text-sm font-medium">Cargo</th>
              <th className="p-4 text-left text-sm font-medium">Creado</th>
              <th className="p-4 text-left text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {users.map((user) => (
              <tr className="hover:bg-gray-100" key={user.id}>
                <td className="p-3 text-slate-900 font-medium">
                  {user.employeeId}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {user.lastNameFather}{" "}
                  {user.lastNameMother} {" "}
                  {user.firstName}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {user.email || user.email}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  <button
                    className={`px-2 py-0.5 rounded-xl border-2 font-semibold ${
                      user.isActive
                        ? "border-green-200 text-green-500 bg-green-50"
                        : "border-red-500 text-red-500 bg-red-50"
                    }`}
                  >
                    {user.isActive ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {user.roleName}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {user.position}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  <div className="flex items-center">
                    <Link href={`/dashboard/employeeView/${user.id}`}>
                      <button className="mr-3" title="Ver">
                        <FaEye size={20} color="#566573" />
                      </button>
                    </Link>
                    <button className="mr-3" title="Editar">
                      <MdModeEditOutline size={20} color="#2980b9" />
                    </button>
                    <button title="Eliminar">
                      <FaRegTrashAlt size={20} color="#e74c3c" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
