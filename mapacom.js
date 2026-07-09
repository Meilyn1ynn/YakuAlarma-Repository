// ==========================================================================
// CONTROL RESPONSIVE DEL SIDEBAR
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
// DATOS CON RUTAS DE ARCHIVOS LOCALES EN TU VISUAL STUDIO CODE
// ==========================================================================
const eventosData = [
    { id: 1, tipo: "Inundación", sector: "Río Tambo", ubicacion: "Villa Rica - Sector Centro", riesgo: "Muy Alto", hora: "10:30 AM", descripcion: "Desborde del río afectando viviendas.", img: "img/rio-tambo.jpg", lat: -11.45, lng: -77.18 },
    { id: 2, tipo: "Deslizamiento", sector: "Carretera Palcazu - Naranjal", ubicacion: "Km 15+200", riesgo: "Alto", hora: "09:45 AM", descripcion: "Deslizamiento de tierra.", img: "img/palcazu.jpg", lat: -11.52, lng: -77.24 },
    { id: 3, tipo: "Lluvia intensa", sector: "Quebrada Azul", ubicacion: "Puerto Bermúdez", riesgo: "Medio", hora: "08:20 AM", descripcion: "Flujo de lodo y piedras.", img: "img/quebrada-azul.jpg", lat: -11.48, lng: -77.12 },
    { id: 4, tipo: "Tormenta eléctrica", sector: "Sector San Pedro", ubicacion: "Villa Rica", riesgo: "Bajo", hora: "07:30 AM", descripcion: "Lluvias moderadas.", img: "img/san-pedro.jpg", lat: -11.55, lng: -77.29 }
];

const iconosMapeados = {
    "Inundación": "fa-solid fa-cloud-showers-water inundacion",
    "Deslizamiento": "fa-solid fa-hill-rockslide deslizamiento",
    "Lluvia intensa": "fa-solid fa-cloud-showers-heavy lluvia",
    "Huayco": "fa-solid fa-house-flood-water huayco",
    "Tormenta eléctrica": "fa-solid fa-cloud-bolt tormenta"
};

// ==========================================================================
// LEAFLET MAP ENGINE
// ==========================================================================
const map = L.map('map').setView([-11.495, -77.207], 11);

const mapaEstandar = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const mapaSatelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

let modoSat = false;
document.getElementById("toggleSat").addEventListener("click", () => {
    modoSat = !modoSat;
    if (modoSat) {
        map.removeLayer(mapaEstandar);
        mapaSatelital.addTo(map);
        document.getElementById("toggleSat").innerHTML = `<i class="fa-solid fa-map"></i> Ver Mapa Estándar`;
    } else {
        map.removeLayer(mapaSatelital);
        mapaEstandar.addTo(map);
        document.getElementById("toggleSat").innerHTML = `<i class="fa-solid fa-earth-americas"></i> Ver en mapa satelital`;
    }
});

let marcadoresCargados = [];

function obtenerColorRiesgo(riesgo) {
    if (riesgo === "Muy Alto") return "#d62828";
    if (riesgo === "Alto") return "#f77f00";
    if (riesgo === "Medio") return "#fcbf49";
    return "#2a9d8f";
}

function pintarMarcadoresEnMapa(listaFiltrada) {
    marcadoresCargados.forEach(m => map.removeLayer(m));
    marcadoresCargados = [];

    listaFiltrada.forEach(ev => {
        const marker = L.circleMarker([ev.lat, ev.lng], {
            radius: 12,
            fillColor: obtenerColorRiesgo(ev.riesgo),
            color: '#ffffff',
            weight: 2,
            fillOpacity: 0.9
        }).addTo(map);

        marker.bindPopup(`
            <div style="font-family:'Inter'; font-size:12px;">
                <h4 style="margin:0; color:#0b2c66;">${ev.tipo}</h4>
                <p style="margin:4px 0;">${ev.ubicacion}</p>
            </div>
        `);
        marcadoresCargados.push(marker);
    });
}

