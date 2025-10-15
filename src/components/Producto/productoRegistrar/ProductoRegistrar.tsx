"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registrarProducto } from "@/helpers/producto.helper";
import { ProveedoresListar } from "@/helpers/proveedor.helper";
import { ProductoRegistrarProps } from "@/types/producto";
import { ListarProveedoresProps } from "@/types/proveedor";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBrush, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

export default function ProductoRegistrar() {
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [productoRegistrar, setProductoRegistrar] =
    useState<ProductoRegistrarProps>({
      descripcion: "",
      precio: 0,
      stock: 0,
      proveedorId: "",
      imageUrl: "",
    });

  const [token, setToken] = useState<string>("");
  const [proveedor, setProveedor] = useState<ListarProveedoresProps[]>([]);

  //! validación de permisos
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.roles?.[0];
    const storedToken = user?.token;
    if (
      !role ||
      !["Administrador", "Supervisor"].includes(role) ||
      !storedToken
    ) {
      setHasPermission(false);
    } else {
      setToken(storedToken);
      ListarProveedores();
    }
  }, []);

  //! limpiar formulario
  const handleReset = () => {
    setProductoRegistrar({
      descripcion: "",
      precio: 0.00,
      stock: 0.00,
      proveedorId: "",
      imageUrl: "",
    });
  };

  //!Funcion para obtener los proveedores
  const ListarProveedores = async () => {
    try {
      const proveedoresData = await ProveedoresListar();
      setProveedor(proveedoresData);
    } catch (e) {
      toast.error("Error al listar los proveedores");
      console.error("Error al listar proveedores:", e);
    }
  };
  //! Función para manejar el cambio del proveedor
  const handleProveedorChange = (value: string) => {
    setProductoRegistrar({
      ...productoRegistrar,
      proveedorId: value,
    });
  };
  //! función para registrar el producto
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productoRegistrar.descripcion ||
      !productoRegistrar.precio ||
      !productoRegistrar.stock ||
      !productoRegistrar.proveedorId ||
      !productoRegistrar.imageUrl
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    const productoRegistrarData = {
      ...productoRegistrar,
      precio: Number(productoRegistrar.precio),
      stock: Number(productoRegistrar.stock),
      proveedorId: productoRegistrar.proveedorId,
    };

    try {
      const response = await registrarProducto(productoRegistrarData, token);
      if (response?.message === "Producto registrado correctamente") {
        toast.success("Producto registrado con éxito.");
        handleReset();
      } else if (response?.message) {
        toast.error(response.message);
      } else if (response?.error) {
        toast.error(response.error);
      } else {
        toast.error("Error al registrar el producto");
      }
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      if (error instanceof Error && error.message) {
        toast.error(error.message);
      } else {
        toast.error("Error desconocido al registrar el producto");
      }
    }
  };

  // Si no tiene permisos
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
    <form
      onSubmit={handleRegister}
      onReset={handleReset}
      className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl text-blue-900 dark:text-blue-500 font-semibold mb-6 text-left mx-10">
        Registro de Productos
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 ">
        <div>
          <Label className="mb-2 mx-10">Descripción</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="text"
              placeholder="Ingrese nombre"
              id="razonSocial"
              value={productoRegistrar.descripcion}
              onChange={(e) =>
                setProductoRegistrar({
                  ...productoRegistrar,
                  descripcion: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Precio</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="number"
              placeholder="0.00"
              id="precio"
              value={productoRegistrar.precio}
              onChange={(e) =>
                setProductoRegistrar({
                  ...productoRegistrar,
                  precio: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Stock</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="number"
              placeholder="0.00"
              id="stock"
              value={productoRegistrar.stock}
              onChange={(e) =>
                setProductoRegistrar({
                  ...productoRegistrar,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Proveedor</Label>
          <div className="relative flex items-center mx-10">
            <Select
              value={productoRegistrar.proveedorId.toString()}
              onValueChange={handleProveedorChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {proveedor.map((proveedor) => (
                    <SelectItem
                      key={proveedor.proveedorId}
                      value={proveedor.proveedorId}
                    >
                      {proveedor.razonSocial}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mx-10">
        <Link href="/dashboard/proveedorListar">
          <Button variant="outline" className="w-full">
            <IoMdArrowRoundBack className="text-base" />
            Volver
          </Button>
        </Link>

        <Button type="submit" className="w-full">
          <FaSave className="text-base" />
          Registrar
        </Button>

        <Button type="reset" variant="secondary" className="w-full">
          <FaBrush className="text-base" />
          Limpiar
        </Button>
      </div>
    </form>
  );
}
