import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import imagen1 from "../images/categorias/audifonos.jfif";
import imagen2 from "../images/categorias/laptops.jpg";
import imagen3 from "../images/categorias/teclados.jfif";

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
        </>
    )
}

function StoreCategoryPreviewComponent(props) {
    return (
        
        <div className="group relative">
            <div
                className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img src={`https://compusave-backend.onrender.com${props.imagen}`}
                    alt={props.nombre}
                    className="h-full w-full object-cover object-center" />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
                <Link to={`/categorias/${props.id}`}>
                    <span className="absolute inset-0"></span>
                    {props.nombre}
                </Link>
            </h3>
            <p className="text-base font-semibold text-gray-900">{props.descripcion}</p>
        </div>
    )
}