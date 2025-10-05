import { ProveedorRegistrarProps } from '@/types/proveedor';
import ProveedorRegistrar from '../components/proveedor/proveedorRegistrar/ProveedorRegistrar';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


//Listar todos los proveedores
export async function getAllProveedores() {
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
export async function proveedorRegistrar(formData: ProveedorRegistrarProps) {
  try {
    const response = await fetch(`${apiUrl}/proveedor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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