import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getEmployeesVacationAll } from "@/helpers/vacation.helper";
import { EmployeeVacationListProps } from "@/types/vacation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EmployeeVacationList() {
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
    <div className="md:col-span-3 overflow-x-auto w-full">
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
                <TableCell>
                    {e.employeeId}
                </TableCell>
                <TableCell>
                  {e.lastNameFather}
                </TableCell>
                <TableCell>{v.daysRequested}</TableCell>
                <TableCell className="text-left">{v.reason}</TableCell>

                <TableCell>
                  <Badge
                    className={`mt-0.5${
                      v.isApproved
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold"
                    }`}
                  >
                    {v.isApproved ? <BadgeCheckIcon /> : <BadgeX />}
                    {v.isApproved ? "Aprobado" : "Rechazado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {v.createdAt
                    ? format(new Date(v.createdAt), "dd/MM/yyyy", {
                        locale: es,
                      })
                    : ""}
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
    </div>
  );
}