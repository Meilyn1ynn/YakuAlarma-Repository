const track = document.querySelector(".slider-track");
const dots = document.querySelectorAll(".dot");

let currentPage = 0;

// Función para mover el carrusel
function moveSlider(index){

    const card = document.querySelector(".card-contacto");

    // ancho de una tarjeta + gap
    const cardWidth = card.offsetWidth;
    const gap = 30;

    // 2 tarjetas por página
    const pageWidth = (cardWidth * 2) + gap;

    track.style.transform = `translateX(-${pageWidth * index}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentPage = index;
}

// Click en los puntos
dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        moveSlider(index);
    });

});

// Cambio automático cada 5 segundos
setInterval(() => {

    currentPage++;

    if(currentPage >= dots.length){
        currentPage = 0;
    }

    moveSlider(currentPage);

}, 5000);

// Ajustar al redimensionar la ventana
window.addEventListener("resize", () => {
    moveSlider(currentPage);
});