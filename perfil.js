const defaultProfile = {
    nombre: "Melina De la Cruz",
    correo: "melina.delacruz@huaral.gob.pe",
    rol: "Gestor Municipal",
    comunidad: "Municipalidad de Huaral",
    telefono: "+51 943 281 094"
};

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosPerfil();
    configurarEventosModoEdicion();
    configurarCambiadorRolInmediato();
});

// ==========================================================================
// CONTROL DEL MENU RESPONSIVE
// ==========================================================================
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation(); // Detiene propagación de burbujeo de eventos
        sidebar.classList.toggle("active");
    });

    // Cerrar de forma nativa si se hace clic en el área principal de contenido
    document.addEventListener("click", (e) => {
        if (sidebar.classList.contains("active") && !sidebar.contains(e.target)) {
            sidebar.classList.remove("active");
        }
    });
}

// Selector Rápido de Rol (Cambio Dinámico y Persistente)
function configurarCambiadorRolInmediato() {
    const roleSelect = document.getElementById("roleChangerSelect");
    const lblRol = document.getElementById("lblRol");
    const sidebarMenuRol = document.getElementById("sidebarMenuRol");

    if (roleSelect) {
        roleSelect.addEventListener("change", (e) => {
            const nuevoRol = e.target.value;
            
            // 1. Reemplazar los textos del rol en la interfaz al instante
            if (lblRol) lblRol.textContent = nuevoRol;
            if (sidebarMenuRol) sidebarMenuRol.textContent = nuevoRol;

            // 2. Extraer del almacenamiento, mutar y guardar cambios
            const rawData = localStorage.getItem("yaku-user-profile");
            let datos = rawData ? JSON.parse(rawData) : { ...defaultProfile };
            datos.rol = nuevoRol;

            localStorage.setItem("yaku-user-profile", JSON.stringify(datos));
        });
    }
}

function cargarDatosPerfil() {
    const rawData = localStorage.getItem("yaku-user-profile");
    if (rawData) {
        const datos = JSON.parse(rawData);
        renderizarCampos(datos);
    } else {
        renderizarCampos(defaultProfile);
    }
}

function renderizarCampos(datos) {
    document.getElementById("lblNombre").textContent = datos.nombre;
    document.getElementById("lblCorreo").textContent = datos.correo;
    document.getElementById("lblRol").textContent = datos.rol;
    document.getElementById("lblComunidad").textContent = datos.comunidad;
    document.getElementById("lblTelefono").textContent = datos.telefono;

    // Sincronizar Sidebar de forma reactiva
    if (document.getElementById("sidebarMenuNombre")) {
        document.getElementById("sidebarMenuNombre").textContent = datos.nombre;
    }
    if (document.getElementById("sidebarMenuRol")) {
        document.getElementById("sidebarMenuRol").textContent = datos.rol;
    }
    
    // Configurar el value activo en el combo box del Rol
    const roleSelect = document.getElementById("roleChangerSelect");
    if (roleSelect) roleSelect.value = datos.rol;

    // Calcular las iniciales para el avatar
    const nombresSeparados = datos.nombre.trim().split(' ');
    let iniciales = nombresSeparados[0].charAt(0) + (nombresSeparados[1] ? nombresSeparados[1].charAt(0) : "");
    document.getElementById("profileInitials").textContent = iniciales.toUpperCase();
}

function configurarEventosModoEdicion() {
    const btnEditar = document.getElementById("btnEditarPerfil");
    const btnCancelar = document.getElementById("btnCancelarPerfil");
    const btnGuardar = document.getElementById("btnGuardarPerfil");
    
    const viewMode = document.getElementById("profileViewMode");
    const editMode = document.getElementById("profileEditMode");
    const errorMsg = document.getElementById("profileErrorMsg");

    if (btnEditar) {
        btnEditar.addEventListener("click", () => {
            document.getElementById("txtNombre").value = document.getElementById("lblNombre").textContent;
            document.getElementById("txtCorreo").value = document.getElementById("lblCorreo").textContent;
            document.getElementById("txtTelefono").value = document.getElementById("lblTelefono").textContent;
            document.getElementById("txtComunidad").value = document.getElementById("lblComunidad").textContent;

            errorMsg.classList.add("d-none");
            viewMode.classList.add("d-none");
            editMode.classList.remove("d-none");
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            editMode.classList.add("d-none");
            viewMode.classList.remove("d-none");
        });
    }

    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            const txtNombreVal = document.getElementById("txtNombre").value.trim();
            const txtCorreoVal = document.getElementById("txtCorreo").value.trim();
            const txtTelefonoVal = document.getElementById("txtTelefono").value.trim();
            const txtComunidadVal = document.getElementById("txtComunidad").value.trim();

            const emailFilter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (txtNombreVal === "" || !emailFilter.test(txtCorreoVal)) {
                errorMsg.classList.remove("d-none");
                return;
            }

            const perfilActualizado = {
                nombre: txtNombreVal,
                correo: txtCorreoVal,
                rol: document.getElementById("lblRol").textContent,
                comunidad: txtComunidadVal,
                telefono: txtTelefonoVal
            };

            localStorage.setItem("yaku-user-profile", JSON.stringify(perfilActualizado));
            renderizarCampos(perfilActualizado);

            editMode.classList.add("d-none");
            viewMode.classList.remove("d-none");
        });
    }
}