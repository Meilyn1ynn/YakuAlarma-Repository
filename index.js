/**
 * YakuAlarma - Script de navegación móvil
 * Maneja el comportamiento del menú hamburguesa interactivo
 */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            // Alterna la clase active para la animación de las líneas a 'X'
            menuToggle.classList.toggle('active');
            // Alterna la clase active para mostrar u ocultar el menú lateral
            menu.classList.toggle('active');
        });

        // Cierra automáticamente el menú cuando el usuario hace clic en una sección (#)
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
});