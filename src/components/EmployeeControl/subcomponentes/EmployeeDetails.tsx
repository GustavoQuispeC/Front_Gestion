import { EmployeeSearchProps } from "@/types/employee";
import { VacationSummary } from "@/types/vacation";

interface Props {
  employee: EmployeeSearchProps;
  summary: VacationSummary | null;
}

export default function EmployeeDetails({ employee, summary }: Props) {
  return (
    <div className="mb-6">
      <h5 className="text-lg font-semibold mb-4">Datos del Empleado</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <strong>Fecha de Ingreso: </strong>
          {employee.hireDate
            ? new Date(employee.hireDate).toLocaleDateString()
            : "No disponible"}
        </div>
        <div>
          <p>
            <strong>Vacaciones:</strong>
          </p>
          <p>Días acumulados: {summary?.accumulatedDays ?? 0}</p>
          <p>Días tomados: {summary?.takenDays ?? 0}</p>
          <p>Días disponibles: {summary?.remainingDays ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
