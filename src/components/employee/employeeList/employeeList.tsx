"use client";
import { EmployeeListProps } from "@/types/employee";
import { useState, useEffect } from "react";
import { getAllEmployees } from "@/helpers/employee.helper";
import { toast } from "react-toastify";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheckIcon,
  BadgeX,
  CirclePlus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeListProps[]>([]);

  // Función para obtener todos los empleados
  const GetEmployees = async () => {
    try {
      const employeeData = await getAllEmployees();
      setEmployees(employeeData); // Actualizamos el estado con los empleados
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetEmployees();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Listado de empleados</h2>

        <Link
          href="/dashboard/employeeRegister"
          className=" inline-flex items-center text-blue-600 hover:underline font-small font-semibold text-base"
        >
          <CirclePlus size={18} color="#1f58db" className="mr-1" />
          Agregar
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <Table>
          <TableCaption>Listado de empleados</TableCaption>
          <TableHeader className="font-extrabold">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>A. Paterno</TableHead>
              <TableHead>A. Materno</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>F. Nacimiento</TableHead>
              <TableHead>T. documento</TableHead>
              <TableHead>Num. documento</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.id}</TableCell>
                <TableCell>{e.lastNameFather}</TableCell>
                <TableCell>{e.lastNameMother}</TableCell>
                <TableCell>{e.firstName}</TableCell>
                <TableCell>
                  {new Date(e.birthDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{e.documentType}</TableCell>
                <TableCell>{e.documentNumber}</TableCell>
                <TableCell>{e.phone}</TableCell>

                <TableCell>
                  <Badge
                    className={`mt-0.5${
                      e.isActive
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold"
                    }`}
                  >
                    {e.isActive ? <BadgeCheckIcon /> : <BadgeX />}
                    {e.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-end space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/dashboard/employeeView/${e.id}`}>
                          <button className="mr-3" title="Ver">
                            <Eye size={18} />
                          </button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ver detalle</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="mr-3" title="Editar">
                          <Pencil size={18} color="#2e5ecf" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button title="Eliminar">
                          <Trash2 size={18} color="#f2341b" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Eliminar</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>

                <TableCell className="text-right">{""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
