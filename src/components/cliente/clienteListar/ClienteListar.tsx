"use client";
import { ClientesListar } from "@/helpers/cliente.helper";
import { ListarClientesProps } from "@/types/cliente";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

export default function ClienteListar() {
  const [clientes, setClientes] = useState<ListarClientesProps[]>([]);

  

  //funcion para obtener los clientes
  const getClientes = async () => {
    try {
      const clientesData = await ClientesListar();
      setClientes(clientesData);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      toast.error("Error al obtener los clientes", { theme: "colored" });
    }
  };

  //llamada cuando se monta el componente
  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="mb-6">
        <h2 className="text-xl text-blue-900 dark:text-blue-500 font-bold mb-2">
          Listado de clientes
        </h2>

        <Link
          href="/dashboard/clienteRegistrar"
          className=" inline-flex items-center text-primary hover:underline font-small font-semibold text-base"
        >
          <CirclePlus size={18} className="mr-1" />
          Agregar
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 dark:bg-neutral-900">

        <Table>
          <TableCaption>Listado de clientes</TableCaption>
          <TableHeader className="font-extra-bold">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>Apellidos</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Razón Social</TableHead>
                <TableHead>RUC</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.nombres}</TableCell>
                <TableCell>{p.apellidos}</TableCell>
                
                <TableCell>{p.dni}</TableCell>
                <TableCell>{p.razonSocial}</TableCell>
                <TableCell>{p.ruc}</TableCell>
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
                          href={`/dashboard/clienteView/${p.id}`}
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
