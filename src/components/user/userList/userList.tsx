"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteUser, getAllUsers } from "@/helpers/user.helpers";
import { UserListProps } from "@/types/user";
import {
  BadgeCheckIcon,
  BadgeX,
  CirclePlus,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { es } from "date-fns/locale";
import { format } from "date-fns";

export default function UserList() {
  const [users, setUsers] = useState<UserListProps[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  // Obtener el rol del usuario actual
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const role = user?.roles?.[0];

  //! Función para obtener los usuarios
  const GetUsers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user?.token;
      const role = user?.roles?.[0];

      if (!token || !role) {
        toast.error("No se encontró token o rol del usuario");
        return;
      }

      //! Validación de rol
      const allowedRoles = ["Administrador", "Supervisor"];

      if (!allowedRoles.includes(role)) {
        setHasPermission(false);
        return;
      }

      const employeeData = await getAllUsers(token);
      setUsers(employeeData);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados");
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
          toast.success("Usuario desactivado correctamente");

          // Actualizar estado del usuario sin eliminarlo del arreglo
          setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, isActive: false } : u))
          );
        } else {
          toast.error(response.message || "Error al eliminar el usuario");
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        toast.error("Error al eliminar el usuario");
      }
    }
  };
  // Si no tiene permisos, mostrar mensaje
  if (!hasPermission) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-red-600">
            Lo siento, no tiene permisos suficientes
          </h2>
          <p className="text-xl mt-2">
            Por favor comuníquese con el administrador del sistema.
          </p>
          <Link href="/dashboard/main">
            <Button className="mt-6 px-4 py-2">Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Listado de Usuarios</h2>

        <Link
          href="/dashboard/userRegister"
          className=" inline-flex items-center text-primary hover:underline font-small font-semibold text-base"
        >
          <CirclePlus size={18} className="mr-1" />
          Agregar
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 dark:bg-neutral-900">
        <Table>
          <TableCaption>Listado de usuarios</TableCaption>
          <TableHeader className="font-extrabold">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead> Apellidos y Nombres</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.employeeId}</TableCell>
                <TableCell>
                  {u.lastNameFather} {u.lastNameMother} {u.firstName}
                </TableCell>
                <TableCell>{u.email || u.email}</TableCell>
                <TableCell>
                  <Badge
                    className={`mt-0.5${
                      u.isActive
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold"
                    }`}
                  >
                    {u.isActive ? <BadgeCheckIcon /> : <BadgeX />}
                    {u.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>{u.roleName}</TableCell>
                <TableCell>{u.position}</TableCell>

                <TableCell>
                  {u.createdAt
                    ? format(new Date(u.createdAt), "dd/MM/yyyy", {
                        locale: es,
                      })
                    : ""}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-end space-x-2">
                    {/* <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/dashboard/employeeView/${u.id}`}>
                          <button className="mr-3" title="Ver">
                            <Eye size={18} />
                          </button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ver detalle</p>
                      </TooltipContent>
                    </Tooltip> */}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/dashboard/userUpdate/${u.id}`}>
                          <button
                            className="mr-3 text-blue-700 dark:text-primary"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar</p>
                      </TooltipContent>
                    </Tooltip>
                    {u.isActive ? (
                      role === "Administrador" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              onClick={() => handleDeleteUser(u.id)}
                              className="cursor-pointer"
                              tabIndex={0}
                              role="button"
                              aria-label="Eliminar"
                            >
                              <Trash2 size={18} color="#f3240d" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>Eliminar</TooltipContent>
                        </Tooltip>
                      ) : null // No mostrar el botón si el rol no es Administrador
                    ) : role === "Administrador" ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className="opacity-30 cursor-not-allowed"
                            tabIndex={-1}
                            aria-disabled="true"
                          >
                            <Trash2 size={18} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>No se puede eliminar</TooltipContent>
                      </Tooltip>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
