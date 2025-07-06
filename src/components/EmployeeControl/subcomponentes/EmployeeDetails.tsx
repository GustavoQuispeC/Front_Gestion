import { AbsenceSummary } from "@/types/absence";
import { EmployeeSearchProps } from "@/types/employee";
import { VacationSummary } from "@/types/vacation";

interface Props {
  employee: EmployeeSearchProps;
  summaryVacation: VacationSummary | null;
  summaryAbsence: AbsenceSummary | null;
}

function VacationInfo({ summary }: { summary: VacationSummary | null }) {
  if (!summary) return <p>No disponible</p>;

  return (
    <>
      <p>Días acumulados: {summary.accumulatedDays ?? 0}</p>
      <p>Días tomados: {summary.takenDays ?? 0}</p>
      <p>Días disponibles: {summary.remainingDays ?? 0}</p>
    </>
  );
}

function AbsenceInfo({ summary }: { summary: AbsenceSummary | null }) {
  if (!summary) return <p>No disponible</p>;

  return <p>Total de faltas: {summary.totalAbsences ?? 0}</p>;
}

const formatHireDate = (date: string | Date | undefined) => {
  if (!date) return "No disponible";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isNaN(dateObj.getTime()) ? "Fecha inválida" : dateObj.toLocaleDateString("es-ES");
};

export default function EmployeeDetails({
  employee,
  summaryVacation,
  summaryAbsence,
}: Props) {
  return (
    <div className="mb-6">
      <h5 className="text-lg font-semibold mb-4">Datos del Empleado</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Información del empleado */}
        <div>
          <p>
            <strong>Nombre:</strong> {employee.lastNameFather}{" "}
            {employee.lastNameMother}, {employee.firstName}
          </p>
          <p>
            <strong>DNI:</strong> {employee.documentNumber || "No disponible"}
          </p>
        </div>

        <div>
          <p>
            <strong>Cargo:</strong> {employee.position || "No disponible"}
          </p>
          <p>
            <strong>Email:</strong> {employee.email || "No disponible"}
          </p>
        </div>

        {/* Fecha de Ingreso */}
        <div>
          <strong>Fecha de Ingreso: </strong>
          {formatHireDate(employee.hireDate)}
        </div>

        {/* Vacaciones */}
        <div>
          <strong>Vacaciones:</strong>
          <VacationInfo summary={summaryVacation} />
        </div>

        {/* Faltas */}
        <div>
          <strong>Faltas:</strong>
          <AbsenceInfo summary={summaryAbsence} />
        </div>
      </div>
    </div>
  );
}
