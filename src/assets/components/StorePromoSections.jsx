
/* Cosas de React */
import React from "react"
import { Link } from "react-router-dom"

/* Imágenes */
import imagen1 from "../images/inicio/headphone.jpg"
import imagen2 from "../images/inicio/laptop.jpg"
import imagen3 from "../images/inicio/monitor.jfif"
import imagen4 from "../images/inicio/tarjeta_grafica.jpg"
import imagen5 from "../images/inicio/teclado.jfif"
import imagen6 from "../images/inicio/cpu.png"
import imagen7 from "../images/inicio/ram.jpg"

export default function PromoSections() {
    return (
        <>
            {/* (INICIO) COMPONENTE TAILWIND CSS PROMO SECTIONS / WITH IMAGE TILES */}
            <div className="relative overflow-hidden bg-white" >
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Las rebajas de otoño ya
                                están aquí</h1>
                            <p className="mt-4 text-xl text-gray-500">Este año, nuestra nueva colección de cómputo te
                                brindará los mejores elementos
                                tecnológicos del mundo de ahora.
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                                    <div
                                        className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img src={imagen1}
                                                        alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen2} alt=""
                                                        className="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen3}
                                                        alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen4}
                                                        alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen5}
                                                        alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen6}
                                                        alt="" className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src={imagen7} alt=""
                                                        className="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
<div >
    <a className="group relative inline-flex border border-purple-500 focus:outline-none w-full sm:w-auto" href="/categorias">
        <span className=" w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-purple-500 ring-1 ring-purple-500 ring-offset-1 ring-offset-purple-500  transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
        Mira colección
    </span>
    </a>

</div>
                           
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* (FIN) COMPONENTE TAILWIND CSS PROMO SECTIONS / WITH IMAGE TILES */}
        </>
    )
}