// ==========================================
// RECUPERACIÓN DE CONTRASEÑA YAKUALARMA
// ==========================================

const recoveryForm = document.getElementById("recoveryForm");
const emailInput = document.getElementById("email");

// Validación del formato de correo electrónico
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Manejador del Formulario
recoveryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Validar campo vacío
    if (!email) {
        mostrarError("Por favor, ingresa tu correo electrónico.");
        return;
    }

    // Validar formato real
    if (!validarEmail(email)) {
        mostrarError("El correo electrónico no tiene un formato válido.");
        return;
    }

    // --- Simulación de Envío Exitoso ---
    mostrarExito("¡Enlace enviado! Revisa tu bandeja de entrada.");

    // Opcional: Limpiar el campo tras enviar
    emailInput.value = "";

    // Redireccionar al login después de unos segundos si lo deseas
    /*
    setTimeout(() => {
        window.location.href = "login.html";
    }, 3000);
    */
});

// ==========================================
// Funciones para Mensajes en Pantalla
// ==========================================
function mostrarError(mensaje) {
    const box = document.getElementById("mensaje");
    box.textContent = mensaje;
    box.style.color = "#d9534f";
    box.style.opacity = "1";

    setTimeout(() => (box.style.opacity = "0"), 4000);
}

function mostrarExito(mensaje) {
    const box = document.getElementById("mensaje");
    box.textContent = mensaje;
    box.style.color = "#2e7d32";
    box.style.opacity = "1";

    setTimeout(() => (box.style.opacity = "0"), 4000);
}