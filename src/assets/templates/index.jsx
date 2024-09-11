/* Cosas de React */
import React from "react"
import ReactDOM from "react-dom"

/* Imágenes */
import imagen1 from "../images/inicio/headphone.jpg"
import imagen2 from "../images/inicio/laptop.jpg"
import imagen3 from "../images/inicio/monitor.jfif"
import imagen4 from "../images/inicio/tarjeta_grafica.jpg"
import imagen5 from "../images/inicio/teclado.jfif"
import imagen6 from "../images/inicio/cpu.png"
import imagen7 from "../images/inicio/ram.jpg"

/* Componentes */
import BarraLateral_CarritoCompras from "../components/BarraLateral_CarritoCompras.jsx"

function Index() {
    return (
        <div>
            

            {/* (INICIO) COMPONENTE TAILWIND CSS PROMO SECTIONS / WITH IMAGE TILES */}
            <div class="relative overflow-hidden bg-white">
                <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div class="sm:max-w-lg">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Las rebajas de otoño ya
                                están aquí</h1>
                            <p class="mt-4 text-xl text-gray-500">Este año, nuestra nueva colección de cómputo te
                                brindará los mejores elementos
                                tecnológicos del mundo de ahora.
                            </p>
                        </div>
                        <div>
                            <div class="mt-10">
                                {/* Decorative image grid */}
                                <div aria-hidden="true"
                                    class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                                    <div
                                        class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div class="flex items-center space-x-6 lg:space-x-8">
                                            <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img src={imagen1}
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen2} alt=""
                                                        class="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen3}
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen4}
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen5}
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen6}
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen7} alt=""
                                                        class="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="{% url 'Categorías de los Productos' %}"
                                    class="inline-block rounded-md border border-transparent bg-purple-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">Mirar
                                    Colección</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS PROMO SECTIONS / WITH IMAGE TILES */}

            {/* (INICIO) COMPONENTE TAILWIND CSS SHOPPING CARTS / SLIDE-OVER */}
            <BarraLateral_CarritoCompras />
            {/* (FIN) COMPONENTE TAILWIND CSS SHOPPING CARTS / SLIDE-OVER */}

            

        </div>
    )
}
ReactDOM.render(<Index />, document.getElementById("root"));