import { ProveedorRegistrarProps } from '@/types/proveedor';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


//Listar todos los proveedores
export async function ProveedoresListar() {
  try {
    const response = await fetch(`${apiUrl}/proveedor`, {
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
    console.error("Error al obtener los proveedores:", error);
    throw error;
  }
}

//Registrar un nuevo proveedor
export async function registrarProveedor(formData: ProveedorRegistrarProps, token:string) {
  try {
    const response = await fetch(`${apiUrl}/proveedor/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    throw error;
  }
}