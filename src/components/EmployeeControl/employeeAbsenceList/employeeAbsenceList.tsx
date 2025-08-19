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
import { EmployeeAbsenceAll } from "@/types/absence";
import { useEffect, useState } from "react";
import { GetAllAbsences } from "@/helpers/absence.helper";
import { toast } from "react-toastify";

export default function EmployeeAbsenceList() {
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeAbsenceAll[]>([]);

  // Función para obtener las vacaciones de todos los empleados
  const GetEmployeesVacationsAll = async () => {
    try {
      const employeeData = await GetAllAbsences();
      setEmployees(employeeData); // Actualizamos el estado con los empleados
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetEmployeesVacationsAll();
  }, []);

  return (
    <div className="md:col-span-3 overflow-x-auto w-full">
      <Table className="w-full">
        <TableCaption>Listado de empleados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Apellido paterno</TableHead>
            <TableHead>Apellido materno</TableHead>
            <TableHead>Nombres</TableHead>
            <TableHead>F. justificadas</TableHead>
            <TableHead>F. injustificadas</TableHead>
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
                <TableCell className={e.justified >= 1 ? "text-green-600 font-bold pl-12" : "pl-12"}>{e.justified}</TableCell>
                <TableCell className={e.unjustified >= 1 ? "text-red-600 font-bold pl-12" : "pl-12"}>
                    {e.unjustified}
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
          onClick={() => router.push("/dashboard/employeeAbsence")}
          className="w-64 bg-gray-200"
        >
          <IoMdArrowRoundBack className="text-base" />
          Volver
        </Button>{" "}
      </div>
    </div>
  );
}
