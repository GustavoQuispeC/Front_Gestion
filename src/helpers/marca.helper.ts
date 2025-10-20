const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function ListarMarcas() {
  try {
    const response = await fetch(`${apiUrl}/marca`, {
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
    console.error("Error al listar marcas:", error);
    throw error;
  }
}
