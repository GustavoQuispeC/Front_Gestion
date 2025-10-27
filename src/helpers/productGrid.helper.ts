const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Listar productos
export async function listarProductosActivo() {
  try {
    const response = await fetch(`${apiUrl}/producto/activos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       
      },
    });

    if (!response.ok) {
      throw new Error("Error al listar los productos activos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al listar los productos activos");
  }
}