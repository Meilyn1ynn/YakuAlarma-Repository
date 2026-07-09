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

// DEFINICIÓN DE NUEVA PALETA MAESTRA DE INCIDENCIAS
const configuracionIncidencias = {
    "Inundación":       { color: "#38bdf8", icono: "fa-solid fa-cloud-showers-water" },
    "Deslizamiento":   { color: "#f97316", icono: "fa-solid fa-mountain" },
    "Lluvias Intensas":{ color: "#eab308", icono: "fa-solid fa-cloud-showers-heavy" },
    "Huayco":          { color: "#a855f7", icono: "fa-solid fa-house-flood-water huayco" },
    "Tormenta":        { color: "#22c55e", icono: "fa-solid fa-cloud-bolt" }
};

// BANCO DE DATOS MAESTRO
let reportesData = [
    { id: 1024, ciudadano: "Carlos Mendoza", telefono: "+51 984 731 222", tipo: "Inundación", zona: "Av. Solar / Calle Derecha", fecha: "23/06/2026 18:20", descripcion: "Aniego masivo debido a desborde cercano.", estado: "Pendiente", riesgo: "Crítico", lat: -11.4930, lng: -77.2050, imagen: "img/reporte1.jpg" },
    { id: 1023, ciudadano: "Ana María Rojas", telefono: "+51 912 345 678", tipo: "Deslizamiento", zona: "Subida a Contigo Perú", fecha: "23/06/2026 15:40", descripcion: "Piedras caídas bloqueando medio carril.", estado: "Pendiente", riesgo: "Alto", lat: -11.4880, lng: -77.1980, imagen: "img/reporte2.jpg" },
    { id: 1022, ciudadano: "Jorge Luis Huamán", telefono: "+51 955 881 234", tipo: "Lluvias Intensas", zona: "Jr. Angaraes 412", fecha: "23/06/2026 11:15", descripcion: "Precipitación persistente genera estancamientos.", estado: "En Proceso", riesgo: "Medio", lat: -11.4960, lng: -77.2090, imagen: "img/reporte3.jpg" },
    { id: 1021, ciudadano: "Sofía Delgado", telefono: "+51 966 123 789", tipo: "Huayco", zona: "Asoc. Vivienda La Soledad", fecha: "22/06/2026 21:30", descripcion: "Flujo de lodo moderado ingresando a vías secundarias.", estado: "En Proceso", riesgo: "Crítico", lat: -11.5020, lng: -77.2140, imagen: "img/reporte4.jpg" },
    { id: 1020, ciudadano: "Ricardo Palomino", telefono: "+51 932 888 111", tipo: "Tormenta", zona: "Plaza de Armas de Huaral", fecha: "22/06/2026 09:10", descripcion: "Descargas eléctricas consecutivas.", estado: "Atendido", riesgo: "Bajo", lat: -11.4970, lng: -77.2070, imagen: "img/reporte5.webp" },
    { id: 1019, ciudadano: "Elena Benavides", telefono: "+51 941 552 112", tipo: "Inundación", zona: "Urb. San Juan Bautista", fecha: "21/06/2026 17:05", descripcion: "Agua acumulada ingresando a veredas.", estado: "Pendiente", riesgo: "Alto", lat: -11.4910, lng: -77.2180, imagen: "img/reporte6.jpg" },
    { id: 1018, ciudadano: "Marcos Quispe", telefono: "+51 915 224 336", tipo: "Deslizamiento", zona: "Av. Cahuas Cdra 5", fecha: "21/06/2026 14:00", descripcion: "Falsa alarma de derrumbe.", estado: "Descartado", riesgo: "Bajo", lat: -11.4950, lng: -77.2030, imagen: "img/reporte7.webp" },
    { id: 1017, ciudadano: "Lucía Santillán", telefono: "+51 988 332 114", tipo: "Lluvias Intensas", zona: "Pasaje Los Geranios", fecha: "20/06/2026 08:45", descripcion: "Filtración en techos comunales.", estado: "Atendido", riesgo: "Medio", lat: -11.4850, lng: -77.2110, imagen: "img/reporte8.jpg" },
    { id: 1016, ciudadano: "Pedro Gutiérrez", telefono: "+51 977 441 552", tipo: "Huayco", zona: "Calle Huando S/N", fecha: "19/06/2026 23:15", descripcion: "Desprendimiento en quebrada.", estado: "Atendido", riesgo: "Alto", lat: -11.4780, lng: -77.1890, imagen: "img/reporte9.jpg" },
    { id: 1015, ciudadano: "Gabriel Tello", telefono: "+51 952 774 113", tipo: "Tormenta", zona: "Jr. Comercio 215", fecha: "19/06/2026 11:20", descripcion: "Fuertes vientos desprenden calaminas.", estado: "Pendiente", riesgo: "Medio", lat: -11.4980, lng: -77.2060, imagen: "img/reporte10.avif" }
];

let reporteSeleccionado = null;
let filtroEstadoActual = "Todos";
let paginaActual = 1;
const registrosPorPagina = 5;

// Variables operativas del mapa de detalles
let mapaDetalle = null;
let marcadorDetalle = null;

// ==========================================
// INITIALIZATION DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
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
        const conf = configuracionIncidencias[rep.tipo] || { icono: "fa-solid fa-circle", color: "#64748b" };
        const tr = document.createElement("tr");
        if (reporteSeleccionado && reporteSeleccionado.id === rep.id) tr.classList.add("selected-row");
        
        // Se removió el <td> del ciudadano
        tr.innerHTML = `
            <td><strong>#${rep.id}</strong></td>
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
    document.getElementById("detId").textContent = `Reporte #${reporte.id}`;
    document.getElementById("detTipo").textContent = reporte.tipo;
    document.getElementById("detFecha").textContent = reporte.fecha;
    document.getElementById("detDescripcion").textContent = reporte.descripcion;

    document.getElementById("detImagenEvidencia").src = reporte.imagen;

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

function inicializarEventosAcciones() {
    document.getElementById("btnMarcarProceso").addEventListener("click", () => { if (reporteSeleccionado) { reporteSeleccionado.estado = "En Proceso"; procesarCambioExitoso(); } });
    document.getElementById("btnMarcarAtendido").addEventListener("click", () => { if (reporteSeleccionado) { reporteSeleccionado.estado = "Atendido"; procesarCambioExitoso(); } });
    document.getElementById("btnMarcarDescartado").addEventListener("click", () => { if (reporteSeleccionado) { reporteSeleccionado.estado = "Descartado"; procesarCambioExitoso(); } });

    document.getElementById("btnExportarExcel").addEventListener("click", () => {
        const datosExcel = obtenerListaFiltradaGlobal();
        if(datosExcel.length === 0) { alert("No hay registros para exportar."); return; }
        // Se removió "Ciudadano" y "Telefono" de la exportación estructurada
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
    recalcularYRenderizarTodo();
    verDetalleExpediente(reporteSeleccionado);
}