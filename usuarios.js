// ==========================================================================
// CONTROL DEL MENÚ RESPONSIVE REUTILIZADO
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

// ==========================================================================
// BASE DE DATOS LOCAL EN MEMORIA (Iniciada con la muestra exacta de tu diseño)
// ==========================================================================
let baseUsuarios = [
    { id: 1, nombre: "María Quispe", email: "maria.quispe@email.com", rol: "Ciudadano", area: "Villa Rica - Sector Centro", estado: "Activo", acceso: "02/05/2025 10:24 AM", verificado: true },
    { id: 2, nombre: "Juan Carlos Ramírez", email: "juan.ramirez@email.com", rol: "Coordinador", area: "Naranjal - Comunidad Naranjal", estado: "Activo", acceso: "02/05/2025 09:15 AM", verificado: true },
    { id: 3, nombre: "Luis Paredes", email: "luis.paredes@email.com", rol: "Gestor Municipal", area: "Municipalidad de Villa Rica", estado: "Activo", acceso: "02/05/2025 08:40 AM", verificado: true },
    { id: 4, nombre: "Ana Mamani", email: "ana.mamani@email.com", rol: "Ciudadano", area: "Palcazu - Comunidad Palcazu", estado: "Inactivo", acceso: "28/04/2025 04:30 PM", verificado: false },
    { id: 5, nombre: "Roberto Silva", email: "roberto.silva@email.com", rol: "Coordinador", area: "San Luis - Comunidad San Luis", estado: "Suspendido", acceso: "15/04/2025 11:20 AM", verificado: true },
    { id: 6, nombre: "Defensa Civil Villa Rica", email: "defensacivil@villarica.gob.pe", rol: "Institución", area: "Villa Rica", estado: "Activo", acceso: "02/05/2025 07:50 AM", verificado: true },
    { id: 7, nombre: "Bomberos Voluntarios", email: "bomberos@villarica.pe", rol: "Institución", area: "Villa Rica", estado: "Activo", acceso: "01/05/2025 06:10 PM", verificado: false },
    { id: 8, nombre: "Administrador Sistema", email: "admin@yakualarma.pe", rol: "Administrador", area: "Sistema", estado: "Activo", acceso: "02/05/2025 10:30 AM", verificado: true }
];

// Variables globales de gráficos para su destrucción y actualización fluida
let chartDonutRoles = null;
let chartLineaActividad = null;
let chartBarraComunidades = null;
let chartSemiDonutVerif = null;
let filtroEstadoActual = "todos";

// ==========================================================================
// RENDERIZADO DE TABLA Y FILTROS
// ==========================================================================
function renderizarTablaUsuarios(datos = baseUsuarios) {
    const tbody = document.getElementById("tablaUsuariosBody");
    tbody.innerHTML = "";

    // Filtrar si es necesario según la pestaña activa
    let datosFiltrados = datos;
    if (filtroEstadoActual !== "todos") {
        datosFiltrados = datos.filter(u => u.estado === filtroEstadoActual);
    }

    datosFiltrados.forEach(user => {
        // Formateo de clases CSS según Atributo
        const claseRol = user.rol.toLowerCase().replace("ó", "o").split(" ")[0];
        const claseEstado = user.estado.toLowerCase();
        
        // Obtener iniciales para el avatar
        const iniciales = user.nombre.split(" ").map(n => n[0]).join("").slice(0, 2);

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="user-info-cell">
                        <div class="avatar-circle">${iniciales}</div>
                        <div class="user-meta">
                            <h4>${user.nombre}</h4>
                            <span>${user.email}</span>
                        </div>
                    </div>
                </td>
                <td><span class="badge-rol ${claseRol}">${user.rol}</span></td>
                <td>${user.area}</td>
                <td><span class="badge-estado ${claseEstado}">${user.estado}</span></td>
                <td>${user.acceso}</td>
                <td>
                    <div class="actions-cell">
                        <button class="btn-table-action" onclick="alert('Ver perfil de ${user.nombre}')"><i class="fa-regular fa-eye"></i></button>
                        <button class="btn-table-action" onclick="alert('Editar usuario ${user.nombre}')"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="btn-table-action" onclick="eliminarUsuario(${user.id})"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });

    document.getElementById("infoPaginacion").textContent = `Mostrando 1-${datosFiltrados.length} de ${datosFiltrados.length} usuarios`;
}

