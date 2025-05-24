import { UserLoginErrorProps, UserLoginProps } from "@/types/user";

export function userValidateLogin(
  values: UserLoginProps
): UserLoginErrorProps {
  const errors: UserLoginErrorProps = {
    email: "",
    password: "",
  };

  // Validación de email
  const email = values.email.trim();
  if (!email) {
    errors.email = "El campo email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El email es inválido";
  }

  // Validación de contraseña
  const password = values.password.trim();
  if (!password) {
    errors.password = "La contraseña es requerida";
  } else if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (
    !/[A-Z]/.test(password) ||   // al menos una mayúscula
    !/[a-z]/.test(password) ||   // al menos una minúscula
    !/[0-9]/.test(password) ||   // al menos un número
    !/[^A-Za-z0-9]/.test(password) // al menos un símbolo
  ) {
    errors.password =
      "La contraseña debe incluir mayúsculas, minúsculas, un número y un símbolo";
  }

  return errors;
}
