export interface AbsenceSummary {
  employeeId: number;
  totalAbsences: number;
}

export interface AbsenceTableProps {
  employeeId: number;
  date: Date;
  reason: string;
  createdAt: Date;
  isJustified: boolean;
}

export interface AbsenceRegisterProps {
  employeeId: number;
  date: Date;
  reason: string;
  isJustified: boolean;
}

export interface EmployeeAbsenceAll {
    employeeId:     number;
    firstName:      string;
    lastNameFather: string;
    lastNameMother: string;
    justified:      number;
    unjustified:    number;
}
