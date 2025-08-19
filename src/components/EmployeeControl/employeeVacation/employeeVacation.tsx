"use client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import {
  GetVacationSummaryById,
  GetVacationsByEmployeeId,
  VacationRegister,
} from "@/helpers/vacation.helper";
import { EmployeeSearchProps } from "@/types/employee";
import {
  VacacionListProps,
  VacationRegisterProps,
  VacationSummary,
} from "@/types/vacation";
import { Card, CardContent, CardDescription, CardHeader } from "../../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Label } from "../../ui/label";
import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import VacationTable from "./subcomponent/VacationTable";
import { ChevronDownIcon, Eye, SaveIcon } from "lucide-react";
import { useAuthToken } from "@/hooks/useAuthToken";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { EmployeeDetails, EmployeeSelect } from "@/components";

export default function EmployeeVacation() {
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [open2, setOpen2] = useState(false);
  const [date2, setDate2] = useState<Date | undefined>(undefined);

  const { token } = useAuthToken();

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [vacationSummary, setVacationSummary] =
    useState<VacationSummary | null>(null);

  const router = useRouter();

  // const [isApproved, setIsApproved] = useState(false);

  const [employeeVacations, setEmployeeVacations] = useState<
    VacacionListProps[]
  >([]);

  const [formData, setFormData] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    reason: string;
    isApproved: boolean;
  }>({
    startDate: null,
    endDate: null,
    reason: "",
    isApproved: false,
  });

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

  //! Componente para mostrar la información de vacaciones
  function VacationInfo({ summary }: { summary: VacationSummary | null }) {
    if (!summary) return <p>No disponible</p>;

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p>Días acumulados: {summary.accumulatedDays ?? 0}</p>
          <p>Días tomados: {summary.takenDays ?? 0}</p>
          <p>Días disponibles: {summary.remainingDays ?? 0}</p>
        </div>
      </>
    );
  }

  //! Función para obtener los datos del empleado seleccionado
  const fetchEmployeeData = useCallback(
    async (employeeId: string) => {
      try {
        const [summary, vacations] = await Promise.all([
          GetVacationSummaryById(employeeId, token || ""),
          GetVacationsByEmployeeId(employeeId, token || ""),
        ]);
        setVacationSummary(summary);
        setEmployeeVacations(vacations);
      } catch (error) {
        console.error("Error al obtener datos del empleado:", error);
        setVacationSummary(null);
        setEmployeeVacations([]);
      }
    },
    [token]
  );

  //! Efecto para cargar datos del empleado seleccionado
  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee.id);
    } else {
      setVacationSummary(null);
      setEmployeeVacations([]);
    }
  }, [selectedEmployee, token, fetchEmployeeData]);

  //! Renderizar la fecha en formato ISO
  const renderDate = (date?: Date) => {
    if (!date || isNaN(date.getTime())) return "Seleccionar fecha";
    return new Intl.DateTimeFormat("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Bogota",
    }).format(date);
  };

  //! Calcular los días solicitados entre dos fechas
  const calculateDaysRequested = (start: Date, end: Date): number => {
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  //! Manejar el registro de vacaciones
  const handleVacationRegister = async () => {
    if (!selectedEmployee) return toast.error("Debe seleccionar un empleado.");
    if (!formData.startDate || !formData.endDate)
      return toast.error("Debe seleccionar ambas fechas.");
    if (!formData.isApproved)
      return toast.error("Debe indicar si las vacaciones están aprobadas.");

    const daysRequested = calculateDaysRequested(
      formData.startDate,
      formData.endDate
    );

    const data: VacationRegisterProps = {
      employeeId: Number(selectedEmployee.id),
      startDate: formData.startDate,
      endDate: formData.endDate,
      isApproved: formData.isApproved,
      reason: formData.reason,
      daysRequested,
      daysTaken: daysRequested,
      daysRemaining: Math.floor(vacationSummary?.remainingDays ?? 0),
    };
    console.log("Datos de vacaciones a registrar:", data);

    try {
      await VacationRegister(data, token || "");
      toast.success("Vacaciones registradas con éxito.");
      await fetchEmployeeData(selectedEmployee.id);
      setFormData({
        startDate: null,
        endDate: null,
        reason: "",
        isApproved: false,
      });
      setDate1(undefined);
      setDate2(undefined);
    } catch (error) {
      console.error("Error al registrar vacaciones:", error);
      const errorMsg =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Error al registrar vacaciones.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="w-full mx-auto mt-4 h-full">
      <form className="dark:bg-neutral-900 text-black dark:text-white rounded-2xl px-12 pb-8 mx-8">
        <div className=" rounded-2xl p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Control de Vacaciones
          </h2>

          {/* Selector de Empleado */}
          <div className="mb-3">
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
              {/* Vacaciones */}
              <div>
                <strong>Vacaciones:</strong>
                <VacationInfo summary={vacationSummary} />
              </div>
            </CardContent>
          </Card>

          {/* Formulario de Vacaciones */}
          <div className="flex flex-col gap-6 mt-3">
            <Card>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Fecha inicio */}
                <div className="flex flex-col">
                  <Label htmlFor="start-date" className="mb-2">
                    Fecha de inicio
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
                              startDate: selectedDate,
                            }));
                          }
                          setOpen1(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Fecha fin */}
                <div className="flex flex-col">
                  <Label htmlFor="end-date" className="mb-2">
                    Fecha de fin
                  </Label>
                  <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="end-date"
                        className="w-full justify-between font-normal"
                        type="button"
                      >
                        {renderDate(date2)}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0">
                      <Calendar
                        mode="single"
                        selected={date2 ?? undefined}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setDate2(selectedDate);
                            setFormData((prev) => ({
                              ...prev,
                              endDate: selectedDate,
                            }));
                          }
                          setOpen2(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Motivo */}
                <div className="flex flex-col">
                  <Label htmlFor="reason" className="mb-2">
                    Motivo
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
                  checked={formData.isApproved}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isApproved: Boolean(checked) })
                  }
                  required={true}
                />
                <Label htmlFor="aprobado">Aprobado </Label>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  type="button" 
                  onClick={() => router.push("/dashboard/main")}
                  className="w-64"
                >
                  <IoMdArrowRoundBack className="text-base" />
                  Volver
                </Button>{" "}
                <Button
                  variant="reset"
                  type="button" 
                  onClick={() => router.push("/dashboard/employeeVacationList")}
                  className="w-64"
                >
                  <Eye className="text-base" />
                  Ver todos
                </Button>{" "}
                <Button
                  type="button"
                  className="mt-2 md:mt-0"
                  onClick={handleVacationRegister}
                >
                  <SaveIcon className="mr-2" />
                  Registrar Vacaciones
                </Button>
              </div>
            </div>

            {/* Tabla de Vacaciones */}
            <Card>
              <CardHeader>
                <CardDescription>
                  Historial de vacaciones del empleado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VacationTable vacations={employeeVacations} />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
