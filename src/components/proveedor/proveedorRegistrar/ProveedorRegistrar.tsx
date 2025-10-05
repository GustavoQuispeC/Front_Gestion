"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registrarProveedor } from "@/helpers/proveedor.helper";
import { ProveedorRegistrarProps } from "@/types/proveedor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBrush, FaSave } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

export default function ProveedorRegistrar() {
  const [hasPermission, setHasPermission] = useState<boolean>(true);
  const [proveedorRegistrar, setProveedorRegistrar] =
    useState<ProveedorRegistrarProps>({
      razonSocial: "",
      ruc: "",
      telefono: "",
      direccion: "",
      isActive: true,
    });

  const [token, setToken] = useState<string>("");

  //!validación de permisos
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
    }
  }, []);

  // limpiar formulario
  const handleReset = () => {
    setProveedorRegistrar({
      razonSocial: "",
      ruc: "",
      telefono: "",
      direccion: "",
      isActive: true,
    });
  };

  // función para registrar el proveedor
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !proveedorRegistrar.razonSocial ||
      !proveedorRegistrar.ruc ||
      !proveedorRegistrar.telefono ||
      !proveedorRegistrar.direccion
    ) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    const proveedorRegistrarData = {
      ...proveedorRegistrar,
      isActive: proveedorRegistrar.isActive ?? true,
    };

    try {
      const response = await registrarProveedor(proveedorRegistrarData, token);
      if (response?.message === "Proveedor registrado correctamente") {
        toast.success("Proveedor registrado con éxito.");
        handleReset();
      } else if (response?.message) {
        toast.error(response.message);
      } else if (response?.error) {
        toast.error(response.error);
      } else {
        toast.error("Error al registrar el proveedor");
      }
    } catch (error) {
      console.error("Error al registrar el proveedor:", error);
      if (error instanceof Error && error.message) {
        toast.error(error.message);
      } else {
        toast.error("Error desconocido al registrar el proveedor");
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
        Registro de Proveedores
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 ">
        <div>
          <Label className="mb-2 mx-10">Razón Social</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="text"
              placeholder="Razón Social"
              id="razonSocial"
              value={proveedorRegistrar.razonSocial}
              onChange={(e) =>
                setProveedorRegistrar({
                  ...proveedorRegistrar,
                  razonSocial: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">RUC</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="text"
              placeholder="RUC"
              id="ruc"
              value={proveedorRegistrar.ruc}
              onChange={(e) =>
                setProveedorRegistrar({
                  ...proveedorRegistrar,
                  ruc: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Teléfono</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="text"
              placeholder="Teléfono"
              id="telefono"
              value={proveedorRegistrar.telefono}
              onChange={(e) =>
                setProveedorRegistrar({
                  ...proveedorRegistrar,
                  telefono: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 mx-10">Dirección</Label>
          <div className="relative flex items-center mx-10">
            <Input
              type="text"
              placeholder="Dirección"
              id="direccion"
              value={proveedorRegistrar.direccion}
              onChange={(e) =>
                setProveedorRegistrar({
                  ...proveedorRegistrar,
                  direccion: e.target.value,
                })
              }
            />
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
