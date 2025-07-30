import { useState, useEffect } from "react";

/**
 * Hook para obtener el token de autenticación y validar roles.
 * @param requiredRoles Roles requeridos para permitir acceso.
 */

export function useAuthToken(requiredRoles: string[] = []) {
  const [token, setToken] = useState<string>(""); // ✅ siempre string, nunca null
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setToken(""); 
      setHasPermission(false);
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      const userRoles: string[] = parsed.roles || [];

      const authorized =
        requiredRoles.length === 0
          ? true
          : requiredRoles.some((r) => userRoles.includes(r));

      setToken(parsed.token ?? ""); 
      setHasPermission(authorized);
    } catch {
      setToken("");
      setHasPermission(false);
    }
  }, [requiredRoles]);

  return { token, hasPermission };
}
