// ==========================================================================
// CONTROL DEL MENÚ RESPONSIVE REUTILIZADO
// ==========================================================================
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

// DEFINICIÓN DE NUEVA PALETA MAESTRA DE INCIDENCIAS
const configuracionIncidencias = {
    "inundación":       { color: "#38bdf8", icono: "fa-solid fa-cloud-showers-water" },
    "deslizamiento":    { color: "#f97316", icono: "fa-solid fa-mountain" },
    "lluvias intensas": { color: "#eab308", icono: "fa-solid fa-cloud-showers-heavy" },
    "huayco":           { color: "#a855f7", icono: "fa-solid fa-house-flood-water huayco" },
    "tormenta":         { color: "#22c55e", icono: "fa-solid fa-cloud-bolt" },
    "otro":             { color: "#64748b", icono: "fa-solid fa-ellipsis" }
};

// BANCO DE DATOS MAESTRO (Precargados estáticos)
let reportesPrecargados = [
    { id: 1024, tipo: "Inundación", zona: "Av. Solar / Calle Derecha", fecha: "2026-06-23 a las 18:20", descripcion: "Aniego masivo debido a desborde cercano.", estado: "Pendiente", riesgo: "Crítico", lat: -11.4930, lng: -77.2050, imagen: "img/reporte1.jpg" },
    { id: 1023, tipo: "Deslizamiento", zona: "Subida a Contigo Perú", fecha: "2026-06-23 a las 15:40", descripcion: "Piedras caídas bloqueando medio carril.", estado: "Pendiente", riesgo: "Alto", lat: -11.4880, lng: -77.1980, imagen: "img/reporte2.jpg" },
    { id: 1022, tipo: "Lluvias intensas", zona: "Jr. Angaraes 412", fecha: "2026-06-23 a las 11:15", descripcion: "Precipitación persistente genera estancamientos.", estado: "En Proceso", riesgo: "Medio", lat: -11.4960, lng: -77.2090, imagen: "img/reporte3.jpg" },
    { id: 1021, tipo: "Huayco", zona: "Asoc. Vivienda La Soledad", fecha: "2026-06-22 a las 21:30", descripcion: "Flujo de lodo moderado ingresando a vías secundarias.", estado: "En Proceso", riesgo: "Crítico", lat: -11.5020, lng: -77.2140, imagen: "img/reporte4.jpg" },
    { id: 1020, tipo: "Tormenta", zona: "Plaza de Armas de Huaral", fecha: "2026-06-22 a las 09:10", descripcion: "Descargas eléctricas consecutivas.", estado: "Atendido", riesgo: "Bajo", lat: -11.4970, lng: -77.2070, imagen: "img/reporte5.webp" }
];

let reportesData = [];
let reporteSeleccionado = null;
let filtroEstadoActual = "Todos";
let paginaActual = 1;
const registrosPorPagina = 5;

// Variables operativas del mapa de detalles
let mapaDetalle = null;
let marcadorDetalle = null;

// ==========================================
// CARGAR DATOS DESDE LOCALSTORAGE + PRECARGADOS
// ==========================================
function cargarHistorialDeReportes() {
    // Leer lo generado por reportar.js
    let historialLocal = JSON.parse(localStorage.getItem("misreportes_db")) || [];
    
    // Formatear los datos dinámicos que vienen del LocalStorage para que coincidan con la vista
    let reportesFormateadosLocal = historialLocal.map(rep => {
        // Parsear lat y lng desde la cadena de dirección si fuera necesario, o asignar por defecto Villa Rica
        let latDefault = -10.7412;
        let lngDefault = -75.2694;

        if(rep.ubicacion && rep.ubicacion.includes("Coordenadas:")) {
            try {
                let coords = rep.ubicacion.replace("Coordenadas: ", "").split(" (Distrito Villa Rica)")[0].split(", ");
                latDefault = parseFloat(coords[0]);
                lngDefault = parseFloat(coords[1]);
            } catch(e) {
                console.log("Error parseando coordenadas del localStorage, usando valores por defecto.");
            }
        }

        return {
            id: rep.id,
            tipo: rep.tipo,
            zona: rep.ubicacion,
            fecha: `${rep.fecha} a las ${rep.hora}`,
            descripcion: rep.descripcion,
            estado: "Pendiente", // Todo reporte recién enviado inicia como Pendiente
            riesgo: rep.intensidad,
            lat: latDefault,
            lng: lngDefault,
            imagen: rep.imagen || null // Base64 directo o null
        };
    });

    // Combinar: Los nuevos reportes locales primero, seguidos de los estáticos precargados
    reportesData = [...reportesFormateadosLocal, ...reportesPrecargados];
}

