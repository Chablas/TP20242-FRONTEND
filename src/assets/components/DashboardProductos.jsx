import React, { useEffect, useState } from 'react';

export default function DashboardProductos() {
    const abrirModal = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Bien';
    };

    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        for (const modal of modales) {
            modal.classList.add('hidden');
        }
    };

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [informacion_general, setInformacionGeneral] = useState('');
    const [precio, setPrecio] = useState('');
    const [garantia, setGarantia] = useState('');
    const [estado, setEstado] = useState('');
    const [imagen, setImagen] = useState('');
    const [marca, setMarca] = useState('');
    const [especificaciones_tecnicas, setEspecificacionesTecnicas] = useState('');
    const [categoria_id, setCategoriaId] = useState('');
    const [categoria_nombre, setCategoriaNombre] = useState('');


    const enviarDatos = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            // Cuerpo del POST request
            const cuerpo = JSON.stringify({
                nombre: nombre,
                informacion_general: informacion_general,
                precio: precio,
                garantia: garantia,
                estado: estado,
                imagen: imagen,
                marca: marca,
                especificaciones_tecnicas: especificaciones_tecnicas,
                categoria_id: categoria_id,
            });

            const request = new Request("https://compusave-backend.onrender.com/post/bien", {
                method: "POST",
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
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setImagen('');
                setMarca('');
                setEspecificacionesTecnicas('');
                setCategoriaId('');
                // Cierra modal
                cerrarModal();
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
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
                informacion_general: informacion_general,
                precio: precio,
                garantia: garantia,
                estado: estado,
                imagen: imagen,
                marca: marca,
                especificaciones_tecnicas: especificaciones_tecnicas,
                categoria_id: categoria_id,
            });
            
            const request = new Request(`https://compusave-backend.onrender.com/put/bien/${id}`, {
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
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setImagen('');
                setMarca('');
                setEspecificacionesTecnicas('');
                setCategoriaId('');
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
            console.log("asdasd");
            console.log(id);
            const request = new Request(`https://compusave-backend.onrender.com/delete/bien/${id}`, {
                method: "DELETE",
                headers: headers,
            });

            const response = await fetch(request);
            const resultado = await response.json();
            
            if (response.ok) {
                console.log('Datos enviados correctamente:', resultado);
                // Aquí puedes resetear el formulario o mostrar una notificación
                setId('');
                setNombre('');
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setImagen('');
                setMarca('');
                setEspecificacionesTecnicas('');
                setCategoriaId('');
                // Cierra modal
                cerrarModal();
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
        }
    }


    const [mostrar, setMostrar] = useState([]); // Estado para guardar los datos

    useEffect(() => {
        const obtenerDatos = async () => {
            
            try {
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const request = new Request("https://compusave-backend.onrender.com/get/bienes", {
                    method: "GET",
                    headers: headers,
                });
                const response = await fetch(request);
                const bienesJS = await response.json();

                request = new Request("https://compusave-backend.onrender.com/get/categorias", {
                    method: "GET",
                    headers: headers,
                });
                response = await fetch(request);
                const categoriaJS = await response.json();

                const bienes = bienesJS.map((x) => {
                    return <DashboardProductosFila key={x.id}
                    {...x}
                    setId={setId}
                    setNombre={setNombre}
                    setInformacionGeneral={setInformacionGeneral}
                    setPrecio={setPrecio}
                    setGarantia={setGarantia}
                    setEstado={setEstado}
                    setImagen={setImagen}
                    setMarca={setMarca}
                    setEspecificacionesTecnicas={setEspecificacionesTecnicas}
                    setCategoriaId={setCategoriaId}
                    eliminarDatos={eliminarDatos}
                    />
                });

                setMostrar(bienes);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();

        
    }, []);

    return (
        <>
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Bien</h2>
                    <form id="formularioBienPOST">
                        <div className="mb-4">
                            <label htmlFor="nombreBien" className="block text-gray-700">Nombre de Bien</label>
                            <input id="nombreBien" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="informacionGeneralBien" className="block text-gray-700">Información General</label>
                            <textarea id="informacionGeneralBien" value={informacion_general} onChange={(e) => setInformacionGeneral(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="precioBien" className="block text-gray-700">Precio</label>
                            <input id="precioBien" type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="garantiaBien" className="block text-gray-700">Garantía</label>
                            <input id="garantiaBien" type="text" value={garantia} onChange={(e) => setGarantia(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="estadoBien" className="block text-gray-700">Estado</label>
                            <input id="estadoBien" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imagenBien" className="block text-gray-700">Imagen</label>
                            <input id="imagenBien" type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBien" className="block text-gray-700">Marca</label>
                            <input id="marcaBien" type="text" value={marca} onChange={(e) => setMarca(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="especificacionesTecnicasBien" className="block text-gray-700">Especificaciones Técnicas</label>
                            <input id="especificacionesTecnicasBien" type="text" value={especificaciones_tecnicas} onChange={(e) => setEspecificacionesTecnicas(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoriaIdBien" className="block text-gray-700">Categoría</label>
                            <input id="categoriaIdBien" type="text" value={categoria_id} onChange={(e) => setCategoriaId(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
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
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Editar Bien {nombre}</h2>
                    <form id="formularioBienPUT">
                    <div className="mb-4">
                            <label htmlFor="nombreBien" className="block text-gray-700">Nombre de Bien</label>
                            <input id="nombreBien" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="informacionGeneralBien" className="block text-gray-700">Información General</label>
                            <textarea id="informacionGeneralBien" value={informacion_general} onChange={(e) => setInformacionGeneral(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="precioBien" className="block text-gray-700">Precio</label>
                            <input id="precioBien" type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="garantiaBien" className="block text-gray-700">Garantía</label>
                            <input id="garantiaBien" type="text" value={garantia} onChange={(e) => setGarantia(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="estadoBien" className="block text-gray-700">Estado</label>
                            <input id="estadoBien" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imagenBien" className="block text-gray-700">Imagen</label>
                            <input id="imagenBien" type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBien" className="block text-gray-700">Marca</label>
                            <input id="marcaBien" type="text" value={marca} onChange={(e) => setMarca(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="especificacionesTecnicasBien" className="block text-gray-700">Especificaciones Técnicas</label>
                            <input id="especificacionesTecnicasBien" type="text" value={especificaciones_tecnicas} onChange={(e) => setEspecificacionesTecnicas(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoriaIdBien" className="block text-gray-700">Categoría</label>
                            <input id="categoriaIdBien" type="text" value={categoria_id} onChange={(e) => setCategoriaId(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestionar Bienes</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nuevo Bien
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">NOMBRE</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">INFORMACIÓN GENERAL</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">PRECIO</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">GARANTIA</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ESTADO</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">IMAGEN</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">MARCA</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">ESPECIFICACIONES TÉCNICAS</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">CATEGORÍA</th>
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

function DashboardProductosFila(props) {
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Bien ';
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setInformacionGeneral(props.informacion_general);
        props.setPrecio(props.precio);
        props.setGarantia(props.garantia);
        props.setEstado(props.estado);
        props.setImagen(props.imagen);
        props.setMarca(props.marca);
        props.setEspecificacionesTecnicas(props.especificaciones_tecnicas);
        props.setCategoriaId(props.categoria_id);
    };

    // Simulación de eliminar categoría
    const eliminarDato = () => {
        props.setId(props.id);
        if (confirm('¿Estás seguro de eliminar el bien ' + props.id + '?')) {
            props.eliminarDatos(props.id);
            alert('Bien ' + props.id + ' eliminada.');
            // Aquí iría el código para eliminar la categoría en tu sistema
        }
    };

    return (
        <>
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.id}</td>
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.informacion_general}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.precio}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.garantia}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.estado}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.imagen}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.marca}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.especificaciones_tecnicas}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.categoria_id}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarDato}>Eliminar</button>
            </td>
        </tr>
        
        </>
    )
}