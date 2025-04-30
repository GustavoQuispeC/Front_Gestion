'use client';
import { EmployeeListProps } from "@/types";
import { useState, useEffect } from "react";
import { getAllEmployees } from "@/helpers/employee.helpers";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import jsPDF from "jspdf";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeListProps[]>([]);

  // Función para generar el PDF en una nueva ventana
  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Listado de Empleados", 14, 20);

    // Establecer los encabezados de las columnas
    doc.setFontSize(12);
    doc.text("ID", 10, 30);
    doc.text("Nombre", 30, 30);
    doc.text("Apellido Paterno", 70, 30);
    doc.text("Apellido Materno", 110, 30);
    doc.text("Teléfono", 150, 30);
    doc.text("Activo", 190, 30);

    // Ajustar la posición para agregar los datos de los empleados
    let yOffset = 40;

    employees.forEach((employee) => {
      doc.text(String(employee.id), 10, yOffset);
      doc.text(employee.firstName, 30, yOffset);
      doc.text(employee.lastNameFather, 70, yOffset);
      doc.text(employee.lastNameMother, 110, yOffset);
      doc.text(employee.phone, 150, yOffset);
      doc.text(employee.isActive ? "Activo" : "Inactivo", 190, yOffset);

      // Incrementar el offset para el siguiente empleado
      yOffset += 10;
    });

    // Abrir una nueva ventana o pestaña
    const pdfDataUri = doc.output("datauristring");

    const newWindow = window.open(pdfDataUri, "_blank");

    if (newWindow) {
      newWindow.document.write('<html><head><title>Listado de Empleados</title></head><body>');
      newWindow.document.write('<h1>Listado de Empleados</h1>');
      newWindow.document.write(`<iframe src="${pdfDataUri}" width="100%" height="600px"></iframe>`);
      newWindow.document.write('</body></html>');
    } else {
      toast.error("No se pudo abrir la nueva ventana para el PDF.");
    }
  };

  // Función para obtener todos los empleados
  const GetEmployees = async () => {
    try {
      const employeeData = await getAllEmployees();
      setEmployees(employeeData); // Actualizamos el estado con los empleados
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados", { theme: "colored" });
    }
  };

  // Llamada automática cuando el componente se monta
  useEffect(() => {
    GetEmployees();
  }, []);

  return (
    <div className="overflow-x-auto">
      {/* Botón para generar el PDF */}
      <button
        onClick={generatePDF}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
      >
        Generar PDF
      </button>
      <table className="min-w-full bg-white">
        <thead className="bg-cyan-800 whitespace-nowrap">
          <tr className="even:bg-blue-50">
            <th className="p-4 text-left text-sm font-medium text-white">Id</th>
            <th className="p-4 text-left text-sm font-medium text-white">Foto</th>
            <th className="p-4 text-left text-sm font-medium text-white">A. Paterno</th>
            <th className="p-4 text-left text-sm font-medium text-white">A. Materno</th>
            <th className="p-4 text-left text-sm font-medium text-white">Nombres</th>
            <th className="p-4 text-left text-sm font-medium text-white">F. Nacimiento</th>
            <th className="p-4 text-left text-sm font-medium text-white">T. documento</th>
            <th className="p-4 text-left text-sm font-medium text-white">Num. documento</th>
            <th className="p-4 text-left text-sm font-medium text-white">Teléfono</th>
            <th className="p-4 text-left text-sm font-medium text-white">Estado</th>
            <th className="p-4 text-left text-sm font-medium text-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {/* Renderizamos cada empleado */}
          {employees.map((employee) => (
            <tr className="hover:bg-gray-100" key={employee.id}>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.id}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                <img
                  src={employee.photoUrl}
                  alt="Foto de empleado"
                  className="w-10 h-10 rounded-sm"
                />
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.lastNameFather}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.lastNameMother}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.firstName}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{new Date(employee.birthDate).toLocaleDateString()}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.documentType}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.documentNumber}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">{employee.phone}</td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                {/* Botón con borde condicional */}
                <button
                  className={`px-2 py-0.5 rounded-xl border-2 font-semibold ${
                    employee.isActive
                      ? "border-green-200 text-green-500 bg-green-50"
                      : "border-red-500 text-red-500 bg-red-50"
                  }`}
                >
                  {employee.isActive ? "Activo" : "Inactivo"}
                </button>
              </td>
              <td className="p-3 text-[15px] text-slate-900 font-medium">
                <div className="flex items-center">
                  <button className="mr-3" title="View">
                    <FaEye size={20} color="#566573" />
                  </button>

                  <button className="mr-3" title="Edit">
                    <MdModeEditOutline size={20} color="#2980b9" />
                  </button>
                  <button title="Delete">
                    <FaRegTrashAlt size={20} color="#e74c3c" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
