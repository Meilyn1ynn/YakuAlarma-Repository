// ==========================================
// 1. MANEJO DEL MENU LATERAL RESPONSIVE
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
// 2. DATA DE ALERTAS ACTIVAS (CON COORDENADAS)
// ==========================================
const databaseAlertas = [
    {
        id: "ALT-001",
        tipo: "Lluvia intensa",
        nivel: "Alta",
        zonaPrincipal: "En tu zona",
        descripcion: "Se prevén lluvias de moderada a fuerte intensidad en las próximas horas.",
        tiempo: "Hoy, 10:30 a. m.",
        fuente: "SENAMHI",
        zonasAfectadas: ["Villa Rica", "Naranjal", "Palcazu"],
        coords: [-10.7394, -75.2714] // Coordenadas de Villa Rica / Selva Central aprox
    },
    {
        id: "ALT-002",
        tipo: "Riesgo de huaycos",
        nivel: "Media",
        zonaPrincipal: "Zona de quebradas",
        descripcion: "Posible activación de quebradas por acumulación de lluvias.",
        tiempo: "Hoy, 09:15 a. m.",
        fuente: "COER",
        zonasAfectadas: ["Quebrada Honda", "Sector La Esperanza"],
        coords: [-10.7550, -75.2600]
    },
    {
        id: "ALT-003",
        tipo: "Viento fuerte",
        nivel: "Baja",
        zonaPrincipal: "En tu zona",
        descripcion: "Vientos con velocidades de hasta 35 km/h. Asegura objetos y evita zonas expuestas.",
        tiempo: "Ayer, 04:45 p. m.",
        fuente: "SENAMHI",
        zonasAfectadas: ["Villa Rica", "San Pedro"],
        coords: [-10.7300, -75.2850]
    },
    {
        id: "ALT-004",
        tipo: "Inundación",
        nivel: "Informativa",
        zonaPrincipal: "Ribera del Río",
        descripcion: "Monitoreo preventivo sobre el margen izquierdo del caudal principal.",
        tiempo: "08/05/2026, 11:00 a. m.",
        fuente: "INDECI",
        zonasAfectadas: ["Naranjal", "San Pedro"],
        coords: [-10.7480, -75.2900]
    }
];

let alertasMostradas = [...databaseAlertas];
let mapInstances = {}; // Almacenamiento de mapas activos
let modalMapInstance = null; // Instancia global del mapa del modal

// ==========================================
// 3. RENDERIZADO DE CONTADORES ESTADÍSTICOS
// ==========================================
function actualizarContadores() {
    const alta = databaseAlertas.filter(a => a.nivel === "Alta").length;
    const media = databaseAlertas.filter(a => a.nivel === "Media").length;
    const baja = databaseAlertas.filter(a => a.nivel === "Baja").length;

    document.getElementById("count-alta").textContent = alta;
    document.getElementById("count-media").textContent = media;
    document.getElementById("count-baja").textContent = baja;
}

function obtenerIconoEvento(tipo) {
    switch (tipo) {
        case "Lluvia intensa": return "fa-cloud-showers-heavy";
        case "Riesgo de huaycos": return "fa-triangle-exclamation";
        case "Viento fuerte": return "fa-wind";
        case "Inundación": return "fa-house-flood-water";
        default: return "fa-bell";
    }
}

// ==========================================
// 4. RENDERIZACIÓN DINÁMICA DE TARJETAS Y MAPAS
// ==========================================
function renderAlertCards(lista) {
    const container = document.getElementById("alertsContainer");
    container.innerHTML = "";

    // Limpiar mapas antiguos del registro para evitar fugas de memoria
    mapInstances = {};

    if (lista.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; color:#64748b; background:white; border-radius:16px;">
                <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:10px;"></i>
                <p>No se encontraron alertas activas con los filtros seleccionados.</p>
            </div>`;
        return;
    }

    lista.forEach(alerta => {
        const claseSeveridad = alerta.nivel.toLowerCase();
        const icono = obtenerIconoEvento(alerta.tipo);
        const listaZonasLI = alerta.zonasAfectadas.map(z => `<li>${z}</li>`).join("");
        const mapId = `map-${alerta.id}`;

        const cardHTML = `
            <div class="alert-card-row ${claseSeveridad}">
                <div class="alert-card-left">
                    <div class="alert-type-icon-wrapper">
                        <i class="fa-solid ${icono}"></i>
                    </div>
                    <span class="badge-severity">${alerta.nivel}</span>
                </div>
                
                <div class="alert-card-center">
                    <h4>${alerta.tipo}</h4>
                    <div class="alert-zone-tag">${alerta.zonaPrincipal}</div>
                    <p>${alerta.descripcion}</p>
                    <div class="alert-meta-info">
                        <span><i class="fa-regular fa-clock"></i> ${alerta.tiempo}</span>
                        <span><i class="fa-solid fa-building-shield"></i> Fuente: ${alerta.fuente}</span>
                    </div>
                </div>

                <div class="alert-card-zones">
                    <h5>Zonas afectadas</h5>
                    <ul>
                        ${listaZonasLI}
                    </ul>
                </div>

                <div class="alert-card-right-actions">
                    <div id="${mapId}" class="alert-mini-map-container"></div>
                    <button class="btn-view-details" onclick="abrirModalDetalles('${alerta.id}')">
                        Ver detalles <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });

    // Inicializar mapas reales Leaflet después de insertar el HTML
    lista.forEach(alerta => {
        const mapId = `map-${alerta.id}`;
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            const map = L.map(mapId, {
                center: alerta.coords,
                zoom: 13,
                zoomControl: false,
                attributionControl: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // Agregar un radio de impacto estético según el nivel
            const colorImpacto = alerta.nivel === 'Alta' ? '#dc2626' : (alerta.nivel === 'Media' ? '#f97316' : '#eab308');
            L.circle(alerta.coords, {
                color: colorImpacto,
                fillColor: colorImpacto,
                fillOpacity: 0.3,
                radius: 400
            }).addTo(map);

            mapInstances[alerta.id] = map;
        }
    });
}

