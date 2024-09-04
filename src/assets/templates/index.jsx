import React from "react"
import ReactDOM from "react-dom"
function Index() {
    return (
        <div>
            {/* (INICIO) COMPONENTE TAILWIND CSS STORE NAVIGATION / WITH FEATURED CATEGORIES (EDITADO) */}
            <div class="bg-white">

                <header class="relative bg-white">
                    <p
                        class="flex h-10 items-center justify-center bg-purple-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        Obtenga delivery gratis en compras mayores a 100 soles</p>

                    <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="border-b border-gray-200">
                            <div class="flex h-16 items-center">
                                {/* Mobile menu toggle, controls the 'mobileMenuOpen' state. */}
                                <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                                    <span class="absolute -inset-0.5"></span>
                                    <span class="sr-only">Open menu</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>

                                {/* Logo */}
                                <div class="ml-4 flex lg:ml-0">
                                    <a href="{% url 'inicio' %}">
                                        <span class="sr-only">Your Company</span>
                                        <img class="h-8 w-auto" src="{% static 'images/logo.jpg' %}" alt="" />
                                    </a>
                                </div>

                                {/* Flyout menus */}
                                <div class="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div class="flex h-full space-x-8">
                                        <a href="{% url 'Categorías de los Productos' %}"
                                            class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Productos</a>
                                        <a href="#"
                                            class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Servicios</a>
                                        <a href="#"
                                            class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Empresa</a>
                                    </div>
                                </div>

                                <div class="ml-auto flex items-center">
                                    <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <a href="{% url 'iniciar_sesion' %}"
                                            class="text-sm font-medium text-gray-700 hover:text-gray-800">Iniciar
                                            Sesión</a>
                                        <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                                        <a href="{% url 'registrar_usuario' %}"
                                            class="text-sm font-medium text-gray-700 hover:text-gray-800">Crear
                                            cuenta</a>
                                    </div>

                                    <div class="hidden lg:ml-8 lg:flex">
                                        <a href="#" class="flex items-center text-gray-700 hover:text-gray-800">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg"
                                                alt="" class="block h-auto w-5 flex-shrink-0" />
                                                <span class="ml-3 block text-sm font-medium">PEN</span>
                                                <span class="sr-only">, change currency</span>
                                        </a>
                                    </div>

                                    {/* Search */}
                                    <div class="flex lg:ml-6">
                                        <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                                            <span class="sr-only">Search</span>
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </a>
                                    </div>

                                    {/* Cart */}
                                    <div class="ml-4 flow-root lg:ml-6">
                                        <a id="open-button" class="group -m-2 flex items-center p-2">
                                            <svg class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <span
                                                class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">2</span>
                                            <span class="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS STORE NAVIGATION / WITH FEATURED CATEGORIES (EDITADO) */}

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
                                                    <img src="{% static 'images/inicio/headphone.jpg' %}"
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="{% static 'images/inicio/laptop.jpg' %}" alt=""
                                                        class="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="{% static 'images/inicio/monitor.jfif' %}"
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="{% static 'images/inicio/tarjeta_grafica.jpg' %}"
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="{% static 'images/inicio/teclado.jfif' %}"
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                            </div>
                                            <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="{% static 'images/inicio/cpu.png' %}"
                                                        alt="" class="h-full w-full object-cover object-center" />
                                                </div>
                                                <div class="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img src="{% static 'images/inicio/ram.jpg' %}" alt=""
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
            <div id="slide-over" class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                {/*
                Background backdrop, show/hide based on slide-over state.

                Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
        */}
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            {/*
                            Slide-over panel, show/hide based on slide-over state.

                            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                            From: "translate-x-full"
                            To: "translate-x-0"
                            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                            From: "translate-x-0"
                            To: "translate-x-full"
              */}
                            <div class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Carrito de
                                                compra
                                            </h2>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button id="close-button" type="button"
                                                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                    <span class="absolute -inset-0.5"></span>
                                                    <span class="sr-only">Close panel</span>
                                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="mt-8">
                                            <div class="flow-root">
                                                <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                    <li class="flex py-6">
                                                        <div
                                                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src="{% static 'images/productos/1/12.jpg' %}"
                                                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                                class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="{% url 'Detalles Generales de un Producto' %}">Teclado Gamer Xtrike Me Kb-306 Sp Rgb Backlit</a>
                                                                    </h3>
                                                                    <p class="ml-4">S/69.90</p>
                                                                </div>
                                                                <p class="mt-1 text-sm text-gray-500">Teclados</p>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Cantidad: 1</p>

                                                                <div class="flex">
                                                                    <button type="button"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">Quitar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li class="flex py-6">
                                                        <div
                                                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src="{% static 'images/productos/2/21.jpg' %}"
                                                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                                class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">Teclado Gamer Xtrike Me Kb-280 Sp Rgb Backlit</a>
                                                                    </h3>
                                                                    <p class="ml-4">S/59.90</p>
                                                                </div>
                                                                <p class="mt-1 text-sm text-gray-500">Teclados</p>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Cantidad: 1</p>

                                                                <div class="flex">
                                                                    <button type="button"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">Quitar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    {/* More products... */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>S/262.00</p>
                                        </div>
                                        <p class="mt-0.5 text-sm text-gray-500">Envío e IGV calculados en Checkout.</p>
                                        <div class="mt-6">
                                            <a href="#"
                                                class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                                        </div>
                                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                o
                                                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Continua Comprando
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS SHOPPING CARTS / SLIDE-OVER */}

            

        </div>
    )
}
createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Index />
    </StrictMode>,
  )
  