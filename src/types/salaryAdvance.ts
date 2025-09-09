export interface SalaryAdvanceTableProps {
    employeeId:    number;
    amount:        number;
    dateRequested: Date;
    isApproved:    boolean;
    id:            number;
    createdAt:     Date;
    isActive:      boolean;
}


export interface SalaryAdvanceSummary {
  employeeId: number;
  totalSalaryAdvance: number;
}
