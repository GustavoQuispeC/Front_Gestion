import {
  SalaryAdvanceRegisterProps,
  SalaryAdvanceSummary,
  SalaryAdvanceTableProps,
} from "@/types/salaryAdvance";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Listar adelanto de sueldo por id de empleado
export async function GetSalaryAdvanceByEmployeeId(
  EmployeeId: string,
  token: string
): Promise<SalaryAdvanceTableProps[]> {
  try {
    const response = await fetch(`${apiUrl}/SalaryAdvance/${EmployeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from employee salary advances:", response);

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = (await response.json()) as SalaryAdvanceTableProps[];
    return json;
  } catch (error) {
    console.error(
      "Error al obtener los adelantos de sueldo del empleado:",
      error
    );
    throw error;
  }
}

//listar resumen de adelanto de sueldo por id de empleado
export async function GetSalaryAdvanceSummaryById(
  userId: string,
  token: string
): Promise<SalaryAdvanceSummary> {
  try {
    const response = await fetch(`${apiUrl}/SalaryAdvance/summary/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from salary advance summary:", response);

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = (await response.json()) as SalaryAdvanceSummary;
    return json;
  } catch (error) {
    console.error("Error al obtener los adelantos de sueldo:", error);
    throw error;
  }
}

//Registrar adelanto de sueldo
export async function SalaryAdvanceRegister(
  userData: SalaryAdvanceRegisterProps,
  token: string
) {
  try {
    const response = await fetch(`${apiUrl}/SalaryAdvance/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...userData,
        dateRequested: new Date(userData.dateRequested).toISOString(),
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
  } catch (error) {
    console.error("Error al registrar la ausencia:", error);
    throw error;
  }
}
