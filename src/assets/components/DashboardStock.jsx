import React, { useEffect, useState } from 'react'; 
import * as XLSX from 'xlsx'; // Importar SheetJS para exportar a Excel
import Swal from "sweetalert2";

export default function Categoria() {
    const abrirModal = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Nuevo Stock';
    };

    const abrirHistorialMovimientos = () => {
        document.getElementById('modalHistorial').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Historial de Movimientos';
    };

    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        modales.forEach(modal => modal.classList.add('hidden'));
    };
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setId] = useState('');
    const [nombre_producto, setNombreProducto] = useState('');
    const [nombre_almacen, setNombreAlmacen] = useState('');
    const [producto_id, setProductoId] = useState('');
    const [almacen_id, setAlmacenId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos
    const [historial, setHistorial] = useState([]);
    // const [tipo_mov, setTipoMov] = useState('');    
    // const [creado, setCreado] = useState('');

    const [mostrarFilas, setMostrarFilas] = useState([]);
       


    // REGISTRA STOCK
    const registrarStock = async (e) => {
        e.preventDefault();

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            
            //Cuerpo del POST request
            const cuerpo = JSON.stringify({
                producto_id: producto_id,
                almacen_id: almacen_id,
                cantidad: cantidad
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
                setHistorial('');
                obtenerHistoriales('');
                cerrarModal();
                obtenerDatos();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Hubo un error...",
                icon: "error"
            });
        }
    };
