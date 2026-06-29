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
// BANCO DE DATOS DE ESTACIONES (Valores Base)
// ==========================================================================
let estacionesClimaData = [
    { id: 1, nombre: "San Pedro", lluvia: 24.8, caudal: 98.5, temp: 19.2, humedad: 78, viento: 10.6, estado: "Normal", lat: -11.45, lng: -77.18 },
    { id: 2, nombre: "Villa Rica", lluvia: 12.3, caudal: 86.7, temp: 18.6, humedad: 81, viento: 12.4, estado: "Normal", lat: -11.49, lng: -77.21 },
    { id: 3, nombre: "San Luis", lluvia: 95.6, caudal: 210.3, temp: 17.3, humedad: 85, viento: 14.2, estado: "Alerta", lat: -11.52, lng: -77.24 },
    { id: 4, nombre: "Yurinaki", lluvia: 38.7, caudal: 132.8, temp: 18.1, humedad: 83, viento: 11.3, estado: "Normal", lat: -11.47, lng: -77.13 },
    { id: 5, nombre: "Pacazu", lluvia: 22.1, caudal: 76.4, temp: 19.0, humedad: 77, viento: 9.8, estado: "Normal", lat: -11.55, lng: -77.27 }
];

let riosData = [
    { nombre: "Río Tambo", nivel: 1.85, max: 2.50, estado: "Alto" },
    { nombre: "Río Pichis", nivel: 1.32, max: 2.20, estado: "Medio" },
    { nombre: "Río Palcazu", nivel: 0.92, max: 2.00, estado: "Normal" },
    { nombre: "Río Yurinaki", nivel: 1.62, max: 1.80, estado: "Alto" },
    { nombre: "Río San Pedro", nivel: 0.78, max: 2.10, estado: "Normal" }
];

const diasSemana = ["26 Abr", "27 Abr", "28 Abr", "29 Abr", "30 Abr", "01 May", "02 May"];
const pronosticoDias = [
    { dia: "Vie 02", icono: "fa-cloud-rain", tMax: 24, tMin: 16, prob: "18 mm" },
    { dia: "Sáb 03", icono: "fa-cloud-showers-heavy", tMax: 26, tMin: 17, prob: "25 mm" },
    { dia: "Dom 04", icono: "fa-cloud-bolt", tMax: 27, tMin: 17, prob: "30 mm" },
    { dia: "Lun 05", icono: "fa-cloud-rain", tMax: 26, tMin: 16, prob: "15 mm" },
    { dia: "Mar 06", icono: "fa-cloud", tMax: 25, tMin: 16, prob: "10 mm" },
    { dia: "Mié 07", icono: "fa-cloud-sun", tMax: 25, tMin: 16, prob: "8 mm" },
    { dia: "Jue 08", icono: "fa-sun", tMax: 25, tMin: 16, prob: "12 mm" }
];

// ==========================================================================
// LOGICA DE GENERACIÓN DE DATOS ALEATORIOS (F5 / REFRESH)
// ==========================================================================
function mutarVariablesClimaticasArranque() {
    // 1. Mutar las estaciones meteorológicas
    estacionesClimaData.forEach(est => {
        est.lluvia = parseFloat((Math.random() * (100 - 5) + 5).toFixed(1));
        est.caudal = parseFloat((Math.random() * (220 - 60) + 60).toFixed(1));
        est.temp = parseFloat((Math.random() * (24 - 15) + 15).toFixed(1));
        est.humedad = Math.floor(Math.random() * (95 - 65 + 1)) + 65;
        est.viento = parseFloat((Math.random() * (18 - 5) + 5).toFixed(1));
        est.estado = est.lluvia > 75 || est.caudal > 180 ? "Alerta" : "Normal";
    });

    // 2. Mutar los niveles de los ríos
    riosData.forEach(rio => {
        rio.nivel = parseFloat((Math.random() * rio.max).toFixed(2));
        const ratio = rio.nivel / rio.max;
        if (ratio >= 0.85) rio.estado = "Crítico";
        else if (ratio >= 0.65) rio.estado = "Alto";
        else if (ratio >= 0.45) rio.estado = "Medio";
        else rio.estado = "Normal";
    });
}

