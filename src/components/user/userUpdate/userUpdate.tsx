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
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = e.target.value;
    setUsers((prev) => ({
      ...prev,
      roleId: selectedRoleId,
    }));
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
            <label
              htmlFor="fullName"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Apellido y Nombres:{" "}
            </label>
            <span id="fullName" className="text-gray-600">
              {`${users.lastNameFather} ${users.lastNameMother} ${users.firstName}`}
            </span>
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="userName"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={users.userName}
              onChange={handleInputChange}
              className="input w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2"
            />
          </div>

          {/* Rol */}
          <div className="flex flex-col">
            <label
              htmlFor="role"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              className="input w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2"
              onChange={handleRoleChange}
              value={users.roleId || ""}
            >
              <option value="">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fila de Correo, Contraseña y Rol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Correo */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Correo Electrónico
            </label>
            <span id="email" className="text-gray-600">
              {users.email || "No disponible"}
            </span>
          </div>

          {/* Contraseña actual */}
          <div className="flex flex-col relative">
            <label
              htmlFor="currentPassword"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Contraseña actual
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={users.currentPassword || ""}
              onChange={handleInputChange}
              className="input w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 pr-10"
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
            <label
              htmlFor="password"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Contraseña nueva
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="password"
              name="password"
              value={users.password || ""}
              onChange={handleInputChange}
              className="input w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 pr-10"
              placeholder="Ingrese una nueva contraseña"
            />
            <span
             className="absolute right-3 bottom-3 text-gray-400 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="isActive"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link href="/dashboard/userList">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md text-xs px-6 py-3 w-full"
            >
              <IoMdArrowRoundBack className="text-lg" />
              Volver
            </button>
          </Link>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md text-xs px-6 py-3 w-full"
          >
            <FaSave className="text-lg" />
            Registrar
          </button>

          <button
            type="reset"
            className="flex items-center justify-center gap-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-md text-xs px-6 py-3 w-full"
          >
            <FaBrush className="text-lg" />
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
