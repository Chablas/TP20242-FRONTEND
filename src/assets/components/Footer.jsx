import React from "react";
import Gps from "../icons/Gps";
import Telefono from "../icons/Telefono";
import Correo from "../icons/Correo";

const Footer = () => {
    return (
        <footer className="bg-gray-50 text-white py-4 mt-14">
            <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:justify-around">
               
                    <div>
                        <div className="flex items-center mb-2">
                            <img 
                                src="/src/assets/images/logo.jpg" 
                                alt="Logo"
                                className="w-7 mr-2" 
                            />
                            <p className="text-black text-xl font-medium">INFORMACIÓN</p>
                        </div>
                        <hr className="border-black my-4" />
                        <ol className="space-y-2">
                            <div className="flex items-center">
                                <Gps />
                                <li className="text-black ml-1">Av. San Borja Sur Nro. 818 Int. 701</li>
                            </div>
                            <div className="flex items-center">
                                <Correo />
                                <li className="text-black ml-1">laguna.jorge@gmail.com</li>
                            </div>
                            <div className="flex items-center"> 
                                <Telefono />
                                <li className="text-black ml-1">+51 960-199-862</li>
                            </div> 
                        </ol>
                    </div>

    
                    <div>
                        <p className="text-black text-xl font-medium">ACERCA DE</p>
                        <hr className="border-black my-4" /> 
                        <ol className="space-y-2">
                            <li className="text-black">Nosotros</li>
                            <li className="text-black">Contactos</li>
                            <li className="text-black">Clientes</li>
                        </ol>
                    </div>     

                 
                    <div> 
                        <p className="text-xl font-medium text-black">REDES SOCIALES</p>
                        <hr className="border-black my-4" />
                        <ol className="space-y-2">
                            <li className="text-black">Facebook</li>
                            <li className="text-black">Twitter</li>
                            <li className="text-black">Instagram</li>
                        </ol>
                    </div>
                </div>

                <hr className="border-black my-4" />
                
           
                <div className="text-center">
                    <p className="text-sm text-black">&copy; 2024 Compusave. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
