import React from "react"

export default function DashboardCategoriaFila(props) {
    
    const abrirModalEdicion = (id = 1) => {
        // document.getElementById('modal').classList.remove('hidden');
        // document.getElementById('tituloModal').textContent = 'Editar Categoría ' + id;
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Categoría ';
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setDescripcion(props.descripcion);
        props.setUrl(props.imagen);
    };

    // Simulación de eliminar categoría
    const eliminarCategoria = (id = 1) => {
        // if (confirm('¿Estás seguro de eliminar la categoría ' + id + '?')) {
        //     alert('Categoría ' + id + ' eliminada.');
        //     // Aquí iría el código para eliminar la categoría en tu sistema
        // }
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
        // <tr className="border-b border-b-[#394050]">
        //     <td className="text-white font-light py-2 px-4">{props.id}</td>
        //     <td className="text-white font-light py-2 px-4">{props.nombre}</td>
        //     <td className="text-white font-light text-center py-2 px-4">{props.descripcion}</td>
        //     <td className="text-white font-light text-center py-2 px-4">
        //         <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
        //         <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarCategoria}>Eliminar</button>
        //     </td>
        // </tr>
        <>
        <tr className="border-b border-b-[#394050]">
            <td className="text-white font-light py-2 px-4">{props.id}</td>
            <td className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.descripcion}</td>
            <td className="text-white font-light text-center py-2 px-4">
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarCategoria}>Eliminar</button>
            </td>
        </tr>
        
        </>
    )
}