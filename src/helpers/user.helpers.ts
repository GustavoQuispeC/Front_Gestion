const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Get all users
export async function getAllUsers() {
  try {
    const response = await fetch(`${apiUrl}/user`, {
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
    console.error("Error al obtener los usuarios:", error);
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