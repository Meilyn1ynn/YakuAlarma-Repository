// ==========================================
// 1. COMPORTAMIENTO RESPONSIVE DEL MENU
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
// 2. DATA DE PRODUCCIÓN (Refugios, Rutas y Zonas)
// ==========================================
const database = {
    refugios: [
        {
            id: "REF-01",
            nombre: "Coliseo Municipal Campeones de Huaral",
            lat: -11.4965,
            lng: -77.2052,
            direccion: "Av. Solar S/N, Huaral",
            capacidad: "500 Personas",
            servicios: "Agua potable, SS.HH, Energía Eléctrica, Tópico Médico",
            contacto: "Defensa Civil Huaral (01) 246-5555",
            imagenes: ["refugio/coliseo1.jpg", "refugio/coliseo2.jpg"],
            descripcion: "Centro de acopio y refugio temporal principal. Cuenta con techado reforzado de estructura metálica ideal para protección ante precipitaciones pluviales severas."
        },
        {
            id: "REF-02",
            nombre: "I.E. Andrés de los Reyes",
            lat: -11.4931,
            lng: -77.2098,
            direccion: "Calle Derecha 450, Huaral",
            capacidad: "350 Personas",
            servicios: "Aulas habitables, Cocina comunitaria, SS.HH, Seguridad PNP",
            contacto: "Serenazgo Huaral - Alerta",
            imagenes: ["refugio/colegio1.jpg", "refugio/colegio2.webp"],
            descripcion: "Institución educativa habilitada estratégicamente en zonas altas del centro urbano para brindar resguardo familiar coordinado."
        },
        {
            id: "REF-03",
            nombre: "Complejo Deportivo El Trébol",
            lat: -11.5052,
            lng: -77.1985,
            direccion: "Urb. El Trébol Mz G, Huaral",
            capacidad: "200 Personas",
            servicios: "Espacio amplio, Carpas de Campaña, Tanque de Agua",
            contacto: "Comité Vecinal El Trébol",
            imagenes: ["refugio/complejo1.jpg", "refugio/complejo2.jpg"],
            descripcion: "Losa deportiva abierta equipada con postes de iluminación autónoma y espacio llano para la instalación rápida de módulos temporales de vivienda Indeci."
        }
    ],
    rutas: [
        { id: "RUT-01", nombre: "Ruta de Evacuación Río Seco", tramo: "Desde Margen del Río hasta Coliseo Municipal", estado: "Despejada", tipo: "Peatonal/Vehicular" },
        { id: "RUT-02", nombre: "Vía de Escape Auxiliar Oeste", tramo: "Av. Chancay hacia Zona Alta Aucallama", estado: "Monitoreada", tipo: "Vehicular Pesado" },
        { id: "RUT-03", nombre: "Corredor Seguro Centro", tramo: "Calle Derecha hasta I.E. Andrés de los Reyes", estado: "Despejada", tipo: "Peatonal Exclusivo" }
    ],
    zonasSeguras: [
        { id: "ZON-01", nombre: "Plaza de Armas de Huaral", radio: 60, color: "#2a9d8f", lat: -11.4958, lng: -77.2078, descripcion: "Zona céntrica de llanura alta lejos de pendientes pronunciadas e inundaciones de acequias estructurales." },
        { id: "ZON-02", nombre: "Parque de la Cultura", radio: 50, color: "#0077b6", lat: -11.4912, lng: -77.2025, descripcion: "Punto elevado consolidado urbano con suelo sísmicamente compacto y libre de tendidos eléctricos aéreos de alta tensión." }
    ]
};

// Ubicación por defecto de Huaral en caso de denegar GPS
let userLocation = { lat: -11.495, lng: -77.207 }; 

// ==========================================
// 3. INICIALIZACIÓN DEL MAPA LEAFLET
// ==========================================
const map = L.map('map').setView([userLocation.lat, userLocation.lng], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap para YakuAlarma'
}).addTo(map);

// Capas de marcadores
let userMarker = null;
let markersGroup = L.layerGroup().addTo(map);