// ==========================================
// INITIALIZATION DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    cargarHistorialDeReportes();
    recalcularYRenderizarTodo();
    inicializarEventosFiltros();
    inicializarEventosAcciones();
});

function recalcularYRenderizarTodo() {
    actualizarContadoresMetricas();
    ejecutarFiltroCombinado(); 
}

function ejecutarFiltroCombinado() {
    const listaFiltrada = obtenerListaFiltradaGlobal();
    renderizarTablaPaginada(listaFiltrada);
}

function actualizarContadoresMetricas() {
    const total = reportesData.length;
    const pendientes = reportesData.filter(r => r.estado === "Pendiente").length;
    const proceso = reportesData.filter(r => r.estado === "En Proceso").length;
    const atendidos = reportesData.filter(r => r.estado === "Atendido").length;
    const descartados = reportesData.filter(r => r.estado === "Descartado").length;

    document.getElementById("countTotal").textContent = total;
    document.getElementById("countPendientes").textContent = pendientes;
    document.getElementById("countProceso").textContent = proceso;
    document.getElementById("countAtendidos").textContent = atendidos;
    document.getElementById("countDescartados").textContent = descartados;
    document.getElementById("notifBadge").textContent = pendientes;
}

function renderizarTablaPaginada(listaFiltrada) {
    const tbody = document.getElementById("tablaReportesBody");
    if(!tbody) return;
    tbody.innerHTML = "";
    
    const totalRegistros = listaFiltrada.length;
    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina) || 1;
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;
    if (paginaActual < 1) paginaActual = 1;

    const indiceInicio = (paginaActual - 1) * registrosPorPagina;
    const indiceFin = Math.min(indiceInicio + registrosPorPagina, totalRegistros);
    const registrosPaginaActual = listaFiltrada.slice(indiceInicio, indiceFin);

    document.getElementById("paginationInfo").textContent = totalRegistros === 0 ? "Mostrando 0 registros" : `Mostrando ${indiceInicio + 1}-${indiceFin} de ${totalRegistros} registros`;
    document.getElementById("btnPrevPage").disabled = (paginaActual === 1);
    document.getElementById("btnNextPage").disabled = (paginaActual === totalPaginas);

    renderizarNumerosPaginador(totalPaginas, listaFiltrada);

    registrosPaginaActual.forEach(rep => {
        const estadoClase = rep.estado.toLowerCase().replace(" ", "-");
        // Convertimos a minúsculas para evitar problemas de concordancia
        const conf = configuracionIncidencias[rep.tipo.toLowerCase()] || { icono: "fa-solid fa-ellipsis", color: "#64748b" };
        const tr = document.createElement("tr");
        if (reporteSeleccionado && reporteSeleccionado.id === rep.id) tr.classList.add("selected-row");
        
        tr.innerHTML = `
            <td><strong>${rep.id}</strong></td>
            <td><i class="${conf.icono}" style="color: ${conf.color}"></i> ${rep.tipo}</td>
            <td>${rep.zona}</td>
            <td>${rep.fecha}</td>
            <td><span class="badge-status ${estadoClase}">${rep.estado}</span></td>
            <td><button class="btn-view-report"><i class="fa-solid fa-chevron-right"></i></button></td>
        `;
        tr.addEventListener("click", () => {
            document.querySelectorAll("#tablaReportesBody tr").forEach(row => row.classList.remove("selected-row"));
            tr.classList.add("selected-row");
            verDetalleExpediente(rep);
        });
        tbody.appendChild(tr);
    });
}

function renderizarNumerosPaginador(totalPaginas, listaOriginal) {
    const contenedorNumeros = document.getElementById("pageNumbersContainer");
    if(!contenedorNumeros) return;
    contenedorNumeros.innerHTML = "";
    for (let i = 1; i <= totalPaginas; i++) {
        const numBtn = document.createElement("button");
        numBtn.className = `num-btn ${i === paginaActual ? 'active' : ''}`;
        numBtn.textContent = i;
        numBtn.addEventListener("click", () => { paginaActual = i; renderizarTablaPaginada(listaOriginal); });
        contenedorNumeros.appendChild(numBtn);
    }
}

