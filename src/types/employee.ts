export interface EmployeeRegisterProps {
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  documentNumber: string;
  documentType: string;
  birthDate: Date;
  gender: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  position: string;
  hireDate: Date;
  contractType: string;
  photoUrl: string; // Firebase image URL
}

export interface EmployeeRegisterErrorProps {
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  documentNumber: string;
  documentType: string;
  birthDate: string;
  gender: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  position: string;
  hireDate: string;
  contractType: string;
  photoUrl: string; // Firebase image URL
}

export interface EmployeeRegisterApiProps {
  FirstName: string;
  LastNameFather: string;
  LastNameMother: string;
  DocumentNumber: string;
  DocumentType: string;
  BirthDate: Date;
  Gender: string;
  Phone: string;
  EmergencyPhone: string;
  Email: string;
  Address: string;
  Position: string;
  HireDate: Date;
  ContractType: string;
  PhotoUrl: string;
}

export interface EmployeeListProps {
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  documentNumber: string;
  documentType: string;
  birthDate: Date;
  gender: string;
  photoUrl: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  position: string;
  hireDate: Date;
  contractType: string;
  id: number;
  createdAt: Date;
  isActive: boolean;
}
export interface EmployeeSearchProps {
  employeeId: number;
  firstName: string;
  lastNameFather: string;
  lastNameMother: string;
  documentNumber: string;
  position: string;
  email: string;
  hireDate: string | Date; // Usar string si la API devuelve una fecha como cadena
}