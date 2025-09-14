"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { EmployeeSalaryAdvanceAll } from "@/types/salaryAdvance";
import { GetAllSalaryAdvances } from "@/helpers/salaryAdvance.helper";

export default function EmployeeSalaryAdvanceList() {
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeSalaryAdvanceAll[]>([]);

  // Función para obtener los adelantos de sueldo de todos los empleados
  const GetEmployeesSalaryAdvancesAll = async () => {
    try {
      const employeeData = await GetAllSalaryAdvances();
      setEmployees(employeeData); // Actualizamos el estado con los empleados
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetEmployeesSalaryAdvancesAll();
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 dark:bg-neutral-900">
      <Table className="w-full ">
        <TableCaption>Listado de empleados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Apellido paterno</TableHead>
            <TableHead>Apellido materno</TableHead>
            <TableHead>Nombres</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>F. de registro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees && employees.length > 0 ? (
            employees.map((e, index) => (
              <TableRow key={index}>
                <TableCell className="pl-6  ">{e.employeeId}</TableCell>
                <TableCell>{e.lastNameFather}</TableCell>
                <TableCell>{e.lastNameMother}</TableCell>
                <TableCell>{e.firstName}</TableCell>
                <TableCell>{e.amount}</TableCell>
                <TableCell>
                  {new Date(e.createdAt).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No hay vacaciones registradas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/dashboard/employeeSalaryAdvance")}
          className="w-64 text-blue-900 dark:text-blue-500 mt-4"
        >
          <IoMdArrowRoundBack className="text-base" />
          Volver
        </Button>{" "}
      </div>
    </div>
  );
}
