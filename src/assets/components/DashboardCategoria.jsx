import React, { useEffect, useState } from 'react';
import DashboardCategoriaFila from "./DashboardCategoriaFila";

export default function Categoria() {
    // Abre el modal
    const abrirModal = () => {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Categoría';
    };

    // Cierra el modal
    const cerrarModal = () => {
        document.getElementById('modal').classList.add('hidden');
    };

    // Abre el modal para editar categoría

    // Manejador del formulario
    /*
    const submit = () => {
        alert('Categoría registrada o editada');
        cerrarModal();
    }
    document.getElementById('formularioCategoria').addEventListener('submit', function (e) {
        e.preventDefault();
        
    });
    */
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [url, setUrl] = useState('');

    const enviarDatos = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            // Cuerpo del POST request
            const cuerpo = JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                imagen: url
            });

            const request = new Request("https://compusave-backend.onrender.com/post/categoria", {
                method: "POST",
                headers: headers,
                body: cuerpo,
            });

            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {
                console.log('Datos enviados correctamente:', resultado);
                // Aquí puedes resetear el formulario o mostrar una notificación
                setNombre('');
                setDescripcion('');
                setUrl('');
                // Cierra modal
                cerrarModal();
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    };


    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos

    useEffect(() => {
        const obtenerDatos = async () => {
            
            try {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const request = new Request("https://compusave-backend.onrender.com/get/categorias", {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const datos = await response.json();

                const categorias = datos.map((x) => {
                    return <DashboardCategoriaFila key={x.id} {...x} />
                });

                setMostrar(categorias);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();

        
    }, []);

    return (
        <>
            <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Categoría</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Nombre de Categoría</label>
                            <input type="text" id="nombreCategoria" onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Descripción</label>
                            <textarea id="descripcionCategoria" onChange={(e) => setDescripcion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Imagen</label>
                            <input type="text" id="nombreCategoria" onChange={(e) => setUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={enviarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Categorías de Productos</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nueva categoría
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">NOMBRE</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">DESCRIPCIÓN</th>
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
    )
}