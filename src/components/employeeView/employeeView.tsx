"use client";
import React, { useEffect, useState } from "react";
import { getEmployeeById } from "@/helpers/employee.helpers";
import { EmployeeListProps } from "@/types";
import { useRouter } from "next/navigation";

const EmployeeView = ({ employeeId }: { employeeId: string }) => {
  const router = useRouter();

  const [employee, setEmployee] = useState<EmployeeListProps | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeData = await getEmployeeById(employeeId);
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error al obtener el empleado:", error);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen py-2 bg-gray-100">
        <p>Cargando detalles del empleado...</p>
      </div>
    );
  }

  const DataItem = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-base text-gray-700 font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Detalles del Empleado
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna izquierda: foto y botones */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={employee.photoUrl || "/default-avatar.png"}
              alt="Employee"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
            />
            <button
              onClick={() => router.push("/dashboard/employeeList")}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Volver a la lista
            </button>
           
          </div>

          {/* Columnas de datos */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DataItem label="ID" value={employee.id} />
            <DataItem
              label="Nombre completo"
              value={`${employee.firstName} ${employee.lastNameFather} ${employee.lastNameMother}`}
            />
            <DataItem
              label="Fecha de nacimiento"
              value={new Date(employee.birthDate).toLocaleDateString()}
            />
            <DataItem label="Tipo de documento" value={employee.documentType} />
            <DataItem
              label="Número de documento"
              value={employee.documentNumber}
            />
            <DataItem label="Teléfono" value={employee.phone} />
            <DataItem
              label="Teléfono de emergencia"
              value={employee.emergencyPhone}
            />
            <DataItem
              label="Fecha de contratación"
              value={new Date(employee.hireDate).toLocaleDateString()}
            />
            <DataItem label="Email" value={employee.email} />
            <DataItem label="Dirección" value={employee.address} />
            <DataItem
              label="Estado"
              value={
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-white ${
                    employee.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {employee.isActive ? "Activo" : "Inactivo"}
                </span>
              }
            />
            <DataItem label="Posición" value={employee.position} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
