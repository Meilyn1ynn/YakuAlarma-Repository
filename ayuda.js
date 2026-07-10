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

    // ==========================================
    // DATA INFORMATIVA - TEMAS FRECUENTES
    // ==========================================
    const ayudaTemas = {
        reportes: {
            title: "Ayuda: Problemas al reportar emergencias",
            content: `
                <p>Si experimentas fallas al intentar registrar un reporte ciudadano o una alerta, realiza las siguientes comprobaciones:</p>
                <ol>
                    <li><strong>Permisos de Cámara y Multimedia:</strong> Asegúrate de que YakuAlarma tenga permisos para tomar fotos y video si estás adjuntando evidencia.</li>
                    <li><strong>Precisión del GPS:</strong> Verifica que la ubicación de tu móvil esté establecida en modo de "Alta precisión". Si estás en interiores, sal a un espacio abierto.</li>
                    <li><strong>Campos obligatorios:</strong> Valida que hayas seleccionado el tipo de riesgo e ingresado una breve descripción obligatoria antes de pulsar 'Enviar'.</li>
                </ol>
            `
        },
        sincronizacion: {
            title: "Ayuda: Sincronización de datos",
            content: `
                <p>La cola de sincronización administra tus interacciones offline. Si notas retrasos:</p>
                <ul>
                    <li>No cierres la sesión activa de la app si tienes datos pendientes por transmitir.</li>
                    <li>Al recuperar conexión Wi-Fi o redes móviles estables, abre la aplicación y desliza hacia abajo en el Dashboard principal para forzar la actualización manual del búfer.</li>
                </ul>
            `
        },
        alertas: {
            title: "Ayuda: Alertas y notificaciones",
            content: `
                <p>YakuAlarma emite sonidos críticos ante proximidades de Huaycos o inundaciones:</p>
                <p>Si no las escuchas, dirígete al menú de Configuración nativo del terminal Android/iOS, comprueba que las <strong>Alertas Críticas de Emergencia Gubernamental o Civil</strong> no estén silenciadas o filtradas por el modo 'No molestar'.</p>
            `
        },
        cuenta: {
            title: "Ayuda: Gestión de cuenta y perfil",
            content: `
                <p>Puedes editar tus datos directamente vinculados a tu DNI o cargo institucional. En caso de pérdida de credenciales, utiliza el link '¿Olvidaste tu contraseña?' del Login para despachar un token de restablecimiento directo a tu correo electrónico registrado.</p>
            `
        },
        mapa: {
            title: "Ayuda: Mapa y ubicación GPS",
            content: `
                <p>Nuestra cartografía se renderiza en capas interconectadas con Leaflet. Si experimentas un mapa en blanco o con cuadrículas incompletas:</p>
                <ul>
                    <li>Limpia la memoria caché interna de tu navegador o aplicación.</li>
                    <li>Verifica que la conexión no esté bloqueada por firewalls corporativos o proxies institucionales.</li>
                </ul>
            `
        },
        offline: {
            title: "Ayuda: Funcionamiento de modo sin conexión",
            content: `
                <p>¡No entres en pánico! El sistema está optimizado para resiliencia ante desastres. Si la red colapsa, todas tus geolocalizaciones y reportes se marcan con una firma temporal local y se suben al servidor automáticamente cuando se reanuda la cobertura regional.</p>
            `
        },
        rutas: {
            title: "Ayuda: Refugios y rutas de evacuación",
            content: `
                <p>Este módulo despliega los puntos de acopio oficiales definidos por INDECI y las municipalidades locales. Puedes trazar rutas de escape seguras basadas en el mapa topográfico de riesgos vigente.</p>
            `
        },
        otros: {
            title: "Ayuda: Otros problemas técnicos",
            content: `
                <p>Si detectas anomalías visuales o errores de respuesta de código en la plataforma, captura un screenshot del incidente y ponte en contacto directo con nuestra mesa de ayuda central por correo escribiendo a: <strong>soporte@yakualarma.pe</strong>.</p>
            `
        }
    };

    // ==========================================
    // SISTEMA MODAL INTERACTIVO
    // ==========================================
    const helpModal = document.getElementById("helpModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const closeModal = document.getElementById("closeModal");

    const abrirModal = (title, content) => {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        helpModal.classList.add("open");
    };

    const cerrarModal = () => {
        helpModal.classList.remove("open");
        modalBody.innerHTML = "";
    };

    // Listeners para paneles de temas frecuentes
    document.querySelectorAll(".topic-card").forEach(card => {
        const btn = card.querySelector(".btn-help-trigger");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const key = card.getAttribute("data-topic");
            if (ayudaTemas[key]) {
                abrirModal(ayudaTemas[key].title, ayudaTemas[key].content);
            }
        });
    });

    closeModal.addEventListener("click", cerrarModal);
    helpModal.addEventListener("click", (e) => {
        if (e.target === helpModal) cerrarModal();
    });

    // ==========================================
    // ACCIONES DE TUTORIALES (VER MÁS)
    // ==========================================
    const btnVerMasTutoriales = document.getElementById("btnVerMasTutoriales");
    
    const listadoCompletoTutoriales = `
        <div class="tutorial-extended-list" style="display: flex; flex-direction: column; gap: 14px;">
            <p>A continuación se lista la videoteca completa de capacitación para usuarios de YakuAlarma:</p>
            <ul>
                <li><strong>Módulo Principal:</strong> Introducción integral y Dashboard de control (2:45)</li>
                <li><strong>Módulo Reportes:</strong> Registro de incidencias ciudadanas, fotos y geolocalización (3:30)</li>
                <li><strong>Módulo Cartográfico:</strong> Interpretación del Mapa de calor y Capas de Riesgos (2:10)</li>
                <li><strong>Módulo de Configuración:</strong> Gestión de notificaciones push prioritarias y alertas críticas (1:50)</li>
                <li><strong>Módulo de Evacuación:</strong> Consulta de zonas seguras, refugios temporales y centros de salud (4:15)</li>
                <li><strong>Módulo Offline:</strong> Administración del búfer interno en zonas sin cobertura móvil (3:05)</li>
            </ul>
        </div>
    `;

    btnVerMasTutoriales.addEventListener("click", () => {
        abrirModal("Listado de Tutoriales de YakuAlarma", listadoCompletoTutoriales);
    });

    // ==========================================
    // PREGUNTAS FRECUENTES (ACORDEÓN FLUIDO)
    // ==========================================
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isActive = item.classList.contains("active");

            // Cierra todos los demás acordeones abiertos (Efecto acordeón estricto)
            document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));

            // Si no estaba activo, lo abre
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // Botón auxiliar "Ver todas las FAQs"
    const verTodasFaqs = document.getElementById("verTodasFaqs");
    verTodasFaqs.addEventListener("click", (e) => {
        e.preventDefault();
        abrirModal("Preguntas Frecuentes", `
            <div style="display:flex; flex-direction:column; gap:12px;">
                <p><strong>¿La aplicación consume mis datos móviles al enviar alertas?</strong><br>Las alertas de texto consumen un ancho de banda insignificante. La subida de imágenes pesadas sí requiere de consumo estándar o red Wi-Fi.</p>
                <p><strong>¿Quién valida los reportes ciudadanos en el mapa de riesgos?</strong><br>Cada reporte enviado pasa por una mesa técnica del Gestor Municipal para corroborar la veracidad del incidente antes de publicarse a toda la comunidad.</p>
                <p><strong>¿Cómo me pongo en contacto con defensa civil?</strong><br>A través del canal telefónico directo '115' disponible en el panel lateral de soporte las 24 horas.</p>
            </div>
        `);
    });

    // ==========================================
    // DESCARGA DE GUÍA EN LA CARPETA DOCUMENTOS
    // ==========================================
    const btnDownloadGuide = document.getElementById("btnDownloadGuide");
    btnDownloadGuide.addEventListener("click", () => {
        const link = document.createElement("a");
        // Apunta a la ruta relativa requerida
        link.href = "documentos/YakuAlarma.Guia.pdf";
        link.download = "YakuAlarma.Guia.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // ==========================================
    // DECORACIÓN ADICIONAL - BUSCADOR INTERNO INFORMATIVO
    // ==========================================
    const helpSearch = document.getElementById("helpSearch");
    helpSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && helpSearch.value.trim() !== "") {
            abrirModal(
                `Resultado de búsqueda para: "${helpSearch.value}"`,
                `<p>Se han encontrado coincidencias con nuestros módulos de capacitación. Te sugerimos revisar las secciones de <strong>Temas Frecuentes</strong> o comunicarte con nuestra central de asistencia vía WhatsApp al +51 987 654 321.</p>`
            );
            helpSearch.value = "";
        }
    });
});