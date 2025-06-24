import { VacationRegisterProps, VacationSummary } from "@/types/vacation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//listar resumen de vacaciones por id de empleado
export async function GetVacationSummaryById(
  userId: string,
  token: string
): Promise<VacationSummary> {
  try {
    const response = await fetch(`${apiUrl}/Vacation/summary/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from vacation summary:", response);

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = (await response.json()) as VacationSummary;
    return json;
  } catch (error) {
    console.error("Error al obtener las vacaciones:", error);
    throw error;
  }
}

//Registrar vacaciones
export async function VacationRegister(
  userData: VacationRegisterProps,
  token: string
) {
  try {
    const response = await fetch(`${apiUrl}/vacation/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...userData,
        startDate: new Date(userData.startDate).toISOString(),
        endDate: new Date(userData.endDate).toISOString(),
      }),
    });

   if (!response.ok) {
  const error = await response.json(); 
  throw new Error(error.message || "Error desconocido");
}

    return await response.json();
  } catch (error) {
    console.error("Error al registrar las vacaciones:", error);
    throw error;
  }
}