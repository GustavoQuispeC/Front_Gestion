export interface AbsenceSummary {
  employeeId: number;
  totalAbsences: number;
}

export interface AbsenceRegisterProps {
  employeeId: number;
  date: Date;
  reason : string;
  createdAt: Date;
  isJustified: boolean;
}