// ==========================================
// 1. MENU RESPONSIVE (De tu plantilla base)
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (sidebar.classList.contains("active") && !sidebar.contains(e.target)) {
            sidebar.classList.remove("active");
        }
    });
}

// ==========================================
// 2. VALORES POR DEFECTO DEL PERFIL
// ==========================================
const defaultProfile = {
    nombres: "Juan",
    apellidos: "Pérez García",
    tipoDoc: "DNI",
    numDoc: "12345678",
    email: "juan.perez@gmail.com",
    celular: "987 654 321",
    fechaNac: "1990-06-15",
    genero: "Masculino",
    departamento: "San Martín",
    provincia: "Moyobamba",
    distrito: "Soritor",
    comunidad: "Villa Rica",
    avatar: ""
};

const fallbackAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230b2c66'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z'/></svg>";

// Variable global temporal para almacenar la foto que el usuario selecciona antes de guardarla
let avatarTemporal = "";

// ==========================================
// 3. CARGAR DATOS EN INTERFAZ
// ==========================================
function cargarDatosPerfil() {
    let perfil = JSON.parse(localStorage.getItem("yaku_perfil"));
    if (!perfil) {
        perfil = defaultProfile;
        localStorage.setItem("yaku_perfil", JSON.stringify(perfil));
    }

    // Rellenar campos del formulario
    document.getElementById("inputNombres").value = perfil.nombres;
    document.getElementById("inputApellidos").value = perfil.apellidos;
    document.getElementById("selectTipoDoc").value = perfil.tipoDoc;
    document.getElementById("inputNumDoc").value = perfil.numDoc;
    document.getElementById("inputEmail").value = perfil.email;
    document.getElementById("inputCelular").value = perfil.celular;
    document.getElementById("inputFechaNac").value = perfil.fechaNac;
    document.getElementById("selectGenero").value = perfil.genero;
    document.getElementById("selectDepartamento").value = perfil.departamento;
    document.getElementById("selectProvincia").value = perfil.provincia;
    document.getElementById("selectDistrito").value = perfil.distrito;
    document.getElementById("selectComunidad").value = perfil.comunidad;

    // Actualizar textos de paneles laterales
    document.getElementById("cardEmail").textContent = perfil.email;
    document.getElementById("cardCelular").textContent = perfil.celular;
    document.getElementById("sidebarUserName").textContent = `${perfil.nombres} ${perfil.apellidos.split(' ')[0]}`;
    document.getElementById("topbarDistrict").textContent = perfil.comunidad;

    // Asignar foto guardada a la variable temporal y a las imágenes de la interfaz
    avatarTemporal = perfil.avatar || "";
    const avatarSrc = avatarTemporal ? avatarTemporal : fallbackAvatar;
    document.getElementById("mainAvatar").src = avatarSrc;
    document.getElementById("sidebarAvatar").src = avatarSrc;
}

// ==========================================
// 4. LOGICA DE SELECCIÓN Y ELIMINACIÓN DE FOTO
// ==========================================
const fileInput = document.getElementById("fileInput");
const deleteFotoBtn = document.getElementById("deleteFotoBtn");

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert("La imagen excede el límite permitido de 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            // Guardamos el resultado Base64 en la variable temporal
            avatarTemporal = event.target.result;
            
            // Cambiamos la vista previa en el momento
            document.getElementById("mainAvatar").src = avatarTemporal;
            document.getElementById("sidebarAvatar").src = avatarTemporal;
        };
        reader.readAsDataURL(file);
    }
});

// Al eliminar la foto, limpiamos la variable temporal
deleteFotoBtn.addEventListener("click", () => {
    avatarTemporal = ""; 
    document.getElementById("mainAvatar").src = fallbackAvatar;
    document.getElementById("sidebarAvatar").src = fallbackAvatar;
    fileInput.value = ""; 
});

// ==========================================
// 5. ACCIÓN: GUARDAR CAMBIOS
// ==========================================
const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Estructurar el objeto con la información de los inputs y el avatar temporal actualizado
    const perfilActualizado = {
        nombres: document.getElementById("inputNombres").value.trim(),
        apellidos: document.getElementById("inputApellidos").value.trim(),
        tipoDoc: document.getElementById("selectTipoDoc").value,
        numDoc: document.getElementById("inputNumDoc").value.trim(),
        email: document.getElementById("inputEmail").value.trim(),
        celular: document.getElementById("inputCelular").value.trim(),
        fechaNac: document.getElementById("inputFechaNac").value,
        genero: document.getElementById("selectGenero").value,
        departamento: document.getElementById("selectDepartamento").value,
        provincia: document.getElementById("selectProvincia").value,
        distrito: document.getElementById("selectDistrito").value,
        comunidad: document.getElementById("selectComunidad").value,
        avatar: avatarTemporal // Aquí se asegura de guardar la foto seleccionada
    };

    // Guardar definitivamente en el almacenamiento local del navegador
    localStorage.setItem("yaku_perfil", JSON.stringify(perfilActualizado));
    
    // Sincronizar todos los componentes visuales de la página
    cargarDatosPerfil();

    alert("¡Cambios e imagen guardados con éxito!");
});

// Botón Cancelar - Descarta los cambios volviendo a leer el almacenamiento local
document.getElementById("btnCancelar").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas descartar las modificaciones actuales?")) {
        cargarDatosPerfil();
    }
});

// Carga inicial
document.addEventListener("DOMContentLoaded", cargarDatosPerfil);