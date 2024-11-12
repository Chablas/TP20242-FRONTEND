import { Link } from "react-router-dom"

import imagen1 from "../images/productos/1/12.jpg"
import imagen2 from "../images/productos/2/21.jpg"
import imagen3 from "../images/productos/3/31.jpg"
import imagen4 from "../images/productos/4/41.jpg"
import imagen5 from "../images/productos/5/51.jpg"

export default function StoreProductAll() {
    return (
        <>
            {/* (INICIO) COMPONENTE TAILWIND CSS PRODUCT LISTS / SIMPLE */}
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
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Products</h2>

            <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <Link to="/producto/overview" class="group">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={imagen1}
                            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                            class="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">Teclado Gamer Xtrike Me Kb-306 Sp Rgb Backlit</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">S/69.90</p>
                </Link>
                <Link to="/producto/overview" class="group">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={imagen2}
                            alt="Olive drab green insulated bottle with flared screw lid and flat top."
                            class="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">Teclado Gamer Xtrike Me Kb-280 Sp Rgb Backlit</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">S/59.90</p>
                </Link>
                <Link to="/producto/overview" class="group">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={imagen3}
                            alt="Person using a pen to cross a task off a productivity paper card."
                            class="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">Teclado Gamer Mecanico Xtrike Me 104 Teclas</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">S/169.90</p>
                </Link>
                <Link to="/producto/overview" class="group">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={imagen4}
                            alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                            class="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">Logitech - teclado mouse mk345 inalambrico usb up negro</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">S/199</p>
                </Link>
                <Link to="/producto/overview" class="group">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={imagen5}
                            alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                            class="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h3 class="mt-4 text-sm text-gray-700">Teclado Bluetooth Logitech K380 Multidispositivo Rose</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">S/169.90</p>
                </Link>

                {/* More products... */}
            </div>
        </div>
    </div>
    {/* (FIN) COMPONENTE TAILWIND CSS PRODUCT LISTS / SIMPLE */}
        </>
    )
}