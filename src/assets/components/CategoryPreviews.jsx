import React from "react"
import imagen1 from "../images/categorias/audifonos.jfif"
import imagen2 from "../images/categorias/laptops.jpg"
import imagen3 from "../images/categorias/teclados.jfif"

export default function CategoryPreviews() {
    return (
        <>
            {/* (INICIO) COMPONENTE TAILWIND CSS CATEGORY PREVIEWS / THREE-COLUMN */}
            {/*
            This example requires some changes to your config:

            ```
            // tailwind.config.js
            module.exports = {
                // ...
                plugins: [
            // ...
            require('@tailwindcss/aspect-ratio'),
            ],
  }
            ```
*/}
            <div class="bg-gray-100">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 class="text-2xl font-bold text-gray-900">Categorías</h2>

                        <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            <div class="group relative">
                                <div
                                    class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img src={imagen1}
                                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                        class="h-full w-full object-cover object-center" />
                                </div>
                                <h3 class="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span class="absolute inset-0"></span>
                                        Audífonos
                                    </a>
                                </h3>
                                <p class="text-base font-semibold text-gray-900">Bluetooth, Gaming, Wireless y más</p>
                            </div>
                            <div class="group relative">
                                <div
                                    class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img src={imagen2}
                                        alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                                        class="h-full w-full object-cover object-center" />
                                </div>
                                <h3 class="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span class="absolute inset-0"></span>
                                        Laptops
                                    </a>
                                </h3>
                                <p class="text-base font-semibold text-gray-900">Laptops i5, i7, Ryzen 7 y más</p>
                            </div>
                            <div class="group relative">
                                <div
                                    class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img src={imagen3}
                                        alt="Collection of four insulated travel bottles on wooden shelf."
                                        class="h-full w-full object-cover object-center" />
                                </div>
                                <h3 class="mt-6 text-sm text-gray-500">
                                    <a href="/productos/categorias/teclados">
                                        <span class="absolute inset-0"></span>
                                        Teclados
                                    </a>
                                </h3>
                                <p class="text-base font-semibold text-gray-900">Bluetooth, Gaming, Wireless y más</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS CATEGORY PREVIEWS / THREE-COLUMN */}
        </>
    )
}