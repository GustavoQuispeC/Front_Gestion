"use client";

import React, { useEffect, useState } from "react";
import { getEmployeeById } from "@/helpers/employee.helper";
import { EmployeeListProps } from "@/types/employee";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";

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
        <p className="text-xl font-medium text-gray-500">
          Cargando detalles del empleado...
        </p>
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
            <Image
              src={employee.photoUrl || "/default-avatar.png"}
              alt="Foto del empleado"
              width={150}
              height={150}
              className="rounded-full border-4 border-gray-300 shadow-lg object-cover"
            />
            <button
              onClick={() => router.push("/dashboard/employeeList")}
              className="flex items-center justify-center gap-1.5 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-gray-300 font-medium 
              rounded-md text-xs px-4 py-2 w-[80%] mx-auto disabled:opacity-50"
            >
              <IoMdArrowRoundBack className="text-base" />
              Volver
            </button>
          </div>

          {/* Columnas de datos */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DataItem label="ID" value={employee.id} />
            <DataItem
              label="Nombre completo"
              value={`${employee.firstName} ${employee.lastNameFather} ${employee.lastNameMother}`}
            />
            <DataItem
              label="Fecha de nacimiento"
              value={new Date(employee.birthDate).toLocaleDateString()}
            />
            <DataItem label="Email" value={employee.email} />
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

            <DataItem label="Dirección" value={employee.address} />
            <DataItem
              label="Estado"
              value={
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    employee.isActive
                      ? "bg-green-100 text-green-500 border border-green-200"
                      : "bg-red-100 text-red-500 border border-red-500"
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
