"use client";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";

export default function EmployeeControl() {
  const [nombres, setNombres] = useState("");

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
            <input
              type="text"
              id="nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingrese nombre completo"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Buscar1
              <FcSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Datos del Empleado */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-2">Datos del Empleado</h5>
          <p>
            <strong>Nombre:</strong> Juan Pérez Gómez
          </p>
          <p>
            <strong>DNI:</strong> 12345678
          </p>
          <p>
            <strong>Cargo:</strong> Analista
          </p>
          <p>
            <strong>Email:</strong> juan.perez@mail.com
          </p>
        </div>

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
