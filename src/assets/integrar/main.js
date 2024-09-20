document.addEventListener("DOMContentLoaded", () => {
    let roles = JSON.parse(localStorage.getItem('roles')) || [];
    let roleToDelete = null;

    const roleForm = document.getElementById("roleForm");
    const roleTableBody = document.getElementById("roleTableBody");

    // Función para agregar un rol
    roleForm.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevenir comportamiento por defecto
        const idRol = document.getElementById('idRol').value;
        const nombreRol = document.getElementById('nombreRol').value;
        const descripcion = document.getElementById('descripcion').value;
        const fechaCreacion = new Date().toLocaleString();  // Fecha y hora actual

        // Agregar el rol al array y guardar en localStorage
        roles.push({ idRol, nombreRol, descripcion, fechaCreacion });
        saveRoles();
        updateRoleTable();

        // Resetear el formulario y cerrar modal
        document.getElementById('roleForm').reset();
        const addModal = bootstrap.Modal.getInstance(document.getElementById('addRoleModal'));
        addModal.hide();
    });

    // Función para guardar roles en localStorage
    function saveRoles() {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    // Función para actualizar la tabla de roles
    function updateRoleTable() {
        roleTableBody.innerHTML = '';  // Limpiar la tabla antes de agregar filas
        roles.forEach((role, index) => {
            const row = `
                <tr>
                    <td>${role.idRol}</td>
                    <td>${role.nombreRol}</td>
                    <td>${role.descripcion}</td>
                    <td>${role.fechaCreacion}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editRole(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            roleTableBody.innerHTML += row;
        });
    }

    // Función para editar un rol
    window.editRole = function(index) {
        const role = roles[index];
        document.getElementById('editIdRol').value = role.idRol;
        document.getElementById('editNombreRol').value = role.nombreRol;
        document.getElementById('editDescripcion').value = role.descripcion;
        document.getElementById('editRoleIndex').value = index;

        const editModal = new bootstrap.Modal(document.getElementById('editRoleModal'));
        editModal.show();
    };

    // Guardar cambios en rol editado
    document.getElementById('editRoleForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const index = document.getElementById('editRoleIndex').value;
        roles[index].idRol = document.getElementById('editIdRol').value;
        roles[index].nombreRol = document.getElementById('editNombreRol').value;
        roles[index].descripcion = document.getElementById('editDescripcion').value;
        saveRoles();
        updateRoleTable();

        const editModal = bootstrap.Modal.getInstance(document.getElementById('editRoleModal'));
        editModal.hide();
    });

    // Confirmar eliminación de rol
    window.confirmDelete = function(index) {
        roleToDelete = index;
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteRoleModal'));
        deleteModal.show();
    };

    // Eliminar un rol
    document.getElementById('confirmDeleteButton').addEventListener('click', function () {
        roles.splice(roleToDelete, 1);  // Eliminar por índice
        saveRoles();
        updateRoleTable();

        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteRoleModal'));
        deleteModal.hide();
    });

    // Cargar roles al cargar la página
    updateRoleTable();
});
