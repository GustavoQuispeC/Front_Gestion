"use client";
import React, { useState } from "react";
import Image from "next/image";
import { loginUser } from "@/helpers/user.helpers";
import { toast, ToastContainer } from "react-toastify";

import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activar la carga

    try {
      const response = await loginUser(email, password);
      if (response && response.token) {
        console.log("Inicio de sesión exitoso:", response);

        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.token,
            username: response.username,
            roles: response.roles,
            photoUrl: response.photoUrl,
          })
        );

        toast.success("Bienvenido, " + response.username, { theme: "colored" });

        // Redirigir después de guardar los datos
        router.push("/dashboard/main");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al autenticarte. Intenta nuevamente.", {
        theme: "colored",
      });
    } finally {
      setIsLoading(false); // Desactivar la carga
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
            <div className="space-y-2">
              <Image
                src="/images/LogoFamet2.png"
                alt="Logo Principal"
                width={350}
                height={100}
                className="object-cover block"
                priority
              />
              <h2 className="px-3 lg:text-2xl text-md font-bold lg:leading-[57px] text-blue-800 font-serif italic">
                Tu mejor aliado en la construcción.
              </h2>

              <p className="text-md px-4 text-slate-500">
                No tienes cuenta{" "}
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 font-bold hover:underline ml-1"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>

            <div className="max-w-md md:ml-auto w-full">
              <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
                Iniciar Sesión
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-slate-800 font-medium mb-2 block">
                    Correo
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                    placeholder="Ingrese su correo electrónico"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-800 font-medium mb-2 block">
                    Contraseña
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                    placeholder="Ingrese su contraseña"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-slate-500"
                    >
                      Recordar mi sesión
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Olvidé mi contraseña
                    </a>
                  </div>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-slate-300" />
                <p className="text-sm text-slate-800 text-center">or</p>
                <hr className="w-full border-slate-300" />
              </div>

              <div className="space-x-6 flex justify-center">
                {/* Social login buttons can be added here */}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
