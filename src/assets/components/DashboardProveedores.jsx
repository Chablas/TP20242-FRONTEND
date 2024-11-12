

import React, { useEffect, useState } from 'react';

export default function Proveedor() {
    // Abre el modal para agregar
    const abrirModalAgregar = () => {
        document.getElementById('modalAgregar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Registrar Proveedor';
    };

    // Cierra el modal
    const cerrarModal = () => {
        const modales = document.querySelectorAll("div.btnCerrarModal");
        for (const modal of modales) {
            modal.classList.add('hidden');
        }
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
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [ruc, setRuc] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');


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
            
         if (!nombre || !ruc || !direccion || !correo || !telefono) {
                /*setErrorMessage('Todos los campos son obligatorios.');*/
                Swal.fire({
                    title: "Todos los campos son obligatorios.",
        
                    icon: "error"
                  });

                return; // Salir si hay campos vacíos
         }
         

    // Validación de que RUC sea un número
    if (isNaN(ruc)) {
        /*setErrorMessage('El RUC debe ser un número.');*/
        Swal.fire({
            title: "El RUC debe ser un número",

            icon: "error"
          });


        return; // Salir si RUC no es un número
    }

    if (isNaN(telefono)) {
        /*setErrorMessage('El telefono debe ser un número.');*/
        Swal.fire({
            title: "El telefono debe ser un número.",

            icon: "error"
          });
        return; // Salir si RUC no es un número
    }    

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        Swal.fire({
            title: "El correo electrónico debe tener un formato válido (ejemplo@dominio.com).",
            icon: "error"
        });
        return; // Salir si el formato de correo no es válido
    }


            if (response.ok) {
          //      console.log('Datos enviados correctamente:', resultado);
          Swal.fire({
            title: `${resultado.detail}`,
            icon:"success"
    
        })
                // Aquí puedes resetear el formulario o mostrar una notificación
                setNombre('');
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                // Cierra modal
                cerrarModal();
                obtenerDatos();
            } else {
             //   console.error('Error en el envío:', resultado);
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon:"error"
            
                })
            }
        } catch (error) {

            
           // console.error('Error en la conexión con el servidor:', error);
           Swal.fire({
            title: `Hubo un error...`,
            icon:"error"
    
            })
        }
    };

    const editar =  async (e) => {
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

            if (!nombre || !ruc || !direccion || !correo || !telefono) {
                /*setErrorMessage('Todos los campos son obligatorios.');*/
                Swal.fire({
                    title: "Todos los campos son obligatorios.",
        
                    icon: "error"
                  });

                return; // Salir si hay campos vacíos
          }
         

            // Validación de que RUC sea un número
            if (isNaN(ruc)) {
                /*setErrorMessage('El RUC debe ser un número.');*/
                Swal.fire({
                    title: "El RUC debe ser un número",

                    icon: "error"
                });


                return; // Salir si RUC no es un número
            }

            if (isNaN(telefono)) {
                /*setErrorMessage('El telefono debe ser un número.');*/
                Swal.fire({
                    title: "El telefono debe ser un número.",

                    icon: "error"
                });
                return; // Salir si RUC no es un número
            }    

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                Swal.fire({
                    title: "El correo electrónico debe tener un formato válido (ejemplo@dominio.com).",
                    icon: "error"
                });
                return; // Salir si el formato de correo no es válido
            }
                    
            if (response.ok) {
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: 'success',
                  })
                // console.log('Datos enviados correctamente:', resultado);
                // Aquí puedes resetear el formulario o mostrar una notificación
                setNombre('');
                setRuc('');
                setDireccion('');
                setCorreo('');
                setTelefono('');
                // Cierra modal

                cerrarModal();
                //Recarga la tabla
                obtenerDatos();                
            } else {
                // console.error('Error en el envío:', resultado);
                Swal.fire({
                    title: `${resultado.detail}`,
                    icon: 'error',
                })
            }
        } catch (error) {
            // console.error('Error en la conexión con el servidor:', error);
            Swal.fire({
                title: `${resultado.detail}`,
                icon: 'error',
            })
        }
    };



    //PROPUESTA

    // const editar = async (e) => {
    //     e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    //     try {
    //         const headers = new Headers();
    //         headers.append("Content-Type", "application/json");
    
    //         // Cuerpo del POST request con solo correo y teléfono
    //         const cuerpo = JSON.stringify({
    //             correo: correo,
    //             telefono: telefono
    //         });
    
    //         const request = new Request(`https://compusave-backend.onrender.com/put/proveedor/${id}`, {
    //             method: "PUT",
    //             headers: headers,
    //             body: cuerpo,
    //         });
    
    //         const response = await fetch(request);
    //         const resultado = await response.json();
            
    //         if (response.ok) {
    //             Swal.fire({
    //                 title: `${resultado.detail}`,
    //                 icon: 'success',
    //             });
    //             // Resetear los campos si es necesario
    //             setCorreo('');
    //             setTelefono('');
    //             cerrarModal();
    //             obtenerDatos(); // Recargar los datos después de la actualización
    //         } else {
    //             Swal.fire({
    //                 title: `${resultado.detail}`,
    //                 icon: 'error',
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             title: "Error en la conexión con el servidor", // Cambiado para evitar usar resultado en el catch
    //             icon: 'error',
    //         });
    //     }
    // };

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
    const abrirModalEdicion = (id = 1) => {

        
        props.setId(id);
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Proveedor ' + id;
    };

    // Simulación de eliminar categoría
    const eliminarProveedor = (id = 1) => {
        if (confirm('¿Estás seguro de eliminar al Proveedor ' + id + '?')) {
            alert('Proveedor ' + id + ' eliminado.');
            props.eliminar(id)
        }
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
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={()=>abrirModalEdicion(props.id)}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={()=>eliminarProveedor(props.id)}>Eliminar</button>
            </td>
        </tr>
    )
}