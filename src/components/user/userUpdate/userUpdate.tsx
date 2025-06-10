"use client";
import { getAllRoles } from "@/helpers/role.helper";
import { GetByUserId, updateUser } from "@/helpers/user.helpers";
import { RoleListProps } from "@/types/role";
import { UserListByIdProps } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import {
  FaBrush,
  FaCaretDown,
  FaEye,
  FaEyeSlash,
  FaSave,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const UserUpdate = ({ userId }: { userId: string }) => {
  const [hasPermission] = useState<boolean>(true); //? Para mostrar u ocultar el formulario

  const [showPassword, setShowPassword] = useState(false);

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
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = e.target.value;
    setUsers((prev) => ({
      ...prev,
      roleId: selectedRoleId,
    }));
  };

  //! actualizar el usuario
  const handleUpadateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      const updatedUser = {
        userName: users.userName,
        password: users.password,
        roleId: users.roleId,
        isActive: users.isActive,
        employeeId: users.employeeId,
        currentPassword: users.currentPassword, // Si necesitas la contraseña actual para la actualización
      };
      //console.log("Datos del usuario a actualizar:", updatedUser);
      const response = await updateUser(userId, updatedUser, token);
      if (response) {
        toast.success("Usuario actualizado correctamente", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      toast.error("Error al actualizar el usuario", { theme: "colored" });
    }
  };

  //! Manejar cambios en los campos de entrada
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
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
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Volver al Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        className="w-full max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl"
        onSubmit={handleUpadateUser}
      >
        <h2 className="text-2xl font-semibold mb-6 text-left mx-10">
          Registro de usuario
        </h2>

        {/* Fila de Apellido y Nombre + Username */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mx-10">
          {/* Apellido y Nombre */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1 text-sm font-bold">
              Apellido y Nombres:{" "}
            </label>
            <span id="fullName" className="text-gray-700">
              {`${users.lastNameFather} ${users.lastNameMother} ${users.firstName}`}
            </span>
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="userName" className="mb-1 text-sm font-medium">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={users.userName}
              onChange={handleInputChange}
              className="input input-info w-full"
            />
          </div>

          {/* Rol */}
          <div className="flex flex-col">
            <label htmlFor="role" className="mb-1 text-sm font-medium">
              Rol
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                className="input input-info w-full pr-10 appearance-none"
                onChange={handleRoleChange}
                value={users.roleId || ""} // Si roleId es vacío o nulo, asigna un valor vacío
              >
                <option value="">Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <FaCaretDown className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Fila de Correo, Contraseña y Rol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mx-10">
          {/* Correo */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-bold">
              Correo Electrónico
            </label>
            {/* <input
              type="text"
              id="email"
              name="email" // necesario para handleInputChange
              value={users.email}
              className="input input-info w-full"
              onChange={handleInputChange}
            /> */}
            <span id="email" className="text-gray-700">
              {users.email || "No disponible"}
            </span>
          </div>

          {/* Contraseña actual */}
          <div className="flex flex-col">
            <label
              htmlFor="currentPassword"
              className="mb-1 text-sm font-medium"
            >
              Contraseña actual
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={users.currentPassword || ""}
              onChange={handleInputChange}
              className="input input-info w-full"
              placeholder="Ingrese la contraseña actual"
            />
          </div>

          {/* Contraseña nueva */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">
              Contraseña nueva
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={users.password || ""}
              onChange={handleInputChange}
              className="input input-info w-full"
              placeholder="Ingrese una nueva contraseña"
            />
            <span
              className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="isActive" className="mb-1 text-sm font-bold">
              Estado
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={users.isActive}
                onChange={handleInputChange}
                className={`checkbox ${
                  users.isActive ? "checkbox-success" : "checkbox-error"
                }`}
              />
              <span
                className={`${
                  users.isActive ? "text-green-500" : "text-red-500"
                }`}
              >
                {users.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mx-10">
          <Link href="/dashboard/userList">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium 
        rounded-md text-xs px-4 py-2 w-[80%] mx-auto disabled:opacity-50"
            >
              <IoMdArrowRoundBack className="text-base" />
              Volver
            </button>
          </Link>

          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
      rounded-md text-xs px-4 py-2 w-[80%] mx-auto disabled:opacity-50"
          >
            <FaSave className="text-base" />
            Registrar
          </button>

          <button
            type="reset"
            className="flex items-center justify-center gap-1.5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium
      rounded-md text-xs px-4 py-2 w-[80%] mx-auto disabled:opacity-50"
          >
            <FaBrush className="text-base" />
            Limpiar
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default UserUpdate;
