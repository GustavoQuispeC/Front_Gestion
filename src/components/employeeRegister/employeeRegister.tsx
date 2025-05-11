"use client";

import { uploadImage } from "@/helpers/uploadImageToFirebase";
import {
  EmployeeRegisterApiProps,
  EmployeeRegisterErrorProps,
  EmployeeRegisterProps,
} from "@/types";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { employeeCreate } from "@/helpers/employee.helpers";
import { employeeValidateRegister } from "@/utils/employeeRegisterValidation";

export default function RegisterEmployee() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<EmployeeRegisterProps>({
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    documentNumber: "",
    documentType: "",
    birthDate: new Date(),
    gender: "",
    phone: "",
    emergencyPhone: "",
    email: "",
    address: "",
    position: "",
    hireDate: new Date(),
    contractType: "",
    photoUrl: "", // URL de la imagen en Firebase
  });

  const [error, setError] = useState<EmployeeRegisterErrorProps>({
    firstName: "",
    lastNameFather: "",
    lastNameMother: "",
    documentNumber: "",
    documentType: "",
    birthDate: "",
    gender: "",
    phone: "",
    emergencyPhone: "",
    email: "",
    address: "",
    position: "",
    hireDate: "",
    contractType: "",
    photoUrl: "", // URL de la imagen en Firebase
  });

  // Funcion para validar los campos al cambiar el valor
  const isValidField = (field: keyof EmployeeRegisterErrorProps) => {
    return submitted && error[field] === "";
  };

  // Funcion para manejar el cambio de los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files && files.length > 0) {
      const file = files[0];

      setSelectedImage(file); // Guardamos el archivo como objeto File

      // Creamos una URL temporal para mostrar la vista previa
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "date" ? new Date(value) : value,
      }));
    }
  };

  // Funcion para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let uploadedPhotoUrl = "";

      if (selectedImage) {
        uploadedPhotoUrl = await uploadImage(selectedImage);
      }

      const finalPhotoUrl = uploadedPhotoUrl || formData.photoUrl;

      const validationErrors = employeeValidateRegister({
        ...formData,
        photoUrl: finalPhotoUrl,
      });
      setError(validationErrors);
      setSubmitted(true);

      const isValid = Object.values(validationErrors).every((v) => v === "");

      if (!isValid) {
        toast.error("Por favor, corrige los errores del formulario.", {
          theme: "colored",
        });
        setIsLoading(false);
        return;
      }

      const finalFormData: EmployeeRegisterApiProps = {
        FirstName: formData.firstName,
        LastNameFather: formData.lastNameFather,
        LastNameMother: formData.lastNameMother,
        DocumentNumber: formData.documentNumber,
        DocumentType: formData.documentType,
        BirthDate: formData.birthDate,
        Gender: formData.gender,
        Phone: formData.phone,
        EmergencyPhone: formData.emergencyPhone,
        Email: formData.email,
        Address: formData.address,
        Position: formData.position,
        HireDate: formData.hireDate,
        ContractType: formData.contractType,
        PhotoUrl: finalPhotoUrl,
      };

      console.log("JSON a enviar:", JSON.stringify(finalFormData, null, 2));

      const result = await employeeCreate(finalFormData);
      console.log("Empleado creado ✅", result);

      toast.success("Se guardó correctamente", {
        theme: "colored",
      });

      // Opcional: limpiar formulario aquí
      // setFormData(initialState);
      // setSelectedImage(null);
      // setPreviewUrl(null);
    } catch (err) {
      console.error("Error al registrar:", err);
      toast.error("Error al guardar la información", {
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Funcion para validar los campos al cambiar el valor
  useEffect(() => {
    if (submitted) {
      const validationErrors = employeeValidateRegister(formData);
      setError(validationErrors);
    }
  }, [formData, submitted]);

  // Funcion para manejar el cambio de los input files
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
    
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-left mx-10">
          Registro de Empleado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mx-10">
          {/* Nombres */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 text-sm font-medium">
              Nombres
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-info w-full"
            />
            {submitted && error.firstName && (
              <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
            )}
            {isValidField("firstName") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Apellido Paterno */}
          <div className="flex flex-col">
            <label
              htmlFor="lastNameFather"
              className="mb-1 text-sm font-medium"
            >
              Apellido Paterno
            </label>
            <input
              type="text"
              id="lastNameFather"
              name="lastNameFather"
              value={formData.lastNameFather}
              onChange={handleChange}
              className="input input-info w-full"
            />
            {submitted && error.lastNameFather && (
              <p className="text-red-500 text-sm mt-1">
                {error.lastNameFather}
              </p>
            )}
            {isValidField("lastNameFather") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Apellido Materno */}
          <div className="flex flex-col">
            <label
              htmlFor="lastNameMother"
              className="mb-1 text-sm font-medium"
            >
              Apellido Materno
            </label>
            <input
              type="text"
              id="lastNameMother"
              name="lastNameMother"
              value={formData.lastNameMother}
              onChange={handleChange}
              className="input input-info w-full"
            />
            {submitted && error.lastNameMother && (
              <p className="text-red-500 text-sm mt-1">
                {error.lastNameMother}
              </p>
            )}
            {isValidField("lastNameMother") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Fecha de Nacimiento */}
          <div className="flex flex-col">
            <label htmlFor="birthDate" className="mb-1 text-sm font-medium">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate.toISOString().split("T")[0]}
              onChange={handleChange}
              className="input input-info w-full"
              onKeyDown={(e) => e.preventDefault()}
            />
            {submitted && error.birthDate && (
              <p className="text-red-500 text-sm mt-1">{error.birthDate}</p>
            )}
            {isValidField("birthDate") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Tipo de Documento */}
          <div className="flex flex-col">
            <label htmlFor="documentType" className="mb-1 text-sm font-medium">
              Tipo de Documento
            </label>
            <select
              id="documentType"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="input input-info w-full"
            >
              <option value="">Seleccione</option>
              <option value="dni">DNI</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="carnetExtranjeria">Carnet de Extranjería</option>
            </select>
            {submitted && error.documentType && (
              <p className="text-red-500 text-sm mt-1">{error.documentType}</p>
            )}
            {isValidField("documentType") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Documento */}
          <div className="flex flex-col">
            <label
              htmlFor="documentNumber"
              className="mb-1 text-sm font-medium"
            >
              Número de Documento
            </label>
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              className="input input-info w-full"
              maxLength={8}
            />
            {submitted && error.documentNumber && (
              <p className="text-red-500 text-sm mt-1">
                {error.documentNumber}
              </p>
            )}
            {isValidField("documentNumber") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Género */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 text-sm font-medium">
              Género
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input input-info w-full"
            >
              <option value="">Seleccione</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            {submitted && error.gender && (
              <p className="text-red-500 text-sm mt-1">{error.gender}</p>
            )}
            {isValidField("gender") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 text-sm font-medium">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-info w-full"
              maxLength={9}
            />
            {submitted && error.phone && (
              <p className="text-red-500 text-sm mt-1">{error.phone}</p>
            )}
            {isValidField("phone") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Teléfono Emergencia */}
          <div className="flex flex-col">
            <label
              htmlFor="emergencyPhone"
              className="mb-1 text-sm font-medium"
            >
              Teléfono de Emergencia
            </label>
            <input
              type="text"
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="input input-info w-full"
              maxLength={9}
            />
            {submitted && error.emergencyPhone && (
              <p className="text-red-500 text-sm mt-1">
                {error.emergencyPhone}
              </p>
            )}
            {isValidField("emergencyPhone") && (
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
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-info w-full"
            />
            {submitted && error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
            {isValidField("email") && (
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
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input input-info w-full"
            />
            {submitted && error.address && (
              <p className="text-red-500 text-sm mt-1">{error.address}</p>
            )}
            {isValidField("address") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Cargo */}
          <div className="flex flex-col">
            <label htmlFor="position" className="mb-1 text-sm font-medium">
              Cargo
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="input input-info w-full"
            />
            {submitted && error.position && (
              <p className="text-red-500 text-sm mt-1">{error.position}</p>
            )}
            {isValidField("position") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Fecha de Contratación */}
          <div className="flex flex-col">
            <label htmlFor="hireDate" className="mb-1 text-sm font-medium">
              Fecha de Contratación
            </label>
            <input
              type="date"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate.toISOString().split("T")[0]}
              onChange={handleChange}
              className="input input-info w-full"
              onKeyDown={(e) => e.preventDefault()}
            />
            {submitted && error.hireDate && (
              <p className="text-red-500 text-sm mt-1">{error.hireDate}</p>
            )}
            {isValidField("hireDate") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>

          {/* Tipo de Contrato */}
          <div className="flex flex-col">
            <label htmlFor="contractType" className="mb-1 text-sm font-medium">
              Tipo de Contrato
            </label>
            <select
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className="input input-info w-full"
            >
              <option value="">Seleccione</option>
              <option value="indeterminado">Indeterminado</option>
              <option value="plazoFijo">Plazo Fijo</option>
              <option value="practicas">Prácticas</option>
            </select>
            {submitted && error.contractType && (
              <p className="text-red-500 text-sm mt-1">{error.contractType}</p>
            )}
            {isValidField("contractType") && (
              <p className="text-green-600 text-sm mt-1">Completado ✅</p>
            )}
          </div>
        </div>

        {/* Adjuntar Foto de Empleado */}
        <div className="flex flex-col mx-10">
          <label
            htmlFor="photoUrl"
            className="text-base text-slate-900 font-medium mb-3 block"
          >
            Adjuntar Foto de Empleado
          </label>

          <input
            type="file"
            id="photoUrl"
            name="photoUrl"
            accept="image/*"
            onChange={handleChange}
            className={`file-input file-input-info w-full ${
              submitted && error.photoUrl ? "input-error" : "input-info"
            }`}
          />

          {/* Mensajes de validación */}
          {submitted && error.photoUrl && (
            <p className="text-red-500 text-sm mt-1">{error.photoUrl}</p>
          )}
          {isValidField("photoUrl") && (
            <p className="text-green-600 text-sm mt-1">Completado ✅</p>
          )}

          {/* Texto guía */}
          <p className="text-xs text-slate-500 mt-2">
            Solo se permiten archivos .jpg, .jpeg y .png
          </p>

          {/* Vista previa de la imagen seleccionada */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-slate-700 mb-2">Vista previa:</p>
              <img
                src={previewUrl}
                alt="Vista previa"
                className="h-48 w-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Botón de enviar */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : "Registrar"}
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
