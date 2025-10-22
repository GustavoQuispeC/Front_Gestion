import { useState, useEffect } from "react";

/**
 * Hook para obtener el token de autenticación y validar roles.
 * @param requiredRoles Roles requeridos para permitir acceso.
 */
export function useAuthToken(requiredRoles: string[] = []) {
  const [token, setToken] = useState<string>("");
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado

  useEffect(() => {
    // 1. Inicia la carga
    setIsLoading(true); 

    const userData = localStorage.getItem("user");
    if (!userData) {
      setToken("");
      setHasPermission(false);
      setIsLoading(false); // 2. Termina la carga
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      const userRoles: string[] = parsed.roles || [];
      const userToken: string = parsed.token ?? "";

      // Lógica de autorización
      const authorized =
        requiredRoles.length === 0
          ? true
          : requiredRoles.some((r) => userRoles.includes(r));

      setToken(userToken);
      setHasPermission(authorized);
    } catch {
      setToken("");
      setHasPermission(false);
    } finally {
      // 3. Termina la carga en cualquier caso (éxito o error de parseo)
      setIsLoading(false); 
    }
  }, [requiredRoles]);

  return { token, hasPermission, isLoading }; // Retorna isLoading
}