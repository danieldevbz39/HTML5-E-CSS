const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

// Quantidade de pixels para rolar ao clicar
const scrollAmount = 300;

nextBtn.addEventListener('click', () => {
    track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    track.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
    resetCarouselTimer();
});

// Autoplay do carrossel
let carouselTimer = setInterval(autoSlide, 4000);

function autoSlide() {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

function resetCarouselTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(autoSlide, 4000);
}

track.addEventListener('mouseenter', () => clearInterval(carouselTimer));
track.addEventListener('mouseleave', () => resetCarouselTimer());

// Validação básica do formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    const nome = document.getElementById('nome').value;
    if(nome === "") {
        e.preventDefault();
        alert("Por favor, preencha seu nome.");
    } else {
        alert("Obrigado, " + nome + "! Entraremos em contato.");
    }
});