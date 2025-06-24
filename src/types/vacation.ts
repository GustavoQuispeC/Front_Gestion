export interface VacationSummary {
  employeeId: number;
  accumulatedDays: number;
  takenDays: number;
  remainingDays: number;
}

export interface VacationRegisterProps {
  employeeId: string;
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
  daysRequested: number;
  daysTaken: number;
  daysRemaining: number;
  reason: string;
}

export interface VacationRegisterErrorProps {
  employeeId: number;
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
  daysRequested: number;
  daysTaken: number;
  daysRemaining: number;
  reason: string;
}
