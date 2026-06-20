// ============================
// MENU RESPONSIVE
// ============================
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

// ============================
// FECHA Y HORA
// ============================
function actualizarFechaHora(){
    const ahora = new Date();
    document.getElementById("horaActual").textContent =
        ahora.toLocaleTimeString('es-PE',{ hour:'2-digit', minute:'2-digit' });
    document.getElementById("fechaActual").textContent =
        ahora.toLocaleDateString('es-PE');
}
actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);

// ============================
// DATOS DE MUESTRA
// ============================
const tipos = ["Inundación", "Deslizamiento", "Lluvia intensa", "Huayco", "Tormenta eléctrica"];
const provincias = ["Huaral", "Chancay", "Aucallama", "Atavillos", "Pacaraos"];
const riesgos = ["Alto", "Medio", "Bajo"];
const descripciones = [
    "Incremento del caudal del río.", "Posible deslizamiento de tierra.",
    "Precipitaciones intensas.", "Flujo de lodo y piedras.",
    "Actividad eléctrica constante.", "Zona bajo monitoreo.",
    "Riesgo de inundación urbana.", "Emergencia reportada por vecinos."
];

let alertas = [];

function generarAlertas(){
    alertas = [];
    const cantidad = Math.floor(Math.random() * 15) + 10;
    for(let i=1; i<=cantidad; i++){
        const tipo = tipos[Math.floor(Math.random()*tipos.length)];
        const provincia = provincias[Math.floor(Math.random()*provincias.length)];
        const riesgo = riesgos[Math.floor(Math.random()*riesgos.length)];
        const descripcion = descripciones[Math.floor(Math.random()*descripciones.length)];

        alertas.push({
            id: `ALT-2026-${String(i).padStart(4,'0')}`,
            tipo,
            provincia,
            riesgo,
            descripcion,
            estado: "Activa",
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        });
    }
}
generarAlertas();

// ============================
// ACTUALIZAR CONTADORES METRICOS
// ============================
function actualizarCards(){
    document.getElementById("totalAlertas").textContent = alertas.length;
    document.getElementById("altoCount").textContent = alertas.filter(a=>a.riesgo==="Alto").length;
    document.getElementById("medioCount").textContent = alertas.filter(a=>a.riesgo==="Medio").length;
    document.getElementById("bajoCount").textContent = alertas.filter(a=>a.riesgo==="Bajo").length;
}
actualizarCards();

// ============================
// MAPA LEAFLET
// ============================
const map = L.map('map').setView([-11.495,-77.207], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let markers = [];
function colorRiesgo(riesgo){
    if(riesgo==="Alto") return "#d62828";
    if(riesgo==="Medio") return "#f77f00";
    return "#2a9d8f";
}

function cargarMapa(){
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    alertas.forEach(alerta => {
        const lat = -11.3 + Math.random()*0.5;
        const lng = -77.4 + Math.random()*0.5;
        const marker = L.circleMarker([lat,lng], {
            radius: 9,
            fillColor: colorRiesgo(alerta.riesgo),
            color: "#fff",
            weight: 2,
            fillOpacity: 1
        })
        .bindPopup(`<b>${alerta.tipo}</b><br>${alerta.provincia}<br>Riesgo: ${alerta.riesgo}`)
        .addTo(map);
        markers.push(marker);
    });
}
cargarMapa();

// ============================
// CONFIGURACIÓN CHART 
// ============================
const ctx = document.getElementById("tipoChart");
const tipoChart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: tipos,
        datasets: [{
            data: [],
            backgroundColor: ["#0077b6", "#d62828", "#fcbf49", "#7209b7", "#2a9d8f"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 12 } } }
    }
});

function actualizarGrafico(){
    const valores = tipos.map(tipo => alertas.filter(a=>a.tipo===tipo).length);
    tipoChart.data.datasets[0].data = valores;
    tipoChart.update();
}
actualizarGrafico();

// ============================
// BARRAS PROVINCIAS
// ============================
function actualizarBarras(){
    const contenedor = document.getElementById("provinceBars");
    contenedor.innerHTML = "";
    provincias.forEach((prov, index) => {
        const total = alertas.filter(a=>a.provincia===prov).length;
        const porcentaje = alertas.length > 0 ? (total / alertas.length) * 100 : 0;
        const colores = ["#d62828", "#f77f00", "#fcbf49", "#2a9d8f", "#0077b6"];

        contenedor.innerHTML += `
        <div class="province-bar">
            <div class="province-info"><span>${prov}</span><span>${total}</span></div>
            <div class="progress"><span style="width:${porcentaje}%; background:${colores[index]};"></span></div>
        </div>`;
    });
}
actualizarBarras();

// ============================
// RENDER TABLA PAGINADA
// ============================
const filasPorPagina = 6;
let paginaActual = 1;

function renderTabla(datos){
    const inicio = (paginaActual-1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const datosPagina = datos.slice(inicio, fin);
    const tbody = document.getElementById("tablaAlertas");
    tbody.innerHTML = "";

    datosPagina.forEach(alerta => {
        let claseRiesgo = alerta.riesgo.toLowerCase();
        tbody.innerHTML += `
        <tr>
            <td><strong>${alerta.id}</strong></td>
            <td>${alerta.tipo}</td>
            <td>${alerta.provincia}</td>
            <td><span class="risk ${claseRiesgo}">${alerta.riesgo}</span></td>
            <td>${alerta.descripcion}</td>
            <td>${alerta.hora}</td>
            <td><span class="estado">● ${alerta.estado}</span></td>
            <td>
                <div class="actions">
                    <button title="Ver"><i class="fa-solid fa-eye"></i></button>
                    <button title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    });
}
renderTabla(alertas);

// ============================
// FILTROS Y BUSCADORES
// ============================
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
    const texto = searchInput.value.toLowerCase();
    const filtrados = alertas.filter(a => 
        a.tipo.toLowerCase().includes(texto) ||
        a.provincia.toLowerCase().includes(texto) ||
        a.id.toLowerCase().includes(texto)
    );
    paginaActual = 1;
    document.getElementById("pageNumber").textContent = paginaActual;
    renderTabla(filtrados);
});

const tipoFiltro = document.getElementById("tipoFiltro");
tipoFiltro.addEventListener("change", () => {
    const valor = tipoFiltro.value;
    const filtrados = valor === "Todos" ? alertas : alertas.filter(a => a.tipo === valor);
    paginaActual = 1;
    document.getElementById("pageNumber").textContent = paginaActual;
    renderTabla(filtrados);
});

// PAGINACION
document.getElementById("nextPage").addEventListener("click", () => {
    if(paginaActual * filasPorPagina < alertas.length) {
        paginaActual++;
        renderTabla(alertas);
        document.getElementById("pageNumber").textContent = paginaActual;
    }
});
document.getElementById("prevPage").addEventListener("click", () => {
    if(paginaActual > 1){
        paginaActual--;
        renderTabla(alertas);
        document.getElementById("pageNumber").textContent = paginaActual;
    }
});

// EXPORTACION
document.getElementById("exportBtn").addEventListener("click", () => {
    let csv = "ID,Tipo,Provincia,Riesgo,Descripcion\n";
    alertas.forEach(a => { csv += `${a.id},${a.tipo},${a.provincia},${a.riesgo},${a.descripcion}\n`; });
    const blob = new Blob([csv], {type: "text/csv"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "alertas.csv";
    link.click();
});

// REFRESCO TOTAL CADA 60 SEG
setInterval(() => {
    generarAlertas();
    actualizarCards();
    actualizarGrafico();
    actualizarBarras();
    renderTabla(alertas);
    cargarMapa();
}, 60000);