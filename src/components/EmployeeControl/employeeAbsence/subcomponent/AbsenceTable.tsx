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
import { AbsenceTableProps } from "@/types/absence";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

interface Props {
  absences: AbsenceTableProps[];
}

export default function AbsenceTable({ absences }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto w-full">
      <Table className="w-full">
        <TableCaption> Inasistencias registradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Fecha de inasistencia</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Registrado el</TableHead>
            <TableHead className="text-center">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {absences && absences.length > 0 ? (
            absences.map((a, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                <TableCell>{a.reason}</TableCell>
                <TableCell>
                  {new Date(a.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`mt-0.5${
                      a.isJustified
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold w-32"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold w-32"
                    }`}
                  >
                    {a.isJustified ? <BadgeCheckIcon /> : <BadgeX />}
                    {a.isJustified ? "Justificado" : "No Justificado"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay inasistencias registradas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
