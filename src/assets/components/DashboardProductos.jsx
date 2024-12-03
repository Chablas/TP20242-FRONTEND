import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";

export default function DashboardProductos() {
    const abrirModal = () => {
        setId('');
        setNombre('');
        setInformacionGeneral('');
        setPrecio('');
        setGarantia('');
        setEstado(false); // Cambiado a booleano
        setImagen('');
        setMarca('');
        setEspecificacionesTecnicas('');
        setCategoriaId('');
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
    const [estado, setEstado] = useState(false); // Cambiado a booleano
    const [imagen, setImagen] = useState(null);
    const [marca, setMarca] = useState('');
    const [especificaciones_tecnicas, setEspecificacionesTecnicas] = useState('');
    const [categoria_id, setCategoriaId] = useState('');

    const [bienes, setBienes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [mostrarFilas, setMostrarFilas] = useState([]);
    const [categoriasOpciones, setCategoriasOpciones] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    const enviarDatos = async (e) => {
        e.preventDefault();
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            if (opcionSeleccionada === "") {
                Swal.fire({
                    title: "Por favor seleccione una categoría.",
                    icon: "error"
                });
                return;
            }

            const cuerpo = JSON.stringify({
                nombre: nombre,
                informacion_general: informacion_general,
                precio: precio,
                garantia: garantia,
                estado: estado, // Ahora es booleano
                imagen: "imagen",
                marca: marca,
                especificaciones_tecnicas: especificaciones_tecnicas,
                categoria_id: opcionSeleccionada,
            });

            console.log(cuerpo);

            const request = new Request("https://compusave-backend.onrender.com/post/bien", {
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
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setMarca('');
                setEspecificacionesTecnicas('');
                setCategoriaId('');

                const headers2 = new Headers();
                headers2.append("Content-Type", "application/json");
                const request2 = new Request(`https://compusave-backend.onrender.com/get/bien/${resultado.detail}`, {
                    method: "GET",
                    headers: headers2,
                });
        
                const response2 = await fetch(request2);
                const datos = await response2.json();
                const request3 = new Request(`https://compusave-backend.onrender.com/put/bien/subir_imagen/${datos.id}`, {
                    method: "PUT",
                    body: formData,
                });
                const response3 = await fetch(request3);
                const resultado3 = await response3.json();
                if (response3.ok) {
                    Swal.fire({
                        title: `Producto registrado exitosamente`,
                        icon: "success"
                    });
                    cerrarModal();
                    obtenerDatosYActualizarFilas();
                }
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                })
            }
        } catch (error) {
            Swal.fire({
                title: `Hubo un error...`,
                icon: "error"
            })
        }
    };

    const editarDatos = async (e) => {
        e.preventDefault();

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const cuerpo = JSON.stringify({
                nombre: nombre,
                informacion_general: informacion_general,
                precio: precio,
                garantia: garantia,
                estado: Boolean(estado),
                imagen: "imagen",
                marca: marca,
                especificaciones_tecnicas: especificaciones_tecnicas,
                categoria_id: categoria_id
            });
            
            const request = new Request(`https://compusave-backend.onrender.com/put/bien/${id}`, {
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
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setMarca('');
                setEspecificacionesTecnicas('');
                setCategoriaId('');
                const headers2 = new Headers();
                headers2.append("Content-Type", "application/json");
                const request2 = new Request(`https://compusave-backend.onrender.com/get/bien/${resultado.detail}`, {
                    method: "GET",
                    headers: headers2,
                });
        
                const response2 = await fetch(request2);
                const datos = await response2.json();
                const request3 = new Request(`https://compusave-backend.onrender.com/put/bien/subir_imagen/${datos.id}`, {
                    method: "PUT",
                    body: formData,
                });
                const response3 = await fetch(request3);
                const resultado3 = await response3.json();
                if (response3.ok) {
                    Swal.fire({
                        title: `Producto actualizado exitosamente`,
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
                title: `Hubo un error...`,
                icon: "error"
            });
        }
    }

    const eliminarDatos = async (id) => {

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request(`https://compusave-backend.onrender.com/delete/bien/${id}`, {
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
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setImagen('');
                setMarca('');
                setEspecificacionesTecnicas('');
                setCategoriaId('');
                cerrarModal();
                obtenerDatosYActualizarFilas();
            } else {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: `Hubo un error...`,
                icon: "error"
            });
        }
    }
      
    const obtenerDatosYActualizarFilas = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const requestCategorias = new Request("https://compusave-backend.onrender.com/get/categorias", {
                method: "GET",
                headers: headers,
            });
            const responseCategorias = await fetch(requestCategorias);
            const datosCategorias = await responseCategorias.json();
            const categoriaOpciones = datosCategorias.map((x) => (
                <CategoriaOption key={x.id} {...x} setCategoriaId={setCategoriaId} />
                
            ));
            
            setCategorias(datosCategorias);
            setCategoriasOpciones(categoriaOpciones);

            

            const requestBienes = new Request("https://compusave-backend.onrender.com/get/bienes", {
                method: "GET",
                headers: headers,
            });
            const responseBienes = await fetch(requestBienes);
            const datosBienes = await responseBienes.json();
            const bienesFilas = datosBienes.map((x, index) => (
                <DashboardProductosFila
                    key={x.id}
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
                    categorias={datosCategorias}
                    index={index + 1} // Pasar el índice como prop
                />
            ));
            setBienes(datosBienes);
            setMostrarFilas(bienesFilas);

        } catch (error) {
            Swal.fire({
                title: `Hubo un error...`,
                icon: "error"
            });
        }
    };

    useEffect(() => {
        obtenerDatosYActualizarFilas();
    }, []);

    return (
        <>
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-start z-50 btnCerrarModal overflow-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Producto</h2>
                    <form id="formularioBienPOST">
                        <div className="mb-4">
                            <label htmlFor="nombreBien" className="block text-gray-700">Nombre de Producto</label>
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
                            <select id="estadoBien" className="w-full px-4 py-2 border rounded-lg" value={estado ? "Activo" : "Inactivo"} onChange={(e) => setEstado(e.target.value === "Activo")} required>
                                <option value="">Seleccionar estado</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imagenBien" className="block text-gray-700">Imagen</label>
                            <input type="file" id="nombreCategoria" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} className="w-full px-4 py-2 border rounded-lg" required />
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
                            <select id="categoriaIdBien" className="w-full px-4 py-2 border rounded-lg" value={opcionSeleccionada} onChange={e =>setOpcionSeleccionada(e.target.value)} required>
                                <option value="">Seleccionar una categoría</option>
                                {categoriasOpciones}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={enviarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="modalEditar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-start z-50 btnCerrarModal overflow-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModalEditar" className="text-xl font-bold mb-4">Editar Producto {nombre}</h2>
                    <form id="formularioBienPUT">
                    <div className="mb-4">
                            <label htmlFor="nombreBienPUT" className="block text-gray-700">Nombre de Producto</label>
                            <input id="nombreBienPUT" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="informacionGeneralBienPUT" className="block text-gray-700">Información General</label>
                            <textarea id="informacionGeneralBienPUT" value={informacion_general} onChange={(e) => setInformacionGeneral(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="precioBienPUT" className="block text-gray-700">Precio</label>
                            <input id="precioBienPUT" type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="garantiaBienPUT" className="block text-gray-700">Garantía</label>
                            <input id="garantiaBienPUT" type="text" value={garantia} onChange={(e) => setGarantia(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="estadoBien" className="block text-gray-700"> Estado </label>
                            <select id="estadoBien" className="w-full px-4 py-2 border rounded-lg" value={estado ? "Activo" : "Inactivo"} onChange={(e) => setEstado(e.target.value === "Activo")}required>
                                <option value="" disabled selected>Seleccionar estado</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imagenBienPUT" className="block text-gray-700">Imagen</label>
                            <input type="file" id="nombreCategoria" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBienPUT" className="block text-gray-700">Marca</label>
                            <input id="marcaBienPUT" type="text" value={marca} onChange={(e) => setMarca(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="especificacionesTecnicasBienPUT" className="block text-gray-700">Especificaciones Técnicas</label>
                            <input id="especificacionesTecnicasBienPUT" type="text" value={especificaciones_tecnicas} onChange={(e) => setEspecificacionesTecnicas(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoriaIdBienPUT" className="block text-gray-700">Categoría</label>
                            <select id="categoriaIdBienPUT" className="w-full px-4 py-2 border rounded-lg" value={opcionSeleccionada} onChange={e =>setOpcionSeleccionada(e.target.value)} required>
                                <option value="">Seleccionar una categoría</option>
                                {categoriasOpciones}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestionar Productos</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nuevo Producto
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
                            {mostrarFilas}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

function DashboardProductosFila(props) {
    let n_categoria;
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModalEditar').textContent = 'Editar Bien ';
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

    const eliminarDato = () => {
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
    
    for (const categoria of props.categorias) {
        if (categoria.id == props.categoria_id) {
            n_categoria = categoria.nombre;
        }
    }

    return (
        <>
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.index}</td>
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.informacion_general}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.precio}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.garantia}</td>
            <td className="text-white font-light text-center py-2 px-4">
                {props.estado ? "Activo" : "Inactivo"}
            </td>
            <td className="text-white font-light text-center py-2 px-4">
                {props.imagen ? "Imagen Cargada" : "sin imagen"}
            </td>
            <td className="text-white font-light text-center py-2 px-4">{props.marca}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.especificaciones_tecnicas}</td>
            <td className="text-white font-light text-center py-2 px-4">{n_categoria}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarDato}>Eliminar</button>
            </td>
        </tr>
        
        </>
    )
}

function CategoriaOption(props) {
    return (
        <option value={props.id} >{props.nombre}</option>
    )
}

