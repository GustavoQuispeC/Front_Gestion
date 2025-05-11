'use client';
import { getAllRoles } from "@/helpers/role.helper";
import { RoleListProps } from "@/types/role";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const UserRegister = () => {
  const [roles, setRoles] = useState<RoleListProps[]>([]);

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
              className="input input-info w-full"
            />
          </div>

          {/* Roles */}
          <div className="flex flex-col">
            <label htmlFor="documentType" className="mb-1 text-sm font-medium">
              Rol
            </label>
            <select id="role" name="role" className="input input-info w-full">
              <option value="">Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
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
