import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import carritoVacioLogo from "../images/carrito/carritoVacio.jpg";

export default function BarraLateralCarritoCompras() {
    const [token, setToken] = useContext(UserContext);
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    const obtenerDatosCarrito = async () => {
        try {
            if (!token) return;

            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);

            // Validar usuario
            const userResponse = await fetch("https://compusave-backend.onrender.com/auth/validar_usuario/yo", { headers });
            const userData = await userResponse.json();
            const userId = userData.id;

            // Obtener productos del carrito
            const carritoResponse = await fetch(`https://compusave-backend.onrender.com/get/carritos_items/${userId}`, { headers });
            const carritoItems = await carritoResponse.json();

            // Obtener bienes y categorías
            const [bienesResponse, categoriasResponse] = await Promise.all([
                fetch("https://compusave-backend.onrender.com/get/bienes", { headers }),
                fetch("https://compusave-backend.onrender.com/get/categorias", { headers }),
            ]);

            const bienes = await bienesResponse.json();
            const categorias = await categoriasResponse.json();

            // Combinar datos del carrito con bienes y categorías
            const productosCompletos = carritoItems.map(item => {
                const bien = bienes.find(b => b.producto_id === item.producto_id);
                const categoria = categorias.find(c => c.id === bien.categoria_id);

                return {
                    ...bien,
                    cantidad: item.cantidad,
                    categoria: categoria?.nombre || "Sin categoría",
                };
            });

            setProductos(productosCompletos);

            // Obtener el total del carrito
            const totalResponse = await fetch(`https://compusave-backend.onrender.com/get/carrito/total/${userId}`, { headers });
            const totalData = await totalResponse.json();
            setTotal(totalData.total);
        } catch (error) {
            console.error("Error al obtener los datos del carrito:", error);
        }
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
    

    const handleCloseCart = () => {
        const slideOver = document.getElementById("slide-over");
        slideOver.classList.remove("block");
        slideOver.classList.add("hidden");
    };

    useEffect(() => {
        const slideOver = document.getElementById("slide-over");
        if (slideOver) slideOver.classList.add("hidden");
        obtenerDatosCarrito();
    }, [token]);

    return (
        <>
            <div id="slide-over" className="relative z-10 hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                                Carrito de compra
                                            </h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    id="close-button"
                                                    type="button"
                                                    onClick={handleCloseCart}
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {productos.length > 0 ? (
                                                        productos.map(producto => (
                                                            <CarritoItems
                                                                key={producto.producto_id}
                                                                {...producto}
                                                                eliminarProducto={eliminarProducto}
                                                            />
                                                        ))
                                                    ) : (
                                                        <div>
                                                            <div className="flex justify-center">
                                                                <img src={carritoVacioLogo} alt="Carrito vacío" />
                                                            </div>
                                                            <div className="flex justify-center">
                                                                <p className="text-purple-800">Carrito vacío</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>S/{total || 0}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Envío e IGV calculados en Checkout.</p>
                                        <div className="mt-6">
                                            <a
                                                href="/carritoCompras"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </a>
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
        </>
    );
}

function CarritoItems({ producto_id, imagen, nombre, precio, cantidad, categoria, eliminarProducto }) {
    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${imagen}`}
                    alt={nombre}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{nombre}</h3>
                        <p className="ml-4">S/{precio}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{categoria}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Cantidad: {cantidad}</p>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => eliminarProducto(producto_id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Quitar
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}

