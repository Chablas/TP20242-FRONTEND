import { Link } from "react-router-dom"

export default function DashboardNav() {
    return (
        <header className="bg-[#212936] shadow-lg py-4 px-6">
            <div className="flex justify-between items-center ">
                <nav className="flex space-x-6">
                    <a className="text-gray-300 pt-3 text-center text-xs rounded-md font-light hover:text-[#9432e9]">logo.png</a>
                    <a href="#" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Dashboard</a>
                    <Link to="/dashboard/productos" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Productos</Link>
                    <Link to="/dashboard/categorias" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Categorías</Link>
                    <Link to="/dashboard/proveedores" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Proveedores</Link>
                    <Link to="/dashboard/servicios" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Servicios</Link>
                    <Link to="/dashboard/almacen" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Almacenes</Link>

                    <Link to="/dashboard/usuarios" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Usuarios</Link>
                    <a href="#" className="text-gray-300 p-2 rounded-md hover:text-white hover:bg-[#111727] font-semibold">Otros</a>
                </nav>

                <div className="flex items-center space-x-4">
                    <button className="relative">
                        <svg className="w-6 h-6 text-gray-300 hover:text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.054-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                            </path>
                        </svg>
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
                    </button>
                    <button>
                        <svg className="w-6 h-6 text-gray-300 hover:text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5.121 17.804A4 4 0 017 16h10a4 4 0 011.879.804M15 7a3 3 0 11-6 0 3 3 0 016 0zm4 10a7 7 0 10-14 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}