"use client";
import React, { useRef } from "react";
import emailjs from 'emailjs-com';
import Footer from "../components/Footer.jsx";

export default function Contactenos() {
  const refForm = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const serviceId = "service_vm9d5nw";
    const tempateId = "template_1i2h1vo";
    const apikey = "1EFHl-ZHJbDH2Ve3i"; //POST
    emailjs
      .sendForm(serviceId, tempateId, refForm.current, apikey) //recibe los datos
      .then((result) => {
        console.log(result.text); //si recibe muestra el texto
        refForm.current.reset(); // Limpiar los campos después de un envío exitoso
      })
      .catch((error) => console.error(error)); //sino recibe muestra el error en la consola
  };

  return (
    <div className="bg-white w-screen">
      {/* Sección de encabezado */}
      <div className="bg-purple-600  h-[300px] flex flex-col items-center 2xl:flex-row">
        <div className="relative px-10 md:px-16 lg:px-44 mt-24 md:mt-16 lg:mt-24 ml-4 md:ml-16 lg:ml-36">
          <h1 className="text-[45px] md:text-[40px] lg:text-[58px] font-extrabold text-contactenos">
            Contáctenos
          </h1>
          <div className="absolute -botto m-4 left-1/2 transform -translate-x-1/2 w-1/3 h-[1.5px] bg-black"></div>
        </div>
      </div>

      {/* Sección de formulario */}
      <section>
        <div className="py-8 lg:py-16 px-4">
          <h2 className="mb-4 text-2xl md:text-3xl lg:text-5xl tracking-tight text-center text-obten-info font-bold">
            Obtén información
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-black text-base md:text-lg lg:text-2xl">
            Puedes obtener información personal y cotización sobre nuestros
            productos al por mayor o menor<br /> directamente con nosotros, escríbenos y un asesor se
            comunicará contigo lo antes posible.
          </p>
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            action=""
            onSubmit={handleSubmit}
            ref={refForm}
          >
            {/* Información de contacto */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="16"
                    fill="purple"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  <h2 className="ml-2 text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900">
                    Dirección
                  </h2>
                </div>
                <p className="text-gray-900 text-sm md:text-base">
                  Lima, Cercado de Lima <br />
                  Ricardo Rivera Navarrete 530
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="16"
                    fill="purple"
                    className="bi bi-telephone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                    />
                  </svg>
                  <h2 className="ml-2 text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900">
                    Teléfono
                  </h2>
                </div>
                <p className="text-gray-900 text-sm md:text-base">
                  Mobile: +(51) 915396195
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="16"
                    fill="purple"
                    className="bi bi-clock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  </svg>
                  <h2 className="ml-2 text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900">
                    Horario laboral
                  </h2>
                </div>
                <p className="text-gray-900 text-sm md:text-base">
                  Lunes-Sabado: 9:00 - 22:00
                </p>
              </div>
            </div>
            {/* Formulario */}
            <div className="flex flex-col">
              <div className="w-full">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="block p-2 lg:w-4/6 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Abc"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="block p-2 lg:w-4/6 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Abc@def.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    className="block p-2 lg:w-4/6 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Opcional"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    rows="8"
                    className="block p-2.5 lg:w-4/6 w-full text-sm text-gray-900 bg-gray-50 rounded-3xl border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Hola estoy interesado en..."
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="transition ease-in-out delay-150 bg-btn-enviar hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 duration-300 py-2 px-5 text-black bg-purple-400 font-semibold rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-75"
                  >
                    Enviar
                  </button>
                </div>
                <div className="mt-4 text-center text-lg font-semibold"></div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