// ==========================================================================
// LEAFLET ENGINE (MAPA MINI)
// ==========================================================================
const map = L.map('map', { zoomControl: false }).setView([-11.495, -77.207], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marcadores = [];
function pintarMarcadoresEstaciones() {
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    estacionesClimaData.forEach(est => {
        let color = "#2a9d8f"; // Bajo
        if (est.lluvia > 75) color = "#d62828";      // Muy alto
        else if (est.lluvia > 50) color = "#ea580c"; // Alto
        else if (est.lluvia > 25) color = "#fcbf49"; // Medio

        const m = L.circleMarker([est.lat, est.lng], {
            radius: 9,
            fillColor: color,
            color: "#fff",
            weight: 2,
            fillOpacity: 1
        }).addTo(map);

        m.bindPopup(`<b>Estación ${est.nombre}</b><br>Lluvia: ${est.lluvia} mm<br>Temp: ${est.temp} °C`);
        marcadores.push(m);
    });
}

// ==========================================================================
// RENDERIZADO GENERAL DE LA INTERFAZ
// ==========================================================================
function renderizarConsolaClimatica() {
    calcularYRenderizarCardsSuperiores();
    renderizarTablaEstaciones();
    renderizarNivelesRios();
    renderizarPronosticoGrid();
    renderizarBloqueIndicadores();
    pintarMarcadoresEstaciones();
    inicializarHistogramaLluvia();
}

// 1. Tarjetas Métricas
function calcularYRenderizarCardsSuperiores() {
    const totalLluvia = estacionesClimaData.reduce((acc, c) => acc + c.lluvia, 0) / estacionesClimaData.length;
    const totalCaudal = estacionesClimaData.reduce((acc, c) => acc + c.caudal, 0) / estacionesClimaData.length;
    const totalTemp = estacionesClimaData.reduce((acc, c) => acc + c.temp, 0) / estacionesClimaData.length;
    const totalHumedad = estacionesClimaData.reduce((acc, c) => acc + c.humedad, 0) / estacionesClimaData.length;
    const totalViento = estacionesClimaData.reduce((acc, c) => acc + c.viento, 0) / estacionesClimaData.length;

    document.getElementById("mLluvia").innerHTML = `${totalLluvia.toFixed(1)} <span class="unit">mm</span>`;
    document.getElementById("mCaudal").innerHTML = `${totalCaudal.toFixed(1)} <span class="unit">m³/s</span>`;
    document.getElementById("mTemp").innerHTML = `${totalTemp.toFixed(1)} <span class="unit">°C</span>`;
    document.getElementById("mHumedad").innerHTML = `${Math.round(totalHumedad)} <span class="unit">%</span>`;
    document.getElementById("mViento").innerHTML = `${totalViento.toFixed(1)} <span class="unit">km/h</span>`;
    
    // UV Index Aleatorio estático por F5
    const uvIndex = Math.floor(Math.random() * 11) + 1;
    document.getElementById("mUv").textContent = uvIndex;

    // Simular porcentajes de tendencias visuales
    document.getElementById("tLluvia").textContent = `+${Math.floor(Math.random() * 20) + 5}% vs periodo anterior`;
    document.getElementById("tCaudal").textContent = `+${Math.floor(Math.random() * 15) + 2}% vs periodo anterior`;
    document.getElementById("tTemp").textContent = `-${Math.floor(Math.random() * 5) + 1}% vs periodo anterior`;
    document.getElementById("tHumedad").textContent = `+${Math.floor(Math.random() * 10) + 1}% vs periodo anterior`;
    document.getElementById("tViento").textContent = `-${Math.floor(Math.random() * 12) + 3}% vs periodo anterior`;
}

// 2. Tabla de Resumen
function renderizarTablaEstaciones() {
    const tbody = document.getElementById("tablaClimaBody");
    tbody.innerHTML = "";
    estacionesClimaData.forEach(est => {
        const claseBadge = est.estado.toLowerCase();
        tbody.innerHTML += `
            <tr>
                <td><strong>${est.nombre}</strong></td>
                <td>${est.lluvia}</td>
                <td>${est.caudal}</td>
                <td>${est.temp}</td>
                <td>${est.humedad}%</td>
                <td>${est.viento}</td>
                <td><span class="badge-climate-state ${claseBadge}">${est.estado}</span></td>
            </tr>`;
    });
}

// 3. Barras de Ríos
function renderizarNivelesRios() {
    const contenedor = document.getElementById("riversListContainer");
    contenedor.innerHTML = "";
    riosData.forEach(rio => {
        const claseFill = rio.estado.toLowerCase();
        const porcentajeBarra = (rio.nivel / rio.max) * 100;
        contenedor.innerHTML += `
            <div class="river-item">
                <div class="river-name"><i class="fa-solid fa-water"></i> ${rio.nombre}</div>
                <div class="river-progress-wrapper">
                    <div class="river-bar">
                        <div class="river-fill ${claseFill}" style="width: ${porcentajeBarra}%"></div>
                    </div>
                </div>
                <div class="river-val">${rio.nivel} m</div>
                <span class="badge-climate-state ${claseFill}" style="font-size:10px; padding:2px 6px;">${rio.estado}</span>
            </div>`;
    });
}

// 4. Cuadrícula de Pronóstico
function renderizarPronosticoGrid() {
    const contenedor = document.getElementById("forecastGridContainer");
    contenedor.innerHTML = "";
    pronosticoDias.forEach(p => {
        contenedor.innerHTML += `
            <div class="forecast-day-card">
                <span>${p.dia}</span>
                <i class="fa-solid ${p.icono}"></i>
                <div class="temp-range">${p.tMax}° / ${p.tMin}°</div>
                <div class="rain-prob">${p.prob}</div>
            </div>`;
    });
}

// 5. Bloque de Alertas de Índices
function renderizarBloqueIndicadores() {
    const streamCriticos = riosData.filter(r => r.estado === "Crítico" || r.estado === "Alto").length;
    const lluviaCritica = estacionesClimaData.filter(e => e.lluvia > 60).length;

    const indInund = document.getElementById("indInundacion");
    const indDesl = document.getElementById("indDeslizamiento");
    
    if (streamCriticos >= 2 || lluviaCritica >= 2) {
        indInund.textContent = "Alto"; indInund.className = "alto";
        indDesl.textContent = "Alto"; indDesl.className = "alto";
    } else if (streamCriticos === 1 || lluviaCritica === 1) {
        indInund.textContent = "Medio"; indInund.className = "medio";
        indDesl.textContent = "Medio"; indDesl.className = "medio";
    } else {
        indInund.textContent = "Bajo"; indInund.className = "bajo";
        indDesl.textContent = "Bajo"; indDesl.className = "bajo";
    }

    const ahora = new Date();
    document.getElementById("timestampActualizacion").textContent = `Última actualización: ${ahora.toLocaleDateString()} ${ahora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

// ==========================================================================
// 6. HISTOGRAMA DE EVOLUCIÓN (CHART.JS)
// ==========================================================================
let chartInstancia = null;
function inicializarHistogramaLluvia() {
    if (chartInstancia) chartInstancia.destroy();

    // Generar 7 valores dinámicos para los días evaluados
    const valoresLluviaEvolucion = Array.from({ length: 7 }, () => Math.floor(Math.random() * 85) + 15);
    const promedioHistoricoLine = Array.from({ length: 7 }, () => Math.floor(Math.random() * (45 - 30 + 1)) + 30);

    const ctx = document.getElementById("chartLluviaEvolucion").getContext("2d");
    chartInstancia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: diasSemana,
            datasets: [
                {
                    label: 'Lluvia acumulada (mm)',
                    data: valoresLluviaEvolucion,
                    backgroundColor: '#2563eb',
                    borderRadius: 6,
                    barThickness: 28
                },
                {
                    label: 'Promedio histórico (mm)',
                    data: promedioHistoricoLine,
                    type: 'line',
                    borderColor: '#93c5fd',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11, weight: 600 } } }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { color: '#718096' } },
                x: { grid: { display: false }, ticks: { color: '#718096', font: { weight: 600 } } }
            }
        }
    });
}

// CONTROL DE BOTONES EXPORTADORES
document.getElementById("btnExportarClima").addEventListener("click", () => {
    let csv = "Estacion,Lluvia(mm),Caudal(m3/s),Temperatura(C),Humedad(%)\n";
    estacionesClimaData.forEach(e => csv += `${e.nombre},${e.lluvia},${e.caudal},${e.temp},${e.humedad}\n`);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reporte_climatico.csv";
    link.click();
});

// Interacción cosmética botones toggle superior del gráfico
document.querySelectorAll(".btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-toggle").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        inicializarHistogramaLluvia(); // Regenera barras simulando cambio de escala temporal
    });
});

// ==========================================================================
// ARRANQUE UNICO AL DETECTAR F5 / REINICIO
// ==========================================================================
mutarVariablesClimaticasArranque();
renderizarConsolaClimatica();