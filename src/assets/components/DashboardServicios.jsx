import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";

export default function DashboardServicios() {
    const abrirModal = () => {
        setId('');
        setNombre('');
        setInformacionGeneral('');
        setPrecio('');
        setGarantia('');
        setEstado('');
        setImagen('');
        setCondicionesPrevias("");
        setServicioIncluye('');
        setServicioNoIncluye('');
        setRestricciones('');
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Servicio';
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
    const [condiciones_previas, setCondicionesPrevias] = useState('');
    const [servicio_incluye, setServicioIncluye] = useState('');
    const [servicio_no_incluye, setServicioNoIncluye] = useState('');
    const [restricciones, setRestricciones] = useState('');

    const [bienes, setBienes] = useState([]);
    const [mostrarFilas, setMostrarFilas] = useState([]);


    const enviarDatos = async (e) => {
        e.preventDefault();
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const cuerpo = JSON.stringify({
                nombre: nombre,
                informacion_general: informacion_general,
                precio: precio,
                garantia: garantia,
                estado: estado,
                imagen: imagen,
                condiciones_previas: condiciones_previas,
                servicio_incluye: servicio_incluye,
                servicio_no_incluye: servicio_no_incluye,
                restricciones: restricciones,
            });

            const request = new Request("https://compusave-backend.onrender.com/post/servicios", {
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
                })
                setId('');
                setNombre('');
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setImagen('');
                setCondicionesPrevias("");
                setServicioIncluye('');
                setServicioNoIncluye('');
                setRestricciones('');
                cerrarModal();
                obtenerDatosYActualizarFilas();
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
                estado: estado,
                imagen: imagen,
                condiciones_previas: condiciones_previas,
                servicio_incluye: servicio_incluye,
                servicio_no_incluye: servicio_no_incluye,
                restricciones: restricciones,
            });
            
            const request = new Request(`https://compusave-backend.onrender.com/put/servicio/${id}`, {
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
                setNombre('');
                setInformacionGeneral('');
                setPrecio('');
                setGarantia('');
                setEstado('');
                setImagen('');
                setCondicionesPrevias("");
                setServicioIncluye('');
                setServicioNoIncluye('');
                setRestricciones('');
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

    const eliminarDatos = async (id) => {

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request(`https://compusave-backend.onrender.com/delete/servicio/${id}`, {
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
                setCondicionesPrevias("");
                setServicioIncluye('');
                setServicioNoIncluye('');
                setRestricciones('');
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
            const requestBienes = new Request("https://compusave-backend.onrender.com/get/servicios", {
                method: "GET",
                headers: headers,
            });
            const responseBienes = await fetch(requestBienes);
            const datosBienes = await responseBienes.json();
            const bienesFilas = datosBienes.map((x) => (
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
                    setCondicionesPrevias={setCondicionesPrevias}
                    setServicioIncluye={setServicioIncluye}
                    setServicioNoIncluye={setServicioNoIncluye}
                    setRestricciones={setRestricciones}
                    eliminarDatos={eliminarDatos}
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
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Servicio</h2>
                    <form id="formularioBienPOST">
                        <div className="mb-4">
                            <label htmlFor="nombreBien" className="block text-gray-700">Nombre de Servicio</label>
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
                            <label htmlFor="marcaBien" className="block text-gray-700">Condiciones Previas</label>
                            <input id="marcaBien" type="text" value={condiciones_previas} onChange={(e) => setCondicionesPrevias(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBien" className="block text-gray-700">Incluye</label>
                            <input id="marcaBien" type="text" value={servicio_incluye} onChange={(e) => setServicioIncluye(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBien" className="block text-gray-700">No incluye</label>
                            <input id="marcaBien" type="text" value={servicio_no_incluye} onChange={(e) => setServicioNoIncluye(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBien" className="block text-gray-700">Restricciones</label>
                            <input id="marcaBien" type="text" value={restricciones} onChange={(e) => setRestricciones(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
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
                    <h2 id="tituloModalEditar" className="text-xl font-bold mb-4">Editar Bien {nombre}</h2>
                    <form id="formularioBienPUT">
                    <div className="mb-4">
                            <label htmlFor="nombreBienPUT" className="block text-gray-700">Nombre de Bien</label>
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
                            <label htmlFor="estadoBienPUT" className="block text-gray-700">Estado</label>
                            <input id="estadoBienPUT" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="imagenBienPUT" className="block text-gray-700">Imagen</label>
                            <input id="imagenBienPUT" type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBienPUT" className="block text-gray-700">Condiciones Previas</label>
                            <input id="marcaBienPUT" type="text" value={condiciones_previas} onChange={(e) => setCondicionesPrevias(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBienPUT" className="block text-gray-700">Incluye</label>
                            <input id="marcaBienPUT" type="text" value={servicio_incluye} onChange={(e) => setServicioIncluye(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBienPUT" className="block text-gray-700">No incluye</label>
                            <input id="marcaBienPUT" type="text" value={servicio_no_incluye} onChange={(e) => setServicioNoIncluye(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="marcaBienPUT" className="block text-gray-700">Restricciones</label>
                            <input id="marcaBienPUT" type="text" value={restricciones} onChange={(e) => setRestricciones(e.target.value)} maxLength="1000" className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={editarDatos}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestionar Servicios</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nuevo Servicio
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
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">CONDICIONES PREVIAS</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">INCLUYE</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">NO INCLUYE</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-300">RESTRICCIONES</th>
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
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModalEditar').textContent = 'Editar Servicio ';
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setInformacionGeneral(props.informacion_general);
        props.setPrecio(props.precio);
        props.setGarantia(props.garantia);
        props.setEstado(props.estado);
        props.setImagen(props.imagen);
        props.setCondicionesPrevias(props.condiciones_previas);
        props.setServicioIncluye(props.servicio_incluye);
        props.setServicioNoIncluye(props.servicio_no_incluye);
        props.setRestricciones(props.restricciones);
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
            <td className="text-white font-light text-center py-2 px-4">{props.condiciones_previas}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.servicio_incluye}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.servicio_no_incluye}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.restricciones}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarDato}>Eliminar</button>
            </td>
        </tr>
        
        </>
    )
}