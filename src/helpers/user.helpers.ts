import { UserRegisterProps, UserUpdateProps } from "@/types/user";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//!Get all users
export async function getAllUsers(token: string) {
  try {
    const response = await fetch(`${apiUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("No autorizado. Token inválido o expirado.");
      }
      if (response.status === 403) {
        throw new Error("Acceso prohibido.");
      }
      throw new Error("Error en la solicitud: " + response.statusText);
    }
    const json = await response.json();
    //console.log("Respuesta del backend:", json);

    return json;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
}

//Get user by ID
export async function GetByUserId(userId: string, token: string) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
    console.log("Respuesta del backend:", json);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
}

//Login user
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

export async function registerUser(userData: UserRegisterProps, token: string) {
  try {
    const response = await fetch(`${apiUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const json = await response.json();

    if (!response.ok) {
      const detail = json.errors
        ? json.errors
            .map((e: { description: string }) => e.description)
            .join(", ")
        : json.message || "Error desconocido al registrar";
      
      // Lanzamos el error con el mensaje que viene del backend
      throw new Error(detail);
    }

    return json;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error; // Pasamos el error hacia el handleRegister
  }
}


//Delete user
export async function deleteUser(userId: string, token: string) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
}

//Update user
export async function updateUser(
  userId: string,
  userData: UserUpdateProps,
  token: string
) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
}
