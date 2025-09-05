"use client";
import { getAllRoles } from "@/helpers/role.helper";
import { GetByUserId, updateUser } from "@/helpers/user.helpers";
import { RoleListProps } from "@/types/role";
import { UserListByIdProps, UserUpdateProps } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import { FaBrush, FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
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
import { useAuthToken } from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";

const UserUpdate = ({ userId }: { userId: string }) => {
  const { token, hasPermission } = useAuthToken(["Administrador"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [roles, setRoles] = useState<RoleListProps[]>([]);
  const [users, setUsers] = useState<UserListByIdProps>({
    Id: "",
    userName: "",
    email: "",
    isActive: true,
    employeeId: 0,
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    roleId: "",
  });

  const [userUpdate, setUserUpdate] = useState<UserUpdateProps>({
    userName: "",
    isActive: true,
    employeeId: 0,
    roleId: "",
    password: "",
    currentPassword: "",
  });

  const Route = useRouter();

  //! Función para obtener todos los roles
  const GetRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (e) {
      toast.error("Error al obtener los roles");
      console.error("Error al obtener los roles:", e);
    }
  };

  //! Función para obtener el usuario por ID
  const GetUserById = async (id: string) => {
    try {
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : "";

      if (!token) {
        throw new Error("Token no encontrado. El usuario no está autenticado.");
      }

      const userById = await GetByUserId(id, token);
      const user = userById[0];

      setUsers(user); // para mostrar campos de solo lectura

      setUserUpdate({
        userName: user.userName,
        isActive: user.isActive,
        employeeId: user.employeeId,
        roleId: user.roleId,
        password: "",
        currentPassword: "",
      });
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      toast.error("Error al obtener el usuario");
    }
  };

  //! Efecto para obtener el usuario y los roles al cargar el componente
  useEffect(() => {
    if (!userId) return;
    Promise.all([GetUserById(userId), GetRoles()]);
  }, [userId]);

  //! Llamar a la función para obtener los roles al cargar el componente
  const handleRoleChange = (value: string) => {
    setUserUpdate((prev) => ({
      ...prev,
      roleId: value,
    }));
  };

  //! Manejar cambios en los campos de entrada
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    setUserUpdate((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  //! actualizar el usuario
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const updatedUser = {
        userName: userUpdate.userName,
        roleId: userUpdate.roleId,
        isActive: userUpdate.isActive,
        employeeId: userUpdate.employeeId,
        password: userUpdate.password,
        currentPassword: userUpdate.currentPassword,
      };
      const response = await updateUser(userId, updatedUser, token);
      if (response) {
        toast.success("Usuario actualizado correctamente");
        setTimeout(() => {
          Route.push("/dashboard/userList");
        }, 2000);
      }
    } catch (error) {
      toast.error("Error al actualizar el usuario");
      console.error("Error al actualizar el usuario:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        className="w-full max-w-5xl mx-auto mt-10 p-8 bg-white dark:bg-neutral-900 shadow-xl rounded-lg  border-gray-200"
        onSubmit={handleUpdateUser}
      >
        <h2 className="text-2xl font-semibold mb-6 text-left text-blue-900 dark:text-blue-500">
          Actualización de usuario
        </h2>

        {/* Fila de Apellido y Nombre + Username */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Apellido y Nombre */}
          <div className="flex flex-col">
            <Label
              htmlFor="fullName"
              className="mb-2 text-sm font-semibold"
            >
              Apellido y Nombres:{" "}
            </Label>
            <span id="fullName" >
              {`${users.lastNameFather} ${users.lastNameMother} ${users.firstName}`}
            </span>
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <Label
              htmlFor="userName"
              className="mb-2 text-sm font-semibold "
            >
              Nombre de Usuario
            </Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={userUpdate.userName}
              onChange={handleInputChange}
              className="input w-full  p-2"
            />
          </div>

          {/* Rol */}
          <div className="flex flex-col">
            <Label htmlFor="role" className="mb-2">
              Rol
            </Label>

            {roles.length > 0 && (
              <Select
                value={userUpdate.roleId}
                onValueChange={handleRoleChange}
              >
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
            )}
          </div>
        </div>

        {/* Fila de Correo, Contraseña y Rol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Correo */}
          <div className="flex flex-col">
            <Label
              htmlFor="email"
              className="mb-2 text-sm font-semibold"
            >
              Correo Electrónico
            </Label>
            <span id="email"  >
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
              value={userUpdate.currentPassword || ""}
              onChange={handleInputChange}
              className="input w-full  p-2 pr-10"
              placeholder="Ingrese la contraseña actual"
            />
            <span
              className="absolute right-3 bottom-3 text-gray-400 cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <FaEye size={18} />
              ) : (
                <FaEyeSlash size={18} />
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
              value={userUpdate.password || ""}
              onChange={handleInputChange}
              className="input w-full p-2 pr-10"
              placeholder="Ingrese una nueva contraseña"
            />
            <span
              className="absolute right-3 bottom-3 text-gray-400 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </span>
          </div>

          {/* Estado */}
          {/* Estado */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="isActive"
              name="isActive"
              checked={userUpdate.isActive}
              onCheckedChange={(checked) =>
                setUserUpdate((prev) => ({
                  ...prev,
                  isActive: Boolean(checked),
                }))
              }
            />
            <span
              className={
                userUpdate.isActive ? "text-green-500" : "text-red-500"
              }
            >
              {userUpdate.isActive ? "Activo" : "Inactivo"}
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
    </>
  );
};
export default UserUpdate;
