"use client";
import { getAllRoles } from "@/helpers/role.helper";
import { GetByUserId, updateUser } from "@/helpers/user.helpers";
import { RoleListProps } from "@/types/role";
import { UserListByIdProps } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import { FaBrush, FaCaretDown, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const UserUpdate = ({ userId }: { userId: string }) => {
  const [hasPermission] = useState<boolean>(true); //? Para mostrar u ocultar el formulario

  const [roles, setRoles] = useState<RoleListProps[]>([]);

  const [users, setUsers] = useState<UserListByIdProps>({
    id: "",
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
  });

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
        ...users,
        userName: e.currentTarget.userName.value,
        password: e.currentTarget.password.value || undefined, // Si no se proporciona una contraseña, se envía como undefined
      };
      const response = await updateUser(users.id, updatedUser, token);
      if (response) {
        toast.success("Usuario actualizado correctamente", {
          theme: "colored",
        });
        // Redirigir o actualizar el estado según sea necesario
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      toast.error("Error al actualizar el usuario", { theme: "colored" });
    }
  };




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
      <form className="w-full max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl" onSubmit={handleUpadateUser}>
        <h2 className="text-2xl font-semibold mb-6 text-left mx-10">
          Registro de usuario
        </h2>

        {/* Buscar empleado por número de documento */}
        <div className="flex flex-col mb-6 mx-10">
          <div className="relative"></div>
        </div>

        {/* Fila de Apellido y Nombre + Username */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mx-10">
          {/* Apellido y Nombre */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1 text-sm font-medium">
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
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={users.email}
              readOnly
              className="input input-info w-full"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-info w-full"
              placeholder="Ingrese una contraseña"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="isActive" className="mb-1 text-sm font-medium">
              Estado
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={users.isActive}
                onChange={(e) =>
                  setUsers((prevState) => ({
                    ...prevState,
                    isActive: e.target.checked,
                  }))
                }
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
