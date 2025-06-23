import {
  EmployeeListProps,
  EmployeeRegisterApiProps,
  EmployeeSearchProps,
} from "@/types/employee";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Get all employees
export async function getAllEmployees() {
  try {
    const response = await fetch(`${apiUrl}/employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    throw error;
  }
}

//get employee by id
export const getEmployeeById = async (
  employeeId: string
): Promise<EmployeeListProps> => {
  try {
    const response = await fetch(`${apiUrl}/employee/${employeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el empleado: ${response.statusText}`);
    }

    const employeeData = await response.json();
    return employeeData; // Se asume que la respuesta es un objeto que representa al empleado
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    throw error;
  }
};

//get employee by documentNumber
export const getEmployeeByDocumentNumber = async (
  documentNumber: string
): Promise<EmployeeListProps> => {
  try {
    const response = await fetch(
      `${apiUrl}/employee/document/${documentNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener el empleado: ${response.statusText}`);
    }

    const employeeData = await response.json();
    return employeeData; // Se asume que la respuesta es un objeto que representa al empleado
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    throw error;
  }
};

//Create employee
export async function employeeCreate(formData: EmployeeRegisterApiProps) {
  try {
    const response = await fetch(`${apiUrl}/employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al registrar el empleado:", error);
    throw error;
  }
}

//get employee by full name
export const getEmployeeByFullname = async (
  fullname: string
): Promise<EmployeeSearchProps[]> => {
  try {
    const response = await fetch(
      `${apiUrl}/employee/fullname?query=${encodeURIComponent(fullname)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener empleados: ${response.statusText}`);
    }

    const employeeData = await response.json();
    return employeeData;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};

//Obtener el numero de dias de vacaciones de un empleado
export const getEmployeeVacationDays = async (
  employeeId: string
): Promise<number> => {
  try {
    const response = await fetch(
      `${apiUrl}/employee/vacation-days/${employeeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error al obtener los días de vacaciones: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Ajuste: leer propiedad "VacationDays" del objeto
    if (typeof data?.vacationDays !== "number") {
      throw new Error(
        "La respuesta del servidor no contiene un número válido de días de vacaciones"
      );
    }

    return data.vacationDays;
  } catch (error) {
    console.error(
      `Error al obtener los días de vacaciones para el empleado ${employeeId}:`,
      error
    );
    throw error;
  }
};
