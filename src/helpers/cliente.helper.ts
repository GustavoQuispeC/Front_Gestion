const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Listar todos los clientes
export async function ClientesListar() {
  try {
    const response = await fetch(`${apiUrl}/cliente`, {
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
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
}
