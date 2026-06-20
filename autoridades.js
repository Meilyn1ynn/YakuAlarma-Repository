const track = document.querySelector(".slider-track");
const dots = document.querySelectorAll(".dot");

let currentPage = 0;

function moveSlider(index){

    const cardsPerPage = 2;

    const card = document.querySelector(".card");

    const gap = 30;

    const pageWidth =
        (card.offsetWidth * cardsPerPage) +
        gap;

    track.style.transform =
        `translateX(-${pageWidth * index}px)`;

    dots.forEach(dot => dot.classList.remove("active"));

    dots[index].classList.add("active");

    currentPage = index;
}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{
        moveSlider(index);
    });

});

setInterval(()=>{

    currentPage++;

    if(currentPage >= dots.length){
        currentPage = 0;
    }

    moveSlider(currentPage);

},5000);