// ==========================================
// DATA CORE DE PRUEBA (Ampliada con más chats comunitarios)
// ==========================================
const comunidadesData = [
    {
        id: "villa-rica",
        nombre: "Villa Rica",
        tipo: "Comunidad general",
        miembros: 128,
        enLinea: 12,
        imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
        mensajes: [
            { id: 1, autor: "María López", avatar: "https://randomuser.me/api/portraits/women/1.jpg", texto: "¡Buenos días comunidad! Anoche llovió muy fuerte en la parte alta.", hora: "08:45 a. m.", tipo: "texto" },
            { id: 2, autor: "Carlos Quispe", avatar: "https://randomuser.me/api/portraits/men/2.jpg", texto: "Así es, el camino hacia la quebrada Honda está con lodo.", hora: "08:47 a. m.", tipo: "texto" },
            { id: 3, autor: "Tú", avatar: "", texto: "Gracias por la información. Ya lo hemos reportado a las autoridades.", hora: "08:50 a. m.", tipo: "texto", propio: true },
            { id: 4, autor: "Rosa Martínez", avatar: "https://randomuser.me/api/portraits/women/3.jpg", texto: "Cuidado con el río, está aumentando su caudal.", hora: "09:05 a. m.", tipo: "texto" },
            { id: 5, autor: "Luis Fernández", avatar: "https://randomuser.me/api/portraits/men/4.jpg", texto: "audio", hora: "09:08 a. m.", tipo: "audio", duracion: "0:18" },
            { id: 6, autor: "Coordinador", avatar: "", texto: "Se recomienda evitar las zonas cercanas a la quebrada Honda.", hora: "Ayer, 07:30 p. m.", tipo: "aviso" }
        ],
        audios: [
            { autor: "María López", avatar: "https://randomuser.me/api/portraits/women/1.jpg", duracion: "0:25", hora: "Hoy, 10:12 a. m." },
            { autor: "Carlos Quispe", avatar: "https://randomuser.me/api/portraits/men/2.jpg", duracion: "0:31", hora: "Hoy, 09:48 a. m." },
            { autor: "Ana Jiménez", avatar: "https://randomuser.me/api/portraits/women/5.jpg", duracion: "0:19", hora: "Ayer, 08:33 p. m." }
        ],
        avisos: [
            { titulo: "Alerta de lluvias intensas", entidad: "SENAMHI", contenido: "Se prevén lluvias de moderada a fuerte intensidad en las próximas horas.", hora: "Hoy, 07:00 a. m." }
        ],
        coordenadas: [-10.738, -75.267]
    },
    {
        id: "naranjal",
        nombre: "Naranjal",
        tipo: "Comunidad general",
        miembros: 84,
        enLinea: 5,
        imagen: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=150&q=80",
        mensajes: [
            { id: 1, autor: "María Rojas", avatar: "https://randomuser.me/api/portraits/women/8.jpg", texto: "¿Alguien vio el deslizamiento cerca del puente viejo?", hora: "10:15 a. m.", tipo: "texto" },
            { id: 2, autor: "José Manuel", avatar: "https://randomuser.me/api/portraits/men/5.jpg", texto: "Sí, la vía alterna está parcialmente bloqueada. Tomen precauciones.", hora: "10:22 a. m.", tipo: "texto" }
        ],
        audios: [
            { autor: "Jorge Meza", avatar: "https://randomuser.me/api/portraits/men/12.jpg", duracion: "0:45", hora: "Ayer" }
        ],
        avisos: [
            { titulo: "Trabajos en vía principal", entidad: "Vecinos", contenido: "Limpieza de cunetas programada para el sábado por la mañana.", hora: "Ayer" }
        ],
        coordenadas: [-11.500, -77.210]
    },
    {
        id: "palcazu",
        nombre: "Palcazu",
        tipo: "Comunidad general",
        miembros: 92,
        enLinea: 8,
        imagen: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=150&q=80",
        mensajes: [
            { id: 1, autor: "Carlos Guerra", avatar: "https://randomuser.me/api/portraits/men/15.jpg", texto: "Evitemos la zona baja cerca de la rivera, el agua está filtrando.", hora: "09:58 a. m.", tipo: "texto" },
            { id: 2, autor: "Elena Paz", avatar: "https://randomuser.me/api/portraits/women/11.jpg", texto: "Entendido Carlos, ya pasé la voz a la manzana B.", hora: "10:02 a. m.", tipo: "texto" }
        ],
        audios: [],
        avisos: [],
        coordenadas: [-10.450, -75.120]
    },
    {
        id: "quebrada-honda",
        nombre: "Quebrada Honda",
        tipo: "Comunidad general",
        miembros: 65,
        enLinea: 4,
        imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=150&q=80",
        mensajes: [
            { id: 1, autor: "Luis Huamán", avatar: "https://randomuser.me/api/portraits/men/22.jpg", texto: "Precaución con las lluvias, se siente una ligera vibración arriba.", hora: "Ayer", tipo: "texto" },
            { id: 2, autor: "Sofía Castro", avatar: "https://randomuser.me/api/portraits/women/25.jpg", texto: "Gracias por avisar Luis, nos mantendremos en alerta.", hora: "Ayer", tipo: "texto" }
        ],
        audios: [
            { autor: "Luis Huamán", avatar: "https://randomuser.me/api/portraits/men/22.jpg", duracion: "0:50", hora: "Ayer" }
        ],
        avisos: [
            { titulo: "Monitoreo Activo", entidad: "Defensa Civil", contenido: "Monitoreo constante de la corona de la quebrada por posible activación.", hora: "Ayer" }
        ],
        coordenadas: [-11.520, -77.180]
    },
    {
        id: "san-pedro",
        nombre: "San Pedro",
        tipo: "Comunidad general",
        miembros: 110,
        enLinea: 3,
        imagen: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=150&q=80",
        mensajes: [
            { id: 1, autor: "Ana Belén", avatar: "https://randomuser.me/api/portraits/women/14.jpg", texto: "El río está crecido pero todavía se mantiene bajo el nivel crítico.", hora: "9:30 a. m.", tipo: "texto" },
            { id: 2, autor: "Pedro Flores", avatar: "https://randomuser.me/api/portraits/men/33.jpg", texto: "De igual forma hay que colocar los sacos de arena en las puertas.", hora: "9:35 a. m.", tipo: "texto" }
        ],
        audios: [],
        avisos: [],
        coordenadas: [-11.460, -77.230]
    },
    {
        id: "sector-esperanza",
        nombre: "Sector La Esperanza",
        tipo: "Comunidad general",
        miembros: 74,
        enLinea: 2,
        imagen: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=150&q=80",
        mensajes: [
            { id: 1, autor: "Elvira Vega", avatar: "https://randomuser.me/api/portraits/women/32.jpg", texto: "Compartiendo ubicación de la zona segura del sector.", hora: "Ayer", tipo: "texto" },
            { id: 2, autor: "Ramiro Solís", avatar: "https://randomuser.me/api/portraits/men/41.jpg", texto: "Excelente, ya tenemos todo el kit de primeros auxilios listo.", hora: "Ayer", tipo: "texto" }
        ],
        audios: [
            { autor: "Elvira Vega", avatar: "https://randomuser.me/api/portraits/women/32.jpg", duracion: "1:15", hora: "Ayer" }
        ],
        avisos: [],
        coordenadas: [-11.480, -77.250]
    }
];

