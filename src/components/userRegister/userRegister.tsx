"use client";
import { getEmployeeByDocumentNumber } from "@/helpers/employee.helpers";
import { getAllRoles } from "@/helpers/role.helper";
import { RoleListProps } from "@/types/role";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";

const UserRegister = () => {
  const [roles, setRoles] = useState<RoleListProps[]>([]);

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    email: "",
    address: "",
  });

  // Función para obtener todos los roles
  const GetRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
      console.log("roles obtenidos:", rolesData);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Función para buscar empleado por número de documento
  const handleSearch = async (documentNumber: string) => {
    if (documentNumber.length >= 8) {
      try {
        const empleadoData = await getEmployeeByDocumentNumber(documentNumber);
        console.log("Empleado encontrado:", empleadoData);
        if (!empleadoData) {
          setEmployeeData({
            firstName: "",
            lastNameFather: "",
            lastNameMother: "",
            email: "",
            address: "",
          });
          toast.error("No se encontró el empleado", { theme: "colored" });
          return;
        }

        setEmployeeData({
          firstName: empleadoData.firstName,
          lastNameFather: empleadoData.lastNameFather,
          lastNameMother: empleadoData.lastNameMother,
          email: empleadoData.email,
          address: empleadoData.address,
        });

        toast.success("Empleado encontrado", { theme: "colored" });
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        toast.error("Error al buscar el empleado", { theme: "colored" });
      }
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetRoles();
  }, []);

  return (
    <>
      <form className="w-full max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-left mx-10">
          Registro de usuario
        </h2>
        {/* Buscar empleado por numero de documento */}

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mx-10">
          {/* Nombres */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 text-sm font-medium">
              Nombres
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={employeeData.firstName}
              readOnly
              className="input input-info w-full"
            />
          </div>

          {/* Apellido Paterno */}
          <div className="flex flex-col">
            <label
              htmlFor="lastNameFather"
              className="mb-1 text-sm font-medium"
            >
              Apellido Paterno
            </label>
            <input
              type="text"
              id="lastNameFather"
              name="lastNameFather"
              value={employeeData.lastNameFather}
              readOnly
              className="input input-info w-full"
            />
          </div>

          {/* Apellido Materno */}
          <div className="flex flex-col">
            <label
              htmlFor="lastNameMother"
              className="mb-1 text-sm font-medium"
            >
              Apellido Materno
            </label>
            <input
              type="text"
              id="lastNameMother"
              name="lastNameMother"
              value={employeeData.lastNameMother}
              readOnly
              className="input input-info w-full"
            />
          </div>

          {/* Roles */}
          <div className="flex flex-col">
            <label htmlFor="role" className="mb-1 text-sm font-medium">
              Rol
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                className="input input-info w-full pr-10 appearance-none"
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

          {/* Dirección */}
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 text-sm font-medium">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={employeeData.address}
              readOnly
              className="input input-info w-full"
            />
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
          >
            Registrar
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
