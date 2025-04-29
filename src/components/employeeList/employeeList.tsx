'use client'
import { EmployeeRegisterProps } from "@/types";
import { useState } from "react";

export default function EmployeeList() {
  const [employeeCreate, setEmploye] = useState<EmployeeRegisterProps []>([]);

  const getAllEmployees = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }

      const json = await response.json();
      setEmploye(json);
    }
    catch (error) {
      console.error("Error al obtener los empleados:", error);
      throw error;
    }
  }

  const handleGetAllEmployees = async () => {
    await getAllEmployees();
  };


  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>       
            <th>Id</th>
            <th>Apellido Paterno</th>
            <th>Apellido materno</th>
            <th>Nombres</th>
            <th>F. Nacimiento</th>
            <th>Tipo de documento</th>
            <th>Número de documento</th>
            <th>Teléfono</th>
            <th>Activo</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      
      </table>
    </div>
  );
}
