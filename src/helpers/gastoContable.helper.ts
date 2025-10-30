import { GastoContableRegistrarProps } from "@/types/gastoContable";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Listar gastos contables
export async function listarGastosContables(
  token: string,
  idGasto: string,
  mes: string,
  anio: string
) {
  try {
    //URL con parámetros
    const url = `${apiUrl}/GastoContable?idGasto=${idGasto}&mes=${mes}&anio=${anio}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al listar los gastos contables");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error al listar los gastos contables:", error);
    throw error;
  }
}


//Registrar un nuevo gasto contable
export async function registrarGastoContable(
  formData: GastoContableRegistrarProps,
  token: string
) {
  try {
    const response = await fetch(`${apiUrl}/GastoContable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el gasto contable");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al registrar el gasto contable");
  }
}
