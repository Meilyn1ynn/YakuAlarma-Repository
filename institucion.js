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
// BANCO DE DATOS PARA VARIACIONES ALEATORIAS (Carga en F5)
// ==========================================================================
const nombresDisponibles = [
    { nombre: "Municipalidad de Villa Rica", subtitulo: "Sede Central", tipo: "Municipalidad" },
    { nombre: "Defensa Civil Huaral", subtitulo: "DC - Central", tipo: "Defensa Civil" },
    { nombre: "Policía Nacional", subtitulo: "Comisaría Sectorial", tipo: "Seguridad" },
    { nombre: "Bomberos Voluntarios", subtitulo: "Cía. Salvadora N° 45", tipo: "Bomberos" },
    { nombre: "Centro de Salud Villa Rica", subtitulo: "MINSA - Nivel II", tipo: "Salud" },
    { nombre: "Red de Salud Oxapampa", subtitulo: "DIRESA Central", tipo: "Salud" },
    { nombre: "SENAMHI", subtitulo: "Estación Climatológica", tipo: "Meteorología" },
    { nombre: "INDECI Pasco", subtitulo: "Dirección Desconcentrada", tipo: "Nacional" },
    { nombre: "Gobierno Regional", subtitulo: "Gerencia de Operaciones", tipo: "Gobierno" },
    { nombre: "Cruz Roja Peruana", subtitulo: "Filial Provincial", tipo: "Humanitaria" }
];

const poolActividades = [
    { desc: "Actualizó su estado de conexión", dotClase: "conectada" },
    { desc: "Reportó alerta preventiva en sectores críticos", dotClase: "alerta" },
    { desc: "Confirmó recepción del boletín de emergencia", dotClase: "info" },
    { desc: "Sincronizó canales de comunicación radial", dotClase: "conectada" },
    { desc: "Abrió protocolo de monitoreo de caudales", dotClase: "info" }
];

let institucionesData = [];
let actividadesRecientes = [];

// ==========================================================================
// FUNCIÓN DE VALORES Y NOMBRES ALEATORIOS EN EL ARRANQUE (F5)
// ==========================================================================
function generarDataAleatoriaArranque() {
    institucionesData = [];
    actividadesRecientes = [];

    // Mezclar el banco de nombres para que el orden sea diferente en cada F5
    const nombresMezclados = [...nombresDisponibles].sort(() => Math.random() - 0.5);

    nombresMezclados.forEach((base, index) => {
        const dados = Math.random();
        let estado = "Conectada";
        let tiempoRespuesta = Math.floor(Math.random() * (16 - 6 + 1)) + 6; // 6 a 16 mins
        let alertas = Math.floor(Math.random() * 5);

        if (dados > 0.82) {
            estado = "Sin conexión";
            tiempoRespuesta = 0;
            alertas = 0;
        } else if (dados > 0.60) {
            estado = "En alerta";
            tiempoRespuesta = Math.floor(Math.random() * (30 - 18 + 1)) + 18; // 18 a 30 mins
            alertas = Math.floor(Math.random() * 10) + 1;
        }

        institucionesData.push({
            id: index + 1,
            nombre: base.nombre,
            subtitulo: base.subtitulo,
            tipo: base.tipo,
            estado: estado,
            tiempoRespuesta: tiempoRespuesta,
            alertas: alertas,
            lat: -11.44 + Math.random() * 0.12,
            lng: -77.26 + Math.random() * 0.12
        });
    });

    // Generar línea de tiempo de actividades mezclando nombres generados
    for(let i = 0; i < 5; i++) {
        const instAlAzar = institucionesData[Math.floor(Math.random() * institucionesData.length)];
        const actAlAzar = poolActividades[Math.floor(Math.random() * poolActividades.length)];
        
        let horaSimulada = `${Math.floor(Math.random() * 4) + 7}:${String(Math.floor(Math.random() * 50) + 10).padStart(2, '0')} AM`;

        actividadesRecientes.push({
            hora: horaSimulada,
            dotClase: instAlAzar.estado === "Sin conexión" ? "info" : (instAlAzar.estado === "En alerta" ? "alerta" : "conectada"),
            titulo: instAlAzar.nombre,
            desc: actAlAzar.desc
        });
    }
}

