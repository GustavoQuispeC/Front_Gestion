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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Detalles del Empleado</h1>

        <div className="mb-4">
          <label className="font-medium">ID:</label>
          <p>{employee.id}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Nombre:</label>
          <p>
            {employee.firstName} {employee.lastNameFather}{" "}
            {employee.lastNameMother}
          </p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Fecha de Nacimiento:</label>
          <p>{new Date(employee.birthDate).toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Teléfono:</label>
          <p>{employee.phone}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Email:</label>
          <p>{employee.email}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Estado:</label>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              employee.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {employee.isActive ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div className="mb-4">
          <label className="font-medium">Posición:</label>
          <p>{employee.position}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Tipo de Documento:</label>
          <p>{employee.documentType}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Número de Documento:</label>
          <p>{employee.documentNumber}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Fecha de Contratación:</label>
          <p>{new Date(employee.hireDate).toLocaleDateString()}</p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/employeeList")}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
