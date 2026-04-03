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
});

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