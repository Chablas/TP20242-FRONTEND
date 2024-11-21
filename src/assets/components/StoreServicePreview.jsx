import React, { useEffect, useState } from 'react'; 
import { Link } from "react-router-dom";

export default function ServicePreviews() {
    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const request = new Request("https://compusave-backend.onrender.com/get/servicios", {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const datos = await response.json();

                // Filtrar los servicios cuyo estado es `true`
                const servicios = datos
                    .filter((x) => x.estado === true)
                    .map((x) => <StoreServicePreviewComponent key={x.id} {...x} />);

                setMostrar(servicios);
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
                        <h2 className="text-2xl font-bold text-gray-900">Servicios</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {mostrar}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StoreServicePreviewComponent(props) {
    return (
        <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img src={`https://compusave-backend.onrender.com${props.imagen}`} alt={props.nombre} className="h-full w-full object-cover object-center" />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
                <Link to={`/StoreServiciosOverview/${props.id}`}>
                    <span className="absolute inset-0"></span>
                    {props.nombre}
                </Link>
            </h3>
            <p className="text-base font-semibold text-gray-900">{props.informacion_general}</p>
            <p className="text-base font-semibold text-gray-900">S/.{props.precio}</p>
        </div>
    );
}