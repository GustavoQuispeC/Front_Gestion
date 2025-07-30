"use client";

import React, { useEffect, useState } from "react";
import { getEmployeeById } from "@/helpers/employee.helper";
import { EmployeeByIdProps } from "@/types/employee";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

const EmployeeView = ({ employeeId }: { employeeId: string }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState<EmployeeByIdProps | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(employeeId);
        setEmployee(data);
      } catch (error) {
        console.error("Error al obtener el empleado:", error);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Cargando detalles del empleado...
        </p>
      </div>
    );
  }

  return (
   <div className="min-h-screen py-10 px-6 flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
  <div className="w-full max-w-6xl bg-neutral-100 dark:bg-neutral-900 p-8 rounded-xl shadow-lg">
    <div className="flex justify-between mb-8">
      <h1 className="text-3xl font-bold">Detalles del Empleado</h1>
      <Button
        onClick={() => router.push("/dashboard/employeeList")}
        className="flex items-center gap-2 bg-neutral-200 hover:bg-neutral-300 text-black dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white"
        variant="ghost"
      >
        <IoMdArrowRoundBack />
        Volver
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Foto y posición */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src={employee.photoUrl || "/default-avatar.png"}
          alt="Foto del empleado"
          width={160}
          height={160}
          className="rounded-full border-4 border-white object-cover"
        />
        <span className="font-semibold text-lg">{employee.position}</span>
      </div>

      {/* Datos personales */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
        <Label className="text-gray-700 dark:text-gray-300">ID:</Label>
        <span className="font-bold">{employee.id}</span>

        <Label className="text-gray-700 dark:text-gray-300">Nombre Completo:</Label>
        <span className="font-bold">
          {employee.firstName} {employee.lastNameFather} {employee.lastNameMother}
        </span>

        <Label className="text-gray-700 dark:text-gray-300">Fecha de Nacimiento:</Label>
        <span className="font-bold">
          {employee.birthDate
            ? format(new Date(employee.birthDate), "dd/MM/yyyy", { locale: es })
            : ""}
        </span>

        <Label className="text-gray-700 dark:text-gray-300">Correo:</Label>
        <span className="font-bold">{employee.email}</span>

        <Label className="text-gray-700 dark:text-gray-300">Tipo de Documento:</Label>
        <span className="font-bold">{employee.documentType}</span>

        <Label className="text-gray-700 dark:text-gray-300">Número de Documento:</Label>
        <span className="font-bold">{employee.documentNumber}</span>

        <Label className="text-gray-700 dark:text-gray-300">Teléfono:</Label>
        <span className="font-bold">{employee.phone}</span>

        <Label className="text-gray-700 dark:text-gray-300">Teléfono de Emergencia:</Label>
        <span className="font-bold">{employee.emergencyPhone}</span>

        <Label className="text-gray-700 dark:text-gray-300">Fecha de Contratación:</Label>
        <span className="font-bold">
          {employee.hireDate
            ? format(new Date(employee.hireDate), "dd/MM/yyyy", { locale: es })
            : ""}
        </span>

        <Label className="text-gray-700 dark:text-gray-300">Tipo de Contrato:</Label>
        <span className="font-bold">{employee.contractType}</span>

        <Label className="text-gray-700 dark:text-gray-300">Dirección:</Label>
        <span className="font-bold">{employee.address}</span>

        <Label className="text-gray-700 dark:text-gray-300">Estado:</Label>
        <Badge
          className={`mt-0.5 gap-1 ${
            employee.isActive
              ? "border-green-200 text-green-600 bg-green-100 "
              : "border-red-200 text-red-600 bg-red-100 "
          }`}
        >
          {employee.isActive ? <BadgeCheckIcon /> : <BadgeX />}
          {employee.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </div>
    </div>
  </div>
</div>

  );
};

export default EmployeeView;
