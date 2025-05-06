"use client";
import React from "react";
import { EmployeeFormView } from "@/components"; 
import { useParams } from "next/navigation";

const EmployeeViewPage = () => {
  const params = useParams();

  // Si params?.employeeId es un array, tomamos el primer valor
  const employeeId = Array.isArray(params?.employeeId)
    ? params?.employeeId[0] // Si es un array, seleccionamos el primer valor
    : params?.employeeId; // Si es un string, lo usamos directamente

  // Verificamos si el employeeId está disponible
  if (!employeeId) {
    return <div>Empleado no encontrado.</div>;
  }

  return (
    <div>
      <EmployeeFormView employeeId={employeeId} />
    </div>
  );
};

export default EmployeeViewPage;