// ==========================================================================
// RENDER COMPONENTES INTERFAZ
// ==========================================================================
function renderizarTodo(lista) {
    pintarMarcadoresEnMapa(lista);
    actualizarCuadrosMétricas(lista);
    renderizarListaTimeline(lista);
    renderizarZonasCriticas(lista);
}

function actualizarCuadrosMétricas(lista) {
    document.getElementById("cntMuyAlto").textContent = lista.filter(e => e.riesgo === "Muy Alto").length;
    document.getElementById("cntAlto").textContent = lista.filter(e => e.riesgo === "Alto").length;
    document.getElementById("cntMedio").textContent = lista.filter(e => e.riesgo === "Medio").length;
    document.getElementById("cntBajo").textContent = lista.filter(e => e.riesgo === "Bajo").length;
}

function renderizarListaTimeline(lista) {
    const contenedor = document.getElementById("eventosTimelineList");
    contenedor.innerHTML = "";

    lista.forEach(ev => {
        const claseRiesgo = ev.riesgo.toLowerCase().replace(" ", "-");
        const iconoClase = iconosMapeados[ev.tipo] || "fa-solid fa-circle-exclamation";

        contenedor.innerHTML += `
            <div class="timeline-item ${claseRiesgo}">
                <div class="tm-left">
                    <div class="tm-icon"><i class="${iconoClase}"></i></div>
                    <div class="tm-info">
                        <h4>${ev.tipo}</h4>
                        <p>${ev.ubicacion}</p>
                    </div>
                </div>
                <div class="tm-right">
                    <span class="badge-risk ${claseRiesgo}">${ev.riesgo}</span>
                    <span class="tm-time">${ev.hora}</span>
                </div>
            </div>`;
    });
}

function renderizarZonasCriticas(lista) {
    const grid = document.getElementById("zonasCriticasGrid");
    grid.innerHTML = "";

    lista.forEach(ev => {
        const claseRiesgo = ev.riesgo.toLowerCase().replace(" ", "-");
        
        grid.innerHTML += `
            <div class="critical-card">
                <div class="card-img-wrapper">
                    <img src="${ev.img}" onerror="this.src='img/placeholder.jpg';" alt="${ev.sector}">
                    <span class="badge-tag ${claseRiesgo}">${ev.riesgo}</span>
                </div>
                <div class="card-body-desc">
                    <span class="badge-risk ${claseRiesgo}" style="display:inline-block; margin-bottom:4px;">${ev.riesgo}</span>
                    <h4>${ev.sector}</h4>
                    <p>${ev.ubicacion}</p>
                    <span>${ev.descripcion}</span>
                    <div class="time-info">${ev.hora}</div>
                </div>
            </div>`;
    });
}

// ==========================================================================
// FILTROS
// ==========================================================================
const filtroTipo = document.getElementById("filtroTipo");
const filtroRiesgo = document.getElementById("filtroRiesgo");
const botonesFiltroRapido = document.querySelectorAll(".q-filter");

let tipoSeleccionado = "Todos";
let riesgoSeleccionado = "Todos";

function aplicarFiltrosCombinados() {
    let filtrados = eventosData;
    if (tipoSeleccionado !== "Todos") filtrados = filtrados.filter(e => e.tipo === tipoSeleccionado);
    if (riesgoSeleccionado !== "Todos") filtrados = filtrados.filter(e => e.riesgo === riesgoSeleccionado);
    renderizarTodo(filtrados);
}

filtroTipo.addEventListener("change", () => {
    tipoSeleccionado = filtroTipo.value;
    botonesFiltroRapido.forEach(btn => {
        if(btn.getAttribute("data-type") === tipoSeleccionado) btn.classList.add("active");
        else btn.classList.remove("active");
    });
    aplicarFiltrosCombinados();
});

filtroRiesgo.addEventListener("change", () => {
    riesgoSeleccionado = filtroRiesgo.value;
    aplicarFiltrosCombinados();
});

botonesFiltroRapido.forEach(btn => {
    btn.addEventListener("click", () => {
        botonesFiltroRapido.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tipoSeleccionado = btn.getAttribute("data-type");
        filtroTipo.value = tipoSeleccionado;
        aplicarFiltrosCombinados();
    });
});

renderizarTodo(eventosData);