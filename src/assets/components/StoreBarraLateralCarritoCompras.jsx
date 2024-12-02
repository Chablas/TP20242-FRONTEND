/* Cosas de React */
import React, { useEffect, useContext, useState } from "react"
import { UserContext } from "../context/UserContext";
import carritoVacioLogo from  "../images/carrito/carritoVacio.jpg"

export default function BarraLateralCarritoCompras() {
    const [token, setToken] = useContext(UserContext);
    const [mostrar, setMostrar] = useState([]);
    const [total, setTotal] = useState(null);

    const obtenerDatosCarrito = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + token);
            const request0 = new Request("https://compusave-backend.onrender.com/auth/validar_usuario/yo", {
                method: "GET",
                headers: headers,
            })
            const response0 = await fetch(request0);
            const datos0 = await response0.json();

            if (token) {
                const request = new Request(`https://compusave-backend.onrender.com/get/carritos_items/${datos0.id}`, {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const datos = await response.json();
    
                const request3 = new Request(`https://compusave-backend.onrender.com/get/carrito/total/${datos0.id}`, {
                    method: "GET",
                    headers: headers,
                });
                const response3 = await fetch(request3);
                const datos3 = await response3.json();
                setTotal(datos3.total);

                const request1 = new Request(`https://compusave-backend.onrender.com/get/bienes`, {
                    method: "GET",
                    headers: headers,
                });
                const response1 = await fetch(request1);
                const datos1 = await response1.json();
    
                const request2 = new Request(`https://compusave-backend.onrender.com/get/categorias`, {
                    method: "GET",
                    headers: headers,
                });
                const response2 = await fetch(request2);
                const datos2 = await response2.json();
    
                const filtradoDatos = datos1.filter((x)=>{
                    for (const producto of datos) {
                        if (producto.producto_id == x.producto_id) {
                            return true;
                        }
                    }
                })
    
                let infoCompleta = filtradoDatos.map((x)=>{
                    for (const dato of datos) {
                        if (dato.producto_id == x.producto_id) {
                            return {...x, cantidad: dato.cantidad};
                        }
                    }
                    
                })
    
                infoCompleta = infoCompleta.map((x)=>{
                    for (const dato of datos2) {
                        if (dato.id == x.categoria_id) {
                            return {...x, categoria: dato.nombre};
                        }
                    }
                })
                
                const mostrar = infoCompleta.map((x) => (
                    <CarritoItems
                        key={x.id}
                        {...x}
                        eliminarProducto={eliminarProducto}
                    />
                ))
                setMostrar(mostrar);
            }
        } catch (error) {
            console.error('Error al obtener los datos del carrito:', error);
        }
    };

    const handleCloseCart = () => {
        const slideOver = document.getElementById('slide-over');
        slideOver.classList.remove('block');
        slideOver.classList.add('hidden');
    };

    const eliminarProducto = async (productoId) => {
        try {
            if (!token) return;
    
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);
            
            const userResponse = await fetch("https://compusave-backend.onrender.com/auth/validar_usuario/yo", { headers });
            const userData = await userResponse.json();
            const userId = userData.id;
    
            const response = await fetch(
                `https://compusave-backend.onrender.com/put/carritos_items/quitar/${userId}`, // Endpoint para quitar producto
                {
                    method: "PUT",
                    headers: headers,
                    body: JSON.stringify({
                        producto_id: productoId,
                        cantidad: 1, // Producto a eliminar
                    }),
                }
            );
    
            if (response.ok) {
                console.log("Producto eliminado correctamente.");
                await obtenerDatosCarrito(); // Actualiza el carrito para reflejar el cambio
            } else {
                console.error("Error al eliminar producto:", response.statusText);
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    useEffect(() => {
        // El carrito debe estar cerrado al cargar
        const slideOver = document.getElementById('slide-over');
        if (slideOver) {
            slideOver.classList.add('hidden');
        }
        obtenerDatosCarrito();
    }, [token]);
    return (
        <>
            {/* (INICIO) COMPONENTE TAILWIND CSS SHOPPING CARTS / SLIDE-OVER */}
            <div id="slide-over" className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrito de
                                                compra
                                            </h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button id="close-button" type="button" onClick={handleCloseCart}
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {token && mostrar}
                                                    {!token && 
                                                    <div>
                                                        <div className="flex justify-center">
                                                            <img src={carritoVacioLogo} />
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <p className="text-purple-800">Carrito vacío</p>
                                                        </div>
                                                    </div>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            {token && <p>{total}</p>}
                                            {!token && <p>0</p>}
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Envío e IGV calculados en Checkout.</p>
                                        <div className="mt-6">
                                            <a href="/carritoCompras"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                o&nbsp;
                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
        </>
    )
}

function CarritoItems(props) {
    return (
        <li className="flex py-6">
            <div
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${props.imagen}`}
                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    className="h-full w-full object-cover object-center" />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div
                        className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="#">{props.nombre}</a>
                        </h3>
                        <p className="ml-4">S/{props.precio}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{props.categoria}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Cantidad: {props.cantidad}</p>

                    <div className="flex">
                        <button type="button" onClick={() => props.eliminarProducto(props.producto_id)} className="font-medium text-indigo-600 hover:text-indigo-500">Quitar</button>
                    </div>
                </div>
            </div>
        </li>
    )
}