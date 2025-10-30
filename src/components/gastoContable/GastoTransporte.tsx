"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  BadgeCheckIcon,
  BadgeX,
  Check,
  ChevronDownIcon,
  ChevronsUpDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import {
  GastoContableRegistrarProps,
  ListarGastoContableProps,
} from "@/types/gastoContable";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ListarProveedoresProps } from "@/types/proveedor";
import { ProveedoresListar } from "@/helpers/proveedor.helper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  listarGastosContables,
  registrarGastoContable,
} from "@/helpers/gastoContable.helper";
import { FaBrush, FaFileExcel, FaFilePdf, FaSave } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const GastoTransporte = () => {
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [proveedor, setProveedor] = useState<ListarProveedoresProps[]>([]);
  const [openProveedor, setOpenProveedor] = useState(false);
  const [token, setToken] = useState("");
  const [hasPermission, setHasPermission] = useState(true);
  const [username, setUsername] = useState("");
  const [gastosTransporte, setGastosTransporte] = useState<
    ListarGastoContableProps[]
  >([]);

  const [gastoContableRegistrar, setGastoContableRegistrar] =
    useState<GastoContableRegistrarProps>({
      fecha_doc: new Date(),
      nroComprobante: "",
      total: 0,
      usuario: "",
      proveedorId: "",
      gastoId: "2", //? valor por defecto (Transporte)
    });

  //! --- nuevos estados para filtros ---
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, name: "Enero" },
    { value: 2, name: "Febrero" },
    { value: 3, name: "Marzo" },
    { value: 4, name: "Abril" },
    { value: 5, name: "Mayo" },
    { value: 6, name: "Junio" },
    { value: 7, name: "Julio" },
    { value: 8, name: "Agosto" },
    { value: 9, name: "Septiembre" },
    { value: 10, name: "Octubre" },
    { value: 11, name: "Noviembre" },
    { value: 12, name: "Diciembre" },
  ];

  //! --- obtener datos iniciales ---
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.roles?.[0];
    const storedToken = user?.token;
    const storedUsername = user?.username || user?.userName || "";

    if (
      !role ||
      !["Administrador", "Supervisor"].includes(role) ||
      !storedToken
    ) {
      setHasPermission(false);
    } else {
      setToken(storedToken);
      setUsername(storedUsername);
    }

    //! cargar proveedores una vez
    ListarProveedores();
  }, []);

  //! Obtener lista de proveedores
  const ListarProveedores = async () => {
    try {
      const proveedoresData = await ProveedoresListar();
      setProveedor(proveedoresData);
    } catch {
      toast.error("Error al listar los proveedores");
    }
  };

  //! Listar gastos según filtros
  const getGastosTransporte = useCallback(async () => {
    if (!token || !hasPermission) return;
    try {
      const data = await listarGastosContables(
        token,
        "2",
        selectedMonth,
        selectedYear
      );
      setGastosTransporte(data);
    } catch (error) {
      console.error("Error al obtener los gastos de transporte:", error);
      toast.error("Error al obtener los gastos de transporte", {
        theme: "colored",
      });
    }
  }, [token, hasPermission, selectedMonth, selectedYear]);

  //! --- Actualizar tabla cuando cambien filtros ---
  useEffect(() => {
    getGastosTransporte();
  }, [getGastosTransporte]);

  //! ---Cambio de proveedor ---
  const handleChangeProveedores = (value: string) => {
    setGastoContableRegistrar((prev) => ({ ...prev, proveedorId: value }));
  };

  //! --- Renderizar la fecha ---
  const renderDate = (date?: Date) =>
    !date || isNaN(date.getTime())
      ? "Seleccionar fecha"
      : new Intl.DateTimeFormat("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "America/Lima",
        }).format(date);

  //! --- Limpiar formulario ---
  const handleReset = () => {
    setGastoContableRegistrar({
      fecha_doc: new Date(),
      nroComprobante: "",
      total: 0,
      usuario: username,
      proveedorId: "",
      gastoId: "2",
    });
    setDate1(undefined);
  };

  //! --- Registrar Gasto Contable ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      toast.error("Usuario no identificado. Inicie sesión nuevamente.");
      return;
    }

    const { fecha_doc, nroComprobante, total, proveedorId } =
      gastoContableRegistrar;
    if (!fecha_doc || !nroComprobante || !total || !proveedorId) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    try {
      const response = await registrarGastoContable(
        { ...gastoContableRegistrar, usuario: username },
        token
      );
      if (response?.message === "Se ha registrado correctamente") {
        toast.success("Se ha registrado con éxito.");
        handleReset();
        getGastosTransporte();
      } else {
        toast.error(response?.message || "Error al registrar");
      }
    } catch {
      toast.error("Error al registrar gasto");
    }
  };

  //! --- Exportar a Excel (mejorado: mapea/format y maneja errores) ---
  const handleExportExcel = (data: ListarGastoContableProps[] = []) => {
    if (!data || data.length === 0) {
      toast.info("No hay datos para exportar");
      return;
    }

    try {
      // 🔹 Solo se exportan las columnas indicadas
      const rows = data.map((d) => ({
        Fecha: d.fecha_doc
          ? format(new Date(d.fecha_doc), "dd/MM/yyyy", { locale: es })
          : "",
        "Nro. Comprobante": d.nroComprobante ?? "",
        Proveedor: d.razonSocial ?? "",
        RUC: d.ruc ?? "",
        Total:
          typeof d.total === "number"
            ? d.total.toFixed(2)
            : d.total
            ? String(d.total)
            : "0.00",
      }));

      const headers = [
        "Fecha",
        "Nro. Comprobante",
        "Proveedor",
        "RUC",
        "Total",
      ];

      const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
      worksheet["!cols"] = [
        { wch: 12 }, // Fecha
        { wch: 18 }, // Nro. Comprobante
        { wch: 30 }, // Proveedor
        { wch: 15 }, // RUC
        { wch: 12 }, // Total
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const dateStr = format(new Date(), "dd-MM-yyyy");
      const fileName = `Gastos_${dateStr}.xlsx`;

      saveAs(blob, fileName);
      toast.success("Exportado a Excel correctamente");
    } catch (err: unknown) {
      console.error("Error exportando a Excel:", err);
      toast.error("Error al exportar a Excel");
    }
  };

  //! --- Sin permisos ---
  if (!hasPermission) {
    return (
      <div className="p-6 text-center">
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="w-full max-w-7xl mx-auto mt-1 px-6 py-4 bg-white dark:bg-neutral-900 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl text-blue-900 dark:text-blue-400 font-semibold mb-6">
        Registro de Transporte
      </h2>

      {/* Formulario principal */}
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-6">
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
                  {renderDate(date1)}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date1}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setDate1(selectedDate);
                      setGastoContableRegistrar((prev) => ({
                        ...prev,
                        fecha_doc: selectedDate,
                      }));
                    }
                    setOpen1(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Nro Comprobante */}
          <div className="flex flex-col md:col-span-1">
            <Label className="mb-2">Nro. Comprobante</Label>
            <Input
              type="text"
              value={gastoContableRegistrar.nroComprobante}
              onChange={(e) =>
                setGastoContableRegistrar((prev) => ({
                  ...prev,
                  nroComprobante: e.target.value,
                }))
              }
              placeholder="FFFF-000000"
            />
          </div>

          {/* Proveedor */}
          <div className="flex flex-col md:col-span-3">
            <Label className="mb-2">Proveedor</Label>
            <Popover open={openProveedor} onOpenChange={setOpenProveedor}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {gastoContableRegistrar.proveedorId
                    ? proveedor.find(
                        (p) =>
                          p.proveedorId.toString() ===
                          gastoContableRegistrar.proveedorId
                      )?.razonSocial
                    : "Seleccione proveedor..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar proveedor..." />
                  <CommandList>
                    <CommandEmpty>No encontrado</CommandEmpty>
                    <CommandGroup>
                      {proveedor.map((m) => (
                        <CommandItem
                          key={m.proveedorId}
                          onSelect={() => {
                            handleChangeProveedores(m.proveedorId.toString());
                            setOpenProveedor(false);
                          }}
                        >
                          {m.razonSocial}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              gastoContableRegistrar.proveedorId ===
                                m.proveedorId.toString()
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

          {/* Total */}
          <div className="flex flex-col md:col-span-1">
            <Label className="mb-2">Monto Total</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>S/</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                type="number"
                placeholder="0.00"
                value={gastoContableRegistrar.total}
                onChange={(e) =>
                  setGastoContableRegistrar((prev) => ({
                    ...prev,
                    total: parseFloat(e.target.value),
                  }))
                }
                step="0.01"
              />
            </InputGroup>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-2 ml-4">
        Filtrar:
      </h3>
      <div className="w-full p-4 border rounded-lg bg-white dark:bg-neutral-900 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filtros Año/Mes */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex flex-wrap gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Seleccione año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Año</SelectLabel>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Seleccione mes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Mes</SelectLabel>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value.toString()}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-wrap justify-end gap-3 w-full md:w-auto">
            <Link
              href="/dashboard/proveedorListar"
              className="w-full md:w-auto"
            >
              <Button variant="outline" className="w-full">
                <IoMdArrowRoundBack className="text-base mr-1" />
                Volver
              </Button>
            </Link>

            <Button type="submit" className="w-full md:w-auto">
              <FaSave className="text-base mr-1" /> Registrar
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="w-full md:w-auto"
            >
              <FaBrush className="text-base mr-1" /> Limpiar
            </Button>

            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => handleExportExcel(gastosTransporte)}
            >
              <FaFileExcel className="text-green-600 text-base mr-1" /> Excel
            </Button>

            <Button variant="outline" className="w-full md:w-auto">
              <FaFilePdf className="text-red-600 text-base mr-1" /> PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 mt-6 dark:bg-neutral-900 border">
        <Table className="w-full">
          <TableCaption>Listado de transportes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Nro. Comprobante</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>RUC</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>F. Registro</TableHead>
              <TableHead>Registrado por</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {gastosTransporte.length > 0 ? (
              gastosTransporte.map((p) => (
                <TableRow key={p.idGastoContable}>
                  <TableCell>
                    {p.fecha_doc
                      ? format(new Date(p.fecha_doc), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : ""}
                  </TableCell>
                  <TableCell>{p.nroComprobante}</TableCell>
                  <TableCell>{p.razonSocial}</TableCell>
                  <TableCell>{p.ruc}</TableCell>
                  <TableCell>S/ {p.total}</TableCell>
                  <TableCell>
                    {p.createdAt
                      ? format(new Date(p.createdAt), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : ""}
                  </TableCell>
                  <TableCell>{p.usuario}</TableCell>
                  <TableCell>
                    <Badge
                      className={`mt-0.5 ${
                        p.isActive
                          ? "border-green-200 text-green-500 bg-green-50 font-semibold"
                          : "border-red-200 text-red-500 bg-red-50 font-semibold"
                      }`}
                    >
                      {p.isActive ? <BadgeCheckIcon /> : <BadgeX />}
                      {p.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="text-blue-800 dark:text-blue-500"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-500">
                  No hay datos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </form>
  );
};

export default GastoTransporte;