let comunidadActiva = comunidadesData[0];
let mapInstance = null;
let mapMarkers = [];
let archivoAdjuntoTemporal = null;
let objetoUrlTemporal = null; // Para guardar la referencia blob de la imagen local

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initTabs();
    initSearch();
    initChatForm();
    initLocationButtons();
    renderListaComunidades(comunidadesData);
    cambiarComunidad(comunidadesData[0].id);
});

function initMenu() {
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
}

// ==========================================
// MANEJO DE PESTAÑAS (TABS)
// ==========================================
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTab = btn.getAttribute("data-tab");
            document.querySelectorAll(".tab-view").forEach(view => view.classList.remove("active"));
            document.getElementById(`tabView-${targetTab}`).classList.add("active");

            if (targetTab === "mapa") {
                setTimeout(() => initMapElement(), 100);
            }
        });
    });

    document.querySelectorAll(".tab-link-trigger, .locations-shared-count").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const target = trigger.getAttribute("data-target");
            const correspondBtn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
            if (correspondBtn) correspondBtn.click();
        });
    });
}

// ==========================================
// RENDERIZADO DINÁMICO DE COMPONENTES
// ==========================================
function renderListaComunidades(lista) {
    const container = document.getElementById("communitiesList");
    container.innerHTML = "";

    lista.forEach(com => {
        const ultimoMsg = com.mensajes.length > 0 ? com.mensajes[com.mensajes.length - 1] : { texto: 'Sin mensajes', hora: '' };
        let textoCorto = ultimoMsg.texto;
        
        if (ultimoMsg.tipo === "audio") textoCorto = "🎵 Mensaje de voz";
        else if (ultimoMsg.tipo === "aviso") textoCorto = "⚠️ Aviso importante";
        else if (ultimoMsg.esImagen) textoCorto = "📷 Imagen adjunta";
        
        const item = document.createElement("div");
        item.className = `chat-item ${com.id === comunidadActiva.id ? 'active' : ''}`;
        item.setAttribute("data-id", com.id);
        item.innerHTML = `
            <img src="${com.imagen}" alt="${com.nombre}">
            <div class="chat-item-info">
                <div>
                    <h4>${com.nombre}</h4>
                    <span>${ultimoMsg.hora}</span>
                </div>
                <p>${textoCorto}</p>
            </div>
            ${com.enLinea > 0 ? `<span class="badge-count">${com.enLinea}</span>` : ''}
        `;
        
        item.addEventListener("click", () => cambiarComunidad(com.id));
        container.appendChild(item);
    });
}

