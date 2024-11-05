import React from "react";
import Gps from "../icons/Gps";
import Telefono from "../icons/Telefono";
import Correo from "../icons/Correo";
import Nosotros from "../icons/Nosotros";
import Facebook from "../icons/Facebook";
import Twitter from "../icons/Twitter";
import Instagram from "../icons/Instagram";
import Contactos from "../icons/Contactos";
import Clientes from "../icons/Clientes";

const Footer = () => {
    return (
        <footer className="bg-[#815183] text-white py-4 mt-14">
            <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:justify-around">
               
                    <div>
                        <div className="flex items-center mb-2">
                            <img 
                                src="/src/assets/images/logo.jpg" 
                                alt="Logo"
                                className="w-7 mr-2" 
                            />
                            <p className="text-white text-xl font-medium">INFORMACIÓN</p>
                        </div>
                        <hr className="border-black my-4" />
                        <ol className="space-y-2">
                            <div className="flex items-center">
                                <Gps />
                                <li className="text-white ml-1">Av. San Borja Sur Nro. 818 Int. 701</li>
                            </div>
                            <div className="flex items-center">
                                <Correo />
                                <li className="text-white ml-1">laguna.jorge@gmail.com</li>
                            </div>
                            <div className="flex items-center"> 
                                <Telefono />
                                <li className="text-white ml-1">+51 960-199-862</li>
                            </div> 
                        </ol>
                    </div>

    
                    <div>
                
                        <p className="text-white text-xl font-medium">ACERCA DE</p>
                        <hr className="border-black my-4" /> 
                        <ol className="space-y-2">
                            <div className="flex items-center"> 
                                <Nosotros />
                                <li className="text-white ml-1">Nosotros</li>
                            </div> 
                            <div className="flex items-center"> 
                                <Contactos />
                                <li className="text-white ml-1">Contactos</li>
                            </div> 
                            <div className="flex items-center"> 
                                <Clientes />
                                <li className="text-white ml-1">Clientes</li>
                            </div> 

                        </ol>
                    </div>     

                 
                    <div> 
                        <p className="text-xl font-medium text-white">REDES SOCIALES</p>
                        <hr className="border-black my-4" />
                        <ol className="space-y-2">
                            <div className="flex items-center"> 
                                <Facebook />
                                <li className="text-white ml-1">Facebook</li>
                            </div> 
                            <div className="flex items-center"> 
                                <Twitter />
                                <li className="text-white ml-1">Twitter</li>
                            </div>
                            <div className="flex items-center"> 
                                <Instagram />
                                <li className="text-white ml-1">Instagram</li>
                            </div>
                        </ol>
                    </div>
                </div>

                <hr className="border-black my-4" />
                
           
                <div className="text-center">
                    <p className="text-sm text-white">&copy; 2024 Compusave. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
