"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import { EmployeeSearchProps } from "@/types/employee";
import { ChevronDownIcon, Eye, SaveIcon } from "lucide-react";
import { AbsenceTableProps, AbsenceSummary } from "@/types/absence";
import {
  AbsenceRegister,
  GetAbsencesByEmployeeId,
  GetAbsenceSummaryById,
} from "@/helpers/absence.helper";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { AbsenceRegisterProps } from "../../../types/absence";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { EmployeeDetails, EmployeeSelect } from "@/components";
import AbsenceTable from "./subcomponent/AbsenceTable";

export default function EmployeeAbsence() {
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [AbsenceSummary, setAbsenceSummary] = useState<AbsenceSummary | null>(
    null
  );
  const [isJustified, setIsJustified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [employeeAbsences, setEmployeeAbsences] = useState<AbsenceTableProps[]>(
    []
  );

  const [formData, setFormData] = useState<{
    date: Date | null;
    reason: string;
  }>({
    date: null,
    reason: "",
  });

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Establecer `mounted` a true cuando se monta el componente
  }, []);

  //! Cargar el token del localStorage al iniciar el componente
  useEffect(() => {
    if (!mounted) return; // Evitar ejecución en el servidor
    const storedToken = localStorage.getItem("user");
    if (!storedToken) {
      toast.warning("No se encontró el token de autenticación.");
    }
    setToken(storedToken);
  }, [mounted]);

  //! Función para cargar opciones de empleados
  const loadOptions = async (inputValue: string) => {
    if (inputValue.length < 1) return [];
    try {
      const data = await getEmployeeByFullname(inputValue);
      return data.map((empleado) => ({
        label: `${empleado.firstName} ${empleado.lastNameFather} ${empleado.lastNameMother}`,
        value: empleado.id,
        ...empleado,
      }));
    } catch (error) {
      console.error("Error cargando empleados:", error);
      return [];
    }
  };

  //! Función para obtener los datos del empleado seleccionado
  const fetchEmployeeData = useCallback(
    async (employeeId: string) => {
      if (!token) return;
      try {
        const [summary, absences] = await Promise.all([
          GetAbsenceSummaryById(employeeId, token),
          GetAbsencesByEmployeeId(employeeId, token),
        ]);
        setAbsenceSummary(summary);
        setEmployeeAbsences(absences);
      } catch (error) {
        console.error("Error al obtener datos del empleado:", error);
      }
    },
    [token]
  );

  //! Efecto para cargar los datos del empleado seleccionado
  useEffect(() => {
    if (!mounted || !selectedEmployee) return; // Asegúrate de no renderizar si no se ha montado
    fetchEmployeeData(selectedEmployee.id);
  }, [selectedEmployee, mounted, fetchEmployeeData]);

  //! Efecto para manejar el cambio de fecha
  const renderDate = (date: Date | null) =>
    date ? date.toISOString().slice(0, 10) : "Seleccionar fecha";

  //! Manejar el registro de ausencias
  const handleAbsenceRegister = async () => {
    if (!selectedEmployee) return toast.error("Debe seleccionar un empleado.");
    if (!formData.date)
      return toast.error("Debe seleccionar una fecha de ausencia.");

    const data: AbsenceRegisterProps = {
      employeeId: Number(selectedEmployee.id),
      date: formData.date,
      isJustified: isJustified,
      reason: formData.reason,
    };

    try {
      await AbsenceRegister(data, token || "");
      toast.success("Falta registrada con éxito.");
      await fetchEmployeeData(selectedEmployee.id);
      setFormData({ date: null, reason: "" });
      setIsJustified(false);
    } catch (error) {
      console.error("Error al registrar la falta:", error);
      const errorMsg =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Error al registrar la falta.";
      toast.error(errorMsg);
    }
  };

  if (!mounted) {
    return null; // Evita la renderización en el servidor
  }

  return (
    <>
      <section className="w-full mx-auto mt-4 h-full px-2 sm:px-4 md:px-8">
        <div className="dark:bg-neutral-900 text-black dark:text-white rounded-2xl px-4 sm:px-6 md:px-12 pb-8">
          <h2 className="text-xl text-blue-900 dark:text-blue-500 sm:text-2xl font-bold mb-6 text-center md:text-left">
            Control de Ausencias
          </h2>

          {/* Selector de Empleado */}
          <div className="my-4">
            <EmployeeSelect
              onChange={setSelectedEmployee}
              loadOptions={loadOptions}
              value={selectedEmployee}
            />
          </div>

          {/* Detalles del empleado */}
          <Card>
            <CardHeader>
              <CardDescription>
                Información del empleado seleccionado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEmployee && (
                <EmployeeDetails employee={selectedEmployee} />
              )}
              {AbsenceSummary && (
                <div className="mt-4">
                  <p className="font-bold text-sm sm:text-base">
                    Total días de Ausencias:{" "}
                    <span className="font-normal">
                      {AbsenceSummary.totalAbsences}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Formulario de Vacaciones */}
          <div className="flex flex-col gap-6 mt-3 pb-8">
            <Card>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Fecha inicio */}
                <div className="flex flex-col">
                  <Label htmlFor="start-date" className="mb-2">
                    Fecha de Ausencia
                  </Label>
                  <Popover open={open1} onOpenChange={setOpen1}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="start-date"
                        className="w-full justify-between font-normal"
                        type="button"
                      >
                        {renderDate(date1)}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0">
                      <Calendar
                        mode="single"
                        selected={date1 ?? undefined}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setDate1(selectedDate);
                            setFormData((prev) => ({
                              ...prev,
                              date: selectedDate,
                            }));
                          }
                          setOpen1(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Motivo */}
                <div className="flex flex-col">
                  <Label htmlFor="reason" className="mb-2">
                    Motivo (opcional)
                  </Label>
                  <Input
                    id="reason"
                    type="text"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    placeholder="Motivo (opcional)"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Aprobación y botón */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="aprobado"
                  checked={isJustified}
                  onCheckedChange={(checked) =>
                    setIsJustified(Boolean(checked))
                  }
                />
                <Label htmlFor="justificado">Justificado (opcional)</Label>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 justify-end w-full">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/dashboard/main")}
                className="w-full sm:w-64 text-blue-900 dark:text-blue-500"
              >
                <IoMdArrowRoundBack className="text-base" />
                Volver
              </Button>

              <Button
                variant="reset"
                type="button"
                onClick={() => router.push("/dashboard/employeeAbsenceList")}
                className="w-full sm:w-64"
              >
                <Eye className="text-base" />
                Ver todos
              </Button>

              <Button
                className="w-full sm:w-64 mt-2 md:mt-0"
                type="button"
                onClick={handleAbsenceRegister}
              >
                <SaveIcon className="mr-2" />
                Registrar Inasistencia
              </Button>
            </div>

            {/* Tabla de Vacaciones */}
            <Card>
              <CardHeader>
                <CardDescription>
                  Historial de ausencias del empleado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AbsenceTable absences={employeeAbsences} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
