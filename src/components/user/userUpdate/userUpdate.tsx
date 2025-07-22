"use client";
import { getAllRoles } from "@/helpers/role.helper";
import { GetByUserId, updateUser } from "@/helpers/user.helpers";
import { RoleListProps } from "@/types/role";
import { UserListByIdProps } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import { FaBrush, FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const UserUpdate = ({ userId }: { userId: string }) => {
  const [hasPermission] = useState<boolean>(true); //? Para mostrar u ocultar el formulario

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío del formulario

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [roles, setRoles] = useState<RoleListProps[]>([]);

  const [users, setUsers] = useState<UserListByIdProps>({
    Id: "",
    userName: "",
    email: "",
    createdAt: new Date(),
    isActive: true,
    employeeId: 0,
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    roleId: "",
    password: "",
    currentPassword: "", // Para manejar la contraseña actual
  });

  //! Efecto para obtener el usuario y los roles al cargar el componente
  useEffect(() => {
    if (!userId) return;
    Promise.all([GetUserById(userId), GetRoles()]);
  }, [userId]);

  //! Función para obtener todos los roles
  const GetRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
      //console.log("Roles obtenidos:", rolesData);
    } catch (e) {
      toast.error("Error al obtener los roles", { theme: "colored" });
      console.error("Error al obtener los roles:", e);
    }
  };

  //! Función para obtener el usuario por ID
  const GetUserById = async (id: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const userById = await GetByUserId(id, token);
      setUsers(userById[0]);
      console.log("Usuario obtenido:", userById[0]); // Verifica que los datos realmente llegan aquí
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      toast.error("Error al obtener el usuario", { theme: "colored" });
    }
  };

  //! Llamar a la función para obtener los roles al cargar el componente
  const handleRoleChange = (value: string) => {
    setUsers({
      ...users,
      roleId: value,
    });
  };

  //! actualizar el usuario
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token") || "";
      const updatedUser = {
        userName: users.userName,
        password: users.password,
        roleId: users.roleId,
        isActive: users.isActive,
        employeeId: users.employeeId,
        currentPassword: users.currentPassword,
      };
      const response = await updateUser(userId, updatedUser, token);
      if (response) {
        toast.success("Usuario actualizado correctamente", {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error al actualizar el usuario", { theme: "colored" });
      console.error("Error al actualizar el usuario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //! Manejar cambios en los campos de entrada
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;

    // Verificar si el campo es el checkbox y manejarlo correctamente
    setUsers((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  //! Verificar si el usuario tiene permisos
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
    <>
      <form
        className="w-full max-w-5xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg border border-gray-200"
        onSubmit={handleUpdateUser}
      >
        <h2 className="text-2xl font-semibold mb-6 text-left text-gray-800">
          Registro de usuario
        </h2>

        {/* Fila de Apellido y Nombre + Username */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Apellido y Nombre */}
          <div className="flex flex-col">
            <Label
              htmlFor="fullName"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Apellido y Nombres:{" "}
            </Label>
            <span id="fullName" className="text-gray-600">
              {`${users.lastNameFather} ${users.lastNameMother} ${users.firstName}`}
            </span>
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <Label
              htmlFor="userName"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Nombre de Usuario
            </Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={users.userName}
              onChange={handleInputChange}
              className="input w-full  p-2"
            />
          </div>

          {/* Rol */}
          <div className="flex flex-col">
            <Label htmlFor="role" className="mb-2">
              Rol
            </Label>

            <Select value={users.roleId} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Fila de Correo, Contraseña y Rol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Correo */}
          <div className="flex flex-col">
            <Label
              htmlFor="email"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Correo Electrónico
            </Label>
            <span id="email" className="text-gray-600">
              {users.email || "No disponible"}
            </span>
          </div>

          {/* Contraseña actual */}
          <div className="flex flex-col relative">
            <Label htmlFor="currentPassword" className="mb-2">
              Contraseña actual
            </Label>
            <Input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={users.currentPassword || ""}
              onChange={handleInputChange}
              className="input w-full  p-2 pr-10"
              placeholder="Ingrese la contraseña actual"
            />
            <span
              className="absolute right-3 bottom-3 text-gray-400 cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </span>
          </div>

          {/* Contraseña nueva */}
          <div className="flex flex-col relative">
            <Label htmlFor="password" className="mb-2 ">
              Contraseña nueva
            </Label>
            <Input
              type={showNewPassword ? "text" : "password"}
              id="password"
              name="password"
              value={users.password || ""}
              onChange={handleInputChange}
              className="input w-full p-2 pr-10"
              placeholder="Ingrese una nueva contraseña"
            />
            <span
              className="absolute right-3 bottom-3 text-gray-400 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          {/* Estado */}
          {/* Estado */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="isActive"
              name="isActive"
              checked={users.isActive === true} // Asegúrate de que `isActive` sea un valor booleano
              onCheckedChange={(checked) =>
                handleInputChange({
                  target: { name: "isActive", value: checked },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            <span
              className={`${
                users.isActive === true ? "text-green-500" : "text-red-500"
              }`}
            >
              {users.isActive === true ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link href="/dashboard/userList">
            <Button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3 w-full"
              variant={"outline"}
            >
              <IoMdArrowRoundBack className="text-lg" />
              Volver
            </Button>
          </Link>

          <Button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 w-full"
          >
            <FaSave className="text-lg" />
            Registrar
          </Button>

          <Button
            type="reset"
            className="flex items-center justify-center gap-2 px-6 py-3 w-full"
            variant={"reset"}
          >
            <FaBrush className="text-lg" />
            Limpiar
          </Button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};
export default UserUpdate;
