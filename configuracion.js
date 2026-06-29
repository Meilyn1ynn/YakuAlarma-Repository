// ==========================================================================
// CONTROL DEL MENÚ RESPONSIVE LATERAL
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
// DICCIONARIO DE IDIOMAS (i18n)
// ==========================================================================
const dictionary = {
    es: {
        "menu-dashboard": "Dashboard", "menu-alerts": "Alertas Activas", "menu-map": "Mapa de Riesgos",
        "menu-health": "Centros de Salud", "menu-institutions": "Instituciones", "menu-stats": "Estadísticas Climáticas",
        "menu-reports": "Reportes Ciudadanos", "menu-users": "Gestión de Usuarios", "menu-settings": "Configuración",
        "user-role": "Gestor Municipal", "logout": "Cerrar sesión", "muni-title": "Municipalidad de",
        "settings-title": "Configuración", "settings-subtitle": "Personaliza el sistema según las necesidades de tu comunidad",
        "sc-notif-title": "Notificaciones", "sc-notif-desc": "Alertas y avisos",
        "sc-security-title": "Seguridad", "sc-security-desc": "Contraseña y acceso",
        "sc-lang-title": "Idioma y región", "sc-lang-desc": "Formatos globales",
        "sc-data-title": "Respaldo y datos", "sc-data-desc": "Copias de seguridad",
        "section-appearance": "Apariencia del sistema", "app-theme": "Tema de la aplicación",
        "theme-light": "Claro", "theme-dark": "Oscuro", "theme-system": "Sistema", "app-color": "Color principal",
        "lang-select": "Idioma de la aplicación", "date-format": "Formato de fecha", "timezone": "Zona horaria",
        "units": "Unidades de medida", "unit-metric": "Métrico (°C, km/h, mm)", "unit-imperial": "Imperial (°F, mph, inches)",
        "notif-preferences": "Preferencias de notificaciones", "notif-emerg": "Alertas de emergencia",
        "notif-emerg-desc": "Recibe notificaciones de alertas críticas y peligros inminentes.",
        "notif-citizen": "Reportes ciudadanos", "notif-citizen-desc": "Recibe avisos sobre nuevos reportes de incidencias vecinales.",
        "notif-weather": "Boletines climáticos", "notif-weather-desc": "Informes periódicos sobre predicciones meteorológicas.",
        "notif-inst": "Instituciones", "notif-inst-desc": "Actualizaciones de ministerios, policía y entidades de salud.",
        "notif-reminders": "Recordatorios", "notif-reminders-desc": "Recordatorios sobre tareas programadas del sistema.",
        "security-config": "Configuración de seguridad", "sec-pass": "Cambiar contraseña",
        "sec-pass-desc": "Actualiza tus credenciales de acceso regularmente.", "sec-2fa": "Verificación en dos pasos",
        "sec-2fa-desc": "Añade una capa de seguridad extra vinculando tu celular.", "sec-active": "Activado",
        "sec-sessions": "Sesiones activas", "sec-sessions-desc": "Gestiona los dispositivos con una sesión abierta.",
        "sec-lock": "Bloqueo automático", "sec-lock-desc": "Bloquea la sesión de forma autónoma por inactividad.",
        "time-15": "15 minutos", "time-30": "30 minutos", "time-60": "1 hora",
        "backup-maintenance": "Respaldo y mantenimiento", "back-auto": "Respaldo automático",
        "back-auto-desc": "Copias redundantes del sistema en la nube gubernamental.", "back-freq": "Frecuencia de respaldo",
        "back-freq-desc": "Define cada cuánto tiempo se ejecutan los backups.", "freq-hourly": "Cada hora",
        "freq-daily": "Diario", "freq-weekly": "Semanal", "back-last": "Último respaldo realizado",
        "back-success": "Exitoso", "maint-cache": "Limpiar caché de la app",
        "maint-cache-desc": "Libera espacio local en el navegador eliminando archivos temporales.", "maint-btn": "Limpiar"
    },
    en: {
        "menu-dashboard": "Dashboard", "menu-alerts": "Active Alerts", "menu-map": "Risk Map",
        "menu-health": "Health Centers", "menu-institutions": "Institutions", "menu-stats": "Climate Statistics",
        "menu-reports": "Citizen Reports", "menu-users": "User Management", "menu-settings": "Settings",
        "user-role": "Municipal Manager", "logout": "Log out", "muni-title": "Municipality of",
        "settings-title": "Settings", "settings-subtitle": "Customize the system according to your community's needs",
        "sc-notif-title": "Notifications", "sc-notif-desc": "Alerts & warnings",
        "sc-security-title": "Security", "sc-security-desc": "Password & access",
        "sc-lang-title": "Language & Region", "sc-lang-desc": "Global formats",
        "sc-data-title": "Backup & Data", "sc-data-desc": "Backup copies",
        "section-appearance": "System Appearance", "app-theme": "Application Theme",
        "theme-light": "Light", "theme-dark": "Dark", "theme-system": "System", "app-color": "Primary color",
        "lang-select": "Application Language", "date-format": "Date format", "timezone": "Time zone",
        "units": "Units of measurement", "unit-metric": "Metric (°C, km/h, mm)", "unit-imperial": "Imperial (°F, mph, inches)",
        "notif-preferences": "Notification Preferences", "notif-emerg": "Emergency Alerts",
        "notif-emerg-desc": "Receive critical alerts and imminent danger announcements.",
        "notif-citizen": "Citizen Reports", "notif-citizen-desc": "Receive notices about new community incidence reports.",
        "notif-weather": "Weather Bulletins", "notif-weather-desc": "Periodic reports on meteorological forecasts.",
        "notif-inst": "Institutions", "notif-inst-desc": "Updates from ministries, police, and healthcare entities.",
        "notif-reminders": "Reminders", "notif-reminders-desc": "Reminders about system scheduled tasks.",
        "security-config": "Security Configuration", "sec-pass": "Change Password",
        "sec-pass-desc": "Regularly update your login credentials.", "sec-2fa": "Two-Step Verification",
        "sec-2fa-desc": "Add an extra layer of security by linking your mobile phone.", "sec-active": "Enabled",
        "sec-sessions": "Active Sessions", "sec-sessions-desc": "Manage devices with an open session.",
        "sec-lock": "Auto Lock", "sec-lock-desc": "Automatically logs out after long periods of inactivity.",
        "time-15": "15 minutes", "time-30": "30 minutes", "time-60": "1 hour",
        "backup-maintenance": "Backup & Maintenance", "back-auto": "Automatic Backup",
        "back-auto-desc": "Redundant copies of the system in the government cloud.", "back-freq": "Backup Frequency",
        "back-freq-desc": "Define how often backups run.", "freq-hourly": "Hourly",
        "freq-daily": "Daily", "freq-weekly": "Weekly", "back-last": "Last Backup Conducted",
        "back-success": "Successful", "maint-cache": "Clear App Cache",
        "maint-cache-desc": "Free local spaces by removing temporal browser files.", "maint-btn": "Clear"
    },
    qu: {
        "menu-dashboard": "Chaska Pampa", "menu-alerts": "Sumaq Willaykuna", "menu-map": "Saywitu",
        "menu-health": "Hampi Wasikuna", "menu-institutions": "Kamachiy Wasikuna", "menu-stats": "Chiki Pachamama Pampa",
        "menu-reports": "Runapa Willakuyninkuna", "menu-users": "Llamkaqkuna Kamachiy", "menu-settings": "Allichaykuna",
        "user-role": "Suyu Kamachiq", "logout": "Lluqsiy", "muni-title": "Suyu Kamachina",
        "settings-title": "Allichaykuna", "settings-subtitle": "Llika allichay aylluykipa allinninpaq",
        "sc-notif-title": "Willaykuna", "sc-notif-desc": "Paqtataq niraqkuna", "sc-security-title": "Allin Amachay",
        "sc-security-desc": "Kichana amachaypas", "sc-lang-title": "Rimay suyupas", "sc-lang-desc": "Tukuy pacha tupukuna",
        "sc-data-title": "Waqaychay imapas", "sc-data-desc": "Kutichina imakuna", "section-appearance": "Llikapa rikchaynin",
        "app-theme": "Llikachapa rikuynin", "theme-light": "Akchi", "theme-dark": "Laqa", "theme-system": "Antañiqichik",
        "app-color": "Sumaq llimp'i", "lang-select": "Llikapa rimaynin", "date-format": "P'unchay ruray",
        "timezone": "Intipa saywiti pacha", "units": "Tupukuna", "unit-metric": "Tupukuna Suyu (°C, km/h, mm)",
        "unit-imperial": "Hawa Tupukuna (°F, mph, inches)", "notif-preferences": "Willaykunapa akllaynin",
        "notif-emerg": "Sinchi chiki willaykuna", "notif-emerg-desc": "Hatun chiki hamuqmanta chaylla willakuykunata chaskiy.",
        "notif-citizen": "Ayllupa willakuyninkuna", "notif-citizen-desc": "Aylluykipi imapas rurakusqanmanta chaylla yachay.",
        "notif-weather": "Pachamama willaykuna", "notif-weather-desc": "Pachamama imaynam kananmanta p'unchay willakuy.",
        "notif-inst": "Kamachiykuna", "notif-inst-desc": "Hampi wasikunamanta, pusaqkunamantapas willakuykuna.",
        "notif-reminders": "Yuyachijkuna", "notif-reminders-desc": "Llikapi rurana p'unchaykunamanta yuyachiy.",
        "security-config": "Amachay allichaykuna", "sec-pass": "Sapakuti kichana pakay",
        "sec-pass-desc": "Kichanaykita sapakuti wakman tikray aswan allin amachaypaq.", "sec-2fa": "Iskay patapi amachay",
        "sec-2fa-desc": "Aswan amachayta churay kuyuchina rawkaykiwan kuskachaspa.", "sec-active": "Kachkanmi",
        "sec-sessions": "Huk antanikichikuna kichasqa", "sec-sessions-desc": "Kichasqa rawkakunata qaway kamachiyaypas.",
        "sec-lock": "Chaylla wichqakuy", "sec-lock-desc": "Upallalla kanki chayqa, llika hapipakuspa pakakunqa.",
        "time-15": "Chunka phisqani titi", "time-30": "Kimsa chunka titi", "time-60": "Huk pacha",
        "backup-maintenance": "Waqaychay pichaypas", "back-auto": "Kikinmanta waqaychay",
        "back-auto-desc": "Llikapa imankunata pukutupi chaylla waqaychay.", "back-freq": "Sapakuti waqaychaykuna",
        "back-freq-desc": "Define cada cuánto tiempo se ejecutan los backups.", "freq-hourly": "Sapa pacha",
        "freq-daily": "Sapa p'unchay", "freq-weekly": "Sapa qanchis p'unchay", "back-last": "Qipa waqaychasqa p'unchay",
        "back-success": "Allinmi rurasqa", "maint-cache": "Navegadorpa pichaynin",
        "maint-cache-desc": "Antañiqichikpi tiyaq pakashqa imakunata pichaspa pampata qispichiy.", "maint-btn": "Pichay"
    },
    ay: {
        "menu-dashboard": "Chaska Pampa", "menu-alerts": "Yatiyawinaka", "menu-map": "Urax Mapa",
        "menu-health": "Qullañ Utanaka", "menu-institutions": "Kamachiri Utanaka", "menu-stats": "Alaxpacha Jakthawinaka",
        "menu-reports": "Markachirinakan Yatiyawipa", "menu-users": "Llamk'irinak Kamachiña", "menu-settings": "Askiptayachiri",
        "user-role": "Irpiri Jach'a", "logout": "Mistiña", "muni-title": "Suyu Kamachiri Utana",
        "settings-title": "Askiptayachiri", "settings-subtitle": "Llika wakichawi markachirinakan askitaki",
        "sc-notif-title": "Yatiyawinaka", "sc-notif-desc": "Unanchanakampi yatiyawi", "sc-security-title": "Jark'aqasiña",
        "sc-security-desc": "Imat'at chinuñanaka", "sc-lang-title": "Arusa Suyusa", "sc-lang-desc": "Taqpacha pacha tupunaka",
        "sc-data-title": "Yatiñanak Waqaychaña", "sc-data-desc": "Kutiyawi luranaka", "section-appearance": "Llikan Uñstapa",
        "app-theme": "Llikachata uñjaña", "theme-light": "Qhana", "theme-dark": "Ch'amaka", "theme-system": "Antañiqiri",
        "app-color": "Aski samiri", "lang-select": "Llikan arupa", "date-format": "Uru wakichawi",
        "intin pacha tupu": "Intin pacha tupu", "units": "Tupunaka", "unit-metric": "Métrico Tupunaka (°C, km/h, mm)",
        "unit-imperial": "Hawa Tupunaka (°F, mph, inches)", "notif-preferences": "Yatiyawinak ajlliña",
        "notif-emerg": "Jach'a axsar pacha yatiyawi", "notif-emerg-desc": "Jan walt'awinakhamat jank'aki yatiyawinak katuqaña.",
        "notif-citizen": "Markachirinakan yatiyawipa", "notif-citizen-desc": "Aylluman jan walt'awinak askichat jank'aki yatiña.",
        "notif-weather": "Pachamama yatiyawi", "notif-weather-desc": "Pachamama imaynam p'unchaynakan kanan pacha yatiyawi.",
        "notif-inst": "Kamachirinaka", "notif-inst-desc": "Qullañ utanaka, pusaqanakas yatiyawinakapa.",
        "notif-reminders": "Amtayirinaka", "notif-reminders-desc": "Llikan lurana urunakat amtaspa yatiyawi.",
        "security-config": "Jark'aqasiñ askichawi", "sec-pass": "Imat'at chinuña sapa pacha",
        "sec-pass-desc": "Chinuñayki sapa pacha mayjt'ayaña juk'amp jark'aqasiñataki.", "sec-2fa": "Iskay patat jark'aqasiña",
        "sec-2fa-desc": "Kuyuchina fonoman mayachthaspa juk'amp jark'aqasiña churata.", "sec-active": "Naktatawa",
        "sec-sessions": "Antañiqirinak naktat uñjaña", "sec-sessions-desc": "Kichat rawkanak uñjaña ch'amanchayapasa.",
        "sec-lock": "Jank'ak jist'antasiña", "sec-lock-desc": "Inaki qhipat pacha, llika kikinpat imantasiñani.",
        "time-15": "Chunka phisqani titi", "time-30": "Kimsa chunka titi", "time-60": "Mä pacha",
        "backup-maintenance": "Waqaychawi pichañampi", "back-auto": "Kikinpat waqaychaña",
        "back-auto-desc": "Llikan imankunata q'alala pusaqan qhanat waqaychaña.", "back-freq": "Sapa kuti waqaychawinaka",
        "back-freq-desc": "Kunawshas waqaychaw lurasiñapa uka amtaña.", "freq-hourly": "Sapa pacha",
        "freq-daily": "Sapa uru", "freq-weekly": "Sapa paqallqu uru", "back-last": "Qhipa waqaychat uru",
        "back-success": "Wali aski lurata", "maint-cache": "Navegador pichaña",
        "maint-cache-desc": "Antañiqirin imantat inaki imankunata pichaspa pampa qispichiri.", "maint-btn": "Pichaña"
    },
    sh: {
        "menu-dashboard": "Chaska Pampa", "menu-alerts": "Onsa Yatiyawinaka", "menu-map": "Mai Mapapa",
        "menu-health": "Tee Wasikuna", "menu-institutions": "Koshi Wasikuna", "menu-stats": "Ona Metereológica Jakthawinaka",
        "menu-reports": "Jononbaini Yatiyawi", "menu-users": "Teeayabo Coiraati", "menu-settings": "Meniti Siniwanti",
        "user-role": "Koshi Xonbabo", "logout": "Joki Kaati", "muni-title": "Koshi Oficina",
        "settings-title": "Meniti Siniwanti", "settings-subtitle": "Llika jawen joni jononbabo jake",
        "sc-notif-title": "Onsa Yatiyawi", "sc-notif-desc": "Avisos jaitatki", "sc-security-title": "Coirameeti",
        "sc-security-desc": "Kichana amachaypas", "sc-lang-title": "Rani joni joibo", "sc-lang-desc": "Tukuy pacha tupukuna",
        "sc-data-title": "Waqaychay imapas", "sc-data-desc": "Kutichina imakuna", "section-appearance": "Llikapa Oini",
        "app-theme": "Llika ointi", "theme-light": "Xani", "theme-dark": "Yame", "theme-system": "Antañiqichik",
        "app-color": "Sumaq llimp'i", "lang-select": "Llika joibo", "date-format": "Moitia ruray",
        "timezone": "Xon pacha tupu", "units": "Tupukuna", "unit-metric": "Métrico Tupunaka (°C, km/h, mm)",
        "unit-imperial": "Hawa Tupunaka (°F, mph, inches)", "notif-preferences": "Yatiyawi akllay",
        "notif-emerg": "Ikaxon chiki willaykuna", "notif-emerg-desc": "Hatun chiki hamuqmanta chaylla willakuykunata chaskiy.",
        "notif-citizen": "Jononbaini yatiyawi", "notif-citizen-desc": "Aylluykipi imapas rurakusqanmanta chaylla yachay.",
        "notif-weather": "Pachamama yatiyawi", "notif-weather-desc": "Pachamama imaynam p'unchaynakan kanan pacha yatiyawi.",
        "notif-inst": "Koshibo", "notif-inst-desc": "Hampi wasikunamanta, pusaqkunamantapas willakuykuna.",
        "notif-reminders": "Yuyachijkuna", "notif-reminders-desc": "Llikapi rurana p'unchaykunamanta yuyachiy.",
        "security-config": "Coirameeti allichaykuna", "sec-pass": "Pakama joibo",
        "sec-pass-desc": "Kichanaykita sapakuti wakman tikray aswan allin amachaypaq.", "sec-2fa": "Rani patapi amachay",
        "sec-2fa-desc": "Aswan amachayta churay kuyuchina rawkaykiwan kuskachaspa.", "sec-active": "Naktatawa",
        "sec-sessions": "Antañiqirinak naktat uñjaña", "sec-sessions-desc": "Kichasqa rawkakunata qaway kamachiyaypas.",
        "sec-lock": "Chaylla wichqakuy", "sec-lock-desc": "Upallalla kanki chayqa, llika hapipakuspa pakakunqa.",
        "time-15": "Chunka phisqani titi", "time-30": "Kimsa chunka titi", "time-60": "Mä pacha",
        "backup-maintenance": "Waqaychawi pichañampi", "back-auto": "Kikinpat waqaychaña",
        "back-auto-desc": "Llikapa imankunata pukutupi chaylla waqaychay.", "back-freq": "Sapa kuti waqaychawinaka",
        "back-freq-desc": "Haykapi waqaychay rurakunanta kamachiy.", "freq-hourly": "Sapa pacha",
        "freq-daily": "Sapa uru", "freq-weekly": "Sapa paqallqu uru", "back-last": "Qhipa waqaychat uru",
        "back-success": "Wali aski lurata", "maint-cache": "Navegador pichaña",
        "maint-cache-desc": "Antañiqirin imantat inaki imankunata pichaspa pampa qispichiri.", "maint-btn": "Pichay"
    }
};

