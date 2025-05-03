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
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <div className="flex items-center justify-center mb-6">
          <img
            src={employee.photoUrl || "/default-avatar.png"} // Default image if no photo
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
          />
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Detalles del Empleado
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="font-medium text-gray-700">ID:</label>
            <p className="text-gray-600">{employee.id}</p>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Nombre:</label>
            <p className="text-gray-600">
              {employee.firstName} {employee.lastNameFather}{" "}
              {employee.lastNameMother}
            </p>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">
              Fecha de Nacimiento:
            </label>
            <p className="text-gray-600">
              {new Date(employee.birthDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-between">
            <label className="font-medium text-gray-700">
              Tipo de Documento:
            </label>
            <p className="text-gray-600">{employee.documentType}</p>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">
              Número de Documento:
            </label>
            <p className="text-gray-600">{employee.documentNumber}</p>
          </div>


          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Teléfono:</label>
            <p className="text-gray-600">{employee.phone}</p>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">
              Teléfono de emergencia:
            </label>
            <p className="text-gray-600">{employee.emergencyPhone}</p>
          </div>
          <div className="flex justify-between">
            <label className="font-medium text-gray-700">
              Fecha de Contratación:
            </label>
            <p className="text-gray-600">
              {new Date(employee.hireDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Email:</label>
            <p className="text-gray-600">{employee.email}</p>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Dirección:</label>
            <p className="text-gray-600">{employee.address}</p>
          </div>


          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Estado:</label>
            <span
              className={`px-3 py-1 rounded-full font-semibold text-white ${
                employee.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {employee.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>

          <div className="flex justify-between">
            <label className="font-medium text-gray-700">Posición:</label>
            <p className="text-gray-600">{employee.position}</p>
          </div>

         
         
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/employeeList")}
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
