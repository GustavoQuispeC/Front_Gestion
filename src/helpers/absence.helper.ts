import { AbsenceRegisterProps, AbsenceSummary } from "@/types/absence";

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
  userId: string,
  token: string
): Promise<AbsenceRegisterProps[]> {
  try {
    const response = await fetch(`${apiUrl}/Absence/employee/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = (await response.json()) as AbsenceRegisterProps[];
    return json;
  } catch (error) {
    console.error("Error al obtener las faltas del empleado:", error);
    throw error;
  }
}