// ==========================================================================
// CONTROL LOCALSTORAGE: GUARDAR Y APLICAR CONFIGURACIONES
// ==========================================================================

// Al cargar el documento, lee las preferencias guardadas o aplica por defecto
document.addEventListener("DOMContentLoaded", () => {
    cargarConfiguraciones();
    inicializarEventosInteractivos();
});

function inicializarEventosInteractivos() {
    // 1. Evento para Cambio de Tema Visual
    const themeButtons = document.querySelectorAll(".btn-theme");
    themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            themeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTheme = btn.getAttribute("data-theme-set");
            applyTheme(targetTheme);
            localStorage.setItem("yaku-theme", targetTheme); // Guardar
        });
    });

    // 2. Evento para Cambio de Color Principal
    const colorDots = document.querySelectorAll(".color-dot");
    colorDots.forEach(dot => {
        dot.addEventListener("click", () => {
            colorDots.forEach(d => d.classList.remove("active"));
            dot.classList.add("active");
            
            const hexColor = dot.getAttribute("data-color");
            document.documentElement.style.setProperty('--primary-color', hexColor);
            localStorage.setItem("yaku-color", hexColor); // Guardar
        });
    });

    // 3. Evento para Selector de Idioma
    const langSelector = document.getElementById("langSelector");
    if (langSelector) {
        langSelector.addEventListener("change", (e) => {
            const selectedLang = e.target.value;
            translatePage(selectedLang);
            localStorage.setItem("yaku-lang", selectedLang); // Guardar
        });
    }

    // 4. Eventos para los Switches de Notificación
    const switches = document.querySelectorAll(".toggle-item input[type='checkbox']");
    switches.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            localStorage.setItem(`yaku-notif-${index}`, checkbox.checked); // Guardar estado de cada switch
        });
    });
}

