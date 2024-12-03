import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

export default function DashboardStocks() {
    const abrirModal = () => {
        setId('');
        setProductoId('');
        setAlmacenId('');
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Bien';
    };

    const abrirHistorialMovimientos = () => {
        document.getElementById('modalHistorial').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Historial de Movimientos';
    };

    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        for (const modal of modales) {
            modal.classList.add('hidden');
        }
    };

    const [id, setId] = useState('');
    const [producto_id, setProductoId] = useState('');
    const [almacen_id, setAlmacenId] = useState('');
    const [cantidad, setCantidad] = useState('');

    const [stocks, setStocks] = useState([]);
    const [productos, setProductos] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [mostrarFilas, setMostrarFilas] = useState([]);
    const [productosOpciones, setProductosOpciones] = useState([]);
    const [almacenesOpciones, setAlmacenesOpciones] = useState([]);
    const [almacenSeleccionado, setAlmacenSeleccionado] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [historial, setHistorial] = useState([]);

    const registrarStock  = async (e) => {
        e.preventDefault();
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            if (productoSeleccionado === "" || almacenSeleccionado === "") {
                Swal.fire({
                    title: "Por favor seleccione un producto y un almacén.",
                    icon: "error"
                });
                return;
            }

            const cuerpo = JSON.stringify({
                cantidad: cantidad,
                almacen_id: almacenSeleccionado,
                producto_id: productoSeleccionado,
            });

            const request = new Request("https://compusave-backend.onrender.com/put/stock/aumentar", {
                method: "PUT",
                headers: headers,
                body: cuerpo,
            });

            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "success"
                });
                setId('');
                setProductoId('');
                setAlmacenId('');
                setCantidad('');
                setHistorial([]);
                cerrarModal();
                obtenerDatosYActualizarFilas();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error(error);  // Muestra el error para depuración
            Swal.fire({
                title: `Hubo un error: ${error.message}`,
                icon: "error"
            });
        }
    };

    const eliminarStock = async (e) => {
        e.preventDefault();
    
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const cuerpo = JSON.stringify({
                cantidad: cantidad,
                producto_id: producto_id,
                almacen_id: almacen_id,
            });
    
            const request = new Request("https://compusave-backend.onrender.com/put/stock/disminuir", {
                method: "PUT",
                headers: headers,
                body: cuerpo,
            });
    
            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: `${resultado.detail || 'Operación exitosa'}`,
                    icon: "success"
                });
                setId('');
                setProductoId('');
                setNombreProducto('');
                setAlmacenId('');
                setNombreAlmacen('');
                setCantidad('');
                setHistorial([]); // Limpiar correctamente el historial
                obtenerHistoriales();
                cerrarModal();
                obtenerDatosYActualizarFilas();
            } else {
                Swal.fire({
                    title: `${resultado.detail || 'Error desconocido'}`,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error(error);  // Log para depuración
            Swal.fire({
                title: `Hubo un error: ${error.message || 'Error desconocido'}`,
                icon: "error"
            });
        }
    };
    
    const obtenerHistoriales = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const request = new Request("https://compusave-backend.onrender.com/get/historiales_movimientos", {
                method: "GET",
                headers: headers,
            });
    
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`Error al obtener datos: ${response.statusText}`);
            }
            const resultado = await response.json();
    
            const historiales = resultado.map((x, index) => {
                // Buscar nombre del producto
                const n_producto = props.productos.find(producto => producto.id === x.producto_id)?.nombre || "Producto desconocido";
    
                // Buscar nombre del almacén
                const n_almacen = props.almacenes.find(almacen => almacen.id === x.almacen_id)?.nombre || "Almacén desconocido";
    
                // Ajustar el formato de la fecha
                let fechaFormateada = "Fecha inválida";
                if (x.created_at) {
                    const fecha = new Date(x.created_at);
                    if (!isNaN(fecha)) {
                        fechaFormateada = fecha.toLocaleString(); // Formato local
                    }
                }
    
                return (
                    <tr key={x.id}>
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{n_producto}</td>
                        <td className="px-4 py-2 border">{n_almacen}</td>
                        <td className="px-4 py-2 border">{x.cantidad}</td>
                        <td className="px-4 py-2 border">{x.tipo_movimiento}</td>
                        <td className="px-4 py-2 border">{fechaFormateada}</td>
                    </tr>
                );
            });
    
            setHistorial(historiales);
        } catch (error) {

        }
    };
    
    // Se ejecuta al cargar inicialmente la página
    useEffect(() => {
        obtenerHistoriales();
    }, []);
    
    const obtenerDatosYActualizarFilas = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const requestAlmacenes = new Request("https://compusave-backend.onrender.com/get/almacenes", {
                method: "GET",
                headers: headers,
            });
            const responseAlmacenes = await fetch(requestAlmacenes);
            const datosAlmacenes = await responseAlmacenes.json();
            const almacenesOpciones = datosAlmacenes.map((x) => (
                <AlmacenOption key={x.id} {...x} setAlmacenId={setAlmacenId} />
            ));
    
            setAlmacenes(datosAlmacenes);
            setAlmacenesOpciones(almacenesOpciones);
    
            headers.append("Content-Type", "application/json");
            const requestProductos = new Request("https://compusave-backend.onrender.com/get/bienes", {
                method: "GET",
                headers: headers,
            });
            const responseProductos = await fetch(requestProductos);
            const datosProductos = await responseProductos.json();
            const productoOpciones = datosProductos.map((x) => (
                <ProductoOption key={x.id} {...x} setProductoId={setProductoId} />
            ));
    
            setProductos(datosProductos);
            setProductosOpciones(productoOpciones);
    
            // Obtener stock
            const requestStock = new Request(`https://compusave-backend.onrender.com/get/stock/${id}`, {
                method: "GET",
                headers: headers,
            });
            const responseStock = await fetch(requestStock);
            const datosStock = await responseStock.json();
            const stocksFilas = datosStock.map((x, index) => (
                <DashboardStocksFila 
                    key={x.id} 
                    {...x} 
                    setId={setId}
                    setCantidad={setCantidad}
                    setProductoId={setProductoId}
                    setAlmacenId={setAlmacenId}
                    almacenes={datosAlmacenes}
                    productos={datosProductos}
                    index={index + 1}
                />
            ));
    
            setStocks(datosStock);
            setMostrarFilas(stocksFilas);
    
        } catch (error) {
            Swal.fire({
                title: `Hubo un error...`,
                icon: "error"
            });
        }
    };
    

    
    // Se ejecuta al cargar inicialmente la página
    useEffect(() => {
        obtenerDatosYActualizarFilas();
    }, []);

    
    
    // Función para exportar los datos a Excel
    const exportToExcel = () => {
        const data = mostrarFilas.map(row => ({
            ID: row.key, // Asegúrate de utilizar la propiedad correcta, como `key` o `props.id`
            Producto: row.props.producto_id,
            Almacen: row.props.almacen_id,
            Cantidad: row.props.cantidad
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Stocks");
        XLSX.writeFile(workbook, "Stocks.xlsx");
    };    

    return (
        <>
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Nuevo Stock</h2>
                    <form id="formularioStock" onSubmit={registrarStock}>
                        <div className="mb-4">
                            <label htmlFor="nombrebien" className="block text-gray-700">Nombre de Producto</label>
                            <select id="nombrebien" className="w-full px-4 py-2 border rounded-lg" value={productoSeleccionado} onChange={e => setProductoSeleccionado(e.target.value)} >
                                <option value="">Seleccionar un Producto</option>
                                {productosOpciones}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreAlmacen" className="block text-gray-700">Nombre de Almacen</label>
                            <select id="nombreAlmacen" className="w-full px-4 py-2 border rounded-lg" value={almacenSeleccionado} onChange={e => setAlmacenSeleccionado(e.target.value)} >
                                <option value="">Seleccionar un Almacen</option>
                                {almacenesOpciones}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cantidadStock" className="block text-gray-700">Cantidad</label>
                            <input type="text" onChange={(e) => setCantidad(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal para disminuir stock */}
            <div id="modalEditar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Restar Stock</h2>
                    <form id="formularioStock" onSubmit={eliminarStock}>
                        <div className="mb-4">
                            <label htmlFor="nombrebienPUT" className="block text-gray-700">Nombre de Producto</label>
                            <select id="nombrebienPUT" className="w-full px-4 py-2 border rounded-lg" value={productoSeleccionado} onChange={e => setProductoSeleccionado(e.target.value)} required>
                                <option value="">Seleccionar un Producto</option>
                                {productosOpciones}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreAlmacenPUT" className="block text-gray-700">Nombre de Almacen</label>
                            <select id="nombreAlmacenPUT" className="w-full px-4 py-2 border rounded-lg" value={almacenSeleccionado} onChange={e => setAlmacenSeleccionado(e.target.value)} required>
                                <option value="">Seleccionar un Almacen</option>
                                {almacenesOpciones}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cantidadStock" className="block text-gray-700">Cantidad</label>
                            <input type="text" onChange={(e) => setCantidad(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Modal para ver historial de movimientos */}
            <div id="modalHistorial" className="bg-red fixed inset-0 pt-96 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal overflow-auto">
               
                <div className='p-3 bg-white rounded-lg shadow-lg '>
                <div className="flex justify-between items-center">

                    <h2 className="pl-4 text-xl font-bold mb-4">
                    Historial de Movimientos
                    </h2>

                    <button className="mr-2 bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={cerrarModal}>
                        Cerrar
                    </button>
                </div>        
                    {/* <h2 className="text-sm font-bold mb-4">Historial de Movimientos</h2> */}
                    
                    <table className="bg-white-500 p-6 rounded-lg shadow-lg max-w-md "> 
                        <thead className="bg-white p-6 rounded-lg shadow-lg max-w-md  ">
                            <tr className=''>
                                <th className="text-sm font-bold mb-4 ">ID</th>
                                <th className="text-sm font-bold mb-4 ">PRODUCTO</th>
                                <th className="text-sm font-bold mb-4 ">ALMACEN</th>
                                <th className="text-sm font-bold mb-4 ">CANTIDAD</th>
                                <th className="text-sm font-bold mb-4 ">TIPO DE MOVIMIENTO</th>
                                <th className="text-sm font-bold mb-4 ">CREADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial}
                        </tbody>
                    </table>
                </div>
            </div>


            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Productos y Almacenes</h1>
                <div className="mt-5">
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar stock
                    </button>
                </div>
    
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-auto">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-center text-left font-semibold text-gray-300">PRODUCTO</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ALMACEN</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">CANTIDAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostrarFilas}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}    

function DashboardStocksFila(props) {
    let n_almacen;
    let n_producto;
    const abrirAgregarStock = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Añadir Stock ';
        props.setId(props.id);
        props.setProductoId(props.producto_id);
        props.setAlmacenId(props.almacen_id);
        props.setCantidad(props.cantidad);
    };

    const abrirDisminuirStock = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Disminuir Stock ';
        props.setId(props.id);
        props.setProductoId(props.producto_id);
        props.setAlmacenId(props.almacen_id);
        props.setCantidad(props.cantidad);
    };

    for (const producto of props.productos) {
        if (producto.id == props.producto_id) {
            n_producto = producto.nombre;
        }
    }

    for (const almacen of props.almacenes) {
        if (almacen.id == props.almacen_id) {
            n_almacen = almacen.nombre;
        }
    }

    return (
        <tr className="border-b border-b-[#394050] w-1/2">
            <td className="text-white font-light py-2 px-4">{props.index}</td>
            <td className="text-white font-light text-center py-2 px-4">{n_producto}</td>
            <td className="text-white font-light text-center py-2 px-4">{n_almacen}</td>
            <td className="text-white font-light text-center py-2 px-4 truncate max-w-xs break-words">{props.cantidad}</td>
        </tr>
    );
}

function AlmacenOption(props) {
    return (
        <option value={props.id}>{props.nombre}</option>
    );
}

function ProductoOption(props) {
    return (
        <option value={props.id}>{props.nombre}</option>
    );
}