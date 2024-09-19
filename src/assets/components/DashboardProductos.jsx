export default function Productos() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let deleteIndex = -1; // Para almacenar el índice del producto a eliminar

    // Función para obtener el próximo ID
    const getNextId = () => {
        const lastId = localStorage.getItem('lastId') || '000';
        const newId = (parseInt(lastId, 10) + 1).toString().padStart(3, '0');
        localStorage.setItem('lastId', newId);
        return newId;
    }

    const renderProducts = () => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach((product, index) => {
          productList.innerHTML += `
            <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>S/.${product.price}</td>
              <td>${product.description}</td>
              <td>
                <button class="status-button ${product.status === 'Disponible' ? 'active' : 'inactive'}" onclick="toggleStatus(${index})">
                  ${product.status}
                </button>
              </td>
              <td>
                <button class="view-button" onclick="viewProduct(${index})">Ver detalles</button>
               <button class="edit-button" onclick="editProduct(${index})">Editar producto</button>
               <button class="delete-button" onclick="openDeleteDialog(${index})">Eliminar producto</button>
              </td>
           </tr>
          `;
        });
    }

    const viewProduct = () => {
        const product = products[index];
        const viewContent = document.getElementById('view-content');
        viewContent.innerHTML = `
          <p><strong>ID:</strong> ${product.id}</p>
          <p><strong>Nombre:</strong> ${product.name}</p>
          <p><strong>Precio:</strong> S/.${product.price}</p>
          <p><strong>Descripción:</strong> ${product.description}</p>
          <p><strong>Estado:</strong> ${product.status}</p>
        `;
        document.getElementById('view-dialog').showModal();
    }

    const editProduct = () => {
        const product = products[index];
        document.getElementById('edit-name').value = product.name;
        document.getElementById('edit-price').value = product.price;
        document.getElementById('edit-description').value = product.description;
        document.getElementById('edit-status').value = product.status;
        document.getElementById('edit-dialog').dataset.index = index;
        document.getElementById('edit-dialog').showModal();
    }

    const saveEdit = () => {
        const index = document.getElementById('edit-dialog').dataset.index;
        const newName = document.getElementById('edit-name').value;
        const newPrice = document.getElementById('edit-price').value;
        const newDescription = document.getElementById('edit-description').value;
        const newStatus = document.getElementById('edit-status').value;
        if (newName && newPrice) {
          products[index] = { ...products[index], name: newName, price: newPrice, description: newDescription, status: newStatus };
          localStorage.setItem('products', JSON.stringify(products));
          renderProducts();
          closeDialog('edit-dialog');
        }
    }

    const toggleStatus = () => {
        products[index].status = products[index].status === 'Disponible' ? 'No Disponible' : 'Disponible';
      localStorage.setItem('products', JSON.stringify(products));
      renderProducts();
    }

    const openDeleteDialog = (index=1) => {
        deleteIndex = index;
      document.getElementById('delete-dialog').showModal();
    }

    const confirmDelete = () => {
        if (deleteIndex >= 0) {
            products.splice(deleteIndex, 1);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            deleteIndex = -1; // Resetear el índice después de eliminar
          }
          closeDialog('delete-dialog');
    }

    const closeDialog = (dialogId=1) => {
        document.getElementById(dialogId).close();
    }

    const showAddDialog = () => {
        document.getElementById('add-dialog').showModal();
    }

    const addNewProduct = () => {
        const name = document.getElementById('add-name').value;
        const price = document.getElementById('add-price').value;
        const description = document.getElementById('add-description').value;
        if (name && price) {
          const newProduct = {
            id: getNextId(),
            name: name,
            price: price,
            description: description,
            status: 'Disponible'
          };
          products.push(newProduct);
          localStorage.setItem('products', JSON.stringify(products));
          renderProducts();
          closeDialog('add-dialog');
        }
    }

    // Inicializa la lista de productos
    renderProducts();
    return (
        <div className="font-sans bg-gray-100 text-purple-700 m-0 p-0">
            <nav className="bg-gray-900 p-4 text-center text-white text-xl">Gestión de Productos</nav>

            <div className="container p-6">
                <h1 className="text-left text-black my-5">Lista de Productos</h1>
                <button id="add-product" className="inline-block py-2 px-4 bg-green-500 text-white rounded transition duration-300 ease-in-out mb-5 hover:bg-green-600" onClick={showAddDialog}>Agregar Producto</button>

                <table className="w-full border-collapse mb-5 bg-gray-900 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="p-3 bg-gray-700 text-blue-gray-300 border-b border-gray-600 text-left">ID</th>
                            <th className="p-3 bg-gray-700 text-blue-gray-300 border-b border-gray-600 text-left">Nombre</th>
                            <th className="p-3 bg-gray-700 text-blue-gray-300 border-b border-gray-600 text-left">Precio</th>
                            <th className="p-3 bg-gray-700 text-blue-gray-300 border-b border-gray-600 text-left">Descripción</th>
                            <th className="p-3 bg-gray-700 text-blue-gray-300 border-b border-gray-600 text-left">Estado</th>
                            <th className="p-3 bg-gray-700 text-blue-gray-300 border-b border-gray-600 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="product-list" className="text-white">
                        {/* Aquí se generarán las filas de los productos */}
                    </tbody>
                </table>
            </div>

            {/* Dialogo para ver detalles */}
            <dialog id="view-dialog" className="rounded-lg p-5 bg-white">
                <div className="text-xl mb-3">Detalles del Producto</div>
                <div className="mb-5" id="view-content">
                    {/* Contenido de los detalles del producto */}
                </div>
                <div className="text-right">
                    <button className="ml-2 bg-purple-600 text-white py-2 px-4 rounded" onClick={closeDialog}>Cerrar</button>
                </div>
            </dialog>

            {/* Dialogo para editar producto */}
            <dialog id="edit-dialog" className="edit-dialog rounded-lg p-5 bg-white">
                <div className="text-xl mb-3">Editar Producto</div>
                <div className="mb-5">
                    <label for="edit-name">Nombre:</label>
                    <input type="text" id="edit-name" className="block mb-2 w-full" />
                    <label for="edit-price">Precio:</label>
                    <input type="text" id="edit-price" className="block mb-2 w-full" />
                    <label for="edit-description">Descripción:</label>
                    <input type="text" id="edit-description" className="block mb-2 w-full" />
                    <label for="edit-status">Estado:</label>
                    <select id="edit-status" className="block mb-2 w-full">
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>
                    </select>
                </div>
                <div className="text-right">
                    <button className="ml-2 bg-purple-600 text-white py-2 px-4 rounded" onClick={saveEdit}>Guardar</button>
                    <button className="ml-2 bg-gray-600 text-white py-2 px-4 rounded" onClick={closeDialog}>Cancelar</button>
                </div>
            </dialog>

            {/* Dialogo de confirmación para eliminar producto */}
            <dialog id="delete-dialog" className="rounded-lg p-5 bg-white">
                <div className="text-xl mb-3">Eliminar Producto</div>
                <div className="mb-5">
                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
                </div>
                <div className="text-right">
                    <button className="ml-2 bg-purple-600 text-white py-2 px-4 rounded" onClick={confirmDelete}>Sí, eliminar</button>
                    <button className="ml-2 bg-gray-600 text-white py-2 px-4 rounded" onClick={closeDialog}>Cancelar</button>
                </div>
            </dialog>

            {/* Dialogo para agregar producto */}
            <dialog id="add-dialog" className="add-dialog rounded-lg p-5 bg-white">
                <div className="text-xl mb-3">Agregar Producto</div>
                <div className="mb-5">
                    <label for="add-name">Nombre:</label>
                    <input type="text" id="add-name" className="block mb-2 w-full" />
                    <label for="add-price">Precio:</label>
                    <input type="text" id="add-price" className="block mb-2 w-full" />
                    <label for="add-description">Descripción:</label>
                    <textarea id="add-description" className="block mb-2 w-full"></textarea>
                </div>
                <div className="text-right">
                    <button className="ml-2 bg-purple-600 text-white py-2 px-4 rounded" onClick={addNewProduct}>Agregar</button>
                    <button className="ml-2 bg-gray-600 text-white py-2 px-4 rounded" onClick={closeDialog}>Cancelar</button>
                </div>
            </dialog>
        </div>
    )
}