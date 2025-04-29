import { EmployeeRegisterApiProps } from "@/types";

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
