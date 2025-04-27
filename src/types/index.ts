export interface RegisterEmployeeProps {
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

export interface RegisterEmployeeErrorProps {
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

export interface RegisterEmployeeApiProps {
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
