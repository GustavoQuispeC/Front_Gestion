"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ClientesListar } from "@/helpers/cliente.helper";
import { cn } from "@/lib/utils";
import { ListarClientesProps } from "@/types/cliente";
import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PedidoRegistrar() {
  const [openProductos, setOpenProductos] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [openClientes, setOpenClientes] = useState(false);
  const [clientes, setClientes] = useState<ListarClientesProps[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<ListarClientesProps | null>(null);
    
  //! Obtener lista de clientes
  const ObtenerClientes = async () => {
    try {
      const clientesData = await ClientesListar();
      setClientes(clientesData);
    } catch (e) {
      toast.error("Error al listar los clientes");
      console.error("Error al listar clientes:", e);
    }
  };

  //!Cargar lista de clientes al iniciar
  useEffect(() => {
    ObtenerClientes();
  }, []);

  //!Cambio de cliente
  const handleChangeClientes = (id: number) => {
    const cliente = clientes.find((c) => c.id === id);
    setClienteSeleccionado(cliente || null);
  };

  return (
    <>
      <form className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-xl">
        <h2 className="text-2xl text-blue-900 dark:text-blue-500 font-semibold mb-6 text-left mx-10">
          Registro de Pedidos
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {/*select de Cliente */}
          <div>
            {/* select de Cliente */}
            <Label className="mb-2 mx-10">Cliente</Label>
            <div className="relative flex items-center mx-10">
              <Popover open={openClientes} onOpenChange={setOpenClientes}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openClientes}
                    className="w-full justify-between"
                  >
                    {clienteSeleccionado
                      ? clienteSeleccionado.tipoCliente === "Natural"
                        ? `${clienteSeleccionado.apellidos} ${clienteSeleccionado.nombres}`
                        : clienteSeleccionado.razonSocial
                      : "Seleccione cliente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[350px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Buscar cliente..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {clientes.map((c) => (
                          <CommandItem
                            key={c.id}
                            value={
                              c.tipoCliente === "Natural"
                                ? `${c.apellidos} ${c.nombres}`
                                : c.razonSocial ?? ""
                            }
                            onSelect={() => {
                              handleChangeClientes(c.id);
                              setOpenClientes(false);
                            }}
                          >
                            {c.tipoCliente === "Natural"
                              ? `${c.apellidos} ${c.nombres}`
                              : c.razonSocial}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                clienteSeleccionado?.id === c.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Mostrar documentos (DNI / RUC) */}
            {clienteSeleccionado && (
              <div className="mx-10 mt-4">
                {/* Caso: cliente con ambos documentos */}
                {clienteSeleccionado.dni && clienteSeleccionado.ruc ? (
                  <div>
                    <p className="text-sm mb-2 font-semibold">
                      Seleccione documento:
                    </p>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="documento"
                          value={clienteSeleccionado.dni}
                          className="cursor-pointer accent-blue-600"
                          onChange={(e) =>
                            console.log("Seleccionó DNI:", e.target.value)
                          }
                        />
                        <span className="text-sm">
                          DNI: {clienteSeleccionado.dni}
                        </span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="documento"
                          value={clienteSeleccionado.ruc}
                          className="cursor-pointer accent-blue-600"
                          onChange={(e) =>
                            console.log("Seleccionó RUC:", e.target.value)
                          }
                        />
                        <span className="text-sm">
                          RUC: {clienteSeleccionado.ruc}
                        </span>
                      </label>
                    </div>
                  </div>
                ) : (
                  // Caso: cliente con un solo documento
                  <div className="text-sm">
                    {clienteSeleccionado.dni && (
                      <p>
                        <strong>DNI:</strong> {clienteSeleccionado.dni}
                      </p>
                    )}
                    {clienteSeleccionado.ruc && (
                      <p>
                        <strong>RUC:</strong> {clienteSeleccionado.ruc}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fecha */}
          <div className="flex flex-col md:col-span-1">
            <Label className="mb-2">Fecha</Label>
            <Popover open={open1} onOpenChange={setOpen1}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal"
                  type="button"
                >
                  {/* {renderDate(date1)} */}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date1}
                  // onSelect={(selectedDate) => {
                  //   if (selectedDate) {
                  //     setDate1(selectedDate);
                  //     setGastoContableRegistrar((prev) => ({
                  //       ...prev,
                  //       fecha_doc: selectedDate,
                  //     }));
                  //   }
                  //   setOpen1(false);
                  // }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </form>
      <form
        // onSubmit={handleSubmit}
        // onReset={handleReset}
        className="w-full max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-xl"
      >
        <div className="grid sm:grid-cols-4 gap-2">
          <div>
            {/*select de productos*/}
            <div>
              <Label className="mb-2 mx-10">Productos</Label>
              <div className="relative flex items-center mx-10">
                <Popover open={openProductos} onOpenChange={setOpenProductos}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openProductos}
                      // El ancho debe ser 100% para ajustarse al grid
                      className="w-full justify-between"
                    >
                      {/* {productoRegistrar.categoriaId
                    ? categorias.find(
                        (categoria) =>
                          categoria.categoriaId.toString() ===
                          productoRegistrar.categoriaId
                      )?.nombre
                    : "Seleccione categoría..."} */}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Buscar producto..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Producto no encontrado.</CommandEmpty>
                        <CommandGroup>
                          {/* {categorias.map((c) => (
                        <CommandItem
                          key={c.categoriaId}
                          value={c.nombre} // Usar el nombre para la búsqueda
                          onSelect={() => {
                            // Actualizar directamente la clave foránea en el estado principal
                            handleChangeCategoria(c.categoriaId.toString());
                            setOpenCategorias(false);
                          }}
                        >
                          {c.nombre}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              productoRegistrar.categoriaId ===
                                c.categoriaId.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))} */}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          {/* Cantidad */}
          <div>
            <Label className="mb-2 mx-10">Cantidad</Label>
            <div className="relative flex items-center mx-10">
              <Input
                type="number"
                name="cantidad"
                placeholder="0"
                // value={productoRegistrar.cantidad}
                // onChange={handleChange}
              />
            </div>
            <Button type="submit">
              <Check className="text-base" />
            </Button>
          </div>

          {/* Precio */}
          <div>
            <Label className="mb-2 mx-10">Precio</Label>
            <div className="relative flex items-center mx-10">
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>S/</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="number"
                  name="precio"
                  placeholder="0.00"
                  // value={productoRegistrar.precio}
                  // onChange={handleChange}
                  step="0.01"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
