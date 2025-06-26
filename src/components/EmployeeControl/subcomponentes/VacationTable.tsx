import { VacationRegisterProps } from "@/types/vacation";

interface Props {
  vacations: VacationRegisterProps[];
}

export default function VacationTable({ vacations }: Props) {
  return (
    <div className="md:col-span-3 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha Inicio
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha Fin
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Días Solicitados
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Motivo
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Aprobado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vacations.map((vacation, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                {new Date(vacation.startDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(vacation.endDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{vacation.daysRequested}</td>
              <td className="px-4 py-2">{vacation.reason}</td>
              <td className="px-4 py-2">
                <input type="checkbox" checked={vacation.isApproved} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
