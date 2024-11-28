import React, { useEffect, useState } from 'react'; 
import * as XLSX from 'xlsx'; // Importar SheetJS para exportar a Excel
import Swal from "sweetalert2";

export default function Categoria() {
    const abrirModal = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Categoría';
    };

    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        modales.forEach(modal => modal.classList.add('hidden'));
    };

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [url, setUrl] = useState('');
    const [mostrarFilas, setMostrarFilas] = useState([]);
    const [imagen, setImagen] = useState(null);

    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const cuerpo = JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                imagen: "url"
            });

            const request = new Request("https://compusave-backend.onrender.com/post/categoria", {
                method: "POST",
                headers: headers,
                body: cuerpo,
            });

            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {
                const formData = new FormData();
                formData.append("file", imagen);
                setId('');
                setNombre('');
                setDescripcion('');
                setUrl('');

                const headers2 = new Headers();
                headers2.append("Content-Type", "application/json");
                const request2 = new Request(`https://compusave-backend.onrender.com/get/categoria/${resultado.detail}`, {
                    method: "GET",
                    headers: headers2,
                });
        
                const response2 = await fetch(request2);
                const datos = await response2.json();
                const request3 = new Request(`https://compusave-backend.onrender.com/put/categoria/subir_imagen/${datos.id}`, {
                    method: "PUT",
                    body: formData,
                });
                const response3 = await fetch(request3);
                const resultado3 = await response3.json();
                if (response3.ok) {
                    Swal.fire({
                        title: `Categoría registrada exitosamente`,
                        icon: "success"
                    });
                    cerrarModal();
                    obtenerDatosYActualizarFilas();
                }

                
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


    const editarDatos = async (e) => {
        e.preventDefault();
    
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            const cuerpo = JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                imagen: "url"
            });
    
            const request = new Request(`https://compusave-backend.onrender.com/put/categoria/${id}`, {
                method: "PUT",
                headers: headers,
                body: cuerpo,
            });
    
            const response = await fetch(request);
            const resultado = await response.json();
    
            if (response.ok) {
                const formData = new FormData();
                formData.append("file", imagen);
                setId('');
                setNombre('');
                setDescripcion('');
                setUrl('');

                const headers2 = new Headers();
                headers2.append("Content-Type", "application/json");
                const request2 = new Request(`https://compusave-backend.onrender.com/get/categoria/${resultado.detail}`, {
                    method: "GET",
                    headers: headers2,
                });
        
                const response2 = await fetch(request2);
                const datos = await response2.json();
                const request3 = new Request(`https://compusave-backend.onrender.com/put/categoria/subir_imagen/${datos.id}`, {
                    method: "PUT",
                    body: formData,
                });
                const response3 = await fetch(request3);
                const resultado3 = await response3.json();
                if (response3.ok) {
                    Swal.fire({
                        title: `Categoría actualizada exitosamente`,
                        icon: "success"
                    });
                    cerrarModal();
                    obtenerDatosYActualizarFilas();
                }
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error en la edición:', error);
            Swal.fire({
                title: `Hubo un error al editar la categoría.`,
                icon: "error"
            });
        }
    }
    
    const eliminarDatos = async (id) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request(`https://compusave-backend.onrender.com/delete/categoria/${id}`, {
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
                setId('');
                setNombre('');
                setDescripcion('');
                setUrl('');
                cerrarModal();
                obtenerDatosYActualizarFilas();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire({
                title: `Hubo un error al eliminar la categoría.`,
                icon: "error"
            });
        }
    }
    
    const obtenerDatosYActualizarFilas = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/categorias", {
                method: "GET",
                headers: headers,
            });
    
            const response = await fetch(request);
            const datos = await response.json();
    
            // Generamos las filas para el componente DashboardCategoriaFila
            const categorias = datos.map((x, index) => (
                <DashboardCategoriaFila
                    key={x.id}
                    {...x}
                    setId={setId}
                    setNombre={setNombre}
                    setDescripcion={setDescripcion}
                    setUrl={setUrl}
                    eliminarDatos={eliminarDatos}
                    index={index + 1}
                />
            ));
    
            setMostrarFilas(categorias);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            Swal.fire({
                title: `Hubo un error al obtener las categorías.`,
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
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Categoría</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Nombre de Categoría</label>
                            <input type="text" id="nombreCategoria" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Descripción</label>
                            <textarea id="descripcionCategoria" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Imagen</label>
                            <input type="file" id="nombreCategoria" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} className="w-full px-4 py-2 border rounded-lg" required />
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
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Editar Categoría {nombre}</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Nombre de Categoría</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Descripción</label>
                            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Imagen</label>
                            <input type="file" id="nombreCategoria" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Categorías de Productos</h1>
                <div className="mt-5">
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nueva categoría
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
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">DESCRIPCIÓN</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">IMAGEN</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostrarFilas}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
    
    function DashboardCategoriaFila(props) {
        const abrirModalEdicion = () => {
            document.getElementById('modalEditar').classList.remove('hidden');
            document.getElementById('tituloModal').textContent = 'Editar Categoría ';
            props.setId(props.id);
            props.setNombre(props.nombre);
            props.setDescripcion(props.descripcion);
            props.setUrl(props.imagen);
        };
    
        const eliminarCategoria = () => {
            props.setId(props.id);
            Swal.fire({
                title: "¿Está seguro?",
                text: "No se podrá rehacer una vez eliminado",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, elimínalo"
            }).then((result) => {
                if (result.isConfirmed) {
                    props.eliminarDatos(props.id);
                }
            });
        };
    
        return (
            <>
            <tr className="border-b border-b-[#394050]">
                <td className="text-white font-light py-2 px-4">{props.index}</td>
                <td className="text-white font-light py-2 px-4">{props.nombre}</td>
                <td className="text-white font-light text-center py-2 px-4">{props.descripcion}</td>
                <td className="text-white font-light text-center py-2 px-4 truncate max-w-xs break-words">Imagen Cargada</td>
                <td className="text-white font-light text-center py-2 px-4">
                    <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                    <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarCategoria}>Eliminar</button>
                </td>
            </tr>
            
            </>
        )
    }
}    