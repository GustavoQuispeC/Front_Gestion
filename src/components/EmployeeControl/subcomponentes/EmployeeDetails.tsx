import { EmployeeSearchProps } from "@/types/employee";

interface Props {
  employee: EmployeeSearchProps;
}



const formatHireDate = (date: string | Date | undefined) => {
  if (!date) return "No disponible";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isNaN(dateObj.getTime())
    ? "Fecha inválida"
    : dateObj.toLocaleDateString("es-ES");
};

export default function EmployeeDetails({ employee }: Props) {
  return (
    <div className="mb-6">
      {/* <h5 className="text-lg font-semibold mb-2">Datos del Empleado</h5> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Fecha de contratp */}
        <div>
          <strong>Fecha de contrato: </strong>
          {formatHireDate(employee.hireDate)}
        </div>

      </div>
    </div>
  );
}
