import { RegisterEmployeeErrorProps, RegisterEmployeeProps } from "@/types";

export function validateRegisterEmployee(
  values: RegisterEmployeeProps
): RegisterEmployeeErrorProps {
  const errors: RegisterEmployeeErrorProps = {
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
  };

  // Nombres
  if (!values.nombres.trim()) {
    errors.nombres = "El nombre es requerido";
  }

  if (!values.apellidoPaterno.trim()) {
    errors.apellidoPaterno = "El apellido paterno es requerido";
  }

  if (!values.apellidoMaterno.trim()) {
    errors.apellidoMaterno = "El apellido materno es requerido";
  }

  // Documento
  if (!values.documento.trim()) {
    errors.documento = "El número de documento es requerido";
  } else if (!/^\d+$/.test(values.documento)) {
    errors.documento = "El número de documento debe contener solo números";
  } else if (values.documento.length < 8) {
    errors.documento = "El número de documento debe tener al menos 8 dígitos";
  }

  if (!values.tipoDocumento.trim()) {
    errors.tipoDocumento = "El tipo de documento es requerido";
  }

  // Obtener la fecha actual y restar 18 años
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  // Fecha de nacimiento
  if (!values.fechaNacimiento || isNaN(values.fechaNacimiento.getTime())) {
    errors.fechaNacimiento = "La fecha de nacimiento es inválida";
  } else if (values.fechaNacimiento > today) {
    errors.fechaNacimiento = "La fecha de nacimiento no puede ser futura";
  } else if (values.fechaNacimiento > eighteenYearsAgo) {
    errors.fechaNacimiento = "Debe tener al menos 18 años";
  } else {
    errors.fechaNacimiento = "";
  }

  // Género
  if (!values.genero.trim()) {
    errors.genero = "El género es requerido";
  }

  // Teléfono
  if (!values.telefono.trim()) {
    errors.telefono = "El teléfono es requerido";
  } else if (!/^\d+$/.test(values.telefono)) {
    errors.telefono = "El teléfono debe contener solo números";
  } else if (values.telefono.length < 9) {
    errors.telefono = "El teléfono debe tener al menos 9 dígitos";
  }

  // Teléfono de emergencia
  if (!values.telefonoEmergencia.trim()) {
    errors.telefonoEmergencia = "El teléfono de emergencia es requerido";
  } else if (!/^\d+$/.test(values.telefonoEmergencia)) {
    errors.telefonoEmergencia = "El teléfono de emergencia debe contener solo números";
  } else if (values.telefonoEmergencia.length < 9) {
    errors.telefonoEmergencia = "El teléfono de emergencia debe tener al menos 9 dígitos";
  }

  // Email
  if (!values.correo.trim()) {
    errors.correo = "El campo email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.correo)) {
    errors.correo = "El email es inválido";
  }

  // Dirección
  if (!values.direccion.trim()) {
    errors.direccion = "La dirección es requerida";
  }

  // Cargo
  if (!values.cargo.trim()) {
    errors.cargo = "El cargo es requerido";
  }

  // Fecha de contratación
  if (!values.fechaContratacion || isNaN(values.fechaContratacion.getTime())) {
    errors.fechaContratacion = "La fecha de contratación es inválida";
  } else if (values.fechaContratacion > new Date()) {
    errors.fechaContratacion = "La fecha de contratación no puede ser futura";
  }

  // Tipo de contrato
  if (!values.tipoContrato.trim()) {
    errors.tipoContrato = "El tipo de contrato es requerido";
  }

  return errors;
}
