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
import { SalaryAdvanceTableProps } from "@/types/salaryAdvance";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

interface Props {
  salaryAdvances: SalaryAdvanceTableProps[];
}

export default function SalaryAdvanceTable({ salaryAdvances }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto w-full">
      <Table className="w-full">
        <TableCaption> Adelanto de sueldo</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" w-[40px]">Fecha</TableHead>
            <TableHead className=" text-center">Monto S/</TableHead>

            <TableHead className=" text-center">Registrado el:</TableHead>
            <TableHead className="  w-[100px] text-center">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salaryAdvances && salaryAdvances.length > 0 ? (
            salaryAdvances.map((sa, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(sa.dateRequested).toLocaleDateString()}
                </TableCell>
                 <TableCell className="text-center">S/ {sa.amount}</TableCell>

                <TableCell className="text-center">
                  {new Date(sa.createdAt).toLocaleDateString()}
                </TableCell>
               
                <TableCell>
                  <Badge
                    className={`mt-0.5 ${
                      sa.isApproved
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold w-32"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold w-32"
                    }`}
                  >
                    {sa.isApproved ? <BadgeCheckIcon /> : <BadgeX />}
                    {sa.isApproved ? " Aprobado" : " No Aprobado"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay adelantos de sueldo registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
