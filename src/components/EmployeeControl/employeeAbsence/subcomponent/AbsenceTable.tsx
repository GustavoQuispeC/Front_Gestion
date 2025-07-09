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

interface Props {
  absences: AbsenceTableProps[];
}

export default function AbsenceTable({ absences }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto w-full">
      <Table className="w-full">
        <TableCaption>Ausencias registradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Fecha de la usencia</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Registrado el</TableHead>
            <TableHead className="text-center">Justificado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {absences && absences.length > 0 ? (
            absences.map((a) => (
              <TableRow key={`${a.employeeId}-${a.date.toString()}`}>
                <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                <TableCell>{a.reason}</TableCell>
                <TableCell>
                  {new Date(a.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={a.isJustified}
                    readOnly
                    aria-label="¿Está justificado?"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay faltas registradas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
