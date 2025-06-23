"use client";
import AsyncSelect from "react-select/async";
import { useState } from "react";
import { EmployeeSearchProps } from "@/types/employee";
import { getEmployeeByFullname } from "@/helpers/employee.helpers";

export default function EmployeeControl() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSearchProps | null>(null);

  const loadOptions = async (inputValue: string) => {
    if (inputValue.length < 1) return [];

    try {
      const data = await getEmployeeByFullname(inputValue);
      if (!data || data.length === 0) return [];

      // Formatear los datos para react-select
      return data.map((empleado) => ({
        label: `${empleado.firstName} ${empleado.lastNameFather} ${empleado.lastNameMother}`,
        value: empleado.id,
        ...empleado,
      }));
    } catch (error) {
      console.error("Error cargando empleados", error);
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Control de Personal</h2>

        {/* Buscar Empleado */}
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

        {/* Datos del Empleado */}
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
            </div>
          </div>
        )}

        {/* Tabs */}
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
                  Cantidad de dias:
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  
                />
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Motivo
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-3">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-sm text-gray-700">Aprobado</span>
                </label>
              </div>
              <div className="md:col-span-3">
                <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
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
            Tab content 3
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Adelanto de Sueldo"
          />
          <div className="tab-content border-base-300 bg-base-100 p-10">
            Tab content 3
          </div>
        </div>
      </div>
    </div>
  );
}
