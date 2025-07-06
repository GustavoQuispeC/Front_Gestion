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
import { VacationRegisterProps, VacationSummary } from "@/types/vacation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

import EmployeeSelect from "./subcomponentes/EmployeeSelect";
import EmployeeDetails from "./subcomponentes/EmployeeDetails";
import VacationTable from "./subcomponentes/VacationTable";
import { AbsenceSummary } from "../../types/absence";
import { AbsenceSummary } from '@/types/absence';

export default function EmployeeControl() {
  // Estados para manejar fechas y datos del formulario
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [open2, setOpen2] = useState(false);
  const [date2, setDate2] = useState<Date | undefined>(undefined);

  // Estados para manejar el empleado seleccionado, resumen de vacaciones y lista de vacaciones
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [vacationSummary, setVacationSummary] =
    useState<VacationSummary | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [employeeVacations, setEmployeeVacations] = useState<
    VacationRegisterProps[]
  >([]);
  const [token, setToken] = useState<string | null>(null);

  // Estado para manejar los datos del formulario de registro de vacaciones
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Efecto para cargar el token desde localStorage al montar el componente
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Función para cargar las opciones de empleados basadas en el nombre completo
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

  // Función para obtener los datos del empleado seleccionado
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

  // Efecto para cargar los datos del empleado seleccionado cuando cambia
  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee.id);
    } else {
      setVacationSummary(null);
      setEmployeeVacations([]);
    }
  }, [selectedEmployee, token, fetchEmployeeData]);

  // Formato seguro para renderizar fecha (ISO)
  const renderDate = (date: Date | undefined) =>
    date ? date.toISOString().slice(0, 10) : "Seleccionar fecha";

  // Función para calcular los días solicitados entre dos fechas
  const calculateDaysRequested = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  // Función para manejar el registro de vacaciones
  const handleVacationRegister = async () => {
    if (!selectedEmployee) {
      toast.error("Debe seleccionar un empleado.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error("Debe seleccionar ambas fechas.");
      return;
    }

    const daysRequested = calculateDaysRequested(
      formData.startDate,
      formData.endDate
    );

    const data: VacationRegisterProps = {
      employeeId: Number(selectedEmployee.id),
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      isApproved,
      reason: formData.reason,
      daysRequested,
      daysTaken: daysRequested,
      daysRemaining: 0,
    };

    try {
      await VacationRegister(data, token || "");
      toast.success("Vacaciones registradas con éxito.");
      await fetchEmployeeData(selectedEmployee.id);

      // Solo limpiar fechas seleccionadas y razón (no el empleado, ni la tabla)
      setFormData({
        startDate: "",
        endDate: "",
        reason: "",
      });
      setDate1(undefined);
      setDate2(undefined);
      setIsApproved(false);
    } catch (error) {
      console.error("Error al registrar vacaciones:", error);
      const errorMsg =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Error al registrar vacaciones.";
      toast.error(errorMsg);
      // No limpiamos nada, el usuario puede corregir y volver a intentar
    }
  };

  return (
    <form className="w-full mx-auto mt-6 p-4 min-h-screen flex flex-col mb-24">
      <div className="mx-4 sm:mx-8 md:mx-12 p-4 sm:p-2 md:p-6 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
          Control de Personal
        </h2>

        {/* Employee Select */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <EmployeeSelect
            onChange={setSelectedEmployee}
            loadOptions={loadOptions}
            value={selectedEmployee}
          />
        </div>

        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            summaryVacation={vacationSummary}
            summaryAbsence= {AbsenceSummary}
          />
        )}

        {/* Main Form */}
        <div className="tabs tabs-border flex-1">
          <div className="tab-content border-base-300 bg-base-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Fecha de inicio */}
              <div>
                <Label htmlFor="start-date" className="py-2">
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
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date1}
                      captionLayout="dropdown"
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate1(selectedDate);
                          setFormData((prev) => ({
                            ...prev,
                            startDate: selectedDate.toISOString().slice(0, 10), // ISO seguro
                          }));
                        }
                        setOpen1(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Fecha de fin */}
              <div>
                <Label htmlFor="end-date" className="py-2">
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
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date2}
                      captionLayout="dropdown"
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate2(selectedDate);
                          setFormData((prev) => ({
                            ...prev,
                            endDate: selectedDate.toISOString().slice(0, 10), // ISO seguro
                          }));
                        }
                        setOpen2(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Motivo */}
              <div>
                <Label htmlFor="reason" className="py-2">
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
                />
              </div>

              {/* Checkbox de Aprobado */}
              <div className="flex items-center gap-3 mb-4 col-span-1 sm:col-span-2 md:col-span-1">
                <Checkbox
                  id="aprobado"
                  checked={isApproved}
                  onCheckedChange={() => setIsApproved((v) => !v)}
                />
                <Label htmlFor="aprobado">Aprobado (opcional)</Label>
              </div>
            </div>

            {/* Sección de Tabs */}
            <Tabs defaultValue="vacation">
              <TabsList>
                <TabsTrigger value="vacation">Vacaciones</TabsTrigger>
                <TabsTrigger value="absence">Faltas</TabsTrigger>
              </TabsList>

              {/* Tab de Vacaciones */}
              <TabsContent value="vacation">
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Detalle de las vacaciones del empleado seleccionado.
                    </CardDescription>
                  </CardHeader>
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 mb-4 mx-5">
                    <Button
                      className="my-2"
                      onClick={handleVacationRegister}
                      type="button"
                    >
                      Guardar Vacaciones
                    </Button>
                    <VacationTable vacations={employeeVacations} />
                  </div>
                </Card>
              </TabsContent>

              {/* Tab de Faltas */}
              <TabsContent value="absence">
                <Card>
                  <CardHeader>
                    <CardTitle>Faltas</CardTitle>
                    <CardDescription>
                      Cambia tu contraseña aquí. Después de guardar, se cerrará
                      la sesión.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-current">
                        Contraseña actual
                      </Label>
                      <Input id="tabs-demo-current" type="password" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-new">Nueva contraseña</Label>
                      <Input id="tabs-demo-new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Guardar contraseña</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </form>
  );
}
