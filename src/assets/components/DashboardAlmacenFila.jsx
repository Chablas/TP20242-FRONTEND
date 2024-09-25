import React from "react"

export default function DashboardAlmacenFila(props) {
    const abrirModalEdicion = (id = 1) => {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Almacen ' + id;
    };

    // Simulación de eliminar categoría
    const eliminarAlmacen = (id = 1) => {
        if (confirm('¿Estás seguro de eliminar la categoría ' + id + '?')) {
            alert('Almacen ' + id + ' eliminada.');
            // Aquí iría el código para eliminar la categoría en tu sistema
        }
    };

    return (
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.id}</td>
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.descripcion}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarAlmacen}>Eliminar</button>
            </td>
        </tr>
    )
}