// Iconos personalizados básicos
const iconRefugio = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4341/4341074.png', // Icono representativo de Refugio/Casa
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// ==========================================
// 4. FÓRMULA HAVERSINE (CÁLCULO MATEMÁTICO DE DISTANCIAS)
// ==========================================
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distancia resultante
}

// ==========================================
// 5. PROCESAMIENTO DINÁMICO DE DATOS Y RENDERIZADO
// ==========================================
function procesarInformacionYMapas() {
    markersGroup.clearLayers();

    // 1. Renderizar Marcador de Usuario
    if(userMarker) map.removeLayer(userMarker);
    userMarker = L.marker([userLocation.lat, userLocation.lng], {
        draggable: false
    }).bindPopup("<b>Tu posición actual</b>").addTo(map);

    // 2. Calcular Refugio más cercano
    let refugioMasCercano = null;
    let distanciaMinima = Infinity;

    const listaRefugiosContainer = document.getElementById("listaRefugios");
    listaRefugiosContainer.innerHTML = "";

    database.refugios.forEach(refugio => {
        const distancia = calcularDistancia(userLocation.lat, userLocation.lng, refugio.lat, refugio.lng);
        refugio.distanciaCalculada = distancia;

        if(distancia < distanciaMinima) {
            distanciaMinima = distancia;
            refugioMasCercano = refugio;
        }

        // Crear tarjeta para el listado de refugios
        listaRefugiosContainer.innerHTML += `
            <div class="item-list-card">
                <div class="item-info">
                    <h4>${refugio.nombre}</h4>
                    <p><i class="fa-solid fa-location-dot"></i> ${refugio.direccion}</p>
                    <p><i class="fa-solid fa-arrow-right-to-bracket"></i> Distancia: <strong>${distancia.toFixed(2)} km</strong></p>
                </div>
                <button class="btn-secondary" onclick="abrirDetallesRefugio('${refugio.id}')">Ver Detalles</button>
            </div>
        `;

        // Añadir al mapa
        L.marker([refugio.lat, refugio.lng], { icon: iconRefugio })
            .bindPopup(`<b>Refugio:</b> ${refugio.nombre}<br>Capacidad: ${refugio.capacidad}`)
            .addTo(markersGroup);
    });

    // 3. Renderizar Tarjeta Destacada del Refugio Más Cercano
    const contenedorMasCercano = document.getElementById("refugioMasCercanoCard");
    if(refugioMasCercano) {
        contenedorMasCercano.innerHTML = `
            <h4>${refugioMasCercano.nombre}</h4>
            <p><i class="fa-solid fa-map-pinned"></i> <b>Dirección:</b> ${refugioMasCercano.direccion}</p>
            <p><i class="fa-solid fa-users"></i> <b>Capacidad:</b> ${refugioMasCercano.capacidad}</p>
            <div class="distance-badge"><i class="fa-solid fa-route"></i> A solo ${distanciaMinima.toFixed(2)} km de ti</div>
            <button class="btn-accent" onclick="abrirDetallesRefugio('${refugioMasCercano.id}')"><i class="fa-solid fa-circle-info"></i> Más Detalles</button>
        `;
    }

    // 4. Pintar Zonas Seguras en el Mapa (Círculos de colores) y renderizar lista
    const listaZonasSegurasContainer = document.getElementById("listaZonasSeguras");
    listaZonasSegurasContainer.innerHTML = "";

    database.zonasSeguras.forEach(zona => {
        // Círculo en mapa
        L.circle([zona.lat, zona.lng], {
            color: zona.color,
            fillColor: zona.color,
            fillOpacity: 0.4,
            radius: zona.radio * 2 // Escala visible
        }).bindPopup(`<b>Zona Segura:</b> ${zona.nombre}`).addTo(markersGroup);

        // Tarjeta en lista inferior
        listaZonasSegurasContainer.innerHTML += `
            <div class="item-list-card">
                <div class="item-info">
                    <h4><span class="zone-indicator" style="background:${zona.color};"></span> ${zona.nombre}</h4>
                    <p>${zona.descripcion}</p>
                </div>
                <span class="route-badge" style="background:${zona.color}22; color:${zona.color}; font-weight:800">Radio Seguro: ${zona.radio}m</span>
            </div>
        `;
    });
}