function cambiarComunidad(id) {
    const encontrada = comunidadesData.find(c => c.id === id);
    if (!encontrada) return;

    comunidadActiva = encontrada;

    document.querySelectorAll(".chat-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-id") === id);
    });

    document.getElementById("activeChatName").textContent = comunidadActiva.nombre;
    document.getElementById("activeChatCount").textContent = `${comunidadActiva.miembros} miembros · ${comunidadActiva.enLinea} en línea`;

    renderMensajes();
    renderAudios();
    renderAvisos();
    renderWidgetsLaterales();

    if (document.getElementById("tabView-mapa").classList.contains("active")) {
        initMapElement();
    }
}

// RENDERIZADOR DE MENSAJES (Maneja visualización de imágenes directo)
function renderMensajes() {
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "";

    comunidadActiva.mensajes.forEach(msg => {
        const row = document.createElement("div");
        
        if (msg.tipo === "aviso") {
            row.className = "msg-row coordinator-notice";
            row.innerHTML = `
                <div class="coordinator-box">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <div class="coordinator-body">
                        <h5>Aviso de coordinador</h5>
                        <p>${msg.texto}</p>
                        <span class="msg-meta">${msg.hora}</span>
                    </div>
                </div>
            `;
        } else {
            row.className = `msg-row ${msg.propio ? 'sent' : 'received'}`;
            
            let bubbleContent = "";
            if (!msg.propio) {
                bubbleContent += `<span class="msg-author">${msg.autor}</span>`;
            }

            // Si tiene una imagen adjunta, renderizar la etiqueta <img> directamente
            if (msg.esImagen && msg.adjunto) {
                bubbleContent += `
                    <div class="msg-image-wrapper" style="margin-bottom: 5px; max-width: 100%;">
                        <img src="${msg.adjunto}" alt="Imagen de usuario" style="max-width: 100%; max-height: 200px; border-radius: 8px; display: block; object-fit: cover;">
                    </div>`;
            }

            if (msg.tipo === "audio") {
                bubbleContent += generateAudioHTML(msg.duracion);
            } else if (msg.texto) {
                bubbleContent += `<p>${msg.texto}</p>`;
            }

            // Si es archivo regular (no imagen), dejar enlace de descarga tradicional
            if (msg.adjunto && !msg.esImagen) {
                bubbleContent += `
                    <a href="#" class="msg-attachment-link" onclick="alert('Descargando: ${msg.adjunto}')">
                        <i class="fa-solid fa-file-arrow-down"></i> ${msg.adjunto}
                    </a>`;
            }

            bubbleContent += `
                <div class="msg-meta">
                    <span>${msg.hora}</span>
                    ${msg.propio ? '<i class="fa-solid fa-check-double" style="color:#2a9d8f"></i>' : ''}
                </div>`;

            row.innerHTML = `
                ${msg.propio ? '' : `<img class="msg-avatar" src="${msg.avatar || 'https://via.placeholder.com/36'}" alt="User">`}
                <div class="msg-bubble">${bubbleContent}</div>
            `;
        }
        container.appendChild(row);
    });
    
    container.scrollTop = container.scrollHeight;
}

