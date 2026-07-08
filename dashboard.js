// ======================================
// YAKUALARMA DASHBOARD
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // MENU RESPONSIVE
    // ==========================
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

    // ==========================================================================
// BASE DE DATOS DINÁMICA DE REPORTES Y ALERTAS (ESTADO INICIAL)
// ==========================================================================
let alertasActivas = [
    { tipo: "Lluvias intensas", zona: "En tu zona", extra: "Hoy, 10:30 a. m. • SENAMHI", tag: "Alta", clase: "item-danger" },
    { tipo: "Riesgo de huaycos", zona: "Zona de quebradas", extra: "Hoy, 09:15 a. m. • COER", tag: "Media", clase: "item-warning" },
    { tipo: "Deslizamiento de tierra", zona: "Palcazu - Sector norte", extra: "Ayer, 04:45 p. m. • COER", tag: "Media", clase: "item-warning" }
];

let reportesRecientes = [
    { tipo: "Deslizamiento", ubicacion: "Palcazu - Sector norte", hora: "Hoy, 11:20 a. m.", estado: "Enviado" },
    { tipo: "Lluvias intensas", ubicacion: "Naranjal - Quebrada Honda", hora: "Hoy, 10:50 a. m.", estado: "Enviado" },
    { tipo: "Huayco", ubicacion: "Villa Rica - Río Chontayacu", hora: "Hoy, 09:30 a. m.", estado: "Enviado" },
    { tipo: "Inundación", ubicacion: "San Pedro - Zona baja", hora: "Ayer, 06:15 p. m.", estado: "Enviado" }
];

// Estadísticas base escalables
let totalReportes = 38;
let reportesValidados = 22;
let zonasCriticas = 5;

