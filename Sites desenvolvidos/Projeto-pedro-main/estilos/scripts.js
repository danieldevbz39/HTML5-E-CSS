const contactForm = document.getElementById('contactForm');

function showToast(message) {
    if (!message) return;
    window.alert(message);
}

function validateForm(formData) {
    if (!formData.nome.trim()) return 'O nome é obrigatório.';
    if (!formData.email.trim()) return 'O e-mail é obrigatório.';
    if (!formData.telefone.trim()) return 'O telefone é obrigatório.';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return 'Digite um e-mail válido.';

    return '';
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        mensagem: document.getElementById('mensagem').value
    };

    const errorMessage = validateForm(formData);
    if (errorMessage) {
        showToast(errorMessage);
        return;
    }

    showToast('Mensagem enviada com sucesso! Obrigado, ' + formData.nome + '. Em breve entraremos em contato.');
    contactForm.reset();
}

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

const carouselTrack = document.getElementById('carouselTrack');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let currentIndex = 0;
let carouselTimer = null;

function updateCarousel(index) {
    if (!carouselTrack || slides.length === 0) return;
    const normalizedIndex = ((index % slides.length) + slides.length) % slides.length;
    currentIndex = normalizedIndex;
    const translateX = normalizedIndex * -25;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
}

function nextCarousel() {
    updateCarousel(currentIndex + 1);
}

function prevCarousel() {
    updateCarousel(currentIndex - 1);
}

function startCarouselAuto() {
    carouselTimer = setInterval(nextCarousel, 5500);
}

function stopCarouselAuto() {
    if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
}

if (prevSlide && nextSlide && carouselTrack) {
    prevSlide.addEventListener('click', () => { prevCarousel(); stopCarouselAuto(); startCarouselAuto(); });
    nextSlide.addEventListener('click', () => { nextCarousel(); stopCarouselAuto(); startCarouselAuto(); });
    carouselTrack.addEventListener('mouseenter', stopCarouselAuto);
    carouselTrack.addEventListener('mouseleave', startCarouselAuto);
    startCarouselAuto();
}

