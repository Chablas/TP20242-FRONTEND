import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Importar SheetJS para exportar a Excel
import Swal from "sweetalert2";

export default function Proveedor() {
    // Abre el modal para agregar
    const abrirModalAgregar = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Proveedor';
    };

    // Cierra el modal
    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        setNombre('');
        setRuc('');
        setDireccion('');
        setCorreo('');
        setTelefono('');
        for (const modal of modales) {
            modal.classList.add('hidden');
        }
    };

    // Abre el modal para editar Proveedor

    // Manejador del formulario
   
/*     const submit = () => {
        alert('Proveedor registrada o editada');
        cerrarModal();
    }
    document.getElementById('formularioProveedor').addEventListener('submit', function (e) {
        e.preventDefault();
        
    });
   */
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [ruc, setRuc] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mostrarFilas, setMostrarFilas] = useState([]);// Estado para almacenar la lista de almacenes

    const registrarDatos = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        
        // Validación de que todos los campos estén completos
        if (!nombre || !ruc || !direccion || !correo || !telefono) {
            Swal.fire({
                title: "Todos los campos son obligatorios.",
                icon: "error"
            });
            return; // Salir si hay campos vacíos
        }
    
        // Validación de que RUC sea un número
        if (isNaN(ruc)) {
            Swal.fire({
                title: "El RUC debe ser un número.",
                icon: "error"
            });
            return; // Salir si RUC no es un número
        }
    
        // Validación de que el RUC comience con 10 o 20
        if (!/^10|20/.test(ruc)) {
            Swal.fire({
                title: "El RUC debe comenzar con 10 o 20.",
                icon: "error"
            });
            return; // Salir si el RUC no comienza con 10 o 20
        }
    
        // Validación de que el teléfono sea un número
        if (isNaN(telefono)) {
            Swal.fire({
                title: "El teléfono debe ser un número.",
                icon: "error"
            });
            return; // Salir si teléfono no es un número
        }

        if (telefono.length !== 9 || !telefono.startsWith('9')) {
            Swal.fire({
                title: "El teléfono debe tener 9 dígitos y comenzar con 9.",
                icon: "error"
            });
            return; // Salir si el teléfono no cumple con estas condiciones
        }
    
        // Validación de que el correo tenga un formato válido
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(correo)) {
            Swal.fire({
                title: "El correo electrónico debe tener un formato válido (ejemplo@dominio.com).",
                icon: "error"
            });
            return; // Salir si el formato de correo no es válido
        }
   
    // Eliminar los espacios al inicio y al final del nombre
    let nombreTrimmed = nombre.trim();

    // Reemplazar múltiples espacios consecutivos por un solo espacio
    nombreTrimmed = nombreTrimmed.replace(/\s+/g, ' ');


        if (nombre !== nombreTrimmed) {
            Swal.fire({
                title: "El nombre no puede tener espacios en blanco al principio, al final o mas de uno.",
                icon: "error"
            });
            return; // Salir si el nombre tiene espacios al principio o al final
        }


    // Verificar si el nombre ya existe
    const response = await fetch("https://compusave-backend.onrender.com/get/proveedores"); // Endpoint que te devuelve todos los proveedores
    const proveedores = await response.json();
    console.log(proveedores);
    // Comprobar si ya existe el nombre
    const nombreExistente = proveedores.some(proveedor => proveedor.nombre.toLowerCase() === nombre.toLowerCase());

    if (nombreExistente) {
        Swal.fire({
            title: "Ese nombre ya existe.",
            icon: "error"
        });
        return; // Salir si el nombre ya existe
    }

    
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const cuerpo = JSON.stringify({
                nombre: nombre,
                ruc: ruc,
                direccion: direccion,
                correo: correo,
                telefono: telefono
            });
    
            const request = new Request("https://compusave-backend.onrender.com/post/proveedor", {
                method: "POST",
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
                // Limpiar campos después de guardar
                setNombre('');
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                obtenerDatos(); // Actualizar lista de proveedores
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

    const editar = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
        // Validación de que todos los campos estén completos
        if (!nombre || !ruc || !direccion || !correo || !telefono) {
            Swal.fire({
                title: "Todos los campos son obligatorios.",
                icon: "error"
            });
            return; // Salir si hay campos vacíos
        }
    
        // Validación de que RUC sea un número
        if (isNaN(ruc)) {
            Swal.fire({
                title: "El RUC debe ser un número.",
                icon: "error"
            });
            return; // Salir si RUC no es un número
        }
    
        // Validación de que el teléfono sea un número
        if (isNaN(telefono)) {
            Swal.fire({
                title: "El teléfono debe ser un número.",
                icon: "error"
            });
            return; // Salir si teléfono no es un número
        }
    
        // Validación de que el correo tenga un formato válido
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(correo)) {
            Swal.fire({
                title: "El correo electrónico debe tener un formato válido (ejemplo@dominio.com).",
                icon: "error"
            });
            return; // Salir si el formato de correo no es válido
        }
   
    // Eliminar los espacios al inicio y al final del nombre
    let nombreTrimmed = nombre.trim();

    // Reemplazar múltiples espacios consecutivos por un solo espacio
    nombreTrimmed = nombreTrimmed.replace(/\s+/g, ' ');


        if (nombre !== nombreTrimmed) {
            Swal.fire({
                title: "El nombre no puede tener espacios en blanco al principio, al final o mas de uno.",
                icon: "error"
            });
            return; // Salir si el nombre tiene espacios al principio o al final
        }

    
    
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const cuerpo = JSON.stringify({
                nombre: nombre,
                ruc: ruc,
                direccion: direccion,
                correo: correo,
                telefono: telefono
            });
    
            const request = new Request(`https://compusave-backend.onrender.com/put/proveedor/${id}`, {
                method: "PUT",
                headers: headers,
                body: cuerpo,
            });
    
            const response = await fetch(request);
            const resultado = await response.json();
    
            if (response.ok) {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: 'success',
                });
                // Limpiar campos después de editar
                setNombre('');
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                cerrarModal();
                obtenerDatos(); // Recargar la lista de proveedores
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Hubo un error...",
                icon: 'error',
            });
        }
    };
    const eliminar = async (id) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request(`https://compusave-backend.onrender.com/delete/proveedor/${id}`, {
                method: "DELETE",
                headers: headers,
      
            });
            const response = await fetch(request);
            const resultado = await response.json();
            if (response.ok) {
                Swal.fire({
                        title: `${resultado.detail}`,
                        icon: "success"
                      });
                // console.log('Datos enviados correctamente:', resultado);
                // Aquí puedes resetear el formulario o mostrar una notificación
                setNombre('');
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                cerrarModal();
                obtenerDatos();                
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    };

    const [filasProductos, setFilasProductos] = useState([]); // Guardar las filas de productos
    const [mostrarModalProductos, setMostrarModalProductos] = useState(false); // Controlar la visibilidad del modal
    const [errorMessageProd, setErrorMessageProd] = useState(''); // Manejar errores

    const mostrarProductos = async (proveedor_id) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request(`https://compusave-backend.onrender.com/get/bienes_proveedor/${proveedor_id}`, {
                method: "GET",
                headers: headers,
            });
    
            const response = await fetch(request);
            const productos = await response.json();
    
            // Mapeo de los datos a filas para el modal
            const filasProductos = productos.map((producto) => (
                <tr key={producto.id} className="border-b border-gray-300">
                    <td className="py-4 px-4 text-gray-300">{producto.id}</td>
                    <td className="py-4 px-4 text-gray-300">{producto.precio}</td>
                    <td className="py-4 px-4 text-gray-300">{producto.codigo}</td>
                    <td className="py-4 px-4 text-gray-300">{producto.proveedor_id}</td>
                    <td className="py-4 px-4 text-gray-300">{producto.bien_id}</td>
                </tr>
            ));
    
            setFilasProductos(filasProductos); // Guardar las filas para mostrarlas en el modal
            setMostrarModalProductos(true); // Mostrar el modal
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            setErrorMessageProd("No se pudieron obtener los productos del proveedor.");
        }
    };



    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos
    const obtenerDatos = async () => {
            
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/proveedores", {
                method: "GET",
                headers: headers,
            });
            const response = await fetch(request);
            const datos = await response.json();

            const proveedores = datos.map((x, index) => {
                return <DashboardProveedoresFila 
                setId={setId} 
                eliminar={eliminar}
                index={index + 1} // Pasar el índice como prop
                key={x.id} 
                {...x} 
                />
            });

            setMostrar(proveedores);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };   
    useEffect(() => {
        obtenerDatos();
    }, []);


    const obtenerDatosYActualizarFilas = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/proveedores", {
                method: "GET",
                headers: headers,
            });
    
            const response = await fetch(request);
            const datos = await response.json();
    
            // Generamos las filas para el componente DashboardCategoriaFila
            const proveedores = datos.map((x, index) => (
                <DashboardProveedoresFila
                    key={x.id}
                    {...x}
                    setId={setId}
                    setNombre={setNombre}
                    setDireccion={setDireccion}
                    setRuc={setRuc}
                    setCorreo={setCorreo}
                    setTelefono={setTelefono}
                    index={index + 1}
                />
            ));
    
            setMostrarFilas(proveedores);
        } catch (error) {
            console.error('Error al obtener a los Proveedores:', error);
            Swal.fire({
                title: `Hubo un error al obtener las Proveedores.`,
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
        Nombre: row.props.nombre,
        Ruc: `${row.props.ruc}`,
        Direccion: `${row.props.direccion}`,
        Correo: row.props.correo,
        Telefono: row.props.telefono,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Proveedores");
    XLSX.writeFile(workbook, "Proveedores.xlsx");
};    



    
    return (
        <>
        {/* Diálogo de error */}
        <div id="modalError" className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${errorMessage ? '' : 'hidden'} flex justify-center items-center z-50`}>
            <div className="bg-red-500 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4">Error</h2>
                <p className="text-white">{errorMessage}</p>
                <div className="flex justify-end">
                    <button className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-200" onClick={() => setErrorMessage('')}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>

            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Proveedor</h2>
                    <form id="formularioProveedor">
                        <div className="mb-4">
                            <label htmlFor="nombreProveedor" className="block text-gray-700">Nombre de Proveedor</label>
                            <input type="text" id="nombreProveedor" value={nombre}  onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rucProveedor" className="block text-gray-700">Numero de RUC</label>
                            <input type="text" id="rucProveedor" value={ruc} onChange={(e) => setRuc(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="direccionProveedor" className="block text-gray-700">Direccion</label>
                            <textarea id="direccionProveedor" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="correoProveedor" className="block text-gray-700">Correo</label>
                            <input type="text" id="correoProveedor" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefonoProveedor" className="block text-gray-700">Telefono</label>
                            <input type="text" id="telefonoProveedor" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={registrarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="modalProductos" className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${mostrarModalProductos ? '' : 'hidden'} flex justify-center items-center z-50 btnCerrarModal`}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Productos del Proveedor</h2>
                    <div className="overflow-y-auto max-h-96">
                        <table className="min-w-full bg-[#1F2937] rounded-lg">
                            <thead className="bg-[#374151]">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold text-white">ID</th>
                                    <th className="py-3 px-4 text-left font-semibold text-white">Precio</th>
                                    <th className="py-3 px-4 text-left font-semibold text-white">Código</th>
                                    <th className="py-3 px-4 text-left font-semibold text-white">Proveedor</th>
                                    <th className="py-3 px-4 text-left font-semibold text-white">Producto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filasProductos.length > 0 ? (
                                    filasProductos
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-400">No hay productos registrados.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={cerrarModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>

            <div id="modalEditar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Editar Proveedor</h2>
                    <form id="formularioProveedor">
                        <div className="mb-4 ">
                            <label htmlFor="nombreProveedor" className="block text-gray-700 ">Nombre de Proveedor</label>
                            <input type="text"  value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4 pointer-events-none text-gray-400">
                            <label htmlFor="rucProveedor" className="block text-gray-700 ">Numero de RUC</label>
                            <input type="text" value={ruc} onChange={(e) => setRuc(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                     
                        </div>
                        <div className="mb-4 ">
                            <label htmlFor="direccionProveedor" className="block text-gray-700 ">Direccion</label>
                            <textarea value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="correoProveedor" className="block text-gray-700">Correo</label>
                            <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefonoProveedor" className="block text-gray-700">Telefono</label>
                            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editar}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>            

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Proveedores</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModalAgregar}>
                        Agregar nuevo Proveedor
                    </button>
                    <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-400 ml-4" onClick={exportToExcel}>
                        Exportar a Excel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">NOMBRE</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">RUC</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">DIRECCION</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">CORREO</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">TELEFONO</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ACCIONES</th>
                            </tr>
                        </thead>
                        <div id="modalError" className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${errorMessage ? '' : 'hidden'} flex justify-center items-center z-50`}>
                <div className="bg-red-500 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-white text-xl font-bold mb-4">Error</h2>
                        <p className="text-white">{errorMessage}</p>
                <div className="flex justify-end">
                                <button className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-200" onClick={() => setErrorMessage('')}>
                                    Cerrar
                                </button>
                </div>
                </div>
                </div>                        
                        <tbody>
                            {mostrar}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

function DashboardProveedoresFila(props) {
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Proveedor ' + props.id;  // Usar props.id
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setRuc(props.ruc);
        props.setDireccion(props.direccion);
        props.setCorreo(props.correo);
        props.setTelefono(props.telefono);
    
    };

    // Simulación de eliminar categoría
    const eliminarProveedor = (id = 1) => {
        if (confirm('¿Estás seguro de eliminar al Proveedor ' + id + '?')) {
            alert('Proveedor ' + id + ' eliminado.');
            props.eliminar(id)
        }
    };
    const mostrarProveedor = (id = 1) => {
        
    };

    return (
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.index}</td>
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.ruc}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.direccion}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.correo}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.telefono}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-blue-500 py-1 px-2 rounded-md hover:text-white hover:bg-blue-500 ml-4" onClick={()=>mostrarProveedor(props.id)}>Mostrar</button>
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500 ml-4 " onClick={()=>abrirModalEdicion(props.id)}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={()=>eliminarProveedor(props.id)}>Eliminar</button>
                
            </td>
        </tr>
    )
}