// ==========================================================================
// LEAFLET MAP ENGINE (INICIALIZACIÓN EN VILLA RICA, PASCO / PERÚ)
// ==========================================================================
const map = L.map('map', { zoomControl: true }).setView([-10.7412, -75.2694], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Marcadores iniciales correspondientes a la leyenda de la imagen
let marcadores = [
    { lat: -10.7350, lng: -75.2600, color: "#e53e3e", desc: "Alerta Alta: Lluvias Intensas" },
    { lat: -10.7580, lng: -75.2900, color: "#ed8936", desc: "Alerta Media: Quebrada Inestable" },
    { lat: -10.7100, lng: -75.2400, color: "#ecc94b", desc: "Alerta Baja: Vigilancia" },
    { lat: -10.7450, lng: -75.2200, color: "#38a169", desc: "Refugio Comunitario Colegio" },
    { lat: -10.7412, lng: -75.2694, color: "#3182ce", desc: "Tu ubicación actual" }
];

function dibujarMarcadores() {
    marcadores.forEach(m => {
        L.circleMarker([m.lat, m.lng], {
            radius: 8,
            fillColor: m.color,
            color: "#ffffff",
            weight: 2,
            fillOpacity: 0.9
        }).addTo(map).bindPopup(`<strong>${m.desc}</strong>`);
    });
}
dibujarMarcadores();

// ==========================================================================
// FUNCIONES DE RENDERIZACIÓN DE COMPONENTES INTERNOS
// ==========================================================================
function renderizarAlertas() {
    const container = document.getElementById("activeAlertsContainer");
    if (!container) return;
    container.innerHTML = "";
    
    alertasActivas.forEach(a => {
        const tagClass = a.tag.toLowerCase() === 'alta' ? 'danger' : 'warning';
        container.innerHTML += `
            <div class="alert-card-item ${a.clase}">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div class="alert-item-core">
                    <div class="alert-headline-row">
                        <strong>${a.tipo}</strong>
                        <span class="badge-tag ${tagClass}">${a.tag}</span>
                    </div>
                    <p>${a.zona}</p>
                    <small>${a.extra}</small>
                </div>
                <i class="fa-solid fa-chevron-right alert-chevron"></i>
            </div>
        `;
    });
    
    // Sincronizar contadores superiores
    document.getElementById("activeAlertsNum").textContent = alertasActivas.length;
    document.getElementById("sidebarAlertCount").textContent = alertasActivas.length;
}

function renderizarTablaReportes() {
    const tbody = document.getElementById("reportsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    reportesRecientes.forEach(r => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${r.tipo}</strong></td>
                <td>${r.ubicacion}</td>
                <td>${r.hora}</td>
                <td><span class="badge-status status-sent">${r.estado}</span></td>
            </tr>
        `;
    });
}

// ==========================================================================
// SIMULACIÓN DINÁMICA DE ENTRADA DE REPORTES EN TIEMPO REAL (EFECTO LIVE)
// ==========================================================================
const tiposDeEmergencia = ["Lluvias intensas", "Huayco", "Deslizamiento", "Inundación"];
const sectoresVillaRica = ["Sector San José", "Quebrada Honda", "Av. Galván", "Zona Centro - Río", "Bajo Palcazu"];

setInterval(() => {
    // 1. Generar nueva simulación de reporte ciudadano entrante
    const randomTipo = tiposDeEmergencia[Math.floor(Math.random() * tiposDeEmergencia.length)];
    const randomSector = sectoresVillaRica[Math.floor(Math.random() * sectoresVillaRica.length)];
    
    const ahora = new Date();
    const horaFormateada = `Hoy, ${ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    // Insertar al inicio de la matriz
    reportesRecientes.unshift({
        tipo: randomTipo,
        ubicacion: randomSector,
        hora: horaFormateada,
        estado: "Enviado"
    });
    
    if (reportesRecientes.length > 5) reportesRecientes.pop(); // Mantener lista limpia
    
    // Incrementar métricas de control comunitario de forma lógica
    totalReportes++;
    if (Math.random() > 0.4) reportesValidados++;
    if (Math.random() > 0.85) zonasCriticas++;
    
    // 2. Evento dinámico ocasional: Actualizar o agregar alerta crítica en el mapa
    if (Math.random() > 0.7) {
        const deltaLat = (Math.random() - 0.5) * 0.08;
        const deltaLng = (Math.random() - 0.5) * 0.08;
        const nuevaLat = -10.7412 + deltaLat;
        const nuevaLng = -75.2694 + deltaLng;
        
        marcadores.push({
            lat: nuevaLat,
            lng: nuevaLng,
            color: "#e53e3e",
            desc: `Alerta en Tiempo Real: ${randomTipo}`
        });
        
        // Agregar a la lista visual de alertas activas
        alertasActivas.unshift({
            tipo: randomTipo,
            zona: randomSector,
            extra: `${horaFormateada} • Sistema Yakualarma`,
            tag: "Alta",
            clase: "item-danger"
        });
        if (alertasActivas.length > 4) alertasActivas.pop();
        
        // Dibujar nuevo nodo georeferenciado en el mapa
        L.circleMarker([nuevaLat, nuevaLng], {
            radius: 10,
            fillColor: "#e53e3e",
            color: "#ffffff",
            weight: 3,
            fillOpacity: 1
        }).addTo(map).bindPopup(`<strong>[NUEVO EVENTO] ${randomTipo} en ${randomSector}</strong>`).openPopup();
    }
    
    // 3. Mutar clima aleatoriamente de forma sutil
    const temperaturaBase = 17 + Math.floor(Math.random() * 4);
    const humedadBase = 80 + Math.floor(Math.random() * 15);
    const vientoBase = 10 + Math.floor(Math.random() * 6);
    
    document.getElementById("currentTempText").textContent = `${temperaturaBase}°C`;
    document.getElementById("wHumedad").textContent = `${Math.min(humedadBase, 100)}%`;
    document.getElementById("wViento").textContent = `${vientoBase} km/h`;
    
    // Actualizar strings numéricos en la interfaz global
    document.getElementById("totalReportsCount").textContent = totalReportes;
    document.getElementById("validatedReportsCount").textContent = reportesValidados;
    document.getElementById("criticalZonesCount").textContent = zonasCriticas;
    document.getElementById("todayReportsNum").textContent = Math.floor(totalReportes / 2.5);
    document.getElementById("riskZonesNum").textContent = zonasCriticas;
    
    // Recargar interfaces fluidas
    renderizarTablaReportes();
    renderizarAlertas();

}, 5000);
// ==========================================================================
// EJECUCIÓN INICIAL AL CARGAR LA CONSOLA
// ==========================================================================
renderizarAlertas();
renderizarTablaReportes();

});