// Render de Rutas Estáticas
function renderRutas() {
    const contenedorRutas = document.getElementById("listaRutas");
    contenedorRutas.innerHTML = "";
    database.rutas.forEach(ruta => {
        contenedorRutas.innerHTML += `
            <div class="item-list-card">
                <div class="item-info">
                    <h4>${ruta.nombre}</h4>
                    <p><i class="fa-solid fa-road"></i> <b>Tramo:</b> ${ruta.tramo}</p>
                    <p><i class="fa-solid fa-person-running"></i> <b>Tipo:</b> ${ruta.tipo}</p>
                </div>
                <span class="route-badge">${ruta.estado}</span>
            </div>
        `;
    });
}

// ==========================================
// 6. GEOLOCALIZACIÓN DEL USUARIO (TIEMPO REAL)
// ==========================================
function capturarUbicacionReal() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation.lat = position.coords.latitude;
                userLocation.lng = position.coords.longitude;
                map.setView([userLocation.lat, userLocation.lng], 14);
                procesarInformacionYMapas();
            },
            () => {
                console.warn("Acceso a GPS denegado. Cargando ubicación simulada.");
                procesarInformacionYMapas();
            }
        );
    } else {
        procesarInformacionYMapas();
    }
}

// Botón Recentrar Posición
document.getElementById("btnRecenter").addEventListener("click", () => {
    map.setView([userLocation.lat, userLocation.lng], 15);
});

// ==========================================
// 7. CONTROL DE LA VENTANA MODAL DE DETALLES
// ==========================================
const modal = document.getElementById("modalRefugio");
const closeModal = document.getElementById("closeModal");

function abrirDetallesRefugio(idRefugio) {
    const refugio = database.refugios.find(r => r.id === idRefugio);
    if(!refugio) return;

    const modalContent = document.getElementById("modalContent");
    
    // Inyección del diseño limpio en el Modal usando las rutas de la carpeta "refugio/"
    modalContent.innerHTML = `
        <h2>${refugio.nombre}</h2>
        <div class="modal-meta-grid">
            <div class="meta-item"><label>Capacidad</label><span>${refugio.capacidad}</span></div>
            <div class="meta-item"><label>Distancia Estimada</label><span>${refugio.distanciaCalculada ? refugio.distanciaCalculada.toFixed(2) + ' km' : 'Calculando...'}</span></div>
            <div class="meta-item"><label>Contacto Directo</label><span>${refugio.contacto}</span></div>
            <div class="meta-item"><label>Código Interno</label><span>${refugio.id}</span></div>
        </div>
        <p class="modal-desc"><b>Descripción Operativa:</b> ${refugio.descripcion}</p>
        <p class="modal-desc"><b>Servicios Suministrados:</b> ${refugio.servicios}</p>
        
        <label style="font-size:12px; font-weight:700; color:#0b2c66; text-transform:uppercase;">Galería de Imágenes Fotográficas (Carpeta Local: refugio/)</label>
        <div class="modal-gallery">
            <img src="${refugio.imagenes[0]}" alt="Vista General" onerror="this.src='https://placehold.co/600x400?text=Refugio+Imagen+1'">
            <img src="${refugio.imagenes[1]}" alt="Vista Interna" onerror="this.src='https://placehold.co/600x400?text=Refugio+Imagen+2'">
        </div>
    `;

    modal.classList.add("active");
}

if(closeModal) {
    closeModal.addEventListener("click", () => modal.classList.remove("active"));
}
window.addEventListener("click", (e) => {
    if(e.target === modal) modal.classList.remove("active");
});

// Carga Inicial del Sistema
document.addEventListener("DOMContentLoaded", () => {
    capturarUbicacionReal();
    renderRutas();
});