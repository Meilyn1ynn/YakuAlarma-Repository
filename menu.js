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

    // ==========================
    // FECHA ACTUAL
    // ==========================

    const fechaActual = document.getElementById("fechaActual");

    const fecha = new Date();

    fechaActual.textContent =
        fecha.toLocaleDateString("es-PE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    // ==========================
    // GENERADORES RANDOM
    // ==========================

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function decimal(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    // ==========================
    // CARDS SUPERIORES
    // ==========================

    document.getElementById("alertasActivas").textContent =
        random(8, 30);

    document.getElementById("reportesCiudadanos").textContent =
        random(120, 550);

    document.getElementById("centrosSalud").textContent =
        random(25, 80);

    document.getElementById("instituciones").textContent =
        random(5, 25);

    // ==========================
    // BADGES
    // ==========================

    document.getElementById("notificaciones").textContent =
        random(1, 9);

    document.getElementById("mensajes").textContent =
        random(1, 6);

    // ==========================
    // ESTADISTICAS CLIMATICAS
    // ==========================

    document.getElementById("lluvia").textContent =
        decimal(5, 50);

    document.getElementById("caudal").textContent =
        decimal(0.8, 4.5);

    document.getElementById("temperatura").textContent =
        random(18, 34);

    document.getElementById("humedad").textContent =
        random(55, 95);

    // ==========================
    // MAPA LEAFLET
    // ==========================

    const map = L.map("map").setView(
        [-11.495, -77.207],
        11
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(map);

    // ==========================
    // MARCADORES
    // ==========================

    const puntos = [

        {
            nombre: "Municipalidad Provincial",
            lat: -11.495,
            lng: -77.207,
            mensaje: "Centro de Operaciones"
        },

        {
            nombre: "Hospital San Juan Bautista",
            lat: -11.489,
            lng: -77.210,
            mensaje: "Centro de Salud"
        },

        {
            nombre: "Zona Riesgo Alto",
            lat: -11.470,
            lng: -77.180,
            mensaje: "Probabilidad de inundación"
        },

        {
            nombre: "Refugio Temporal",
            lat: -11.520,
            lng: -77.230,
            mensaje: "Punto seguro"
        }

    ];

    puntos.forEach(punto => {

        L.marker([punto.lat, punto.lng])
            .addTo(map)
            .bindPopup(`
                <b>${punto.nombre}</b><br>
                ${punto.mensaje}
            `);

    });

    // ==========================
    // CIRCULOS DE RIESGO
    // ==========================

    L.circle(
        [-11.470, -77.180],
        {
            color: "#d62828",
            fillColor: "#d62828",
            fillOpacity: 0.35,
            radius: 1500
        }
    ).addTo(map);

    L.circle(
        [-11.505, -77.250],
        {
            color: "#ffb703",
            fillColor: "#ffb703",
            fillOpacity: 0.35,
            radius: 1200
        }
    ).addTo(map);

    L.circle(
        [-11.540, -77.210],
        {
            color: "#2a9d8f",
            fillColor: "#2a9d8f",
            fillOpacity: 0.35,
            radius: 1000
        }
    ).addTo(map);

    // ==========================
    // CHART ALERTAS
    // ==========================

    const chartData = [];

    for(let i = 0; i < 12; i++) {

        chartData.push(
            random(5, 30)
        );

    }

    const ctx =
        document
        .getElementById("alertChart")
        .getContext("2d");

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "00h",
                "02h",
                "04h",
                "06h",
                "08h",
                "10h",
                "12h",
                "14h",
                "16h",
                "18h",
                "20h",
                "22h"
            ],

            datasets: [{

                label: "Alertas",

                data: chartData,

                borderColor: "#d62828",

                backgroundColor:
                    "rgba(214,40,40,0.15)",

                fill: true,

                tension: 0.4,

                borderWidth: 3,

                pointRadius: 4

            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });

    // ==========================
    // CENTROS DE SALUD
    // ==========================

    const centros = [

        "Hospital Huaral",
        "Centro Médico Aucallama",
        "Posta Chancay",
        "Hospital Regional",
        "Centro Salud Palpa",
        "Centro Emergencias"

    ];

    const centrosList =
        document.getElementById("centrosList");

    centros.forEach(nombre => {

        const estado =
            Math.random() > 0.5
            ? "Activo"
            : "Ocupado";

        const clase =
            estado === "Activo"
            ? "activo"
            : "ocupado";

        centrosList.innerHTML += `

        <div class="centro-item">

            <div class="centro-info">

                <i class="fa-solid fa-hospital"></i>

                <div>

                    <strong>${nombre}</strong><br>

                    <small>
                    ${random(1,15)} km
                    </small>

                </div>

            </div>

            <span class="estado ${clase}">
                ${estado}
            </span>

        </div>

        `;
    });

    // ==========================
    // REPORTES
    // ==========================

    const reportesTable =
        document.getElementById("reportesTable");

    const eventos = [
        "Inundación",
        "Huayco",
        "Lluvias Intensas",
        "Deslizamiento",
        "Río Desbordado",
        "Bloqueo de Vía"
    ];

    const lugares = [
        "Huaral",
        "Chancay",
        "Aucallama",
        "Palpa",
        "Lampián",
        "Atavillos"
    ];

    const riesgos = [
        "Alto",
        "Medio",
        "Bajo"
    ];

    const estados = [
        "Pendiente",
        "Validado",
        "Atendido"
    ];

    for(let i = 0; i < 10; i++) {

        reportesTable.innerHTML += `

        <tr>

            <td>#${random(1000,9999)}</td>

            <td>
                ${eventos[random(0,eventos.length-1)]}
            </td>

            <td>
                ${lugares[random(0,lugares.length-1)]}
            </td>

            <td>
                ${riesgos[random(0,riesgos.length-1)]}
            </td>

            <td>
                ${estados[random(0,estados.length-1)]}
            </td>

            <td>
                ${random(1,28)}/06/2026
            </td>

        </tr>

        `;
    }

    // ==========================
    // ACTUALIZACION AUTOMATICA
    // ==========================

    setInterval(() => {

        document.getElementById("alertasActivas").textContent =
            random(8, 30);

        document.getElementById("notificaciones").textContent =
            random(1, 9);

    }, 10000);

});