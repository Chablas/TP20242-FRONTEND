import React from "react"

export default function DashboardProveedoresFila(props) {
    const abrirModalEdicion = (id = 1) => {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Proveedor ' + id;
    };

    // Simulación de eliminar categoría
    const eliminarProveedor = (id = 1) => {
        if (confirm('¿Estás seguro de eliminar al Proveedor ' + id + '?')) {
            alert('Proveedor ' + id + ' eliminado.');
            // Aquí iría el código para eliminar la categoría en tu sistema
        }
    };

    return (
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.id}</td>
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.ruc}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.direccion}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.correo}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.telefono}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarProveedor}>Eliminar</button>
            </td>
        </tr>
    )
}