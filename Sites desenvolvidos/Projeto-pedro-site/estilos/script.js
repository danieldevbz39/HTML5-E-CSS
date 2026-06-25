document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Enviado!';
            submitButton.disabled = true;
            setTimeout(() => {
                submitButton.textContent = 'Enviar minha inscrição';
                submitButton.disabled = false;
                form.reset();
            }, 1500);
        });
    }

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.35;
    }
});