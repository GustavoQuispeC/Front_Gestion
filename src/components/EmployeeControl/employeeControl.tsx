"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import {
  GetVacationSummaryById,
  GetVacationsByEmployeeId,
  VacationRegister,
} from "@/helpers/vacation.helper";
import { GetAbsenceSummaryById } from "@/helpers/absence.helper";

import { EmployeeSearchProps } from "@/types/employee";
import { VacationRegisterProps, VacationSummary } from "@/types/vacation";
import { AbsenceRegisterProps, AbsenceSummary } from "@/types/absence";

import {
  Card,
  CardContent,
  CardDescription,
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
import AbsenceTable from "./subcomponentes/AbsenceTable";

export default function EmployeeControl() {
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | null>(null);
  const [open2, setOpen2] = useState(false);
  const [date2, setDate2] = useState<Date | null>(null);

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [vacationSummary, setVacationSummary] =
    useState<VacationSummary | null>(null);
  const [absenceSummary, setAbsenceSummary] = useState<AbsenceSummary | null>(
    null
  );
  const [isApproved, setIsApproved] = useState(false);

  const [employeeVacations, setEmployeeVacations] = useState<
    VacationRegisterProps[]
  >([]);
  const [employeeAbsence, setEmployeeAbsence] = useState<
    AbsenceRegisterProps[]
  >([]);
  const [token, setToken] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    reason: string;
  }>({
    startDate: null,
    endDate: null,
    reason: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.warning("No se encontró el token de autenticación.");
    }
    setToken(storedToken);
  }, []);

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

  const fetchEmployeeData = useCallback(
    async (employeeId: string) => {
      try {
        const [summary, vacations, absences] = await Promise.all([
          GetVacationSummaryById(employeeId, token || ""),
          GetVacationsByEmployeeId(employeeId, token || ""),
          GetAbsenceSummaryById(employeeId, token || ""),
        ]);
        setVacationSummary(summary);
        setEmployeeVacations(vacations);
        setEmployeeAbsence(absences);
        setAbsenceSummary(absences);
      } catch (error) {
        console.error("Error al obtener datos del empleado:", error);
        setVacationSummary(null);
        setEmployeeVacations([]);
        setEmployeeAbsence([]);
        setAbsenceSummary(null);
      }
    },
    [token]
  );

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee.id);
    } else {
      setVacationSummary(null);
      setEmployeeVacations([]);
      setEmployeeAbsence([]);
    }
  }, [selectedEmployee, token, fetchEmployeeData]);

  const renderDate = (date: Date | null) =>
    date ? date.toISOString().slice(0, 10) : "Seleccionar fecha";

  const calculateDaysRequested = (start: Date, end: Date): number => {
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const handleVacationRegister = async () => {
    if (!selectedEmployee) return toast.error("Debe seleccionar un empleado.");
    if (!formData.startDate || !formData.endDate)
      return toast.error("Debe seleccionar ambas fechas.");

    const daysRequested = calculateDaysRequested(
      formData.startDate,
      formData.endDate
    );

    const data: VacationRegisterProps = {
      employeeId: Number(selectedEmployee.id),
      startDate: formData.startDate,
      endDate: formData.endDate,
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
      setFormData({ startDate: null, endDate: null, reason: "" });
      setDate1(null);
      setDate2(null);
      setIsApproved(false);
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
    <form className="w-full mx-auto mt-6 p-4 min-h-screen flex flex-col mb-24">
      <div className="mx-4 sm:mx-8 md:mx-12 p-4 sm:p-2 md:p-6 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
          Control de Personal
        </h2>

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
            summaryAbsence={absenceSummary}
          />
        )}

        <div className="tabs tabs-border flex-1">
          <div className="tab-content border-base-300 bg-base-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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

              <div className="flex items-center gap-3 mb-4 col-span-1 sm:col-span-2 md:col-span-1">
                <Checkbox
                  id="aprobado"
                  checked={isApproved}
                  onCheckedChange={(checked) => setIsApproved(checked === true)}
                />
                <Label htmlFor="aprobado">Aprobado (opcional)</Label>
              </div>
            </div>

            <Tabs defaultValue="vacation">
              <TabsList>
                <TabsTrigger value="vacation">Vacaciones</TabsTrigger>
                <TabsTrigger value="absence">Faltas</TabsTrigger>
              </TabsList>

              <TabsContent value="vacation">
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Detalle de las vacaciones del empleado seleccionado.
                    </CardDescription>
                  </CardHeader>
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 mb-4 mx-5">
                    <Button className="my-2" onClick={handleVacationRegister}>
                      Guardar Vacaciones
                    </Button>
                    <VacationTable vacations={employeeVacations} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="absence">
                <Card>
                  <CardHeader>
                    <CardTitle>Faltas</CardTitle>
                    <CardDescription>
                      Detalle de las faltas del empleado seleccionado.
                    </CardDescription>
                  </CardHeader>
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 mb-4 mx-5">
                    <Button
                      className="my-2"
                      type="button"
                      onClick={() => toast.info("Funcionalidad en desarrollo")}
                    >
                      Registrar Falta
                    </Button>
                  </div>
                  <CardContent className="grid gap-6">
                    <AbsenceTable absences={employeeAbsence} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </form>
  );
}
