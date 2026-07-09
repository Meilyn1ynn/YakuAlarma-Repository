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
});
let currentStep = 1;
let selectedTipo = "Lluvias intensas";
let selectedIntensidad = "Medio";
let uploadedImageBase64 = null; // Buffer para persistir el adjunto opcional
let mapInstance = null;
let mapMarker = null;

document.addEventListener("DOMContentLoaded", () => {
    
    // Inyectar fecha y hora actual por defecto
    const hoy = new Date();
    if (document.getElementById("txtFecha")) document.getElementById("txtFecha").value = hoy.toISOString().split('T')[0];
    if (document.getElementById("txtHora")) document.getElementById("txtHora").value = hoy.toTimeString().split(' ')[0].slice(0, 5);

    // Asignar controladores nativos a botones Siguiente/Anterior
    document.querySelectorAll(".btn-nav").forEach(btn => {
        btn.addEventListener("click", () => {
            const dir = parseInt(btn.getAttribute("data-dir"));
            if (dir) validateAndNavigate(dir);
        });
    });

    // Control de selección de tarjetas (Paso 1)
    document.querySelectorAll(".emergency-card").forEach(card => {
        card.addEventListener("click", () => {
            document.querySelectorAll(".emergency-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedTipo = card.getAttribute("data-value");
        });
    });

    // Manejo de carga de imagen y conversión a Base64 (Paso 2)
    const fileInput = document.getElementById("fileEvidencia");
    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                document.getElementById("upload-preview-name").textContent = `✔️ Imagen lista: ${file.name}`;
                const reader = new FileReader();
                reader.onload = function(event) {
                    uploadedImageBase64 = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Control e iconografía dinámica de la Intensidad (Paso 4)
    document.querySelectorAll(".intensity-card").forEach(card => {
        card.addEventListener("click", () => {
            document.querySelectorAll(".intensity-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedIntensidad = card.getAttribute("data-level");
            
            const infoBox = document.getElementById("infoBoxContainer");
            const infoIcon = document.getElementById("infoBoxIcon");
            const titleBox = infoBox.querySelector("strong");
            const descBox = document.getElementById("lblIntensityDesc");

            titleBox.textContent = `Nivel ${selectedIntensidad}`;

            if (selectedIntensidad === "Bajo") {
                infoBox.style.backgroundColor = "#edf7ed"; infoBox.style.borderColor = "var(--success)"; infoBox.style.color = "#1e4620";
                infoIcon.className = "fa-solid fa-leaf"; descBox.textContent = "Sin riesgo inmediato. No altera rutinas comunitarias.";
            } else if (selectedIntensidad === "Medio") {
                infoBox.style.backgroundColor = "#fff4e5"; infoBox.style.borderColor = "var(--warning)"; infoBox.style.color = "#664d03";
                infoIcon.className = "fa-solid fa-circle-info"; descBox.textContent = "El evento puede causar afectaciones leves a moderadas.";
            } else if (selectedIntensidad === "Alto") {
                infoBox.style.backgroundColor = "#fdeded"; infoBox.style.borderColor = "var(--danger)"; infoBox.style.color = "#5f2120";
                infoIcon.className = "fa-solid fa-radiation"; descBox.textContent = "Riesgo importante en estructuras rurales e infraestructuras.";
            } else if (selectedIntensidad === "Crítico") {
                infoBox.style.backgroundColor = "#ffebee"; infoBox.style.borderColor = "#b71c1c"; infoBox.style.color = "#b71c1c";
                infoIcon.className = "fa-solid fa-skull-crossbones"; descBox.textContent = "Peligro inminente. Daño masivo inminente o en curso.";
            }
        });
    });

    // Envío Final simulando redirección de datos a misreportes.html (Paso 5)
    document.getElementById("btnEnviarReporte").addEventListener("click", () => {
        const payloadReporte = {
            id: document.getElementById("lblCodigoGenerado").textContent,
            tipo: selectedTipo,
            descripcion: document.getElementById("txtDescripcion").value,
            fecha: document.getElementById("txtFecha").value,
            hora: document.getElementById("txtHora").value,
            ubicacion: document.getElementById("txtDireccion").value,
            intensidad: selectedIntensidad,
            imagen: uploadedImageBase64 || null
        };

        // Simulación: Guardado Local Storage para que misreportes.html lo lea en el futuro
        let historial = JSON.parse(localStorage.getItem("misreportes_db")) || [];
        historial.unshift(payloadReporte);
        localStorage.setItem("misreportes_db", JSON.stringify(historial));

        console.log("Datos despachados con éxito hacia la cola remota de misreportes.html", payloadReporte);
        navigateStep(1); // Mueve a Confirmación (Paso 6)
    });

    // Enlace para redirigir directamente al panel de Mis Reportes (Simulado)
    document.getElementById("btnIrMisReportes").addEventListener("click", () => {
        window.location.href = "misreportes.html";
    });

    // Botón de Copiar Código de Reporte
    document.getElementById("btnCopiarCodigo").addEventListener("click", () => {
        const codigo = document.getElementById("lblCodigoGenerado").textContent;
        navigator.clipboard.writeText(codigo);
        alert(`Código ${codigo} copiado al portapapeles.`);
    });

    // Resetear formulario para registrar otro reporte limpio
    document.getElementById("btnRegistrarOtro").addEventListener("click", (e) => {
        e.preventDefault();
        currentStep = 1;
        uploadedImageBase64 = null;
        document.getElementById("txtDescripcion").value = "";
        document.getElementById("upload-preview-name").textContent = "";
        updateWizardUI();
    });
});

// MOTOR DE VALIDACIÓN ESTRICTA
function validateAndNavigate(direction) {
    if (direction === 1) {
        let isValid = true;

        if (currentStep === 2) {
            const desc = document.getElementById("txtDescripcion").value.trim();
            const fecha = document.getElementById("txtFecha").value;
            const hora = document.getElementById("txtHora").value;
            const duracion = document.getElementById("txtDuracion").value;
            if (!desc || !fecha || !hora || !duracion) isValid = false;
        }
        else if (currentStep === 3) {
            const dir = document.getElementById("txtDireccion").value.trim();
            if (!dir) isValid = false;
        }

        if (!isValid) {
            triggerAlertToast();
            return; // Bloquea avance
        }
    }
    navigateStep(direction);
}

// Mostrar banner flotante de error
function triggerAlertToast() {
    const toast = document.getElementById("validation-toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
}

// CONTROLADOR DE PASOS Y RENDER MAPA/REVISIÓN
function navigateStep(direction) {
    currentStep += direction;
    if (currentStep < 1) currentStep = 1;
    if (currentStep > 6) currentStep = 6;

    // Inicializar o refrescar Mapa interactivo con selección por clic (Paso 3)
    if (currentStep === 3) {
        setTimeout(() => {
            if (!mapInstance) {
                mapInstance = L.map('map-container').setView([-10.7412, -75.2694], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
                
                // Marcador inicial
                mapMarker = L.marker([-10.7412, -75.2694], { draggable: true }).addTo(mapInstance);

                // FUNCIONALIDAD: Clic en el mapa para mover punto de emergencia
                mapInstance.on('click', (e) => {
                    const latlng = e.latlng;
                    mapMarker.setLatLng(latlng);
                    document.getElementById("txtDireccion").value = `Coordenadas: ${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)} (Distrito Villa Rica)`;
                });
            } else {
                mapInstance.invalidateSize();
            }
        }, 200);
    }

    // Compilar e inyectar datos del resumen e icono correspondiente (Paso 5)
    if (currentStep === 5) {
        document.getElementById("revTipo").textContent = selectedTipo;
        document.getElementById("revDesc").textContent = document.getElementById("txtDescripcion").value || "(Sin descripción)";
        document.getElementById("revFechaHora").textContent = `${document.getElementById("txtFecha").value} a las ${document.getElementById("txtHora").value}`;
        document.getElementById("revUbicacion").textContent = document.getElementById("txtDireccion").value;
        document.getElementById("revIntensidad").textContent = selectedIntensidad;

        // Cambiar icono de tipo de desastre dinámico en la revisión
        const targetIcon = document.querySelector(`.emergency-card[data-value="${selectedTipo}"] i`).className;
        const colorIcon = document.querySelector(`.emergency-card[data-value="${selectedTipo}"]`).style.getPropertyValue('--card-color');
        document.getElementById("revIconTipo").innerHTML = `<i class="${targetIcon}" style="color:${colorIcon}"></i>`;

        // Cambiar icono de intensidad dinámico en la revisión
        const intensityIcon = document.querySelector(`.intensity-card[data-level="${selectedIntensidad}"] i`).className;
        const intensityColor = document.querySelector(`.intensity-card[data-level="${selectedIntensidad}"]`).style.getPropertyValue('--int-color');
        document.getElementById("revIconIntensidad").innerHTML = `<i class="${intensityIcon}" style="color:${intensityColor}"></i>`;

        // Renderizar previsualización de imagen o leyenda de vacío
        const imgContainer = document.getElementById("revImageContainer");
        if (uploadedImageBase64) {
            imgContainer.innerHTML = `<img src="${uploadedImageBase64}" alt="Evidencia de incidente">`;
        } else {
            imgContainer.innerHTML = `<i class="fa-solid fa-image-not-supported" style="font-size:2rem; margin-bottom:5px;"></i><p>No se adjuntó imagen</p>`;
        }

        // Preparar código de seguimiento antes de pasar a la pantalla final
        const numRandom = Math.floor(1000 + Math.random() * 9000);
        document.getElementById("lblCodigoGenerado").textContent = `YA-2026-0502-${numRandom}`;
    }

    updateWizardUI();
}

function updateWizardUI() {
    document.querySelectorAll(".step-panel").forEach(panel => panel.classList.remove("active"));
    document.querySelectorAll(".progress-step").forEach(step => step.classList.remove("active"));

    const currentPanel = document.getElementById(`stepPanel${currentStep}`);
    if (currentPanel) currentPanel.classList.add("active");
    
    for (let i = 1; i <= currentStep; i++) {
        const headerNode = document.querySelector(`.progress-step[data-step="${i}"]`);
        if (headerNode) headerNode.classList.add("active");
    }
}