import { RegisterEmployeeProps } from "@/types";


export async function createEmpleado(formData: RegisterEmployeeProps) {
    try {
      const response = await fetch("https://localhost:7160/api/empleados", {
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
  