// Controladores de pestañas de filtrado (Todos, Activos, etc.)
document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", (e) => {
        document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
        e.target.classList.add("active");
        filtroEstadoActual = e.target.getAttribute("data-filter");
        renderizarTablaUsuarios();
    });
});

// Buscador en tiempo real
document.getElementById("inputBuscar").addEventListener("input", (e) => {
    const busqueda = e.target.value.toLowerCase();
    const resultado = baseUsuarios.filter(u => 
        u.nombre.toLowerCase().includes(busqueda) || 
        u.email.toLowerCase().includes(busqueda) ||
        u.area.toLowerCase().includes(busqueda)
    );
    renderizarTablaUsuarios(resultado);
});

function eliminarUsuario(id) {
    if(confirm("¿Estás seguro de eliminar este usuario?")) {
        baseUsuarios = baseUsuarios.filter(u => u.id !== id);
        actualizarModuloCompleto();
    }
}

// ==========================================================================
// PROCESAMIENTO MÉTRICO Y RE-CÁLCULO DE CONTADORES
// ==========================================================================
function recalcularContadores() {
    const total = baseUsuarios.length;
    const activos = baseUsuarios.filter(u => u.estado === "Activo").length;
    const inactivos = baseUsuarios.filter(u => u.estado === "Inactivo").length;
    const suspendidos = baseUsuarios.filter(u => u.estado === "Suspendido").length;
    const admins = baseUsuarios.filter(u => u.rol === "Administrador").length;

    document.getElementById("txtTotal").textContent = total;
    document.getElementById("txtActivos").textContent = activos;
    document.getElementById("txtInactivos").textContent = inactivos;
    document.getElementById("txtSuspendidos").textContent = suspendidos;
    document.getElementById("txtAdmins").textContent = admins;

    // Calcular porcentajes exactos
    document.getElementById("pctActivos").textContent = total > 0 ? `${((activos/total)*100).toFixed(1)}% del total` : "0%";
    document.getElementById("pctInactivos").textContent = total > 0 ? `${((inactivos/total)*100).toFixed(1)}% del total` : "0%";
    document.getElementById("pctSuspendidos").textContent = total > 0 ? `${((suspendidos/total)*100).toFixed(1)}% del total` : "0%";
    document.getElementById("pctAdmins").textContent = total > 0 ? `${((admins/total)*100).toFixed(1)}% del total` : "0%";
}

