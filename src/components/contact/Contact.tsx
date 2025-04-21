"use client";
import { useState } from "react";

export default function Contacto() {
  const [estado, setEstado] = useState("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir redirección
    setEstado("loading");

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch(
      "https://formsubmit.co/gusstavocta@gmail.com",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      setEstado("enviado");
      (e.target as HTMLFormElement).reset(); // Limpia el formulario
    } else {
      setEstado("error");
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <iframe
          width="100%"
          height="100%"
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2708027737867!2d-77.87622642428845!3d-6.227983644877443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6ab302a2a09a7%3A0x71faab90638d4838!2sGrupo%20Famet!5e0!3m2!1ses-419!2spe!4v1744608997431!5m2!1ses-419!2spe"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>

      <div className="container px-5 py-24 mx-auto flex">
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
        >
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Contáctanos
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Para mayor información puedes contactarnos a través de este
            formulario
          </p>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Correo
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>

          <input type="hidden" name="_captcha" value="false" />

          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {estado === "loading" ? "Enviando..." : "Enviar"}
          </button>

          {estado === "enviado" && (
            <p className="text-green-600 mt-3">¡Mensaje enviado con éxito!</p>
          )}
          {estado === "error" && (
            <p className="text-red-600 mt-3">
              Error al enviar. Intenta nuevamente.
            </p>
          )}

          <p className="text-xs text-gray-500 mt-3">
            *No olvides incluir tu correo para poder responderte.
          </p>
        </form>
      </div>
    </section>
  );
}
