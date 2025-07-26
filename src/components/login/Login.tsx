"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loginUser } from "@/helpers/user.helpers";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserLoginErrorProps, UserLoginProps } from "@/types/user";
import { userValidateLogin } from "@/utils/userLoginValidation";
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<UserLoginProps>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<UserLoginErrorProps>({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidField = (field: keyof UserLoginErrorProps) => {
    return submitted && error[field] === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (submitted) {
      setError(userValidateLogin(updatedData));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = userValidateLogin(formData);
    setError(validationErrors);

    const hasErrors = Object.values(validationErrors).some((msg) => msg !== "");
    if (hasErrors) {
      toast.error("Revisa los campos del formulario.", { theme: "colored" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(formData.email, formData.password);
      if (response?.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.token,
            username: response.username,
            roles: response.roles,
            photoUrl: response.photoUrl,
          })
        );

        toast.success(`Bienvenido, ${response.username}`, { theme: "colored" });
        router.push("/dashboard/main");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al autenticarte. Intenta nuevamente.", {
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
            <div className="space-y-2">
              {/* <Image
                src="/images/LogoFamet2.png"
                alt="Logo Principal"
                width={350}
                height={100}
                className="object-cover block"
                priority
              /> */}
              {/* <h2 className="px-3 lg:text-2xl text-md font-bold lg:leading-[57px] text-blue-800 font-serif italic">
                Tu mejor aliado en la construcción.
              </h2> */}
              <h1>Gustavodev</h1>
            </div>

            <div className="max-w-md md:ml-auto w-full">
              <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
                Iniciar Sesión
              </h3>

              <div className="space-y-6">
                <div className="relative">
                  <label className="text-sm text-slate-800 font-medium mb-2 block">
                    Correo
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-100 w-full text-sm text-slate-800 pl-4 pr-10 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                      placeholder="Ingrese su correo electrónico"
                    />
                    <span className="absolute right-3 top-3.5 text-gray-400">
                      <IoIosMail size={20} />
                    </span>
                  </div>
                  {submitted && error.email && (
                    <p className="text-red-500 text-sm mt-1">{error.email}</p>
                  )}
                  {isValidField("email") && (
                    <p className="text-green-600 text-sm mt-1">Completado ✅</p>
                  )}
                </div>
                <div className="relative">
                  <label className="text-sm text-slate-800 font-medium mb-2 block">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-slate-100 w-full text-sm text-slate-800 pl-4 pr-10 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                      placeholder="Ingrese su contraseña"
                    />
                    <span
                      className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </span>
                  </div>
                  {submitted && error.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {error.password}
                    </p>
                  )}
                  {isValidField("password") && (
                    <p className="text-green-600 text-sm mt-1">Completado ✅</p>
                  )}
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={isLoading || !formData.email || !formData.password}
                  className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white ${
                    isLoading || !formData.email || !formData.password
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 focus:outline-none"
                  }`}
                >
                  {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </button>
              </div>

              <div className="space-x-6 flex justify-center">
                {/* Botones de login social aquí */}
              </div>
            </div>
          </div>
        </div>
      </form>

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
