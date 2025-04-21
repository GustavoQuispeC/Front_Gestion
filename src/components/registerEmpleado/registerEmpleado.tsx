"use client";

import { useState } from "react";

export default function RegisterEmpleyoee() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    tipoDocumento: "DNI",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    telefonoEmergencia: "",
    email: "",
    direccion: "",
    cargo: "",
    fechaIngreso: "",
    tipoContrato: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-semibold mb-6 text-left">
        Registro de Empleado
      </h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* Nombres */}
        <div>
          <div className="mb-2 block">
            <label
              htmlFor="nombres"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombres
            </label>
          </div>
          <input
            id="nombres"
            type="text"
            value={formData.nombres}
            onChange={handleChange}
            placeholder="Ingrese nombres"
            required
            className="input input-info"
          />
        </div>
        {/* Apellido Paterno */}
        <div>
          <div className="mb-2 block">
            <label
              htmlFor="apellidosPaterno"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellido Paterno
            </label>
            <input
              id="apellidosPaterno"
              type="text"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              placeholder="Ingrese apellido paterno"
              className="input input-info"
              required
            />
          </div>
        </div>

        {/* Apellido Materno */}
        <div>
          <label
            htmlFor="apellidosMaterno"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Apellido Materno
          </label>
          <input
            type="text"
            id="apellidosMaterno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
            placeholder="Ingrese apellido materno"
            className="input input-info"
            required
          />
        </div>

        {/* Fecha de Nacimiento */}

        <div>
          <label htmlFor="genero" className="block mb-2 text-sm font-medium">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="input input-info"
          />
        </div>

        {/* Tipo de documento*/}
        <div>
          <div className="block mb-2 text-sm font-medium">
            <label htmlFor="tipoDocumento">Tipo de Documento</label>
          </div>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            className="input input-info"
            required
          >
            <option value="">Seleccione</option>
            <option value="dni">DNI</option>
            <option value="carnetExtranjeria">Carnet de extranjería</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
        </div>

        {/* Documento */}
        <div>
          <label
            htmlFor="documento"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Numero de Documento
          </label>
          <input
            type="number"
            id="documento"
            value={formData.documento}
            onChange={handleChange}
            placeholder="Ingrese número de documento"
            className="input input-info"
            required
          />
        </div>

        {/* Fecha de ingreso */}
        <div>
          <label className="block font-medium">Fecha de Ingreso</label>
          <input
            type="date"
            id="fechaIngreso"
            value={formData.fechaIngreso}
            onChange={handleChange}
            className="input input-info"
            required
          />
        </div>

        {/* Correo electrónico */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese correo electrónico"
            className="input input-info"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label
            htmlFor="telefono"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Teléfono
          </label>
          <input
            type="number"
            id="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ingrese número de teléfono"
            className="input input-info"
            required
          />
        </div>

        {/* Teléfono de Emergencia */}
        <div>
          <label
            htmlFor="telefonoEmergencia"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Teléfono de Emergencia
          </label>
          <input
            type="number"
            id="telefonoEmergencia"
            value={formData.telefonoEmergencia}
            onChange={handleChange}
            placeholder="Ingrese teléfono de emergencia"
            className="input input-info"
            required
          />
        </div>
        {/* Dirección */}
        <div>
          <label
            htmlFor="direccion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ingrese dirección"
            className="input input-info"
            required
          />
        </div>
        {/* Cargo */}
        <div>
          <label
            htmlFor="cargo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cargo
          </label>
          <input
            type="text"
            id="cargo"
            value={formData.cargo}
            onChange={handleChange}
            placeholder="Ingrese cargo"
            className="input input-info"
            required
          />
        </div>
        {/* Tipo de Contrato */}

        <div>
          <div className="mb-2 block">
            <label htmlFor="tipoContrato">Tipo de contrato </label>
          </div>
          <select
            id="tipoContrato"
            name="tipoContrato"
            value={formData.tipoContrato}
            onChange={handleChange}
            className="input input-info"
            required
          >
            <option value="">Seleccione</option>
            <option value="indeterminado">Indeterminado</option>
            <option value="plazoFijo">Plazo fijo</option>
            <option value="practicas">Prácticas</option>
          </select>
        </div>
      </div>
      <div>
        <input id="genero" type="text" />
      </div>

      {/* Botón de envío */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}
