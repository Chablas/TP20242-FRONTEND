import React from 'react';
import Footer from "../components/Footer.jsx";
function StoreCompany() {
  // Componente QuienesSomos
  const QuienesSomos = () => (
    <div className="relative p-4">
      <div className="relative bg-gradient-to-r from-purple-900 to-purple-500 text-white text-center py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-60 h-60 bg-purple-300 rounded-full opacity-50"></div>
        </div>
        <h2 className="text-3xl font-bold relative z-10">¿Quiénes somos?</h2>
      </div>
      <div className="text-center mt-8">
      <div className="flex justify-center items-center space-x-2 mb-0.5">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9432E9' }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5A6C84' }}></div>
      </div>
        <h3 className="text-3xl font-bold">Somos CompuSave</h3>
        <p className="mt-4 text-lg text-gray-700 text-left">
        Fundada el 11 de abril de 2017, <span className="font-bold text-shadow">Compusave</span> se ha consolidado como un referente en el sector de la tecnología, dedicándose a la venta de equipos informáticos y electrónicos de alta calidad. Nuestro compromiso es ofrecer a nuestros clientes no solo productos innovadores, sino también un servicio excepcional que incluye cotizaciones personalizadas y reparaciones básicas de equipos.
        </p>
        <p className="mt-4 text-lg text-gray-700 text-left">
        En Compusave, entendemos la importancia de la tecnología en la vida diaria y empresarial, por lo que nos esforzamos por proporcionar soluciones que se adapten a las necesidades específicas de cada cliente. Nuestro equipo de expertos está siempre dispuesto a asesorar y brindar el soporte necesario para garantizar la satisfacción total.
        </p>
      </div>
    </div>
  );
  // Componente VisionyMision
  const VisionyMision = () => (
    <div className="text-center p-8 space-y-8">
      
      <div className="rounded-lg border border-gray-300 shadow-lg bg-gray-100 flex flex-col md:flex-row items-center text-left">
      <div className="w-full md:w-1/2">
        <img src="https://sociallmx.com/wp-content/uploads/2022/08/trabajo-en-equipo.jpg" alt="gem" className="w-full h-full object-cover rounded-l-lg shadow-lg border border-gray-300" />
      </div>
      <div className="w-full md:w-1/2 md:pl-6">
        <h3 className="font-bold text-xl sm:text-2xl">Visión</h3>
        <p className="sm:text-lg mt-4">
        Ser la empresa líder en la venta de equipos informáticos y electrónicos en nuestra región, reconocida por nuestra excelencia en servicio al cliente y nuestra capacidad para adaptarnos a las últimas tendencias del mercado. Aspiramos a empoderar a nuestros clientes a través de la tecnología, facilitando su crecimiento y desarrollo personal y profesional.
        </p>
      </div>
    </div>
  
      <div className="rounded-lg border border-gray-300 shadow-lg bg-gray-100 flex flex-col md:flex-row-reverse items-center md:space-x-6 text-left">
        <div className="w-full md:w-1/2">
          <img src="https://pymstatic.com/74810/conversions/tecnicas-generacion-ideas-wide_webp.webp" alt="project members" className="w-full h-full object-cover rounded-l-lg shadow-lg border border-gray-300" />
        </div>
        <div className="w-full md:w-1/2 md:pl-6">
          <h3 className="font-bold text-xl sm:text-2xl">Misión</h3>
          <p className="sm:text-lg mt-4">
          Proporcionar soluciones tecnológicas accesibles y de alta calidad que satisfagan las necesidades de nuestros clientes, ofreciendo productos informáticos y electrónicos confiables, junto con un servicio excepcional de cotización y reparación. Nos comprometemos a ser un socio confiable en el camino hacia la innovación y la eficiencia tecnológica.
          </p>
        </div>
      </div>
      
    </div>
  );
  


 

  // Componente ClientesSatisfechos
  const clientes = [
    {
      nombre: "Jairo López",
      comentario: "¡Excelente atención al cliente! Compré un equipo nuevo y el proceso fue muy fácil. Además, la reparación de mi laptop fue rápida y efectiva. ¡Recomiendo Compusave al 100%!",
    },
    {
      nombre: "Javier Martínez",
      comentario: "Compusave tiene una gran variedad de productos y precios competitivos. La cotización fue clara y el personal muy amable. Estoy muy satisfecho con mi compra.",
    },
    {
      nombre: "Camila Rodríguez",
      comentario: "Tuve una experiencia increíble en Compusave. Me ayudaron a elegir el equipo perfecto para mis necesidades y el servicio de reparación es de primera. ¡Gracias, Compusave!",
    },
    {
      nombre: "Diego Hernández",
      comentario: "Soy cliente habitual y nunca he tenido un problema. La calidad de los productos y el soporte técnico son excepcionales. Siempre vuelvo a Compusave cuando necesito algo nuevo.",
    },
  ];
  
  const ClientesSatisfechos = () => (
    <section className="my-8 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex flex-col items-center mx-auto mb-8 md:p-10 md:px-12">
      <div className="flex justify-center items-center space-x-2 mb-0.5">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9432E9' }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5A6C84' }}></div>
      </div>
        <h1 className="p-4 text-4xl font-bold leading-none text-center">Nuestro clientes nos recomiendan</h1>
      </div>
      <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
        {clientes.map((cliente, index) => (
          <div key={index} className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-50">
              <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-violet-600">
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                {cliente.comentario}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-violet-600">
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
              <img src={`https://i.pravatar.cc/100?img=${index + 3}`} alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 dark:bg-gray-300" />
              <p className="text-xl font-semibold leading-tight">{cliente.nombre}</p>
              <p className="text-sm uppercase">Cliente Satisfecho</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Nuestra Empresa</h1>
      <QuienesSomos />
      <VisionyMision />
      <ClientesSatisfechos />
      <Footer/>
    </div>
  );
}

export default StoreCompany;