// ELIMINA STOCK
    const eliminarStock = async (e) => {
        e.preventDefault();

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            
            //Cuerpo del POST request
            const cuerpo = JSON.stringify({
                producto_id: producto_id,
                almacen_id: almacen_id,
                cantidad: cantidad
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
                    title: `${resultado.detail}`,
                    icon: "success"
                });
                setId('');
                setProductoId('');
                setAlmacenId('');
                setCantidad('');
                setHistorial('');
                obtenerHistoriales('');
                cerrarModal();
                obtenerDatos();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Hubo un error...",
                icon: "error"
            });
        }
    };

    // Obtener todos los almacenes que tiene el producto

    const obtenerHistoriales = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const request = new Request("https://compusave-backend.onrender.com/get/historiales_movimientos", {
                method: "GET",
                headers: headers,
            });
    
            const response = await fetch(request);
            const resultado = await response.json();
    
            const historiales = resultado.map((x, index) => {
                // Ajustar el formato de la fecha
                let fechaFormateada = "Fecha inválida";
                if (x.created_at) {
                    const fechaISO = x.created_at.replace(" ", "T"); // Convertir a formato ISO
                    const fecha = new Date(fechaISO);
                    if (!isNaN(fecha)) {
                        fechaFormateada = fecha.toLocaleString(); // Mostrar fecha local
                    }
                }
    
                return (
                    <tr key={x.id}>
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{x.producto_id}</td>
                        <td className="px-4 py-2 border">{x.almacen_id}</td>
                        <td className="px-4 py-2 border">{x.cantidad}</td>
                        <td className="px-4 py-2 border">{x.tipo_movimiento}</td>
                        <td className="px-4 py-2 border">{fechaFormateada}</td>
                    </tr>
                );
            });
    
            setHistorial(historiales);
        } catch (error) {
            Swal.fire({
                title: "Hubo un error al obtener el historial...",
                icon: "error",
            });
        }
    };
    // Se ejecuta al cargar inicialmente la página
    useEffect(() => {
        obtenerHistoriales();
    }, []);


    const obtenerDatos = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/stock", {
                method: "GET",
                headers: headers,
            });
            const response = await fetch(request);
            const datos = await response.json();

            const stock = datos.map((x, index) => {
                return <DashboardStockFila 
                setId={setId} 
                // setProductoId ={setProductoId}
                // setAlmacenId = {setAlmacenId}
                setCantidad ={setCantidad}
                index={index + 1} // Pasar el índice como prop
                key={x.id} 
                {...x} 
                />
            });

            setMostrar(stock);
            obtenerDatos2();
            obtenerDatos3();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const obtenerDatos2 = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/bienes", {
                method: "GET",
                headers: headers,
            });
            const response = await fetch(request);
            const datos = await response.json();

            const stock = datos.map((x, index) => {
                return <DashboardStockFila 
                // setId={setId} 
                setProductoId ={setProductoId}
                // setAlmacenId = {setAlmacenId}
                // setCantidad ={setCantidad}
                index={index + 1} // Pasar el índice como prop
                key={x.id} 
                {...x} 
                />
            });

            setMostrar(stock);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };


    const obtenerDatos3 = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/almacenes", {
                method: "GET",
                headers: headers,
            });
            const response = await fetch(request);
            const datos = await response.json();

            const stock = datos.map((x, index) => {
                return <DashboardStockFila 
                // setId={setId} 
                // setProductoId ={setProductoId}
                setAlmacenId = {setAlmacenId}
                // setCantidad ={setCantidad}
                index={index + 1} // Pasar el índice como prop
                key={x.id} 
                {...x} 
                />
            });

            setMostrar(stock);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };


    
    // Se ejecuta al cargar inicialmente la página
    useEffect(() => {
        obtenerDatos();
    }, []);
    
    // Función para exportar los datos a Excel
    const exportToExcel = () => {
        const data = mostrarFilas.map(row => ({
            ID: row.key, // Asegúrate de utilizar la propiedad correcta, como `key` o `props.id`
            Nombre: row.props.nombre,
            Descripción: row.props.descripcion,
            Imagen: row.props.imagen
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Categorías");
        XLSX.writeFile(workbook, "Categorias.xlsx");
    };    

    return (
        <>
            

            {/* Modal para añadir stock */}
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Nuevo Stock</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Producto Id</label>
                            <input type="text" value={producto_id} onChange={(e) => setProductoId(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Almacen Id</label>
                            <input value={almacen_id} onChange={(e) => setAlmacenId(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></input>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Cantidad</label>
                            <input type="text" onChange={(e) => setCantidad(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={registrarStock}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal para disminuir stock */}
            <div id="modalEditar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Restar Stock</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Producto Id</label>
                            <input type="text" value={producto_id} onChange={(e) => setProductoId(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Almacen Id</label>
                            <input value={almacen_id} onChange={(e) => setAlmacenId(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></input>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Cantidad</label>
                            <input type="text" onChange={(e) => setCantidad(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={eliminarStock}>Guardar</button>
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
                                <th className="text-sm font-bold mb-4 ">PRODUCTO ID</th>
                                <th className="text-sm font-bold mb-4 ">ALMACEN ID</th>
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

                    <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400 ml-4" onClick={abrirHistorialMovimientos}>
                        Ver Historial
                    </button>

                    <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400 ml-4" onClick={exportToExcel}>
                        Exportar a Excel
                    </button>
                </div>
    
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-auto">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-center text-left font-semibold text-gray-300">PRODUCTO ID</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ALMACEN ID</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">CANTIDAD</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostrar}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
    
    function DashboardStockFila(props) {
        const abrirAgregarStock = () => {
            document.getElementById('modalAgregar').classList.remove('hidden');
            document.getElementById('tituloModal').textContent = 'Añadir Stock ';
            props.setId(props.id);
            props.setProductoId(props.producto_id);
            props.setAlmacenId(props.almacen_id);
            // props.setProductoId(props.nombre_producto);
            // props.setAlmacenId(props.nombre_almacen);
            props.setCantidad(props.cantidad);
        };

        const abrirDisminuirStock = () => {
            document.getElementById('modalEditar').classList.remove('hidden');
            document.getElementById('tituloModal').textContent = 'Disminuir Stock ';
            props.setId(props.id);
            props.setProductoId(props.producto_id);
            props.setAlmacenId(props.almacen_id);
            // props.setProductoId(props.nombre_producto);
            // props.setAlmacenId(props.nombre_almacen);
            props.setCantidad(props.cantidad);
        };
    
        return (
            <>
            <tr className="border-b border-b-[#394050] w-1/2">
                <td className="text-white font-light py-2 px-4 " >{props.index}</td>
                <td className="text-white font-light text-center py-2 px-4 ">{props.producto_id}</td>
                <td className="text-white font-light text-center py-2 px-4 ">{props.almacen_id}</td>
                {/* <td className="text-white font-light text-center py-2 px-4 ">{props.nombre_producto}</td>
                <td className="text-white font-light text-center py-2 px-4 ">{props.nombre_almacen}</td> */}
                <td className="text-white font-light text-center py-2 px-4  truncate max-w-xs break-words">{props.cantidad}</td>
                <td className="text-white font-light text-center py-2 px-4 ">
                    <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirAgregarStock}>Aumentar</button>
                    <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={abrirDisminuirStock}>Disminuir</button>
                </td>
            </tr>
            
            </>
        )
    }

}    