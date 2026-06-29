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

// ==========================================================================
// DATA CORE DE CENTROS DE SALUD (Plantilla Base)
// ==========================================================================
let centrosSaludData = [
    { id: 1, nombre: "Centro de Salud Villa Rica", tipo: "Centro de Salud", direccion: "Av. Principal S/N - Villa Rica", estado: "Disponible", capacidad: 45, medicos: 12, enfermeros: 18, distancia: 1.2, servicios: ["urgencias", "ambulancia", "farmacia", "laboratorio"], lat: -11.491, lng: -77.202 },
    { id: 2, nombre: "Puesto de Salud Naranjal", tipo: "Puesto de Salud", direccion: "Jr. Los Pinos S/N - Naranjal", estado: "Atención limitada", capacidad: 85, medicos: 4, enfermeros: 6, distancia: 3.8, servicios: ["urgencias", "farmacia"], lat: -11.512, lng: -77.224 },
    { id: 3, nombre: "Centro de Salud Palcazu", tipo: "Centro de Salud", direccion: "Carretera Palcazu - Naranjal Km 12", estado: "Disponible", capacidad: 30, medicos: 8, enfermeros: 12, distancia: 6.5, servicios: ["urgencias", "ambulancia", "farmacia"], lat: -11.478, lng: -77.185 },
    { id: 4, nombre: "Puesto de Salud Puerto Yurinaki", tipo: "Puesto de Salud", direccion: "Av. Yurinaki S/N - Puerto Yurinaki", estado: "Saturado", capacidad: 100, medicos: 6, enfermeros: 8, distancia: 12.3, servicios: ["urgencias", "farmacia"], lat: -11.531, lng: -77.161 },
    { id: 5, nombre: "Puesto de Salud San Luis", tipo: "Puesto de Salud", direccion: "Jr. San Luis S/N - San Luis", estado: "Disponible", capacidad: 60, medicos: 3, enfermeros: 5, distancia: 15.7, servicios: ["farmacia"], lat: -11.462, lng: -77.239 },
    { id: 6, nombre: "Centro Médico Auxiliar Chancay", tipo: "Centro de Salud", direccion: "Av. Ribera Mar - Sector Sur", estado: "Fuera de servicio", capacidad: 0, medicos: 0, enfermeros: 0, distancia: 19.1, servicios: [], lat: -11.554, lng: -77.265 }
];

const iconosServicios = {
    urgencias: "fa-solid fa-kit-medical",
    ambulancia: "fa-solid fa-truck-medical",
    farmacia: "fa-solid fa-pills",
    laboratorio: "fa-solid fa-flask"
};

// ==========================================================================
// FUNCIÓN PARA GENERAR DATOS ALEATORIOS AL INICIAR / REINICIAR (F5)
// ==========================================================================
function generarDatosAleatoriosAlIniciar() {
    centrosSaludData.forEach(centro => {
        if (centro.estado === "Fuera de servicio") return;

        // Genera una capacidad aleatoria totalmente diferente entre 15% y 100%
        centro.capacidad = Math.floor(Math.random() * (100 - 15 + 1)) + 15;

        // Reasigna automáticamente el estado según la capacidad generada en el arranque
        if (centro.capacidad >= 90) {
            centro.estado = "Saturado";
        } else if (centro.capacidad >= 65) {
            centro.estado = "Atención limitada";
        } else {
            centro.estado = "Disponible";
        }

        // Modifica el personal médico de forma aleatoria para el inicio
        centro.medicos = Math.max(2, centro.medicos + (Math.floor(Math.random() * 5) - 2));
        centro.enfermeros = Math.max(4, centro.enfermeros + (Math.floor(Math.random() * 9) - 4));
    });
}

