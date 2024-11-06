import { Link } from "react-router-dom"
import imagen1 from "../images/productos/1/13.jpg"
import imagen2 from "../images/productos/1/12.jpg"
import imagen3 from "../images/productos/1/11.jpg"
import imagen4 from "../images/productos/1/14.jpg"
import DashboardServicios from "./DashboardServicios"

export default function StoreServiciosOverview() {
    return (
        <>
            {/* (INICIO) COMPONENTE TAILWIND CSS PRODUCT OVERVIEWS / WITH IMAGE GRID */}
            {/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/}
            <div class="bg-white">
                <div class="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div class="flex items-center">
                                    <Link to="/StoreServiciosOverview" class="mr-2 text-sm font-medium text-gray-900">Productos</Link>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                        class="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <a href="#" class="mr-2 text-sm font-medium text-gray-900">servicios</a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                        class="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li class="text-sm">
                                <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">instalacion de software y sistemas operativos s/.50

                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img src={imagen1}
                                alt="Two each of gray, white, and black shirts laying flat."
                                class="h-full w-full object-cover object-center" />
                        </div>
                        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img src={imagen2} alt="Model wearing plain black basic tee."
                                    class="h-full w-full object-cover object-center" />
                            </div>
                            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img src={imagen3} alt="Model wearing plain gray basic tee."
                                    class="h-full w-full object-cover object-center" />
                            </div>
                        </div>
                        <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img src={imagen4} alt="Model wearing plain white basic tee."
                                class="h-full w-full object-cover object-center" />
                        </div>
                    </div>

                    {/* Product info */}
                    <div
                        class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">instalacion de software y sistemas operativos s/.50</h1>
                        </div>

                        {/* Options */}
                        <div class="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 class="sr-only">Información de Producto</h2>
                            <p class="text-3xl tracking-tight text-gray-900">S/69.90</p>

                            {/* Reviews */}
                            <div class="mt-6">
                                <h3 class="sr-only">Reseñas</h3>
                                <div class="flex items-center">
                                    <div class="flex items-center">
                                        {/* Active: "text-gray-900", Default: "text-gray-200" */}
                                        <svg class="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <svg class="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <svg class="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <svg class="h-5 w-5 flex-shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <svg class="h-5 w-5 flex-shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <p class="sr-only">4 de 5 estrellas</p>
                                    <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117
                                        reseñas</a>
                                </div>
                            </div>

                            <form class="mt-10">
                                <button type="submit"
                                    class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Añadir
                                    al carrito</button>
                            </form>
                        </div>

                        <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 class="sr-only">Descripción</h3>

                                <div class="space-y-6">
                                    <p class="text-base text-gray-900">La instalación de software y sistemas operativos es el proceso de 
                                        configurar y preparar un dispositivo para que ejecute un sistema operativo o programa específico.
                                         Incluye la creación de particiones, la selección de configuraciones de hardware, y la instalación 
                                         de archivos necesarios. En el caso de sistemas operativos, se inicia desde un medio de instalación
                                          (como USB o CD) y se siguen instrucciones para copiar y configurar los archivos del sistema en el 
                                          dispositivo, garantizando que esté listo para su uso.</p>
                                </div>
                            </div>

                            
                            <div class="mt-10">
                                <h2 class="text-sm font-medium text-gray-900">Para consultas o preguntas especificas</h2>

                                <div class="mt-4 space-y-6">
                                    <p class="text-sm text-gray-600">Cualquier consulta relacionada consultar con el siguiente numero
                                        942232391
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS PRODUCT OVERVIEWS / WITH IMAGE GRID */}
        </>
    )
}