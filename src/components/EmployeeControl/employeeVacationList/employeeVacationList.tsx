"use client";

import { getEmployeesVacationAll } from "@/helpers/vacation.helper";
import { EmployeeVacationListProps } from "@/types/vacation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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

export default function EmployeeVacationList() {
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeVacationListProps[]>([]);

  // Función para obtener las vacaciones de todos los empleados
  const GetEmployeesVacationsAll = async () => {
    try {
      const employeeData = await getEmployeesVacationAll();
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
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 dark:bg-neutral-900">
      <Table className="w-full">
        <TableCaption>Listado de empleados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Apellido paterno</TableHead>
            <TableHead>Apellido materno</TableHead>
            <TableHead>Nombres</TableHead>
            <TableHead>Fecha de contrato</TableHead>
            <TableHead>Dias a tomar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees && employees.length > 0 ? (
            employees.map((e, index) => (
              <TableRow key={index}>
                <TableCell className="pl-5">{e.employeeId}</TableCell>
                <TableCell>{e.lastNameFather}</TableCell>
                <TableCell>{e.lastNameMother}</TableCell>
                <TableCell>{e.firstName}</TableCell>

                <TableCell>
                  {e.hireDate
                    ? format(new Date(e.hireDate), "dd/MM/yyyy", {
                        locale: es,
                      })
                    : ""}
                </TableCell>
                <TableCell
                  className={`font-semibold pl-10 ${
                    e.remainingDays >= 1 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {e.remainingDays}
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
          onClick={() => router.push("/dashboard/employeeVacation")}
          className="w-64 bg-gray-200"
        >
          <IoMdArrowRoundBack className="text-base" />
          Volver
        </Button>{" "}
      </div>
    </div>
  );
}
