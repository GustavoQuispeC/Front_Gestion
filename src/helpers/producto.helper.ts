import { ProductoRegistrarProps } from "@/types/producto";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Listar productos
export async function listarProductos(token: string) {
  try {
    const response = await fetch(`${apiUrl}/producto`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al listar los productos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al listar los productos");
  }
}

//Registrar un nuevo producto
export async function registrarProducto(
  formData: ProductoRegistrarProps,
  token: string
) {
  try {
    const response = await fetch(`${apiUrl}/producto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el producto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al registrar el producto");
  }
}
