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

export interface SalaryAdvanceRegisterProps {
  employeeId: number;
  amount: number;
  dateRequested: Date;
  isApproved: boolean;
}

export interface GetAllSalaryAdvances {
    employeeId:     number;
    firstName:      string;
    lastNameFather: string;
    lastNameMother: string;
    amount:         number;
    createdAt:      Date;
}