function generateAudioHTML(duracion) {
    let bars = "";
    for(let i=0; i<18; i++) bars += "<span></span>";
    return `
        <div class="audio-player-ui">
            <button type="button" class="play-track-btn" onclick="toggleSimulateAudio(this)">
                <i class="fa-solid fa-play"></i>
            </button>
            <div class="audio-wave-simulation">${bars}</div>
            <span class="audio-time">${duracion}</span>
        </div>
    `;
}

function toggleSimulateAudio(btn) {
    const icon = btn.querySelector("i");
    const wave = btn.nextElementSibling;
    if (icon.classList.contains("fa-play")) {
        icon.className = "fa-solid fa-pause";
        wave.classList.add("playing");
    } else {
        icon.className = "fa-solid fa-play";
        wave.classList.remove("playing");
    }
}

function renderAudios() {
    const extendedContainer = document.getElementById("audioListExtended");
    const miniContainer = document.getElementById("voiceMiniContainer");
    
    extendedContainer.innerHTML = "";
    miniContainer.innerHTML = "";

    if (comunidadActiva.audios.length === 0) {
        extendedContainer.innerHTML = "<p style='color:#64748b; font-size:13px; padding:10px;'>No hay registros de voz en esta comunidad.</p>";
        miniContainer.innerHTML = "<p style='color:#64748b; font-size:12px;'>Sin audios recientes.</p>";
        return;
    }

    comunidadActiva.audios.forEach(audio => {
        const itemExt = document.createElement("div");
        itemExt.className = "audio-extended-item";
        itemExt.style = "background:white; padding:15px; border-radius:12px; border:1px solid #e2e8f0; display:flex; flex-direction:column; gap:8px;";
        itemExt.innerHTML = `
            <div class="voice-user-info">
                <img src="${audio.avatar}" alt="user">
                <div><strong>${audio.autor}</strong> <span style="font-size:11px; color:#94a3b8; font-weight:normal; margin-left:10px;">${audio.hora}</span></div>
            </div>
            ${generateAudioHTML(audio.duracion)}
        `;
        extendedContainer.appendChild(itemExt);

        const itemMini = document.createElement("div");
        itemMini.className = "audio-mini-item";
        itemMini.style = "display:flex; flex-direction:column; gap:4px;";
        itemMini.innerHTML = `
            <div class="voice-user-info"><img src="${audio.avatar}"> <span>${audio.autor} <small style="font-weight:normal; color:#94a3b8;">${audio.hora.split(',')[1] || audio.hora}</small></span></div>
            ${generateAudioHTML(audio.duracion)}
        `;
        miniContainer.appendChild(itemMini);
    });
}

function renderAvisos() {
    const extendedContainer = document.getElementById("avisosListExtended");
    const miniContainer = document.getElementById("avisosMiniContainer");
    
    extendedContainer.innerHTML = "";
    miniContainer.innerHTML = "";

    if (comunidadActiva.avisos.length === 0) {
        extendedContainer.innerHTML = "<p style='color:#64748b; font-size:13px; padding:10px;'>No hay avisos registrados.</p>";
        miniContainer.innerHTML = "<p style='color:#64748b; font-size:12px;'>Sin avisos activos.</p>";
        return;
    }

    comunidadActiva.avisos.forEach(aviso => {
        const cardHTML = `
            <div class="alert-card-custom">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div class="alert-card-content">
                    <h5>${aviso.titulo}</h5>
                    <p><strong>${aviso.entidad}:</strong> ${aviso.contenido}</p>
                    <small>${aviso.hora}</small>
                </div>
            </div>
        `;
        extendedContainer.innerHTML += cardHTML;
        miniContainer.innerHTML += cardHTML;
    });
}

