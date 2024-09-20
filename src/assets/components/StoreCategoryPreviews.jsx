import React, { useEffect, useState } from 'react';
import imagen1 from "../images/categorias/audifonos.jfif";
import imagen2 from "../images/categorias/laptops.jpg";
import imagen3 from "../images/categorias/teclados.jfif";
import StoreCategoryPreviewComponent from './StoreCategoryPreviewComponent';

export default function CategoryPreviews() {
    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos

    useEffect(() => {
        const obtenerDatos = async () => {
            
            try {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const request = new Request("https://compusave-backend.onrender.com/get/categorias", {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const datos = await response.json();

                const categorias = datos.map((x) => {
                    return <StoreCategoryPreviewComponent key={x.id} {...x} />
                });

                setMostrar(categorias);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();

        
    }, []);

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
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {mostrar}
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* (FIN) COMPONENTE TAILWIND CSS CATEGORY PREVIEWS / THREE-COLUMN */}
        </>
    )
}