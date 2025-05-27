"use client";

import { deleteUser, getAllUsers } from "@/helpers/user.helpers";
import { UserListProps } from "@/types/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

import Swal from "sweetalert2";

export default function UserList() {
  const [users, setUsers] = useState<UserListProps[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  //! Función para obtener los usuarios
  const GetUsers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user?.token;
      const role = user?.roles?.[0];

      if (!token || !role) {
        toast.error("No se encontró token o rol del usuario", {
          theme: "colored",
        });
        return;
      }

      //! Validación de rol
      const allowedRoles = ["Administrador", "Gerente"];

      if (!allowedRoles.includes(role)) {
        setHasPermission(false); // Cambiar el estado a false si no tiene permisos
        toast.error("No tienes permiso para ver esta sección", {
          theme: "colored",
        });
        return;
      }

      const employeeData = await getAllUsers(token);
      setUsers(employeeData);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  //Funcion elimianar usuario
  const handleDeleteUser = async (userId: string) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cambiará el estado del usuario a inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user?.token;

        const response = await deleteUser(userId, token);

        if (response.message === "Usuario eliminado correctamente") {
          toast.success("Usuario desactivado correctamente", {
            theme: "colored",
          });

          // Actualizar estado del usuario sin eliminarlo del arreglo
          setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, isActive: false } : u))
          );
        } else {
          toast.error(response.message || "Error al eliminar el usuario", {
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        toast.error("Error al eliminar el usuario", { theme: "colored" });
      }
    }
  };

  return (
    <div className="p-6">
      {/* Si no tiene permisos, mostrar mensaje de error */}
      {!hasPermission ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-red-600 mb-4">
            Lo siento, usted no tiene permisos suficientes, por favor
            comuníquese con el Administrador de Sistema.
          </h2>
          <Link
            href="/dashboard/main"
            className="inline-block text-blue-600 bg-blue-100 hover:bg-blue-200 py-2 px-6 rounded-md"
          >
            Volver al inicio
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Listado de Usuarios
            </h1>

            <Link
              href="/dashboard/userRegister"
              className="inline-flex text-orange-600 items-cente hover:underline font-semibold text-base"
            >
              <IoAddCircle size={24} color="#e74c3c" className="mr-1" />
              Nuevo
            </Link>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <table className="min-w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-1 text-left text-sm font-small">Id</th>
                  <th className="p-1 text-left text-sm font-small">
                    Apellidos y Nombres
                  </th>
                  <th className="p-1 text-left text-sm font-small">Correo</th>
                  <th className="p-1 text-left text-sm font-small">Estado</th>
                  <th className="p-1 text-left text-sm font-small">Rol</th>
                  <th className="p-1 text-left text-sm font-small">Cargo</th>
                  <th className="p-1 text-left text-sm font-small">Creado</th>
                  <th className="p-1 text-left text-sm font-small">Acciones</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {users.map((user) => (
                  <tr className="hover:bg-gray-100" key={user.id}>
                    <td className="p-1 text-slate-900 font-small">
                      {user.employeeId}
                    </td>
                    <td className="p-1 text-slate-900 font-small">
                      {user.lastNameFather} {user.lastNameMother}{" "}
                      {user.firstName}
                    </td>
                    <td className="p-1 text-slate-900 font-medium">
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
                    <td className="p-1 text-slate-900 font-small">
                      {user.roleName}
                    </td>
                    <td className="p-1 text-slate-900 font-small">
                      {user.position}
                    </td>
                    <td className="p-1 text-slate-900 font-small">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-1 text-slate-900 font-small">
                      <div className="flex items-center">
                        <Link href={`/dashboard/employeeView/${user.id}`}>
                          <button className="mr-3" title="Ver">
                            <FaEye size={18} color="#575553" />
                          </button>
                        </Link>

                        <Link href={`/dashboard/userUpdate/${user.id}`}>
                          <button className="mr-3" title="Editar">
                            <MdModeEditOutline size={18} color="#16cfe4" />
                          </button>
                        </Link>

                        {user.isActive ? (
                          <span
                            onClick={() => handleDeleteUser(user.id)}
                            className="cursor-pointer"
                            title="Eliminar"
                          >
                            <FaRegTrashAlt size={18} color="#f3240d" />
                          </span>
                        ) : (
                          <FaRegTrashAlt
                            size={18}
                            className="opacity-30 cursor-not-allowed"
                            title="Usuario inactivo"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
