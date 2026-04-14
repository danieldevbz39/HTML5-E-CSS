/* --- CONTROLE DOS CARROSSEIS --- */
const track = document.getElementById('carouselTrack');
const testimonialTrack = document.getElementById('testimonialTrack');

// Ajusta a quantidade de scroll baseado na largura da tela
const getScrollAmount = () => window.innerWidth < 768 ? 250 : 300;

function initCarousel(trackElement, autoDelay) {
    if (!trackElement) return;

    function slide() {
        // Se estiver no final, volta ao início, senão rola para a direita
        if (trackElement.scrollLeft + trackElement.clientWidth >= trackElement.scrollWidth - 10) {
            trackElement.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            trackElement.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    }

    let timer = setInterval(slide, autoDelay);

    // Pausa o auto-play quando o usuário interage
    trackElement.addEventListener('mouseenter', () => clearInterval(timer));
    trackElement.addEventListener('mouseleave', () => { 
        timer = setInterval(slide, autoDelay); 
    });
}

initCarousel(track, 4000);
initCarousel(testimonialTrack, 4500);

/* --- MENU MOBILE (HAMBURGUER) --- */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Muda o ícone de ☰ para X quando aberto
        menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// Fecha o menu ao clicar em qualquer link (importante para UX mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if(menuToggle) menuToggle.textContent = '☰';
    });
});

/* --- NOVO DEPOIMENTO --- */
const addTestimonialBtn = document.getElementById('addTestimonialBtn');
if (addTestimonialBtn) {
    addTestimonialBtn.addEventListener('click', () => {
        const name = document.getElementById('newTestimonialName');
        const text = document.getElementById('newTestimonialText');
        const photoInput = document.getElementById('newTestimonialPhoto');

        if (!name.value.trim() || !text.value.trim()) {
            alert('Por favor, preencha nome e comentário.');
            return;
        }

        const card = document.createElement('article');
        card.className = 'carousel-slide testimonial-card';

        const photoDiv = document.createElement('div');
        photoDiv.className = 'circle-photo';

        const addCard = () => {
            card.innerHTML = '';
            card.appendChild(photoDiv);
            card.innerHTML += `
                <div class="circle-desc">
                    <h3>${name.value.trim()}</h3>
                    <p>"${text.value.trim()}"</p>
                </div>
            `;
            testimonialTrack.appendChild(card);
            
            // Limpa os campos
            name.value = '';
            text.value = '';
            photoInput.value = '';
        };

        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoDiv.style.backgroundImage = `url('${e.target.result}')`;
                addCard();
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            photoDiv.classList.add('pedro'); // Foto padrão
            addCard();
        }
    });
}

/* --- VALIDAÇÃO DO FORMULÁRIO --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const nome = document.getElementById('nome').value;
        if(nome.trim() === "") {
            e.preventDefault();
            alert("Por favor, preencha seu nome.");
        } else {
            alert(`Obrigado, ${nome}! Entraremos em contato em breve.`);
        }
    });
}