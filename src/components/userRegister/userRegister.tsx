"use client";

import { getEmployeeByDocumentNumber } from "@/helpers/employee.helpers";
import { getAllRoles } from "@/helpers/role.helper";
import { RoleListProps } from "@/types/role";
import { UserRegisterProps } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBrush, FaCaretDown, FaSave } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const UserRegister = () => {
  const [roles, setRoles] = useState<RoleListProps[]>([]);
  const [employeeData, setEmployeeData] = useState({
    EmployeeId: 0,
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    email: "",
  });

  const [userRegister, setUserRegister] = useState<UserRegisterProps>({
    EmployeeId: 0,
    UserName: "",
    Email: "",
    Password: "",
    RoleId: 0, // Inicializamos como 0, para evitar el error de NaN
  });

  // Función para obtener todos los roles
  const GetRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (e) {
      toast.error("Error al obtener los roles", { theme: "colored" });
      console.error("Error al obtener los roles:", e);
    }
  };

  // Función para buscar empleado por número de documento
  const handleSearch = async (documentNumber: string) => {
    if (documentNumber.length >= 8) {
      try {
        const empleadoData = await getEmployeeByDocumentNumber(documentNumber);
        if (!empleadoData) {
          setEmployeeData({
            EmployeeId: 0,
            firstName: "",
            lastNameFather: "",
            lastNameMother: "",
            email: "",
          });
          toast.error("No se encontró el empleado", { theme: "colored" });
          return;
        }

        setEmployeeData({
          firstName: empleadoData.firstName,
          lastNameFather: empleadoData.lastNameFather,
          lastNameMother: empleadoData.lastNameMother,
          email: empleadoData.email,
          EmployeeId: empleadoData.id,
        });

        toast.success("Empleado encontrado", { theme: "colored" });
      } catch (e) {
        toast.error("Error al buscar el empleado", { theme: "colored" });
        console.error("Error al buscar el empleado:", e);
      }
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetRoles();
  }, []);

  // Función para manejar el registro de usuario
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const userRegisterData: UserRegisterProps = {
      EmployeeId: employeeData.EmployeeId || 0,
      UserName: formData.get("userName") as string,
      Email: formData.get("email") as string,
      Password: formData.get("password") as string,
      RoleId: Number(formData.get("role")), // Convertir el valor a número
    };

    // Validación de campos
    if (!userRegisterData.UserName) {
      toast.error("El campo Nombre de Usuario es obligatorio", {
        theme: "colored",
      });
      return;
    }
    if (!userRegisterData.Password) {
      toast.error("El campo Contraseña es obligatorio", { theme: "colored" });
      return;
    }
  

    // Aquí puedes agregar la lógica para enviar estos datos a la API de registro.
    console.log(userRegisterData);
    toast.success("Usuario registrado con éxito", { theme: "colored" });
  };

  // Limpiar el formulario
  const handleReset = () => {
    setEmployeeData({
      EmployeeId: 0,
      firstName: "",
      lastNameFather: "",
      lastNameMother: "",
      email: "",
    });
    setUserRegister({
      EmployeeId: 0,
      UserName: "",
      Email: "",
      Password: "",
      RoleId: 0,
    });
  };

  // Función para manejar el cambio en el campo Role
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRegister({
      ...userRegister,
      RoleId: Number(e.target.value), // Asignar el valor numérico de Role
    });
  };

  return (
    <>
      <form
        className="w-full max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-semibold mb-6 text-left mx-10">
          Registro de usuario
        </h2>

        {/* Buscar empleado por número de documento */}
        <div className="flex flex-col mb-6 mx-10">
          <div className="relative">
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              className="input input-info w-full pr-10"
              placeholder="Ingrese Nro. DNI"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(e.currentTarget.value);
                }
              }}
            />
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <FcSearch className="text-xl" />
            </span>
          </div>
        </div>

        {/* Fila de Apellido y Nombre + Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mx-10">
          {/* Apellido y Nombre */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1 text-sm font-medium">
              Apellido y Nombres:{" "}
            </label>
            <span id="fullName" className="text-gray-700">
              {`${employeeData.lastNameFather} ${employeeData.lastNameMother} ${employeeData.firstName}`}
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
              value={userRegister.UserName}
              onChange={(e) =>
                setUserRegister({ ...userRegister, UserName: e.target.value })
              }
              className="input input-info w-full"
            />
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
              value={employeeData.email}
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
                value={userRegister.RoleId}
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
            onClick={handleReset}
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

export default UserRegister;
