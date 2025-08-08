import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VacacionListProps } from "@/types/vacation";
import { BadgeCheckIcon, BadgeX } from "lucide-react";
import { es } from "date-fns/locale";
import { format } from "date-fns";

interface Props {
  vacations: VacacionListProps[];
}

export default function VacationTable({ vacations }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto w-full">
      <Table className="w-full">
        <TableCaption>Vacaciones registradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Días Solicitados</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Aprobado</TableHead>
            <TableHead>Fecha de Registro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacations && vacations.length > 0 ? (
            vacations.map((v, index) => (
              <TableRow key={index}>
                <TableCell>
                  {v.startDate
                    ? format(new Date(v.startDate), "dd/MM/yyyy", {
                        locale: es,
                      })
                    : ""}
                </TableCell>
                <TableCell>
                  {v.endDate
                    ? format(new Date(v.endDate), "dd/MM/yyyy", {
                        locale: es,
                      })
                    : ""}
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
