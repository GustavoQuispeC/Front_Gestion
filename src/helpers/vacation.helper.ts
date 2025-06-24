import { VacationSummary } from "@/types/vacation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