function renderWidgetsLaterales() {
    document.getElementById("widgetImg").src = comunidadActiva.imagen;
    document.getElementById("widgetName").textContent = comunidadActiva.nombre;
    document.getElementById("widgetMembers").textContent = `${comunidadActiva.miembros} miembros`;
    document.getElementById("sharedLocationsCount").textContent = Math.floor(comunidadActiva.miembros / 18);
}

// ==========================================
// CAPTURA Y PROCESAMIENTO DE ARCHIVOS / IMÁGENES
// ==========================================
function initChatForm() {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("messageInput");
    const fileInput = document.getElementById("fileAttachment");
    const filePreview = document.getElementById("filePreview");

    fileInput.addEventListener("change", (e) => {
        if(e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // Si es imagen, creamos un Objeto URL local para poder visualizarla dinámicamente
            if (file.type.startsWith('image/')) {
                objetoUrlTemporal = URL.createObjectURL(file);
                archivoAdjuntoTemporal = objetoUrlTemporal;
                filePreview.textContent = `📷 Imagen: ${file.name}`;
            } else {
                objetoUrlTemporal = null;
                archivoAdjuntoTemporal = file.name;
                filePreview.textContent = `📎 Archivo: ${file.name}`;
            }
            filePreview.classList.remove("hidden");
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = input.value.trim();

        if (!texto && !archivoAdjuntoTemporal) return;

        // Comprobamos si lo capturado es una imagen analizando nuestra variable de control
        const esImagen = objetoUrlTemporal !== null;

        const nuevoMsg = {
            id: Date.now(),
            autor: "Tú",
            avatar: "",
            texto: texto,
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: "texto",
            propio: true,
            adjunto: archivoAdjuntoTemporal,
            esImagen: esImagen
        };

        comunidadActiva.mensajes.push(nuevoMsg);
        
        input.value = "";
        archivoAdjuntoTemporal = null;
        objetoUrlTemporal = null;
        fileInput.value = "";
        filePreview.classList.add("hidden");

        renderMensajes();
        renderListaComunidades(comunidadesData);
    });
}

// ==========================================
// BUSCADOR EN TIEMPO REAL
// ==========================================
function initSearch() {
    const searchInput = document.getElementById("chatSearch");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtrados = comunidadesData.filter(c => 
            c.nombre.toLowerCase().includes(query) || 
            c.mensajes.some(m => m.texto.toLowerCase().includes(query))
        );
        renderListaComunidades(filtrados);
    });
}

// ==========================================
// MAPA LEAFLET
// ==========================================
function initMapElement() {
    const container = document.getElementById("liveMap");
    if (!container) return;

    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }

    mapInstance = L.map('liveMap').setView(comunidadActiva.coordenadas, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    mapMarkers = [];
    const centro = comunidadActiva.coordenadas;
    
    const centralMarker = L.marker(centro).addTo(mapInstance)
        .bindPopup(`<b>Punto de Control: ${comunidadActiva.nombre}</b>`).openPopup();
    mapMarkers.push(centralMarker);

    for(let i=1; i<=3; i++) {
        const desvioLat = (Math.random() - 0.5) * 0.015;
        const desvioLng = (Math.random() - 0.5) * 0.015;
        const m = L.circleMarker([centro[0] + desvioLat, centro[1] + desvioLng], {
            radius: 8,
            fillColor: "#2a9d8f",
            color: "#fff",
            weight: 2,
            fillOpacity: 0.9
        }).addTo(mapInstance).bindPopup(`Vecino activo #${i} en línea`);
        mapMarkers.push(m);
    }
}

function initLocationButtons() {
    const shareAction = () => {
        alert("📍 Ubicación compartida con éxito con el grupo de rescate de la comunidad.");
        comunidadActiva.mensajes.push({
            id: Date.now(),
            autor: "Tú",
            avatar: "",
            texto: "📍 He compartido mi ubicación en vivo con el grupo.",
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: "texto",
            propio: true
        });
        renderMensajes();
    };

    document.getElementById("btnShareLocationMap").addEventListener("click", shareAction);
    document.getElementById("btnShareLocationSide").addEventListener("click", shareAction);
}