// ==========================================================================
// RENDERIZACIÓN DE GRÁFICOS MEDIANTE CHART.JS
// ==========================================================================
function inicializarGraficos() {
    // 1. Gráfico de Roles (Dona)
    const conteoRoles = { "Ciudadano": 0, "Coordinador": 0, "Gestor Municipal": 0, "Institución": 0, "Administrador": 0 };
    baseUsuarios.forEach(u => { if(conteoRoles[u.rol] !== undefined) conteoRoles[u.rol]++; });

    if(chartDonutRoles) chartDonutRoles.destroy();
    chartDonutRoles = new Chart(document.getElementById("chartRoles").getContext("2d"), {
        type: 'doughnut',
        data: {
            labels: Object.keys(conteoRoles),
            datasets: [{
                data: Object.values(conteoRoles),
                backgroundColor: ['#2a9d8f', '#2563eb', '#ea580c', '#9333ea', '#0369a1'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 } } } }
        }
    });

    // 2. Actividad de nuevos usuarios (Línea)
    if(chartLineaActividad) chartLineaActividad.destroy();
    chartLineaActividad = new Chart(document.getElementById("chartActividad").getContext("2d"), {
        type: 'line',
        data: {
            labels: ["26 Abr", "27 Abr", "28 Abr", "29 Abr", "30 Abr", "01 May", "02 May"],
            datasets: [{
                label: 'Nuevos usuarios',
                data: [12, 18, 15, 22, 35, 28, baseUsuarios.length * 4], // Simulado con impacto real
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
                fill: true,
                tension: 0.4,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
        }
    });

    // 3. Usuarios por comunidad (Barras)
    if(chartBarraComunidades) chartBarraComunidades.destroy();
    chartBarraComunidades = new Chart(document.getElementById("chartComunidades").getContext("2d"), {
        type: 'bar',
        data: {
            labels: ["Villa Rica", "Naranjal", "Palcazu", "San Luis", "Puerto Yurinaki", "San Pedro"],
            datasets: [{
                data: [128, 86, 64, 52, 38, baseUsuarios.length * 3],
                backgroundColor: '#2a9d8f',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // 4. Verificación de Usuarios (Semicírculo)
    const verif = baseUsuarios.filter(u => u.verificado).length;
    const noVerif = baseUsuarios.length - verif;
    const pctVerif = baseUsuarios.length > 0 ? Math.round((verif / baseUsuarios.length) * 100) : 0;
    
    document.getElementById("txtPctVerificados").textContent = `${pctVerif}%`;

    if(chartSemiDonutVerif) chartSemiDonutVerif.destroy();
    chartSemiDonutVerif = new Chart(document.getElementById("chartVerificacion").getContext("2d"), {
        type: 'doughnut',
        data: {
            labels: ['Verificados', 'No Verificados'],
            datasets: [{
                data: [verif, noVerif],
                backgroundColor: ['#2a9d8f', '#e2e8f0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            rotation: -90,
            circumference: 180,
            cutout: '80%',
            plugins: { legend: { display: false } }
        }
    });

    // Renderizar leyenda dinámica de verificación
    const legendBox = document.getElementById("legendVerificacion");
    legendBox.innerHTML = `
        <div class="v-legend-item"><div class="v-dot-label"><span class="v-dot" style="background:#2a9d8f"></span> Verificados</div><div class="v-num">${verif}</div></div>
        <div class="v-legend-item"><div class="v-dot-label"><span class="v-dot" style="background:#e2e8f0"></span> No verificados</div><div class="v-num">${noVerif}</div></div>
    `;
}

// ==========================================================================
// CONTROL INTERACTIVO DEL MODAL REGISTRAR USUARIO
// ==========================================================================
const modal = document.getElementById("modalUsuario");
const btnAbrirModal = document.getElementById("btnNuevoUsuario");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnCancelarForm = document.getElementById("btnCancelarForm");
const formUsuario = document.getElementById("formUsuario");

function abrirModalForm() { modal.classList.add("open"); }
function cerrarModalForm() { modal.classList.remove("open"); formUsuario.reset(); }

btnAbrirModal.addEventListener("click", abrirModalForm);
btnCerrarModal.addEventListener("click", cerrarModalForm);
btnCancelarForm.addEventListener("click", cerrarModalForm);

// Registro efectivo del formulario
formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const nuevoUsuario = {
        id: Date.now(), // ID Único temporal
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        rol: document.getElementById("rol").value,
        area: document.getElementById("comunidad").value,
        estado: document.getElementById("estado").value,
        acceso: fechaFormateada,
        verificado: Math.random() > 0.2 // Simulación de verificación aleatoria
    };

    baseUsuarios.unshift(nuevoUsuario); // Insertar al inicio de la tabla
    actualizarModuloCompleto();
    cerrarModalForm();
});

// ==========================================================================
// FUNCIONALIDAD DE LA SECCIÓN ACCIONES RÁPIDAS
// ==========================================================================
document.getElementById("qaNuevoUsuario").addEventListener("click", abrirModalForm);

document.getElementById("qaAsignarRoles").addEventListener("click", () => {
    alert("Redireccionando al panel avanzado de control de políticas ACL & Permisos...");
});

document.getElementById("qaImportarUsuarios").addEventListener("click", () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = e => { 
        const file = e.target.files[0];
        alert(`Archivo "${file.name}" cargado con éxito. Procesando subida en bloque...`);
    }
    input.click();
});

document.getElementById("qaVerRegistros").addEventListener("click", () => {
    alert("Abriendo el visor de Logs del sistema auditados por la Municipalidad de Huaral.");
});

// Pipeline Global de actualización reactiva
function actualizarModuloCompleto() {
    recalcularContadores();
    renderizarTablaUsuarios();
    inicializarGraficos();
}



// Inicialización de arranque
actualizarModuloCompleto();