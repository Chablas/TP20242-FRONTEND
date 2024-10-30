
import React from "react"
import Swal from 'sweetalert2'

export default function DashboardProveedoresFila(props) {
    //Abre modal para editar
    const abrirModalEdicion = () => {
        document.getElementById('modalEditar').classList.remove('hidden');
        document.getElementById('tituloModal').textContent = 'Editar Proveedor';
        props.setId(props.id);
        props.setNombre(props.nombre);
        props.setRuc(props.ruc);    
        props.setDireccion(props.direccion);              
         props.setCorreo(props.correo);              
        props.setTelefono(props.telefono);      
    };

    // Simulación de eliminar categoría
 /*   const eliminarProveedor = (id = 1) => {
        if (confirm('¿Estás seguro de eliminar al Proveedor ' + id + '?')) {
            alert('Proveedor ' + id + ' eliminado.');
            props.eliminar(id)
        }
    };*/

    const eliminarProveedor = () => {
        props.setId(props.id);
        Swal.fire({
            // title: '¿Estás seguro de eliminar al Proveedor "' + props.nombre + '"?',
            title: '¿Estás seguro de eliminar al Proveedor "' + props.nombre + '"?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                props.eliminar(props.id);// Asegúrate de que esto devuelva un resultado
                    Swal.fire({
                        title: `${resultado.detail}`, // Asegúrate de que `resultado` tenga la propiedad `detail`
                        icon: "success"
                    });               
            }  
              
        });
        
        

/*        if (confirm('¿Estás seguro de eliminar al Proveedor "' + props.nombre + '"?')) {
            props.eliminar(props.id);
            alert('Almacén "' + props.nombre + '" eliminado.');
        } */
    };


    const editarProveedor = () => {
        props.setId(props.id);
        Swal.fire({
            title: '¿Estás seguro de editar al Proveedor "' + props.nombre + '"?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                props.eliminar(props.id);// Asegúrate de que esto devuelva un resultado
                    Swal.fire({
                        title: `${resultado.detail}`, // Asegúrate de que `resultado` tenga la propiedad `detail`
                        icon: "success"
                    });               
            }  
              
        });
        
        

/*        if (confirm('¿Estás seguro de eliminar al Proveedor "' + props.nombre + '"?')) {
            props.eliminar(props.id);
            alert('Almacén "' + props.nombre + '" eliminado.');
        } */
    }; 



    return (
        <tr className="border-b border-b-[#394050]">
            <td  className="text-white font-light py-2 px-4">{props.index}</td>
            <td value={props.nombre} className="text-white font-light py-2 px-4">{props.nombre}</td>
            <td value={props.ruc}  className="text-white font-light text-center py-2 px-4">{props.ruc}</td>
            <td value={props.direccion} className="text-white font-light text-center py-2 px-4">{props.direccion}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.correo}</td>
            <td className="text-white font-light text-center py-2 px-4">{props.telefono}</td>
            <td className="text-white font-light text-center py-2 px-4">
            <button className="font-normal text-yellow-400 py-1 px-2 rounded-md hover:text-white hover:bg-yellow-500" onClick={abrirModalEdicion}>Editar</button>
            <button className="font-normal text-red-500 py-1 px-2 rounded-md hover:text-white hover:bg-red-500 ml-4" onClick={eliminarProveedor}>Eliminar</button>
            </td>
        </tr>
    )
}