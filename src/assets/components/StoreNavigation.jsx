/* Cosas de React */
import React from "react"
import { Link } from "react-router-dom"

/* Imágenes */
import logo from "../images/logo.jpg"

export default function StoreNavigation() {
    const handleOpenCart = () => {
        const slideOver = document.getElementById('slide-over');
        slideOver.classList.remove('hidden');
        slideOver.classList.add('block');
    };

    return (
        <>
            {/* (INICIO) COMPONENTE TAILWIND CSS STORE NAVIGATION / WITH FEATURED CATEGORIES (EDITADO) */}
            <div className="bg-white">

                <header className="relative bg-white">
                    <p
                        className="flex h-10 items-center justify-center bg-purple-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        Obtenga delivery gratis en compras mayores a 100 soles</p>

                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                {/* Mobile menu toggle, controls the 'mobileMenuOpen' state. */}
                                <button type="button" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Open menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                        stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <Link to="/">
                                        <span className="sr-only">Your Company</span>
                                        <img className="h-8 w-auto" src={logo} alt="" />
                                    </Link>
                                </div>

                                {/* Flyout menus */}
                                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        <Link to="/categorias"
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Productos</Link>
                                        <a href="#"
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Servicios</a>
                                        <a href="#"
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Empresa</a>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link to="/login"
                                            className="text-sm font-medium text-gray-700 hover:text-gray-800">Iniciar
                                            Sesión</Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                                        <Link to="/register"
                                            className="text-sm font-medium text-gray-700 hover:text-gray-800">Crear
                                            cuenta</Link>
                                    </div>

                                    <div className="hidden lg:ml-8 lg:flex">
                                        <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg"
                                                alt="" className="block h-auto w-5 flex-shrink-0" />
                                            <span className="ml-3 block text-sm font-medium">PEN</span>
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div>

                                    {/* Search */}
                                    <div className="flex lg:ml-6">
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </a>
                                    </div>

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <a id="open-button" onClick={handleOpenCart} className="group -m-2 flex items-center p-2">
                                            <svg className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <span
                                                className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">2</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS STORE NAVIGATION / WITH FEATURED CATEGORIES (EDITADO) */}
        </>
    )
}