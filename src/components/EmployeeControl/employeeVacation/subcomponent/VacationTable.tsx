import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VacationRegisterProps } from "@/types/vacation";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

interface Props {
  vacations: VacationRegisterProps[];
}

export default function VacationTable({ vacations }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto w-full">
      <Table className="w-full">
        <TableCaption>Vacaciones registradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Días Solicitados</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead className="text-center">Aprobado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacations && vacations.length > 0 ? (
            vacations.map((v, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(v.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(v.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{v.daysRequested}</TableCell>
                <TableCell className="text-left">{v.reason}</TableCell>
                <TableCell className="text-center">
                  <Checkbox id="terms" checked={v.isApproved} disabled />
                </TableCell>
                <TableCell>
                  <Badge
                    className={`mt-0.5${
                      v.isApproved
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold"
                    }`}
                  >
                    {v.isApproved ? <BadgeCheckIcon /> : <BadgeX />}
                    {v.isApproved ? "Activo" : "Inactivo"}
                  </Badge>
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
