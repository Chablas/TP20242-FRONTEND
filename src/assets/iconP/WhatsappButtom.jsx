import React, { useState, useEffect } from "react";
import Whatsapp from "../icons/Whatsapp";



const WhatsAppButton = () => {
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSpanClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const message =
    "¡Hola! Estoy interesado en obtener más información sobre los productos.";

  return (
    <div className="relative">
      <a
        href={`https://wa.me/960199862?text=${encodeURIComponent(
          message
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 z-10 right-4 md:bottom-6 md:right-6 lg:bottom-1 lg:right-10 text-white p-3 md:p-4 lg:p-5 rounded-full flex items-center transition-transform transform hover:scale-110"
      >
        <span
          className={`flex items-center font-semibold bg-white text-[#80D697] text-sm xl:p-3 p-1 rounded-full shadow-lg transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleSpanClick}
          style={{ cursor: "default" }}
        >
          <p className="mr-1">Comunicate</p>
          <p className="mr-1">con</p>
          <p className="mr-1">un</p>
          <p className="mr-1">asesor</p>
        </span>
     <Whatsapp/>
      </a>
    </div>
  );
};

export default WhatsAppButton;
