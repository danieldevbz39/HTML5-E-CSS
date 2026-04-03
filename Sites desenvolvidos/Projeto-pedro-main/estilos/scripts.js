const track = document.getElementById('carouselTrack');

const testimonialTrack = document.getElementById('testimonialTrack');

// Quantidade de pixels para rolar ao clicar
const scrollAmount = 300;

function initCarousel(trackElement, autoDelay) {
    if (!trackElement) return;

    function slide() {
        if (trackElement.scrollLeft + trackElement.clientWidth >= trackElement.scrollWidth - 10) {
            trackElement.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            trackElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    let timer = setInterval(slide, autoDelay);

    trackElement.addEventListener('mouseenter', () => clearInterval(timer));
    trackElement.addEventListener('mouseleave', () => { timer = setInterval(slide, autoDelay); });
}

initCarousel(track, 4000);
initCarousel(testimonialTrack, 4500);

// Novo depoimento
const addTestimonialBtn = document.getElementById('addTestimonialBtn');
addTestimonialBtn.addEventListener('click', () => {
    const name = document.getElementById('newTestimonialName');
    const text = document.getElementById('newTestimonialText');

    if (!name.value.trim() || !text.value.trim()) {
        alert('Por favor, preencha nome e comentário.');
        return;
    }

    const card = document.createElement('article');
    card.className = 'carousel-slide testimonial-card';
    card.innerHTML = `
        <div class="circle-photo"></div>
        <div class="circle-desc">
            <h3>${name.value.trim()}</h3>
            <p>"${text.value.trim()}"</p>
        </div>
    `;

    testimonialTrack.appendChild(card);

    name.value = '';
    text.value = '';
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