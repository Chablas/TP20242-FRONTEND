import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';

export default function StoreServiciosOverview() {
    const { id } = useParams();
    const [producto, setServicio] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        const obtenerDatos = async () => {
            try {
                
                const response = await fetch("https://compusave-backend.onrender.com/get/servicios");
                const datos = await response.json();
                
                const servicio = datos.find(item => item.id === parseInt(id));

                setServicio(servicio);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();
    }, [id]);

    if (!producto) {
        return <div>Esperando datos para el servicio con ID: {id}...</div>;
    }

    // Función para generar estrellas de reseña
    const renderEstrellas = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg key={index} className={`h-5 w-5 flex-shrink-0 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
        ));
    };

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <Link to="#" className="mr-2 text-sm font-medium text-gray-900">Productos</Link>
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <a href="/servicios" className="mr-2 text-sm font-medium text-gray-900">Servicios</a>
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{producto.nombre} - S/.{producto.precio}</a>
                        </li>
                    </ol>
                </nav>

                {/* Imagenes del servicio */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${producto.imagen}`} alt={producto.nombre} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${producto.imagen}`} alt={producto.nombre} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${producto.imagen}`} alt={producto.nombre} className="h-full w-full object-cover object-center" />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${producto.imagen}`} alt={producto.nombre} className="h-full w-full object-cover object-center" />
                    </div>
                </div>

                {/* Información del servicio */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{producto.nombre}</h1>
                    </div>
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <p className="text-3xl tracking-tight text-gray-900">S/.{producto.precio}</p>

                        {/* Reseñas */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reseñas</h3>
                            <div className="flex items-center">
                                {renderEstrellas(4)} {/* Cambiar el número por la calificación dinámica */}
                                <p className="sr-only">4 de 5 estrellas</p>
                                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reseñas</a>
                            </div>
                        </div>

                        {/* Botón Añadir al carrito */}
                        <form className="mt-10">
                            <button type="submit" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Añadir al carrito
                            </button>
                        </form>
                    </div>

                    {/* Descripción y detalles */}
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div>
                            <h3 className="sr-only">Descripción</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{producto.informacion_general}</p>
                                <div className="mt-4">
                                    <p className="text-base text-gray-900">Garantia: {producto.garantia}</p>
                                </div>
                            </div>
                        </div>

                        {/* Consultas */}
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Para consultas o preguntas específicas</h2>
                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">Cualquier consulta relacionada con el servicio, puede realizarla al siguiente número: 942232391 <span className="font-semibold">{producto.contacto}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}