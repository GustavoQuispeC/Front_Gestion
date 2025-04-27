export default function ListEmployee() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Lista de Empleados</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Apellido</th>
            <th className="py-3 px-6 text-left">Documento</th>
            <th className="py-3 px-6 text-left">Cargo</th>
            <th className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {/* Aquí iría el mapeo de empleados */}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Agregar Empleado
        </button>
      </div>
    </div>
  );
}
