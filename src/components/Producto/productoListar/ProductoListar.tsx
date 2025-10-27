"use client";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BadgeCheckIcon,
  BadgeX,
  CirclePlus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { ProductoListarProps } from "@/types/producto";
import { toast } from "react-toastify";
import { listarProductos } from "@/helpers/producto.helper";
import { Button } from "@/components/ui/button";
import { useAuthToken } from "@/hooks/useAuthToken";
import Image from "next/image";

export default function ProductoListar() {
  const [productos, setProductos] = useState<ProductoListarProps[]>([]);
  const { token, hasPermission, isLoading } = useAuthToken([
    "Administrador",
    "Supervisor",
  ]);

  //funcion para obtener los productos
  const getProductos = useCallback(async () => {
    try {
      if (!token || !hasPermission) return;

      const productosData = await listarProductos(token);
      setProductos(productosData);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      toast.error("Error al obtener los productos", { theme: "colored" });
    }
  }, [token, hasPermission]);

  useEffect(() => {
    if (!isLoading && hasPermission) {
      getProductos();
    }
  }, [token, hasPermission, isLoading, getProductos]);

  //! Manejo de estado de carga
  if (isLoading) {
    // Renderizar un spinner o mensaje de carga
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="loader"></div>
      </div>
    );
  }

  //! Si no tiene permisos, mostrar mensaje
  if (!hasPermission) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-red-600">
            Lo siento, no tiene permisos suficientes
          </h2>
          <p className="text-xl mt-2">
            Por favor comuníquese con el administrador del sistema.
          </p>
          <Link href="/dashboard/main">
            <Button className="mt-6 px-4 py-2">Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="mb-6">
        <h2 className="text-xl text-blue-900 dark:text-blue-500 font-bold mb-2">
          Listado de Productos
        </h2>

        <Link
          href="/dashboard/productoRegistrar"
          className=" inline-flex items-center text-primary hover:underline font-small font-semibold text-base"
        >
          <CirclePlus size={18} className="mr-1" />
          Agregar
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 dark:bg-neutral-900">
        <Table>
          <TableCaption>Listado de productos</TableCaption>
          <TableHeader className="font-extra-bold">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Fecha de registro</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>
                  {p.imageUrl ? (
                    <Image 
                    src={p.imageUrl} 
                    alt={p.descripcion} 
                    className="object-cover"
                    width={48}
                    height={48}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
                      Sin Imagen
                    </div>
                  )}
                </TableCell>
                <TableCell>{p.descripcion}</TableCell>
                <TableCell>{p.precio}</TableCell>
                <TableCell>{p.stock}</TableCell>

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
                          href={`/dashboard/productoView/${p.id}`}
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
