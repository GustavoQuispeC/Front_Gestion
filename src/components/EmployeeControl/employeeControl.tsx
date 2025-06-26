"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import {
  GetVacationSummaryById,
  GetVacationsByEmployeeId,
  VacationRegister,
} from "@/helpers/vacation.helper";
import { EmployeeSearchProps } from "@/types/employee";
import { VacationRegisterProps, VacationSummary } from "@/types/vacation";

// Subcomponente
import EmployeeSelect from "./subcomponentes/EmployeeSelect";
import EmployeeDetails from "./subcomponentes/EmployeeDetails";
import VacationTable from "./subcomponentes/VacationTable";

export default function EmployeeControl() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [vacationSummary, setVacationSummary] =
    useState<VacationSummary | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [employeeVacations, setEmployeeVacations] = useState<
    VacationRegisterProps[]
  >([]);
  const [token, setToken] = useState<string | null>(null);

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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
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

  const fetchEmployeeData = async (employeeId: string) => {
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
  };

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee.id);
    } else {
      setVacationSummary(null);
      setEmployeeVacations([]);
    }
  }, [selectedEmployee, token]);

  const calculateDaysRequested = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

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
    <div className="min-h-screen bg-gray-100 p-4">
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
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Vacaciones"
          />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Motivo
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={isApproved}
                    onChange={() => setIsApproved(!isApproved)}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-700">Aprobado</span>
                </label>
              </div>
              <div className="md:col-span-3">
                <button
                  onClick={handleVacationRegister}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Guardar Vacaciones
                </button>
              </div>
            </div>

            <VacationTable vacations={employeeVacations} />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Faltas"
            defaultChecked
          />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Permisos"
          />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            Tab content 3
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Descanso Médico"
          />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            Tab content 4
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Adelanto de Sueldo"
          />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            Tab content 5
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