// ==========================================================================
// CONFIGURACIÓN DEL MAPA
// ==========================================================================
const map = L.map('map').setView([-11.495, -77.207], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marcadoresActivos = [];

function getMarkerColor(estado) {
    if (estado === "Disponible") return "#2a9d8f";
    if (estado === "Atención limitada") return "#ea580c";
    if (estado === "Saturado") return "#d62828";
    return "#718096";
}

function pintarMarcadores(lista) {
    marcadoresActivos.forEach(m => map.removeLayer(m));
    marcadoresActivos = [];

    lista.forEach(c => {
        if(c.estado === "Fuera de servicio") return;

        const marker = L.circleMarker([c.lat, c.lng], {
            radius: 11,
            fillColor: getMarkerColor(c.estado),
            color: '#fff',
            weight: 2,
            fillOpacity: 0.9
        }).addTo(map);

        marker.bindPopup(`
            <div style="font-family:'Inter'; font-size:12px; padding:2px;">
                <h4 style="margin:0 0 4px; color:#0b2c66;">${c.nombre}</h4>
                <p style="margin:0 0 6px; color:#718096;">${c.tipo} • ${c.distancia} km</p>
                <span style="padding:2px 6px; background:${getMarkerColor(c.estado)}; color:white; border-radius:4px; font-weight:bold; font-size:10px;">${c.estado}</span>
            </div>
        `);
        marcadoresActivos.push(marker);
    });
}

document.getElementById("btnUbicacion").addEventListener("click", () => {
    map.setView([-11.495, -77.207], 13);
    L.popup()
        .setLatLng([-11.495, -77.207])
        .setContent('<div style="font-family:\'Inter\'; font-size:11px; font-weight:600;">📍 Tu ubicación actual</div>')
        .openOn(map);
});

// ==========================================================================
// RENDERIZADORES DE INTERFAZ GENERAL
// ==========================================================================
function procesarTodoElTablero(listaCentros) {
    pintarMarcadores(listaCentros);
    renderizarCardsMetricos();
    renderizarListaLateral(listaCentros);
    renderizarTablaCompleta(listaCentros);
}

function renderizarCardsMetricos() {
    const total = centrosSaludData.length;
    document.getElementById("mTotal").textContent = total;
    
    const estados = ["Disponible", "Atención limitada", "Saturado", "Fuera de servicio"];
    estados.forEach(est => {
        const cantidad = centrosSaludData.filter(c => c.estado === est).length;
        const porcentaje = total > 0 ? ((cantidad / total) * 100).toFixed(1) : 0;
        
        if(est === "Disponible") {
            document.getElementById("mDisponible").textContent = cantidad;
            document.getElementById("pDisponible").textContent = `${porcentaje}% del total`;
        } else if(est === "Atención limitada") {
            document.getElementById("mLimitada").textContent = cantidad;
            document.getElementById("pLimitada").textContent = `${porcentaje}% del total`;
        } else if(est === "Saturado") {
            document.getElementById("mSaturado").textContent = cantidad;
            document.getElementById("pSaturado").textContent = `${porcentaje}% del total`;
        } else if(est === "Fuera de servicio") {
            document.getElementById("mFuera").textContent = cantidad;
            document.getElementById("pFuera").textContent = `${porcentaje}% del total`;
        }
    });
}

function renderizarListaLateral(lista) {
    const contenedor = document.getElementById("sidebarHealthList");
    contenedor.innerHTML = "";

    lista.slice(0, 5).forEach(c => {
        const slugEstado = c.estado === "Atención limitada" ? "limitada" : c.estado.toLowerCase().replace(" ", "-");
        
        contenedor.innerHTML += `
            <div class="health-quick-item" onclick="enfocarMapa(${c.lat}, ${c.lng})">
                <div class="h-q-left">
                    <div class="h-q-icon ${slugEstado}"><i class="fa-solid fa-hospital"></i></div>
                    <div class="h-q-info">
                        <h4>${c.nombre}</h4>
                        <p>${c.direccion}</p>
                    </div>
                </div>
                <div class="h-q-right">
                    <span class="badge-status-sm ${slugEstado}">${c.estado === "Atención limitada" ? "Limitada" : c.estado}</span>
                    <span>${c.distancia} km</span>
                </div>
            </div>`;
    });
}

function enfocarMapa(lat, lng) {
    map.setView([lat, lng], 14);
}

function renderizarTablaCompleta(lista) {
    const tbody = document.getElementById("tablaCentrosBody");
    tbody.innerHTML = "";

    if(lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:#718096;">No se encontraron resultados.</td></tr>`;
        return;
    }

    lista.forEach(c => {
        const slugEstado = c.estado === "Atención limitada" ? "limitada" : c.estado.toLowerCase().replace(" ", "-");
        let rangoCapacidad = "low";
        if(c.capacidad > 50 && c.capacidad < 90) rangoCapacidad = "medium";
        if(c.capacidad >= 90) rangoCapacidad = "high";

        let serviciosHTML = `<div class="services-badges-wrapper">`;
        Object.keys(iconosServicios).forEach(s => {
            const activo = c.servicios.includes(s) ? "active" : "";
            serviciosHTML += `<div class="service-icon-tag ${activo}" title="${s}"><i class="${iconosServicios[s]}"></i></div>`;
        });
        serviciosHTML += `</div>`;

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="h-q-left">
                        <div class="h-q-icon ${slugEstado}" style="width:30px; height:30px; font-size:12px;"><i class="fa-solid fa-hospital"></i></div>
                        <div>
                            <strong>${c.nombre}</strong>
                            <span style="display:block; font-size:11px; color:#718096;">${c.direccion}</span>
                        </div>
                    </div>
                </td>
                <td>${c.tipo}</td>
                <td><span class="badge-status-sm ${slugEstado}">${c.estado === "Atención limitada" ? "Limitada" : c.estado}</span></td>
                <td>
                    <div class="capacity-container">
                        <span class="capacity-text">${c.capacidad}%</span>
                        <div class="capacity-bar">
                            <div class="capacity-fill ${rangoCapacidad}" style="width: ${c.capacidad}%;"></div>
                        </div>
                    </div>
                </td>
                <td><div class="staff-info">${c.medicos} med.<br>${c.enfermeros} enf.</div></td>
                <td>${serviciosHTML}</td>
                <td><strong>${c.distancia} km</strong></td>
                <td>
                    <button class="btn-action-table" onclick="enfocarMapa(${c.lat}, ${c.lng})">
                        <i class="fa-solid fa-location-arrow"></i> Cómo llegar
                    </button>
                </td>
            </tr>`;
    });
}

// ==========================================================================
// FILTROS Y BÚSQUEDAS
// ==========================================================================
const searchHealth = document.getElementById("searchHealth");
const filterDistance = document.getElementById("filterDistance");
const filterType = document.getElementById("filterType");
const btnAplicarFiltros = document.getElementById("btnAplicarFiltros");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnVerTodosCentros = document.getElementById("btnVerTodosCentros");

function ejecutarFiltradoGeneral() {
    let filtrados = centrosSaludData;
    const texto = searchHealth.value.toLowerCase().trim();
    if(texto !== "") filtrados = filtrados.filter(c => c.nombre.toLowerCase().includes(texto));

    const checks = document.querySelectorAll('input[name="statusFilter"]:checked');
    if(checks.length > 0) {
        const estadosSeleccionados = Array.from(checks).map(input => input.value);
        filtrados = filtrados.filter(c => estadosSeleccionados.includes(c.estado));
    }

    const distMax = filterDistance.value;
    if(distMax !== "Todas") filtrados = filtrados.filter(c => c.distancia <= parseFloat(distMax));

    const tipoEst = filterType.value;
    if(tipoEst !== "Todos") filtrados = filtrados.filter(c => c.tipo === tipoEst);

    procesarTodoElTablero(filtrados);
}

btnAplicarFiltros.addEventListener("click", ejecutarFiltradoGeneral);

btnLimpiar.addEventListener("click", () => {
    searchHealth.value = "";
    filterDistance.value = "Todas";
    filterType.value = "Todos";
    document.querySelectorAll('input[name="statusFilter"]').forEach(chk => chk.checked = false);
    procesarTodoElTablero(centrosSaludData);
});

btnVerTodosCentros.addEventListener("click", () => {
    document.getElementById("tablaCompletaSection").scrollIntoView({ behavior: 'smooth' });
});

// ==========================================================================
// PROCESAMIENTO ÚNICO DE ARRANQUE (Sin loops en segundo plano)
// ==========================================================================
generarDatosAleatoriosAlIniciar(); // Genera aleatoriedad solo al cargar/actualizar la app
procesarTodoElTablero(centrosSaludData);