// ==========================================================================
// CONFIGURACIÓN DEL MAPA MINI
// ==========================================================================
const map = L.map('map', { zoomControl: false }).setView([-11.495, -77.207], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marcadores = [];
function pintarMarcadoresMapa(lista) {
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    lista.forEach(inst => {
        let color = "#2a9d8f";
        if (inst.estado === "En alerta") color = "#ea580c";
        if (inst.estado === "Sin conexión") color = "#718096";

        const m = L.circleMarker([inst.lat, inst.lng], {
            radius: 8,
            fillColor: color,
            color: "#fff",
            weight: 2,
            fillOpacity: 1
        }).addTo(map);
        marcadores.push(m);
    });
}

// ==========================================================================
// PROCEDIMIENTO CENTRAL DE RENDERIZADO
// ==========================================================================
let paginaActual = 1;
const filasPorPagina = 5;

function renderizarTodoElTablero() {
    const filtrados = aplicarFiltroBusqueda();
    
    pintarMarcadoresMapa(filtrados);
    actualizarMetricasCards();
    renderizarTabla(filtrados);
    renderizarTimelineActividad();
    inicializarGraficos();
}

function actualizarMetricasCards() {
    const total = institucionesData.length;
    const conectadas = institucionesData.filter(i => i.estado === "Conectada").length;
    const alerta = institucionesData.filter(i => i.estado === "En alerta").length;
    const sinConexion = institucionesData.filter(i => i.estado === "Sin conexión").length;
    
    const instConTiempo = institucionesData.filter(i => i.tiempoRespuesta > 0);
    const promRespuesta = instConTiempo.length > 0 ? Math.round(instConTiempo.reduce((acc, curr) => acc + curr.tiempoRespuesta, 0) / instConTiempo.length) : 0;

    document.getElementById("mTotal").textContent = total;
    document.getElementById("mConectadas").textContent = conectadas;
    document.getElementById("pConectadas").textContent = `${((conectadas/total)*100).toFixed(1)}% del total`;
    document.getElementById("mAlerta").textContent = alerta;
    document.getElementById("pAlerta").textContent = `${((alerta/total)*100).toFixed(1)}% del total`;
    document.getElementById("mSinConexion").textContent = sinConexion;
    document.getElementById("pSinConexion").textContent = `${((sinConexion/total)*100).toFixed(1)}% del total`;
    document.getElementById("mRespuesta").textContent = `${promRespuesta} min`;
}

function renderizarTabla(lista) {
    const tbody = document.getElementById("tablaInstBody");
    tbody.innerHTML = "";

    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const subLista = lista.slice(inicio, fin);

    if (subLista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:#718096;">No hay registros.</td></tr>`;
        return;
    }

    subLista.forEach(inst => {
        let slugEstado = inst.estado === "En alerta" ? "en-alerta" : inst.estado.toLowerCase().replace(" ", "-");
        
        // CORREGIDO: Clase fa-wifi-slash para el estado "Sin conexión"
        let connIconClass = inst.estado === "Conectada" ? "fa-wifi conectada" : (inst.estado === "En alerta" ? "fa-wifi en-alerta" : "fa-wifi-slash sin-conexion");
        let alertaClass = inst.alertas > 0 ? "has-alerts" : "";
        let tiempoTexto = inst.tiempoRespuesta > 0 ? `${inst.tiempoRespuesta} min` : "--";

        tbody.innerHTML += `
            <tr>
                <td><strong>#${inst.id}</strong></td>
                <td>
                    <strong>${inst.nombre}</strong>
                    <span style="display:block; font-size:11px; color:#718096;">${inst.subtitulo}</span>
                </td>
                <td><span style="color:#4a5568; font-weight:500;">${inst.tipo}</span></td>
                <td><span class="badge-status ${slugEstado}">${inst.estado}</span></td>
                <td style="text-align:center;"><i class="fa-solid ${connIconClass} conn-icon"></i></td>
                <td><strong>${tiempoTexto}</strong></td>
                <td><div class="alert-count-badge ${alertaClass}">${inst.alertas}</div></td>
                <td>
                    <div class="actions-row">
                        <button title="Ver"><i class="fa-regular fa-eye"></i></button>
                        <button title="Editar"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button title="Opciones"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                    </div>
                </td>
            </tr>`;
    });

    document.getElementById("tableInfoSpan").textContent = `Mostrando ${inicio + 1} a ${Math.min(fin, lista.length)} de ${lista.length} instituciones`;
    document.getElementById("currentPageSpan").textContent = paginaActual;
}

function renderizarTimelineActividad() {
    const container = document.getElementById("activityTimelineContainer");
    container.innerHTML = "";
    actividadesRecientes.forEach(act => {
        container.innerHTML += `
            <div class="activity-item">
                <span class="act-time">${act.hora}</span>
                <div class="act-dot-wrapper">
                    <div class="act-dot ${act.dotClase}"></div>
                </div>
                <div class="act-desc">
                    <h4>${act.titulo}</h4>
                    <p>${act.desc}</p>
                </div>
            </div>`;
    });
}

// ==========================================================================
// FILTROS & BUSQUEDA
// ==========================================================================
const searchInst = document.getElementById("searchInst");
function aplicarFiltroBusqueda() {
    const query = searchInst.value.toLowerCase().trim();
    if(query === "") return institucionesData;
    return institucionesData.filter(i => i.nombre.toLowerCase().includes(query) || i.tipo.toLowerCase().includes(query));
}

searchInst.addEventListener("keyup", () => {
    paginaActual = 1;
    renderizarTabla(aplicarFiltroBusqueda());
});

document.getElementById("prevPageBtn").addEventListener("click", () => {
    if(paginaActual > 1) { paginaActual--; renderizarTabla(aplicarFiltroBusqueda()); }
});
document.getElementById("nextPageBtn").addEventListener("click", () => {
    const totalFiltrado = aplicarFiltroBusqueda().length;
    if(paginaActual * filasPorPagina < totalFiltrado) { paginaActual++; renderizarTabla(aplicarFiltroBusqueda()); }
});

// EXPORTADOR CSV
document.getElementById("exportCsvBtn").addEventListener("click", () => {
    let csv = "ID,Institucion,Tipo,Estado,Tiempo Respuesta\n";
    institucionesData.forEach(i => csv += `${i.id},"${i.nombre}",${i.tipo},${i.estado},${i.tiempoRespuesta} min\n`);
    const blob = new Blob([csv], {type: "text/csv"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "instituciones.csv";
    link.click();
});

// ==========================================================================
// 5. INICIALIZACIÓN DE GRÁFICOS (CHART.JS CORREGIDOS Y COMPLETO)
// ==========================================================================
let graficosInstancias = {};

function inicializarGraficos() {
    if(graficosInstancias.alertas) graficosInstancias.alertas.destroy();
    if(graficosInstancias.tiempo) graficosInstancias.tiempo.destroy();
    if(graficosInstancias.conexion) graficosInstancias.conexion.destroy();

    // 1. Doughnut Chart: Alertas Asignadas
    const topAlertas = [...institucionesData].sort((a,b) => b.alertas - a.alertas).slice(0, 3);
    const totalAlertasOtros = institucionesData.reduce((acc, c) => acc + c.alertas, 0) - topAlertas.reduce((acc, c) => acc + c.alertas, 0);

    const doughnutCtx = document.getElementById("chartAlertasInst").getContext("2d");
    graficosInstancias.alertas = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: [...topAlertas.map(i => i.nombre.split(" ")[0]), "Otros"],
            datasets: [{
                data: [...topAlertas.map(i => i.alertas), Math.max(0, totalAlertasOtros)],
                backgroundColor: ["#0b2c66", "#0077b6", "#ea580c", "#cbd5e1"]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 10 } } } } }
    });

    // 2. Line Chart: Histórico Dinámico con valores variables por refresh
    const valoresHistoricosVariables = Array.from({length: 7}, () => Math.floor(Math.random() * (28 - 10 + 1)) + 10);
    
    const lineCtx = document.getElementById("chartTiempoRespuesta").getContext("2d");
    graficosInstancias.tiempo = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ["7 d", "6 d", "5 d", "4 d", "3 d", "2 d", "Hoy"],
            datasets: [{
                label: 'Minutos',
                data: valoresHistoricosVariables,
                borderColor: '#2a9d8f',
                backgroundColor: 'rgba(42, 157, 143, 0.1)',
                fill: true,
                tension: 0.35
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 35 } } }
    });

    // 3. Gauge Semisecular: Estado de conexión integrado con los 3 Estados (Conectada, Alerta, Sin conexión)
    const total = institucionesData.length;
    const conectadas = institucionesData.filter(i => i.estado === "Conectada").length;
    const alerta = institucionesData.filter(i => i.estado === "En alerta").length;
    const sinConexion = institucionesData.filter(i => i.estado === "Sin conexión").length;
    
    const porcentajeConectadas = total > 0 ? ((conectadas / total) * 100) : 0;
    const porcentajeAlerta = total > 0 ? ((alerta / total) * 100) : 0;
    const porcentajeSinConexion = total > 0 ? ((sinConexion / total) * 100) : 0;
    
    document.getElementById("gaugePercentage").textContent = `${porcentajeConectadas.toFixed(1)}%`;

    const gaugeCtx = document.getElementById("chartEstadoConexion").getContext("2d");
    graficosInstancias.conexion = new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            labels: ["Conectadas", "En alerta", "Sin conexión"],
            datasets: [{
                data: [porcentajeConectadas, porcentajeAlerta, porcentajeSinConexion],
                backgroundColor: ["#2a9d8f", "#ea580c", "#718096"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90,
            circumference: 180,
            cutout: '80%',
            plugins: { legend: { display: false } }
        }
    });
}

// ==========================================================================
// ARRANQUE ÚNICO AL REINICIAR (F5)
// ==========================================================================
generarDataAleatoriaArranque(); 
renderizarTodoElTablero();