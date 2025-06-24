"use client";
import { EmployeeListProps } from "@/types/employee";
import { useState, useEffect } from "react";
import { getAllEmployees } from "@/helpers/employee.helper";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { IoAddCircle } from "react-icons/io5";

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
          className=" inline-flex items-center text-orange-600 hover:underline font-small font-semibold text-base"
        >
          <IoAddCircle size={24} color="#e74c3c" className="mr-1" />
          Nuevo
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-1 text-left text-sm font-small">Id</th>
              <th className="p-1 text-left text-sm font-small">A. Paterno</th>
              <th className="p-1 text-left text-sm font-small">A. Materno</th>
              <th className="p-1 text-left text-sm font-small">Nombres</th>
              <th className="p-1 text-left text-sm font-small">
                F. Nacimiento
              </th>
              <th className="p-1 text-left text-sm font-small">T. documento</th>
              <th className="p-1 text-left text-sm font-small">
                Num. documento
              </th>
              <th className="p-1 text-left text-sm font-small">Teléfono</th>
              <th className="p-1 text-left text-sm font-small">Estado</th>
              <th className="p-1 text-left text-sm font-small">Acciones</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {employees.map((employee) => (
              <tr className="hover:bg-gray-100" key={employee.id}>
                <td className="p-1 text-slate-900 font-small">{employee.id}</td>
                <td className="p-1 text-slate-900 font-small">
                  {employee.lastNameFather}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  {employee.lastNameMother}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  {employee.firstName}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  {new Date(employee.birthDate).toLocaleDateString()}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  {employee.documentType}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  {employee.documentNumber}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  {employee.phone}
                </td>
                <td className="p-1 text-slate-900 font-small">
                  <button
                    className={`px-2 py-0.5 rounded-xl border-2 ${
                      employee.isActive
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                        : "border-red-500 text-red-500 bg-red-50"
                    }`}
                  >
                    {employee.isActive ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td className="p-1 text-slate-900 font-small">
                  <div className="flex items-center">
                    <Link href={`/dashboard/employeeView/${employee.id}`}>
                      <button className="mr-3" title="Ver">
                        <FaEye size={18} color="#575553" />
                      </button>
                    </Link>
                    <button className="mr-3" title="Editar">
                      <MdModeEditOutline size={18} color="#16cfe4" />
                    </button>
                    <button title="Eliminar">
                      <FaRegTrashAlt size={18} color="#f3240d" />
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