function verDetalleExpediente(reporte) {
    reporteSeleccionado = reporte;
    document.getElementById("detalleVacio").classList.add("hidden");
    document.getElementById("detalleActivo").classList.remove("hidden");
    document.getElementById("detId").textContent = `Reporte ${reporte.id}`;
    document.getElementById("detTipo").textContent = reporte.tipo;
    document.getElementById("detFecha").textContent = reporte.fecha;
    document.getElementById("detDescripcion").textContent = reporte.descripcion;

    const imgElement = document.getElementById("detImagenEvidencia");
    if (reporte.imagen) {
        imgElement.src = reporte.imagen;
        imgElement.style.display = "block";
    } else {
        imgElement.style.display = "none"; // Ocultar si no hay evidencia adjunta
    }

    const badgeEst = document.getElementById("detEstado");
    badgeEst.textContent = reporte.estado;
    badgeEst.className = `badge-status ${reporte.estado.toLowerCase().replace(" ", "-")}`;

    setTimeout(() => {
        if (!mapaDetalle) {
            mapaDetalle = L.map('mapReporte', { zoomControl: false }).setView([reporte.lat, reporte.lng], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapaDetalle);
            marcadorDetalle = L.marker([reporte.lat, reporte.lng]).addTo(mapaDetalle);
        } else {
            mapaDetalle.setView([reporte.lat, reporte.lng], 14);
            marcadorDetalle.setLatLng([reporte.lat, reporte.lng]);
        }
        mapaDetalle.invalidateSize();
    }, 150);
}

function inicializarEventosFiltros() {
    const searchInput = document.getElementById("inputBuscarReporte");
    if(searchInput) {
        searchInput.addEventListener("input", () => { paginaActual = 1; ejecutarFiltroCombinado(); });
    }
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filtroEstadoActual = btn.getAttribute("data-filter");
            paginaActual = 1;
            ejecutarFiltroCombinado();
        });
    });
    document.getElementById("btnPrevPage").addEventListener("click", () => { if (paginaActual > 1) { paginaActual--; ejecutarFiltroCombinado(); } });
    document.getElementById("btnNextPage").addEventListener("click", () => { paginaActual++; ejecutarFiltroCombinado(); });
}

function obtenerListaFiltradaGlobal() {
    const searchInput = document.getElementById("inputBuscarReporte");
    const textoBuscar = searchInput ? searchInput.value.toLowerCase() : "";
    return reportesData.filter(rep => {
        const cumpleEstado = (filtroEstadoActual === "Todos" || rep.estado === filtroEstadoActual);
        const cumpleTexto = rep.zona.toLowerCase().includes(textoBuscar) || rep.tipo.toLowerCase().includes(textoBuscar);
        return cumpleEstado && cumpleTexto;
    });
}

function actualizarLocalStorageDesdeMemoria() {
    // Si queremos persistir los cambios de estado (Ej: pasar de Pendiente a En Proceso) de los reportes locales
    let historialLocal = JSON.parse(localStorage.getItem("misreportes_db")) || [];
    
    historialLocal.forEach(localRep => {
        let coincidenciaEnMemoria = reportesData.find(m => m.id === localRep.id);
        if(coincidenciaEnMemoria) {
            localRep.estado = coincidenciaEnMemoria.estado;
        }
    });
    localStorage.setItem("misreportes_db", JSON.stringify(historialLocal));
}

function inicializarEventosAcciones() {
    document.getElementById("btnMarcarProceso").addEventListener("click", () => { if (reporteSeleccionado) { reporteSeleccionado.estado = "En Proceso"; procesarCambioExitoso(); } });
    document.getElementById("btnMarcarAtendido").addEventListener("click", () => { if (reporteSeleccionado) { reporteSeleccionado.estado = "Atendido"; procesarCambioExitoso(); } });
    document.getElementById("btnMarcarDescartado").addEventListener("click", () => { if (reporteSeleccionado) { reporteSeleccionado.estado = "Descartado"; procesarCambioExitoso(); } });

    document.getElementById("btnExportarExcel").addEventListener("click", () => {
        const datosExcel = obtenerListaFiltradaGlobal();
        if(datosExcel.length === 0) { alert("No hay registros para exportar."); return; }
        const encabezados = ["ID", "Tipo Incidencia", "Zona", "Fecha", "Estado", "Latitud", "Longitud"];
        const filas = datosExcel.map(r => [r.id, `"${r.tipo}"`, `"${r.zona.replace(/"/g, '""')}"`, `"${r.fecha}"`, `"${r.estado}"`, r.lat, r.lng]);
        const contenidoCSV = [encabezados.join(","), ...filas.map(f => f.join(","))].join("\n");
        const blob = new Blob(["\ufeff" + contenidoCSV], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", `Reportes_YakuAlarma_${filtroEstadoActual.replace(" ", "_")}_2026.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function procesarCambioExitoso() {
    actualizarLocalStorageDesdeMemoria();
    recalcularYRenderizarTodo();
    verDetalleExpediente(reporteSeleccionado);
}