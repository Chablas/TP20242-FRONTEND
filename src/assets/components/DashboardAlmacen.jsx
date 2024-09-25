export default function Componente() {

return (
    <>
        <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 id="tituloModal" className="text-xl font-bold mb-4">Gestión de almacén</h2>
                <form id="formularioAlmacen">
                    <div className="mb-4">
                        <label htmlFor="nombreCategoria" className="block text-gray-700">Nombre de Almacen</label>
                        <input type="text" id="nombreCategoria" onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descripcionCategoria" className="block text-gray-700">Descripción</label>
                        <textarea id="descripcionCategoria" onChange={(e) => setDescripcion(e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                       { /*<button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cerrarModal}>Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={enviarDatos}>Guardar</button>*/}
                    </div>
                </form>
            </div>
        </div>
        
        <main className="p-6">
            <h1 className="border-b-2 border-b-gray-200 text-3xl pb-5 font-bold text-gray-700 mb-4">Gestión de Almacenes</h1>
            <div className="mt-5" >
                {<button className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-400 mb-4" onClick={abrirModal}>
                    Agregar nuevo almacén
                </button>}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#212936] shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-[#394050]">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-gray-300">ID</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-300">NOMBRE</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-300">DIRECCION</th>
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