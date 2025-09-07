export interface SalaryAdvanceTableProps {
  employeeId: number;
  date: Date;
  observation: string;
  createdAt: Date;
  isJustified: boolean;
}

export interface SalaryAdvanceSummary {
  employeeId: number;
  totalAdvance: number;
}