// ==========================================
// 5. MOTOR DE FILTRADO Y ORDENAMIENTO
// ==========================================
function filtrarYAplicarAlertas() {
    const checkboxes = document.querySelectorAll(".filter-checkbox-level");
    const nivelesSeleccionados = [];
    checkboxes.forEach(chk => {
        if (chk.checked) nivelesSeleccionados.push(chk.value);
    });

    const tipoEvento = document.getElementById("filterEventType").value;
    const zonaSeleccionada = document.getElementById("filterZone").value;
    const fuenteSeleccionada = document.getElementById("filterSource").value;

    alertasMostradas = databaseAlertas.filter(alerta => {
        const cumpleNivel = nivelesSeleccionados.includes(alerta.nivel);
        const cumpleTipo = (tipoEvento === "Todos" || alerta.tipo === tipoEvento);
        const cumpleZona = (zonaSeleccionada === "Todas" || alerta.zonasAfectadas.includes(zonaSeleccionada));
        const cumpleFuente = (fuenteSeleccionada === "Todas" || alerta.fuente === fuenteSeleccionada);

        return cumpleNivel && cumpleTipo && cumpleZona && cumpleFuente;
    });

    const criterioOrden = document.getElementById("sortAlerts").value;
    if (criterioOrden === "antiguas") {
        alertasMostradas.reverse();
    }

    renderAlertCards(alertasMostradas);
}

document.getElementById("applyFiltersBtn").addEventListener("click", filtrarYAplicarAlertas);
document.getElementById("sortAlerts").addEventListener("change", filtrarYAplicarAlertas);

document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    document.querySelectorAll(".filter-checkbox-level").forEach(chk => chk.checked = true);
    document.getElementById("filterEventType").value = "Todos";
    document.getElementById("filterZone").value = "Todas";
    document.getElementById("filterSource").value = "Todas";
    filtrarYAplicarAlertas();
});

// ==========================================
// 6. CONTROL DE VENTANA MODAL CON MAPA INTEGRADO
// ==========================================
const modal = document.getElementById("detailsModal");
const closeModalX = document.getElementById("closeModalBtn");
const closeModalBtnSec = document.getElementById("closeModalBtnSecondary");

function abrirModalDetalles(idAlerta) {
    const alerta = databaseAlertas.find(a => a.id === idAlerta);
    if (!alerta) return;

    document.getElementById("modalTitle").textContent = alerta.tipo;
    document.getElementById("modalSource").textContent = alerta.fuente;
    document.getElementById("modalTime").textContent = alerta.tiempo;
    document.getElementById("modalDescription").textContent = alerta.descripcion;

    const badge = document.getElementById("modalLevelBadge");
    badge.textContent = alerta.nivel.toUpperCase();
    
    badge.style.backgroundColor = "var(--color-info)";
    if (alerta.nivel === "Alta") badge.style.backgroundColor = "var(--color-alta)";
    if (alerta.nivel === "Media") badge.style.backgroundColor = "var(--color-media)";
    if (alerta.nivel === "Baja") badge.style.backgroundColor = "var(--color-baja)";

    const listContainer = document.getElementById("modalZonesList");
    listContainer.innerHTML = alerta.zonasAfectadas.map(z => `<li>${z}</li>`).join("");

    modal.classList.add("open");

    // Inicializar o reubicar el mapa dentro del modal
    setTimeout(() => {
        if (!modalMapInstance) {
            modalMapInstance = L.map('modalMap', {
                zoomControl: true,
                attributionControl: false
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(modalMapInstance);
        }
        
        modalMapInstance.setView(alerta.coords, 14);
        
        // Limpiar capas previas si existen en el mapa del modal
        modalMapInstance.eachLayer((layer) => {
            if (layer instanceof L.Circle) {
                modalMapInstance.removeLayer(layer);
            }
        });

        const colorImpacto = alerta.nivel === 'Alta' ? '#dc2626' : (alerta.nivel === 'Media' ? '#f97316' : '#eab308');
        L.circle(alerta.coords, {
            color: colorImpacto,
            fillColor: colorImpacto,
            fillOpacity: 0.3,
            radius: 500
        }).addTo(modalMapInstance);

        modalMapInstance.invalidateSize();
    }, 300);
}

function cerrarModal() {
    modal.classList.remove("open");
}

closeModalX.addEventListener("click", cerrarModal);
closeModalBtnSec.addEventListener("click", cerrarModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

// ==========================================
// 7. INICIALIZACIÓN
// ==========================================
actualizarContadores();
renderAlertCards(alertasMostradas);