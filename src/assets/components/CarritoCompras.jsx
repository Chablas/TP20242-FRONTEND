import React, { useState } from 'react';

const CarritoCompras = () => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (nombre, precio, cantidad = 1) => {
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
      setCarrito(
        carrito.map(p =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad + cantidad } : p
        )
      );
    } else {
      setCarrito([...carrito, { nombre, precio, cantidad }]);
    }
    actualizarResumenCompra();
  };

  // Función para mostrar productos en el carrito
  const mostrarProductosEnCarrito = () => {
    return carrito.map((producto, index) => (
      <div key={index} className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-4 w-6 h-6 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            onChange={(e) => eliminarCheckbox(index, e.target.checked)}
          />
          <img src="" alt={producto.nombre} className="w-20 h-20 object-cover mr-4" />
          <div>
            <h3 className="font-semibold text-lg">{producto.nombre}</h3>
            <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
          </div>
        </div>
        <p className="text-lg font-semibold">
          S/ {(producto.precio * producto.cantidad).toFixed(2)}
        </p>
        <button
          id={`btn-eliminar-${index}`}
          className="text-red-600 hidden"
          onClick={() => eliminarDelCarrito(index)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    ));
  };

  // Función para manejar la selección de productos
  const eliminarCheckbox = (index, checked) => {
    const btnEliminar = document.getElementById(`btn-eliminar-${index}`);
    if (btnEliminar) {
      btnEliminar.classList.toggle('hidden', !checked);
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  // Actualización del resumen de la compra
  const actualizarResumenCompra = () => {
    let subtotal = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const envio = 20.00;
    const impuestos = subtotal * 0.18;
    const total = subtotal + envio + impuestos;
    document.getElementById('subtotal').innerText = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById('envio').innerText = `S/ ${envio.toFixed(2)}`;
    document.getElementById('impuestos').innerText = `S/ ${impuestos.toFixed(2)}`;
    document.getElementById('total').innerText = `S/ ${total.toFixed(2)}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Tu Carrito de Compras</h1>
              <p id="cantidad-productos" className="text-lg text-gray-700">
                ({carrito.reduce((acc, prod) => acc + prod.cantidad, 0)} productos seleccionados)
              </p>
            </div>
            <div id="lista-productos" className="bg-white shadow-md rounded-lg overflow-hidden mb-6 p-4">
              {mostrarProductosEnCarrito()}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Productos que te pueden interesar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { nombre: "Producto Recomendado 1", precio: 200 },
                  { nombre: "Producto Recomendado 2", precio: 250 },
                  { nombre: "Producto Recomendado 3", precio: 180 },
                  { nombre: "Producto Recomendado 4", precio: 220 },
                  { nombre: "Producto Recomendado 5", precio: 230 }
                ].map((producto, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                    <img src="" alt={producto.nombre} className="w-full h-32 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <p className="text-gray-600 mb-2">S/ {producto.precio.toFixed(2)}</p>
                    <button
                      onClick={() => agregarAlCarrito(producto.nombre, producto.precio)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p id="subtotal" className="text-lg font-semibold">S/ 0.00</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Envío</p>
                <p id="envio" className="text-lg font-semibold">S/ 20.00</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Impuestos</p>
                <p id="impuestos" className="text-lg font-semibold">S/ 0.00</p>
              </div>
              <hr />
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold">Total</p>
                <p id="total" className="text-xl font-semibold">S/ 20.00</p>
              </div>
              <button className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-800">
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarritoCompras;