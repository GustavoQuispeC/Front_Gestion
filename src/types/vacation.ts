export interface VacationSummary {
  employeeId: number;
  accumulatedDays: number;
  takenDays: number;
  remainingDays: number;
}

export interface VacationRegisterProps {
  employeeId: number;
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
  daysRequested: number;
  daysTaken: number;
  daysRemaining: number;
  reason: string;
  
}

export interface VacacionListProps {
    employeeId: number;
  startDate: Date;
  endDate: Date;
   daysRequested: number;
  reason : string;
  isApproved: boolean;
  createdAt: Date;
}


