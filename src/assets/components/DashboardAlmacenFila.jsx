import React from "react";

export default function DashboardAlmacenFila(props) {
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Almacén';
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setUbicacion(props.ubicacion);
    };

    const eliminarAlmacen = () => {
        props.setId(props.id);
        if (confirm('¿Estás seguro de eliminar el almacén "' + props.nombre + '"?')) {
            props.eliminarDatos(props.id);
            alert('Almacén "' + props.nombre + '" eliminado.');
        }
    };

    return (
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.index}</td> {/* Contador */}
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.ubicacion}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarAlmacen}>Eliminar</button>
            </td>
        </tr>
    );
}