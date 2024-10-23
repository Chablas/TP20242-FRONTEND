import React from "react";

export default function DashboardAlmacenFila(props) {
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Almacén';
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setUbicacion(props.ubicacion);
    };

    const cerrarModal = () => {
        document.getElementById('modalEditar').classList.add('hidden');
        // Limpiar los campos al cerrar el modal
        props.setId('');
        props.setNombre('');
        props.setUbicacion('');
    };

    const eliminarAlmacen = () => {
        props.setId(props.id);
        if (confirm('¿Estás seguro de eliminar el almacén "' + props.nombre + '"?')) {
            props.eliminarDatos(props.id);
            alert('Almacén "' + props.nombre + '" eliminado.');
        }
    };

    return (
        <>
            <tr className="border-b border-b-[#394050]">
                <td className="text-white font-light py-2 px-4">{props.index}</td> {/* Contador */}
                <td className="text-white font-light py-2 px-4">{props.nombre}</td>
                <td className="text-white font-light text-center py-2 px-4">{props.ubicacion}</td>
                <td className="text-white font-light text-center py-2 px-4">
                    <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                    <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarAlmacen}>Eliminar</button>
                </td>
            </tr>

            {/* Modal de Edición */}
            <div id="modalEditar" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 id="tituloModal" className="text-xl font-bold mb-4">Editar Almacén</h2>
                    <form onSubmit={(e) => { e.preventDefault(); /* Aquí iría tu función de edición */ }}>
                        <div className="mb-4">
                            <label htmlFor="nombreAlmacen" className="block text-gray-700">Nombre de Almacén</label>
                            <input type="text" value={props.nombre} onChange={(e) => props.setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ubicacionAlmacen" className="block text-gray-700">Dirección</label>
                            <textarea value={props.ubicacion} onChange={(e) => props.setUbicacion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}