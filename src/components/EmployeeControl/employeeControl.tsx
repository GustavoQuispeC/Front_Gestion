"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import {GetVacationSummaryById,GetVacationsByEmployeeId,VacationRegister,} from "@/helpers/vacation.helper";
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
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback } from "react";
// Subcomponentes
import EmployeeSelect from "./subcomponentes/EmployeeSelect";
import EmployeeDetails from "./subcomponentes/EmployeeDetails";
import VacationTable from "./subcomponentes/VacationTable";

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
  // Estado para manejar el token de autenticación
  const [token, setToken] = useState<string | null>(null);

  // Estado para manejar los datos del formulario de registro de vacaciones
  const [formData, setFormData] = useState({
    employeeId: 0,
    startDate: "",
    endDate: "",
    reason: "",
    isApproved: false,
    daysRequested: 0,
    daysTaken: 0,
    daysRemaining: 0,
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

  // Función para calcular los días solicitados entre dos fechas
  const calculateDaysRequested = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  // Función para manejar el registro de vacaciones
  const handleVacationRegister = async () => {
    if (!selectedEmployee) return;

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

      setFormData({
        employeeId: 0,
        startDate: "",
        endDate: "",
        reason: "",
        isApproved: false,
        daysRequested: 0,
        daysTaken: 0,
        daysRemaining: 0,
      });
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
    <div className="min-h-screen  py-8 ">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Control de Personal</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <EmployeeSelect
            onChange={setSelectedEmployee}
            loadOptions={loadOptions}
          />
        </div>

        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            summary={vacationSummary}
          />
        )}

        <div className="tabs tabs-border">
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Fecha de inicio */}
              <div>
                <Label htmlFor="start-date" className="px-1">
                  Fecha de inicio
                </Label>
                <Popover open={open1} onOpenChange={setOpen1}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="start-date"
                      className="w-full justify-between font-normal"
                    >
                      {date1 ? date1.toLocaleDateString() : "Seleccionar fecha"}
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
                            startDate: selectedDate.toLocaleDateString("sv-SE"), // 'YYYY-MM-DD'
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
                <Label htmlFor="end-date" className="px-1">
                  Fecha de fin
                </Label>
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="end-date"
                      className="w-full justify-between font-normal"
                    >
                      {date2 ? date2.toLocaleDateString() : "Seleccionar fecha"}
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
                            endDate: selectedDate.toLocaleDateString("sv-SE"), // 'YYYY-MM-DD'
                          }));
                        }
                        setOpen2(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="reason" className="px-1">
                  Motivo
                </Label>
                <Input
                  type="text"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="aprobado"
                  checked={isApproved}
                  onCheckedChange={() => setIsApproved(!isApproved)}
                />
                <Label htmlFor="aprobado">Aprobado</Label>
              </div>

              <div className="md:col-span-3">
                <Button onClick={handleVacationRegister}>
                  Guardar Vacaciones
                </Button>
              </div>
            </div>
            <Tabs defaultValue="account">
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
                  <VacationTable vacations={employeeVacations} />
                </Card>
              </TabsContent>
              <TabsContent value="absence">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you&apos;ll be
                      logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-current">
                        Current password
                      </Label>
                      <Input id="tabs-demo-current" type="password" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-new">New password</Label>
                      <Input id="tabs-demo-new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