// Función para restaurar los valores guardados
function cargarConfiguraciones() {
    // 1. Restaurar Idioma
    const savedLang = localStorage.getItem("yaku-lang") || "es";
    const langSelector = document.getElementById("langSelector");
    if (langSelector) langSelector.value = savedLang;
    translatePage(savedLang);

    // 2. Restaurar Tema Visual
    const savedTheme = localStorage.getItem("yaku-theme") || "claro";
    const activeThemeBtn = document.querySelector(`[data-theme-set="${savedTheme}"]`);
    if (activeThemeBtn) {
        document.querySelectorAll(".btn-theme").forEach(b => b.classList.remove("active"));
        activeThemeBtn.classList.add("active");
    }
    applyTheme(savedTheme);

    // 3. Restaurar Color Principal
    const savedColor = localStorage.getItem("yaku-color") || "#2a9d8f";
    document.documentElement.style.setProperty('--primary-color', savedColor);
    const activeColorDot = document.querySelector(`[data-color="${savedColor}"]`);
    if (activeColorDot) {
        document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
        activeColorDot.classList.add("active");
    }

    // 4. Restaurar estado de los Switches de Notificación
    const switches = document.querySelectorAll(".toggle-item input[type='checkbox']");
    switches.forEach((checkbox, index) => {
        const savedSwitchState = localStorage.getItem(`yaku-notif-${index}`);
        if (savedSwitchState !== null) {
            checkbox.checked = (savedSwitchState === "true");
        }
    });
}

