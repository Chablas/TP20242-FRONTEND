import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2"

export default function Categoria() {
    const abrirModal = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Usuario';
    };

    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        for (const modal of modales) {
            modal.classList.add('hidden');
        }
    };

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarFilas, setMostrarFilas] = useState([]);

    const enviarDatos = async (e) => {
        e.preventDefault();

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const cuerpo = JSON.stringify({
                email: email,
                password: password,
            });

            const request = new Request("https://compusave-backend.onrender.com/post/usuarios", {
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
                setId('');
                setEmail('');
                setPassword('');
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
    };

    const obtenerDatosYActualizarFilas = async () => {
            
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request("https://compusave-backend.onrender.com/get/usuarios", {
                method: "GET",
                headers: headers,
            });
            const response = await fetch(request);
            const datos = await response.json();

            const categorias = datos.map((x) => {
                return <DashboardCategoriaFila key={x.id} {...x} setId={setId} setEmail={setEmail} setPassword={setPassword} />
            });

            setMostrarFilas(categorias);
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

    return (
        <>
            <div id="modalAgregar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50 btnCerrarModal">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Usuario</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Email de Usuario</label>
                            <input type="text" id="nombreCategoria" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Contraseña</label>
                            <textarea id="descripcionCategoria" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
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
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Editar Usuario {email}</h2>
                    <form id="formularioCategoria">
                        <div className="mb-4">
                            <label htmlFor="nombreCategoria" className="block text-gray-700">Email de Usuario</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionCategoria" className="block text-gray-700">Contraseña</label>
                            <textarea value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>

                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Usuarios</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nuevo usuario
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#394050]">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-300">CORREO</th>
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

function DashboardCategoriaFila(props) {
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Usuario ';
        props.setId(props.id);
        props.setEmail(props.email);
        props.setPassword(props.password);
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
            <td className="text-white font-light py-2 px-4">{props.id}</td>
            <td className="text-white font-light py-2 px-4">{props.email}</td>
        </tr>
        
        </>
    )
}