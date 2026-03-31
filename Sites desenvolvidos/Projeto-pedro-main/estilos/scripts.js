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
