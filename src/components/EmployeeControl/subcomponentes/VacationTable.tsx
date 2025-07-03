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

interface Props {
  vacations: VacationRegisterProps[];
}

export default function VacationTable({ vacations }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto">
      
      <Table>
        <TableCaption>Vacaciones registradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"> Fecha Inicio</TableHead>
            <TableHead> Fecha Fin</TableHead>
            <TableHead >Días Solicitados</TableHead>
            <TableHead > Motivo</TableHead>
            <TableHead className="text-center" > Aprobado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacations.map((v, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(v.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{new Date(v.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{v.daysRequested}</TableCell>
              <TableCell className="text-left">{v.reason}</TableCell>
                <TableCell className="text-center">
                <input type="checkbox" checked={v.isApproved} readOnly />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
