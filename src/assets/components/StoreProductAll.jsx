import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function StoreProductAll() {
    const { categoriaid } = useParams();
    const [ mostrar, setMostrar ] = useState("");

    useEffect(() => {
        if (!categoriaid) {
            return;
        }

        const obtenerDatos = async () => {
            try {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const request = new Request("https://compusave-backend.onrender.com/get/bienes", {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const datos = await response.json();
                const datos2 = datos.filter((x) => x.estado === true)
                const bienes = datos2.filter((x) => {
                    if (x.categoria_id == parseInt(categoriaid)) {
                        return true;
                    }
                    return false;
                });

                const datosAMostrar = bienes.map((x) => {
                    return <StoreProductoPreviewComponent key={x.id} {...x} />
                });

                setMostrar(datosAMostrar);

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();
    }, []);

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Productos</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {mostrar}
                    </div>
                </div>
            </div>
        </>
    )
}

function StoreProductoPreviewComponent(props) {
    return (
        <Link to={`/producto/overview/${props.id}`} className="group">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${props.imagen}`}
                    alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                    className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{props.nombre}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">S/{props.precio}</p>
        </Link>
    )
}