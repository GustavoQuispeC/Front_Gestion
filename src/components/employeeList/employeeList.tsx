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
  const [formattedBirthDate, setFormattedBirthDate] = useState<string | null>(
    null
  );

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
  useEffect(() => {
    if (employees.length > 0) {
      // Formateamos la fecha solo en el cliente
      const formattedDate = new Date(
        employees[0].birthDate
      ).toLocaleDateString();
      setFormattedBirthDate(formattedDate);
    }
  }, [employees]);

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetEmployees();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-cyan-800 whitespace-nowrap">
          <tr className="even:bg-blue-50">
            <th className="p-4 text-left text-sm font-medium text-white">Id</th>

            <th className="p-4 text-left text-sm font-medium text-white">
              A. Paterno
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              A. Materno
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Nombres
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              F. Nacimiento
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              T. documento
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Num. documento
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Teléfono
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Estado
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {/* Renderizamos cada empleado */}
          {employees.map((employee) => (
            <tr className="hover:bg-gray-100" key={employee.id}>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.id}
              </td>

              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.lastNameFather}
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.lastNameMother}
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.firstName}
              </td>
              {/* Solo mostramos la fecha formateada en el cliente */}
              <td>{formattedBirthDate || "Cargando..."}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.documentType}
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.documentNumber}
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {employee.phone}
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {/* Botón con borde condicional */}
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
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                <div className="flex items-center">
                  <Link href={`/employeeView/${employee.id}`}>
                    <button className="mr-3" title="View">
                      <FaEye size={20} color="#566573" />
                    </button>
                  </Link>
                  <button className="mr-3" title="Edit">
                    <MdModeEditOutline size={20} color="#2980b9" />
                  </button>
                  <button title="Delete">
                    <FaRegTrashAlt size={20} color="#e74c3c" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
