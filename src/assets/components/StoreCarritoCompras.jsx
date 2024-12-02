import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import carritoVacioLogo from "../images/carrito/carritoVacio.jpg";

const CarritoCompras = () => {
  const [token, setToken] = useContext(UserContext);
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const obtenerDatosCarrito = async () => {
    try {
      if (!token) return;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const userResponse = await fetch("https://compusave-backend.onrender.com/auth/validar_usuario/yo", { headers });
      const userData = await userResponse.json();
      const userId = userData.id;

      const carritoResponse = await fetch(`https://compusave-backend.onrender.com/get/carritos_items/${userId}`, { headers });
      const carritoItems = await carritoResponse.json();

      const [bienesResponse, categoriasResponse] = await Promise.all([
        fetch("https://compusave-backend.onrender.com/get/bienes", { headers }),
        fetch("https://compusave-backend.onrender.com/get/categorias", { headers }),
      ]);

      const bienes = await bienesResponse.json();
      const categorias = await categoriasResponse.json();

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

      const totalResponse = await fetch(`https://compusave-backend.onrender.com/get/carrito/total/${userId}`, { headers });
      const totalData = await totalResponse.json();
      setTotal(totalData.total);
    } catch (error) {
      console.error("Error al obtener los datos del carrito:", error);
    }
  };

  const actualizarEstadoCarrito = (productoId, cambioCantidad, precio) => {
    setProductos(prevProductos =>
      prevProductos.map(prod =>
        prod.producto_id === productoId
          ? { ...prod, cantidad: prod.cantidad + cambioCantidad }
          : prod
      )
    );
    setTotal(prevTotal => prevTotal + cambioCantidad * precio); // Actualizamos el total de forma optimista
  };
  
  const añadirProducto = async (productoId) => {
    const producto = productos.find(prod => prod.producto_id === productoId);
    if (!producto || !token) return;
  
    // Actualización optimista
    actualizarEstadoCarrito(productoId, 1, producto.precio);
  
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
  
      const userResponse = await fetch("https://compusave-backend.onrender.com/auth/validar_usuario/yo", { headers });
      const userData = await userResponse.json();
      const userId = userData.id;
  
      const response = await fetch(
        `https://compusave-backend.onrender.com/put/carritos_items/añadir/${userId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            producto_id: productoId,
            cantidad: 1,
          }),
        }
      );
  
      if (!response.ok) {
        console.error("Error al añadir producto:", response.statusText);
        actualizarEstadoCarrito(productoId, -1, producto.precio); // Revertimos si hay error
      }
    } catch (error) {
      console.error("Error al añadir producto:", error);
      actualizarEstadoCarrito(productoId, -1, producto.precio); // Revertimos si hay error
    }
  };
  
  const quitarProducto = async (productoId) => {
    const producto = productos.find(prod => prod.producto_id === productoId);
    if (!producto || !token || producto.cantidad === 0) return;
  
    // Actualización optimista
    actualizarEstadoCarrito(productoId, -1, producto.precio);
  
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
  
      const userResponse = await fetch("https://compusave-backend.onrender.com/auth/validar_usuario/yo", { headers });
      const userData = await userResponse.json();
      const userId = userData.id;
  
      const response = await fetch(
        `https://compusave-backend.onrender.com/put/carritos_items/quitar/${userId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            producto_id: productoId,
            cantidad: 1,
          }),
        }
      );
  
      if (!response.ok) {
        console.error("Error al quitar producto:", response.statusText);
        actualizarEstadoCarrito(productoId, 1, producto.precio); // Revertimos si hay error
      }
    } catch (error) {
      console.error("Error al quitar producto:", error);
      actualizarEstadoCarrito(productoId, 1, producto.precio); // Revertimos si hay error
    }
  };
  
  const eliminarProducto = async (productoId, cantidad) => {
    const producto = productos.find(prod => prod.producto_id === productoId);
    if (!producto || !token) return;
  
    // Actualización optimista
    setProductos(prevProductos => prevProductos.filter(prod => prod.producto_id !== productoId));
    setTotal(prevTotal => prevTotal - producto.precio * cantidad);
  
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
  
      const userResponse = await fetch("https://compusave-backend.onrender.com/auth/validar_usuario/yo", { headers });
      const userData = await userResponse.json();
      const userId = userData.id;
  
      const response = await fetch(
        `https://compusave-backend.onrender.com/put/carritos_items/quitar/${userId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            producto_id: productoId,
            cantidad,
          }),
        }
      );
  
      if (!response.ok) {
        console.error("Error al eliminar producto:", response.statusText);
        await obtenerDatosCarrito(); // Revertimos si hay error
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      await obtenerDatosCarrito(); // Revertimos si hay error
    }
  };  

  useEffect(() => {
    obtenerDatosCarrito();
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Tu Carrito de Compras</h1>
              <p className="text-lg text-gray-700">
                ({productos.reduce((acc, prod) => acc + prod.cantidad, 0)} productos seleccionados)
              </p>
            </div>
            <div id="lista-productos" className="bg-white shadow-md rounded-lg overflow-hidden mb-6 p-4">
              {productos.length > 0 ? (
                productos.map((producto, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-4 w-6 h-6 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        onChange={(e) => {
                          const btnEliminar = document.getElementById(`btn-eliminar-${index}`);
                          if (btnEliminar) {
                            btnEliminar.classList.toggle('hidden', !e.target.checked);
                          }
                        }}
                      />
                      <img src={`https://storage.googleapis.com/tallerdeproyectoscompusave/${producto.imagen}`|| ""} alt={producto.nombre} className="w-20 h-20 object-cover mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                        <p className="text-gray-600">Categoría: {producto.categoria}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="text-xl text-purple-600"
                        onClick={() => quitarProducto(producto.producto_id)}
                      >
                        -
                      </button>
                      <p className="mx-4 text-lg font-semibold">{producto.cantidad}</p>
                      <button
                        className="text-xl text-purple-600"
                        onClick={() => añadirProducto(producto.producto_id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold">
                      S/ {(producto.precio * producto.cantidad).toFixed(2)}
                    </p>
                    <button
                      id={`btn-eliminar-${index}`}
                      className="text-red-600 hidden"
                      onClick={() => eliminarProducto(producto.producto_id, producto.cantidad)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <img src={carritoVacioLogo} alt="Carrito vacío" className="w-32 h-32" />
                  <p className="text-xl font-semibold">Tu carrito está vacío</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-lg font-semibold">S/ {(total).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Envío</p>
                <p className="text-lg font-semibold">S/ 20.00</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Impuestos</p>
                <p className="text-lg font-semibold">S/ {(total * 0.18).toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">S/ {(total + 20.00 + total * 0.18).toFixed(2)}</p>
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
