"use client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import { EmployeeSearchProps } from "@/types/employee";
import { ChevronDownIcon, SaveIcon } from "lucide-react";
import { AbsenceTableProps, AbsenceSummary } from "@/types/absence";
import {
  GetAbsencesByEmployeeId,
  GetAbsenceSummaryById,
} from "@/helpers/absence.helper";
import EmployeeSelect from "../subcomponentes/EmployeeSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import EmployeeDetails from "../subcomponentes/EmployeeDetails";
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
import AbsenceTable from "./subcomponent/AbsenceTable";

export default function EmployeeVacation() {
  const [open1, setOpen1] = useState(false);
  const [date1, setDate1] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [AbsenceSummary, setAbsenceSummary] = useState<AbsenceSummary | null>(
    null
  );
  const [isJustified, setisJustified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [employeeAbsences, setEmployeeAbsences] = useState<AbsenceTableProps[]>(
    []
  );

  const [formData, setFormData] = useState<{
    startDate: Date | null;
    reason: string;
  }>({
    startDate: null,
    reason: "",
  });

  //! Cargar el token del localStorage al iniciar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("user");
    if (!storedToken) {
      toast.warning("No se encontró el token de autenticación.");
    }
    setToken(storedToken);
  }, []);

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
      try {
        const [summary, absences] = await Promise.all([
          GetAbsenceSummaryById(employeeId, token || ""),
          GetAbsencesByEmployeeId(employeeId, token || ""),
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
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee.id);
    } else {
      setAbsenceSummary(null);
      setEmployeeAbsences([]);
    }
  }, [selectedEmployee, token, fetchEmployeeData]);

  //! Efecto para manejar el cambio de fecha
  const renderDate = (date: Date | null) =>
    date ? date.toISOString().slice(0, 10) : "Seleccionar fecha";

  return (
    <form className="w-full mx-auto mt-6 px-4 md:px-8 min-h-screen flex flex-col gap-6 mb-24">
      <div className="bg-gray-100 rounded-2xl p-6 md:p-10 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-gray-800">
          Control de Ausencias
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
            <div>
              {AbsenceSummary && (
                <div className="mt-4">
                  <p className="font-bold">
                    Total dias de Ausencias:{" "}
                    <span className="font-normal">
                      {AbsenceSummary.totalAbsences}
                    </span>
                  </p>
                </div>
              )}
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
                            startDate: selectedDate,
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
                id="justificado"
                checked={isJustified}
                onCheckedChange={(checked) => setisJustified(checked === true)}
              />
              <Label htmlFor="justificado">Justificado (opcional)</Label>
            </div>

            <Button className="mt-2 md:mt-0">
              <SaveIcon className="mr-2" />
              Registrar Ausencia
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
    </form>
  );
}
