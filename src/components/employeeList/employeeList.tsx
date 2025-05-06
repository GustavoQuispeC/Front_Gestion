"use client";
import { EmployeeListProps } from "@/types";
import { useState, useEffect } from "react";
import { getAllEmployees } from "@/helpers/employee.helpers";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeListProps[]>([]);

  // Función para obtener todos los empleados
  const GetEmployees = async () => {
    try {
      const employeeData = await getAllEmployees();
      setEmployees(employeeData); // Actualizamos el estado con los empleados
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetEmployees();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Lista de empleados
        </h1>

        <Link
          href="/dashboard/employeeRegister"
          className="inline-flex items-center text-blue-600 hover:underline font-medium text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Id</th>
              <th className="p-4 text-left text-sm font-medium">A. Paterno</th>
              <th className="p-4 text-left text-sm font-medium">A. Materno</th>
              <th className="p-4 text-left text-sm font-medium">Nombres</th>
              <th className="p-4 text-left text-sm font-medium">
                F. Nacimiento
              </th>
              <th className="p-4 text-left text-sm font-medium">
                T. documento
              </th>
              <th className="p-4 text-left text-sm font-medium">
                Num. documento
              </th>
              <th className="p-4 text-left text-sm font-medium">Teléfono</th>
              <th className="p-4 text-left text-sm font-medium">Estado</th>
              <th className="p-4 text-left text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {employees.map((employee) => (
              <tr className="hover:bg-gray-100" key={employee.id}>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.id}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.lastNameFather}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.lastNameMother}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.firstName}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {new Date(employee.birthDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.documentType}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.documentNumber}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  {employee.phone}
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  <button
                    className={`px-2 py-0.5 rounded-xl border-2 font-semibold ${
                      employee.isActive
                        ? "border-green-200 text-green-500 bg-green-50"
                        : "border-red-500 text-red-500 bg-red-50"
                    }`}
                  >
                    {employee.isActive ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td className="p-3 text-slate-900 font-medium">
                  <div className="flex items-center">
                    <Link href={`/dashboard/employeeView/${employee.id}`}>
                      <button className="mr-3" title="Ver">
                        <FaEye size={20} color="#566573" />
                      </button>
                    </Link>
                    <button className="mr-3" title="Editar">
                      <MdModeEditOutline size={20} color="#2980b9" />
                    </button>
                    <button title="Eliminar">
                      <FaRegTrashAlt size={20} color="#e74c3c" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
