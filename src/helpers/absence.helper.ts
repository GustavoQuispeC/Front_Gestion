import {  AbsenceRegisterProps, AbsenceSummary, AbsenceTableProps } from "@/types/absence";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//listar resumen de faltas por id de empleado
export async function GetAbsenceSummaryById(
  userId: string,
  token: string
): Promise<AbsenceSummary> {
  try {
    const response = await fetch(`${apiUrl}/Absence/summary/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from absence summary:", response);

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = (await response.json()) as AbsenceSummary;
    return json;
  } catch (error) {
    console.error("Error al obtener las faltas:", error);
    throw error;
  }
}

//Listar ausencias por id de empleado
export async function GetAbsencesByEmployeeId(
  EmployeeId: string,
  token: string
): Promise<AbsenceTableProps[]> {
  try {
    const response = await fetch(`${apiUrl}/Absence/employee/${EmployeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from employee absences:", response);

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = (await response.json()) as AbsenceTableProps[];
    return json;
  } catch (error) {
    console.error("Error al obtener las faltas del empleado:", error);
    throw error;
  }
}

//Registrar una ausencia
export async function AbsenceRegister(
  userData : AbsenceRegisterProps,
  token : string){
  try {
     const response = await fetch(`${apiUrl}/Absence/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...userData,
        date: new Date(userData.date).toISOString(),
      
      }),
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || "Error desconocido");
      } else {
        const text = await response.text();
        throw new Error(text || "Error desconocido");
      }
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text(); 
    }
  }
  catch (error) {
    console.error("Error al registrar la ausencia:", error);
    throw error;
  }


}