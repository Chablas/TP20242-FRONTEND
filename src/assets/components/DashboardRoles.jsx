export default function DashboardRoles() {
    return (
        <>
            <h1 class="text-start fw-bold">Gestor de Roles</h1>

{/* Botón para mostrar el formulario de agregar rol */}
<div class="text-start mb-3">
    <button class="btn btn-success fw-bold" data-bs-toggle="modal" data-bs-target="#addRoleModal">Agregar Nuevo Rol</button>
</div>

{/* Tabla de roles */}
<table class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>ID Rol</th>
            <th>Nombre del Rol</th>
            <th>Descripción</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="roleTableBody">
        {/* Los roles se mostrarán aquí */}
    </tbody>
</table>

{/* Modal para agregar rol */}
<div class="modal fade" id="addRoleModal" tabindex="-1" aria-labelledby="addRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addRoleModalLabel">Agregar Rol</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="roleForm">
                    <div class="mb-3">
                        <label for="idRol" class="form-label">ID Rol</label>
                        <input type="number" class="form-control" id="idRol" name="idRol" required />
                    </div>
                    <div class="mb-3">
                        <label for="nombreRol" class="form-label">Nombre del Rol</label>
                        <input type="text" class="form-control" id="nombreRol" name="nombreRol" required />
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcion" name="descripcion" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-success">Agregar Rol</button>
                </form>
            </div>
        </div>
    </div>
</div>

{/* Modal para editar rol */}
<div class="modal fade" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editRoleModalLabel">Editar Rol</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editRoleForm">
                    <input type="hidden" id="editRoleIndex" />
                    <div class="mb-3">
                        <label for="editIdRol" class="form-label">ID Rol</label>
                        <input type="number" class="form-control" id="editIdRol" name="idRol" required />
                    </div>
                    <div class="mb-3">
                        <label for="editNombreRol" class="form-label">Nombre del Rol</label>
                        <input type="text" class="form-control" id="editNombreRol" name="nombreRol" required />
                    </div>
                    <div class="mb-3">
                        <label for="editDescripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="editDescripcion" name="descripcion" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-warning">Guardar Cambios</button>
                </form>
            </div>
        </div>
    </div>
</div>

{/* Modal de confirmación para eliminar rol */}
<div class="modal fade" id="deleteRoleModal" tabindex="-1" aria-labelledby="deleteRoleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteRoleModalLabel">Eliminar Rol</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>¿Estás seguro de que quieres eliminar este rol?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteButton">Eliminar</button>
            </div>
        </div>
    </div>
</div>
        </>
    )
}