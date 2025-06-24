"use client";

import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { EmployeeSearchProps } from "@/types/employee";
import { getEmployeeByFullname } from "@/helpers/employee.helper";
import {
  GetVacationSummaryById,
  VacationRegister,
} from "@/helpers/vacation.helper";
import { VacationRegisterProps, VacationSummary } from "@/types/vacation";

export default function EmployeeControl() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);
  const [vacationSummary, setVacationSummary] =
    useState<VacationSummary | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [token, setToken] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchVacationSummary = async (employeeId: string) => {
      try {
        const summary = await GetVacationSummaryById(employeeId, token || "");
        setVacationSummary(summary);
      } catch (error) {
        console.error(
          `Error al obtener resumen de vacaciones para el empleado ${employeeId}:`,
          error
        );
        setVacationSummary(null);
      }
    };

    if (selectedEmployee) {
      fetchVacationSummary(selectedEmployee.id);
    } else {
      setVacationSummary(null);
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
      employeeId: selectedEmployee.id,
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
      console.log("Vacaciones registradas:", data);
      alert("Vacaciones registradas con éxito.");
      setFormData({ startDate: "", endDate: "", reason: "" });
      setIsApproved(false);
    } catch (error) {
      console.error("Error al registrar vacaciones:", error);
      alert(
        "Error: " +
          (error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "Error al registrar vacaciones.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Control de Personal</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1">
            <label
              htmlFor="nombres"
              className="block text-sm font-medium text-gray-700"
            >
              Apellidos y Nombres
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              onChange={setSelectedEmployee}
              placeholder="Ingrese apellidos o nombres"
              className="mt-1"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#d1d5db",
                  boxShadow: "none",
                }),
              }}
            />
          </div>
        </div>

        {selectedEmployee && (
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-4">Datos del Empleado</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Nombre:</strong> {selectedEmployee.lastNameFather}{" "}
                  {selectedEmployee.lastNameMother},{" "}
                  {selectedEmployee.firstName}
                </p>
                <p>
                  <strong>DNI:</strong>{" "}
                  {selectedEmployee.documentNumber || "No disponible"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Cargo:</strong>{" "}
                  {selectedEmployee.position || "No disponible"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedEmployee.email || "No disponible"}
                </p>
              </div>
              <div>
                <strong>Fecha de Ingreso: </strong>
                {selectedEmployee.hireDate
                  ? new Date(selectedEmployee.hireDate).toLocaleDateString()
                  : "No disponible"}
              </div>
              <div>
                <p>
                  <strong>Vacaciones:</strong>
                </p>
                <p>Días acumulados: {vacationSummary?.accumulatedDays ?? 0}</p>
                <p>Días tomados: {vacationSummary?.takenDays ?? 0}</p>
                <p>Días disponibles: {vacationSummary?.remainingDays ?? 0}</p>
              </div>
            </div>
          </div>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
    </div>
  );
}
