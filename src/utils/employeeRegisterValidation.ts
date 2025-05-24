import {
  EmployeeRegisterErrorProps,
  EmployeeRegisterProps,
} from "@/types/employee";

export function employeeValidateRegister(
  values: EmployeeRegisterProps
): EmployeeRegisterErrorProps {
  const errors: EmployeeRegisterErrorProps = {
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
    photoUrl: "",
  };

  // First Name
  if (!values.firstName.trim()) {
    errors.firstName = "El nombre es requerido";
  }

  // Last Name Father
  if (!values.lastNameFather.trim()) {
    errors.lastNameFather = "El apellido paterno es requerido";
  }

  // Last Name Mother
  if (!values.lastNameMother.trim()) {
    errors.lastNameMother = "El apellido materno es requerido";
  }

  // Document Number
  if (!values.documentNumber.trim()) {
    errors.documentNumber = "El número de documento es requerido";
  } else if (!/^\d+$/.test(values.documentNumber)) {
    errors.documentNumber = "El número de documento debe contener solo números";
  } else if (values.documentNumber.length < 8) {
    errors.documentNumber =
      "El número de documento debe tener al menos 8 dígitos";
  }

  // Document Type
  if (!values.documentType.trim()) {
    errors.documentType = "El tipo de documento es requerido";
  }

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  // Birth Date
  if (!values.birthDate || isNaN(values.birthDate.getTime())) {
    errors.birthDate = "La fecha de nacimiento es inválida";
  } else if (values.birthDate > today) {
    errors.birthDate = "La fecha de nacimiento no puede ser futura";
  } else if (values.birthDate > eighteenYearsAgo) {
    errors.birthDate = "Debe tener al menos 18 años";
  } else {
    errors.birthDate = "";
  }

  // Gender
  if (!values.gender.trim()) {
    errors.gender = "El género es requerido";
  }

  // Phone
  if (!values.phone.trim()) {
    errors.phone = "El teléfono es requerido";
  } else if (!/^\d+$/.test(values.phone)) {
    errors.phone = "El teléfono debe contener solo números";
  } else if (values.phone.length < 9) {
    errors.phone = "El teléfono debe tener al menos 9 dígitos";
  }

  // Emergency Phone
  if (!values.emergencyPhone.trim()) {
    errors.emergencyPhone = "El teléfono de emergencia es requerido";
  } else if (!/^\d+$/.test(values.emergencyPhone)) {
    errors.emergencyPhone =
      "El teléfono de emergencia debe contener solo números";
  } else if (values.emergencyPhone.length < 9) {
    errors.emergencyPhone =
      "El teléfono de emergencia debe tener al menos 9 dígitos";
  }

  // Email
  if (!values.email.trim()) {
    errors.email = "El campo email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email es inválido";
  }

  // Address
  if (!values.address.trim()) {
    errors.address = "La dirección es requerida";
  }

  // Position
  if (!values.position.trim()) {
    errors.position = "El cargo es requerido";
  }

  // Hire Date
  if (!values.hireDate || isNaN(values.hireDate.getTime())) {
    errors.hireDate = "La fecha de contratación es inválida";
  } else if (values.hireDate > today) {
    errors.hireDate = "La fecha de contratación no puede ser futura";
  }

  // Contract Type
  if (!values.contractType.trim()) {
    errors.contractType = "El tipo de contrato es requerido";
  }

  return errors;
}
