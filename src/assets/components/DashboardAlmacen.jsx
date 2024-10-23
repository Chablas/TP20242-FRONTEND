import React, { useEffect, useState } from 'react';
import DashboardAlmacenFila from "./DashboardAlmacenFila";
import Swal from "sweetalert2"

export default function Almacen() {
    const abrirModal = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Almacén';
    };

    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        for (const modal of modales) {
            modal.classList.add('hidden');
        }
    };
    const [errorMessage, setErrorMessage] = useState('');

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');

    const enviarDatos = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
            
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            // Cuerpo del POST request
            const cuerpo = JSON.stringify({
                nombre: nombre,
                ubicacion: ubicacion
            });
    
            const request = new Request("https://compusave-backend.onrender.com/post/almacen", {
                method: "POST",
                headers: headers,
                body: cuerpo,
            });
    
            const response = await fetch(request);
            const resultado = await response.json();
            
            //Validacion SweerAlert NO DEBE TENER CAMPOS VACIOS
            if (!nombre || !ubicacion) {
                setErrorMessage('Todos los campos son obligatorios.');
                return; // Salir si hay campos vacíos
            }
        
            try {
                // El resto de tu código para enviar datos...
            } catch (error) {
                console.error('Error en la conexión con el servidor:', error);
            }



            //Validacion SweetAlert NO SE REPITE ALMACEN
            if (response.ok) {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon:"success"
            
                })

                setId('');
                setNombre('');
                setUbicacion('');
                // Cierra modal
                cerrarModal();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon:"error"
            
                })

            }
        } 
        catch (error) {
            Swal.fire({
                title: `Hubo un error...`,
                icon:"error"
        
            })
        }
    };

    
    


    const editarDatos = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            // Cuerpo del request
            const cuerpo = JSON.stringify({
                nombre: nombre,
                ubicacion: ubicacion
            });
            
            const request = new Request(`https://compusave-backend.onrender.com/put/almacen/${id}`, {
                method: "PUT",
                headers: headers,
                body: cuerpo,
            });

            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {
                console.log('Datos enviados correctamente:', resultado);
                // Aquí puedes resetear el formulario o mostrar una notificación
                setId('');
                setNombre('');
                setUbicacion('');
                // Cierra modal
                cerrarModal();
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    }

    const eliminarDatos = async (id) => {

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const request = new Request(`https://compusave-backend.onrender.com/delete/almacen/${id}`, {
                method: "DELETE",
                headers: headers,
            });

            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {

                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "success"
                })
                // Aquí puedes resetear el formulario o mostrar una notificación
                setId('');
                setNombre('');
                setUbicacion('');
                // Cierra modal
                cerrarModal();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });            }
        } catch (error) {
            Swal.fire({
                title: `Hubo un error...`,
                icon: "error"
            });        
        }
    }

    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const request = new Request("https://compusave-backend.onrender.com/get/almacenes", {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const datos = await response.json();
        
                const almacenes = datos.map((x, index) => {
                    return (
                        <DashboardAlmacenFila 
                            key={x.id} 
                            {...x} 
                            setId={setId} 
                            setNombre={setNombre} 
                            setUbicacion={setUbicacion} 
                            eliminarDatos={eliminarDatos} 
                            index={index + 1} // Pasar el índice como prop
                        />
                    );
                });
        
                setMostrar(almacenes);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();


    }, []);

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
        
        <main className="p-6">
            {/* Resto del componente... */}
        </main>
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Almacén</h2>
                    <form id="formularioAlmacen">
                        <div className="mb-4">
                            <label htmlFor="nombreAlmacen" className="block text-gray-700">Nombre de Almacén</label>
                            <input type="text" id="nombreAlmacen" onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ubicacionAlmacen" className="block text-gray-700">Dirección</label>
                            <textarea id="ubicacionAlmacen" onChange={(e) => setUbicacion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={enviarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="modalEditar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Editar Almacén {nombre}</h2>
                    <form id="formularioAlmacen">
                        <div className="mb-4">
                            <label htmlFor="nombreAlmacen" className="block text-gray-700">Nombre de Almacén</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ubicacionAlmacen" className="block text-gray-700">Dirección</label>
                            <textarea value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Almacenes</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nuevo almacén
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">NOMBRE</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">UBICACIÓN</th>
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