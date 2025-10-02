'use client';
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
import { es } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProveedores } from "@/helpers/proveedor.helper";
import { toast } from "react-toastify";
import { ListarProveedoresProps } from "@/types/proveedor";

export default function ProveedorListar() {
  const [proveedores, setProveedores] = useState<ListarProveedoresProps[]>([]);

  //funcion para obtener los proveedores
  const getProveedores = async () => {
    try {
      const proveedoresData = await getAllProveedores();
      setProveedores(proveedoresData);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
      toast.error("Error al obtener los proveedores", { theme: "colored" });
    }
  };

  //llamada cuando se monta el componente
  useEffect(() => {
    getProveedores();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="mb-6">
        <h2 className="text-xl text-blue-900 dark:text-blue-500 font-bold mb-2">
          Listado de proveedores
        </h2>

        <Link
          href="/dashboard/proveedorRegister"
          className=" inline-flex items-center text-primary hover:underline font-small font-semibold text-base"
        >
          <CirclePlus size={18} className="mr-1" />
          Agregar
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 dark:bg-neutral-900">
        <Table>
          <TableCaption>Listado de proveedores</TableCaption>
          <TableHeader className="font-extra-bold">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Razón Social</TableHead>
              <TableHead>RUC</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proveedores.map((p) => (
              <TableRow key={p.proveedorId}>
                <TableCell className="font-medium">{p.proveedorId}</TableCell>
                <TableCell>{p.razonSocial}</TableCell>
                <TableCell>{p.ruc}</TableCell>
                <TableCell>{p.telefono}</TableCell>
                <TableCell>{p.direccion}</TableCell>
                <TableCell>
                  {p.createdAt
                    ? format(new Date(p.createdAt), "dd/MM/yyyy", {
                        locale: es,
                      })
                    : ""}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`mt-0.5${
                      p.isActive
                        ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                        : "border-red-200 text-red-500 bg-red-50 font-semibold"
                    }`}
                  >
                    {p.isActive ? <BadgeCheckIcon /> : <BadgeX />}
                    {p.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-end space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/dashboard/proveedorView/${p.proveedorId}`}
                        >
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
                        <button
                          className="mr-3 text-blue-800 dark:text-blue-500"
                          title="Editar"
                        >
                          <Pencil size={18} />
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
