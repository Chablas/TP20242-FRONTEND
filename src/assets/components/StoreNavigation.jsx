
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import { UserContext } from "../context/UserContext";

export default function StoreNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [token, setToken] = useContext(UserContext);

    const manejarCerrarSesion = () => {
        setToken(null);
    }

    const handleOpenCart = () => {
        const slideOver = document.getElementById('slide-over');
        slideOver.classList.remove('hidden');
        slideOver.classList.add('block');
    };

    return (
        <>
            <div className="bg-white">
                <header className="relative bg-white">
                    <p className="flex bg-[#815183] h-10 items-center justify-center bg-purple-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        Obtenga delivery gratis en compras mayores a 100 soles
                    </p>

                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                >
                                    <span className="sr-only">Abrir menú</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>

                                <div className="ml-4 flex lg:ml-0">
                                    <Link to="/">
                                        <span className="sr-only">Your Company</span>
                                        <img className="h-8 w-auto" src={logo} alt="Logo" />
                                    </Link>
                                </div>

                                {/* Mobile menu */}
                                <div className={`fixed top-0 left-0 right-0 p-2 transition transform origin-top-right ${mobileMenuOpen ? 'block z-50' : 'hidden'} lg:hidden`}>
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                        <div className="px-5 pt-4 pb-6">
                                            <div className="flex items-center justify-between">
                                                <Link to="/">
                                                    <img className="h-8 w-auto" src={logo} alt="Logo" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
                                                >
                                                    <span className="sr-only">Cerrar menú</span>
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="mt-6">
                                                <nav className="grid gap-y-8 ">
                                                    <Link to="/categorias" className="text-gray-900  hover:text-purple-500 p-2 rounded-md text-base font-medium">Productos</Link>
                                                    <Link to="#" className="text-gray-900 hover:text-purple-500 p-2 rounded-md text-base font-medium">Servicios</Link>
                                                    <Link to="/nosotros" className="text-gray-900 hover:text-purple-500 p-2 rounded-md text-base font-medium">Empresa</Link>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        <Link to="/categorias" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Productos</Link>
                                        <Link to="/servicios" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Servicios</Link>
                                        <Link to="/Contactenos" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Contactenos</Link>
                                        <a href="/nosotros" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Empresa</a>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center">
                                    {!token && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        
                                        <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Iniciar Sesión</Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                                        <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">Crear cuenta</Link>
                                    </div>}

                                    {token && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <button onClick={manejarCerrarSesion} className="text-sm font-medium text-gray-700 hover:text-gray-800">Cerrar Sesión</button>
                                    </div>}
                                    

                                    <div className="flex lg:ml-6">
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Buscar</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <a id="open-button" onClick={handleOpenCart} className="group -m-2 flex items-center p-2">
                                            <svg className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">2</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}