// Funciones lógicas auxiliares de Aplicación
function applyTheme(theme) {
    const rootHtml = document.documentElement;
    if (theme === "oscuro") {
        rootHtml.setAttribute("data-theme", "oscuro");
    } else if (theme === "claro") {
        rootHtml.setAttribute("data-theme", "claro");
    } else if (theme === "sistema") {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        rootHtml.setAttribute("data-theme", systemPrefersDark ? "oscuro" : "claro");
    }
}

function translatePage(lang) {
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dictionary[lang] && dictionary[lang][key]) {
            el.textContent = dictionary[lang][key];
        } else {
            el.textContent = dictionary["es"][key];
        }
    });
}

// ==========================================================================
// MANTENIMIENTO Y EXTRAS
// ==========================================================================
const btnClearCache = document.getElementById("btnClearCache");
if (btnClearCache) {
    btnClearCache.addEventListener("click", () => {
        btnClearCache.textContent = "...";
        btnClearCache.disabled = true;

        setTimeout(() => {
            localStorage.clear(); // Borra las configuraciones locales guardadas
            alert("¡Preferencias de la aplicación y almacenamiento local limpiados!");
            location.reload(); // Recarga para volver al estado inicial de fábrica
        }, 1200);
    });
}

const backupDateElement = document.getElementById("backupDateElement");
if (backupDateElement) {
    const hoy = new Date();
    backupDateElement.textContent = `${hoy.toLocaleDateString()} 02:30 AM`;
}