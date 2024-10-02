import React, { useEffect, useState } from 'react';
import DashboardProveedoresFila from "./DashboardProveedoresFila";

export default function Proveedor() {
    // Abre el modal
    const abrirModal = () => {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Proveedor';
    };

    // Cierra el modal
    const cerrarModal = () => {
        document.getElementById('modal').classList.add('hidden');
    };

    // Abre el modal para editar Proveedor

    // Manejador del formulario
    /*
    const submit = () => {
        alert('Proveedor registrada o editada');
        cerrarModal();
    }
    document.getElementById('formularioProveedor').addEventListener('submit', function (e) {
        e.preventDefault();
        
    });
    */
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [url, setUrl] = useState('');
    const [ruc, setRuc] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const enviar=(e)=>{
        if(id == ''){
            registrarDatos(e)
        }else{
        editarDatos(e)
        }
    }

    const registrarDatos = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            // Cuerpo del POST request
            const cuerpo = JSON.stringify({
                nombre: nombre,
                ruc: ruc,
                direccion: direccion,
                correo: correo,
                telefono: telefono,
              /*   descripcion: descripcion, */
                /* imagen: url */
                //falta agregar los valores de la BD (esperar hasta que se cree la tabla)
            });

            const request = new Request("https://compusave-backend.onrender.com/post/proveedor", {
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
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                // Cierra modal
                cerrarModal();
                 //Recarga la tabla
                 obtenerDatos();
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

            // Cuerpo del POST request
            const cuerpo = JSON.stringify({
                nombre: nombre,
                ruc: ruc,
                direccion: direccion,
                correo: correo,
                telefono: telefono,
              /*   descripcion: descripcion, */
                /* imagen: url */
                //falta agregar los valores de la BD (esperar hasta que se cree la tabla)
            });

            const request = new Request(`https://compusave-backend.onrender.com/put/proveedor/${id}`, {
                method: "PUT",
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
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                // Cierra modal
              
                cerrarModal();
                //Recarga la tabla
                obtenerDatos();
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
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
                console.log('Datos enviados correctamente:', resultado);
                // Aquí puedes resetear el formulario o mostrar una notificación
                setNombre('');
                setDescripcion('');
                setUrl('');
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                obtenerDatos();
            } else {
                console.error('Error en el envío:', resultado);
            }
        } catch (error) {
            console.error('Error en la conexión con el servidor:', error);
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

            const proveedores = datos.map((x) => {
                return <DashboardProveedoresFila setId={setId} eliminar={eliminar} key={x.id} {...x} />
            });

            setMostrar(proveedores);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        
        obtenerDatos();

    }, []);

    return (
        <>
            <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Registrar Proveedor</h2>
                    <form id="formularioProveedor">
                        <div className="mb-4">
                            <label htmlFor="nombreProveedor" className="block text-gray-700">Nombre de Proveedor</label>
                            <input type="text" id="nombreProveedor" onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreProveedor" className="block text-gray-700">Numero de RUC</label>
                            <input type="text" id="nombreProveedor" onChange={(e) => setRuc(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcionProveedor" className="block text-gray-700">Direccion</label>
                            <textarea id="descripcionProveedor" onChange={(e) => setDireccion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreProveedor" className="block text-gray-700">Correo</label>
                            <input type="text" id="nombreProveedor" onChange={(e) => setCorreo(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombreProveedor" className="block text-gray-700">Telefono</label>
                            <input type="text" id="nombreProveedor" onChange={(e) => setTelefono(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={enviar}>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <main className="p-6">
                <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Proveedores</h1>
                <div className="mt-5" >
                    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                        Agregar nuevo Proveedor
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
                        <tbody>
                            {mostrar}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}