import React from "react"
import Swal from 'sweetalert2'

export default function DashboardProveedoresFila(props) {
    const abrirModalEdicion = (id = 1) => {

        
        props.setId(id);
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Proveedor ' + id;
    };

    // Simulación de eliminar categoría
    const eliminarProveedor = (id = 1) => {
        // if (confirm('¿Estás seguro de eliminar al Proveedor ' + id + '?')) {
            
            // Swal.fire({
            //     title: `${resultado.detail}`,
            //     icon: 'success',
            //   })
              Swal.fire({
                title: "¿Estás seguro de eliminar al Proveedor ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar"
              }).then((result) => {
                if (result.isConfirmed) {
                //   Swal.fire({
                //     title: `${resultado.detail}`,
                //     icon: "success"
                //   });
                  props.eliminar(id)
                }
            });

            // alert('Proveedor ' + id + ' eliminado.');
            // props.eliminar(id)
        // }
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
                <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={()=>abrirModalEdicion(props.id)}>Editar</button>
                <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={()=>eliminarProveedor(props.id)}>Eliminar</button>
            </td>
        </tr>
    )
}