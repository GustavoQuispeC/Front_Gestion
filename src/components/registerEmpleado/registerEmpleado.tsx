"use client";

import { RegisterEmployeeErrorProps, RegisterEmployeeProps } from "@/types";
import { validateRegisterEmployee } from "@/utils/registerEmployeeValidation";
import { useEffect, useState } from "react";

export default function RegisterEmpleyoee() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<RegisterEmployeeProps>({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    tipoDocumento: "",
    fechaNacimiento: new Date(),
    genero: "",
    telefono: "",
    telefonoEmergencia: "",
    correo: "",
    direccion: "",
    cargo: "",
    fechaContratacion: new Date(),
    tipoContrato: "",
  });

  const [error, setError] = useState<RegisterEmployeeErrorProps>({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    tipoDocumento: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    telefonoEmergencia: "",
    correo: "",
    direccion: "",
    cargo: "",
    fechaContratacion: "",
    tipoContrato: "",
  });

  // Funcion para validar los campos al cambiar el valor
  const isValidField = (field: keyof RegisterEmployeeErrorProps) => {
    return submitted && error[field] === "";
  };

  // Funcion para manejar el cambio de los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "date" ? new Date(value) : value,
    }));
  };

  // Funcion para manejar el submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegisterEmployee(formData);
    setError(validationErrors);
    setSubmitted(true);

    const isValid = Object.values(validationErrors).every((v) => v === "");
    if (isValid) {
      console.log("Formulario válido ✅", formData);
    }

    try {
      fetch("https://localhost:7160/api/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // Mostrar el alert aquí si el registro fue exitoso
          // setShowAlert(true);
          // Redirigiriendo al login
        });
    } catch (error) {
      console.error("Error al registrar el empleado:", error);
    }
  };

  // Funcion para validar los campos al cambiar el valor
  useEffect(() => {
    if (submitted) {
      const validationErrors = validateRegisterEmployee(formData);
      setError(validationErrors);
    }
  }, [formData, submitted]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-semibold mb-6 text-left">
        Registro de Empleado
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Nombres */}
        <div className="flex flex-col">
          <label htmlFor="nombres" className="mb-1 text-sm font-medium">
            Nombres
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="input input-info"
          />
          {submitted && error.nombres && (
            <p className="text-red-500 text-sm mt-1">{error.nombres}</p>
          )}
          {isValidField("nombres") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Apellido Paterno */}
        <div className="flex flex-col">
          <label htmlFor="apellidoPaterno" className="mb-1 text-sm font-medium">
            Apellido Paterno
          </label>
          <input
            type="text"
            id="apellidoPaterno"
            name="apellidoPaterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
            className="input input-info"
          />
          {submitted && error.apellidoPaterno && (
            <p className="text-red-500 text-sm mt-1">{error.apellidoPaterno}</p>
          )}
          {isValidField("apellidoPaterno") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Apellido Materno */}
        <div className="flex flex-col">
          <label htmlFor="apellidoMaterno" className="mb-1 text-sm font-medium">
            Apellido Materno
          </label>
          <input
            type="text"
            id="apellidoMaterno"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
            className="input input-info"
          />
          {submitted && error.apellidoMaterno && (
            <p className="text-red-500 text-sm mt-1">{error.apellidoMaterno}</p>
          )}
          {isValidField("apellidoMaterno") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Fecha de Nacimiento */}
        <div className="flex flex-col">
          <label htmlFor="fechaNacimiento" className="mb-1 text-sm font-medium">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento.toISOString().split("T")[0]}
            onChange={handleChange}
            className="input input-info"
            onKeyDown={(e) => e.preventDefault()}
          />
          {submitted && error.fechaNacimiento && (
            <p className="text-red-500 text-sm mt-1">{error.fechaNacimiento}</p>
          )}
          {isValidField("fechaNacimiento") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Tipo de Documento */}
        <div className="flex flex-col">
          <label htmlFor="tipoDocumento" className="mb-1 text-sm font-medium">
            Tipo de Documento
          </label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            className="input input-info"
          >
            <option value="">Seleccione</option>
            <option value="dni">DNI</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="carnetExtranjeria">Carnet de Extranjería</option>
          </select>
          {submitted && error.tipoDocumento && (
            <p className="text-red-500 text-sm mt-1">{error.tipoDocumento}</p>
          )}
          {isValidField("tipoDocumento") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Documento */}
        <div className="flex flex-col">
          <label htmlFor="documento" className="mb-1 text-sm font-medium">
            Número de Documento
          </label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="input input-info"
            maxLength={8}
          />
          {submitted && error.documento && (
            <p className="text-red-500 text-sm mt-1">{error.documento}</p>
          )}
          {isValidField("documento") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Género */}
        <div className="flex flex-col">
          <label htmlFor="genero" className="mb-1 text-sm font-medium">
            Género
          </label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="input input-info"
          >
            <option value="">Seleccione</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          {submitted && error.genero && (
            <p className="text-red-500 text-sm mt-1">{error.genero}</p>
          )}
          {isValidField("genero") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Teléfono */}
        <div className="flex flex-col">
          <label htmlFor="telefono" className="mb-1 text-sm font-medium">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="input input-info"
            maxLength={9}
          />
          {submitted && error.telefono && (
            <p className="text-red-500 text-sm mt-1">{error.telefono}</p>
          )}
          {isValidField("telefono") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Teléfono Emergencia */}
        <div className="flex flex-col">
          <label
            htmlFor="telefonoEmergencia"
            className="mb-1 text-sm font-medium"
          >
            Teléfono de Emergencia
          </label>
          <input
            type="text"
            id="telefonoEmergencia"
            name="telefonoEmergencia"
            value={formData.telefonoEmergencia}
            onChange={handleChange}
            className="input input-info"
            maxLength={9}
          />
          {submitted && error.telefonoEmergencia && (
            <p className="text-red-500 text-sm mt-1">
              {error.telefonoEmergencia}
            </p>
          )}
          {isValidField("telefonoEmergencia") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Correo */}
        <div className="flex flex-col">
          <label htmlFor="correo" className="mb-1 text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="input input-info"
          />
          {submitted && error.correo && (
            <p className="text-red-500 text-sm mt-1">{error.correo}</p>
          )}
          {isValidField("correo") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Dirección */}
        <div className="flex flex-col">
          <label htmlFor="direccion" className="mb-1 text-sm font-medium">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="input input-info"
          />
          {submitted && error.direccion && (
            <p className="text-red-500 text-sm mt-1">{error.direccion}</p>
          )}
          {isValidField("direccion") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Cargo */}
        <div className="flex flex-col">
          <label htmlFor="cargo" className="mb-1 text-sm font-medium">
            Cargo
          </label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="input input-info"
          />
          {submitted && error.cargo && (
            <p className="text-red-500 text-sm mt-1">{error.cargo}</p>
          )}
          {isValidField("cargo") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Fecha de Contratación */}
        <div className="flex flex-col">
          <label
            htmlFor="fechaContratacion"
            className="mb-1 text-sm font-medium"
          >
            Fecha de Contratación
          </label>
          <input
            type="date"
            id="fechaContratacion"
            name="fechaContratacion"
            value={formData.fechaContratacion.toISOString().split("T")[0]}
            onChange={handleChange}
            className="input input-info"
            onKeyDown={(e) => e.preventDefault()}
          />
          {submitted && error.fechaContratacion && (
            <p className="text-red-500 text-sm mt-1">
              {error.fechaContratacion}
            </p>
          )}
          {isValidField("fechaContratacion") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>

        {/* Tipo de Contrato */}
        <div className="flex flex-col">
          <label htmlFor="tipoContrato" className="mb-1 text-sm font-medium">
            Tipo de Contrato
          </label>
          <select
            id="tipoContrato"
            name="tipoContrato"
            value={formData.tipoContrato}
            onChange={handleChange}
            className="input input-info"
          >
            <option value="">Seleccione</option>
            <option value="indeterminado">Indeterminado</option>
            <option value="plazoFijo">Plazo Fijo</option>
            <option value="practicas">Prácticas</option>
          </select>
          {submitted && error.tipoContrato && (
            <p className="text-red-500 text-sm mt-1">{error.tipoContrato}</p>
          )}
          {isValidField("tipoContrato") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}
        </div>
      </div>

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
