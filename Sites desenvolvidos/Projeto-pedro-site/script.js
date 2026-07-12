const menuButton = document.querySelector('.mobile-toggle');
const navigation = document.querySelector('.site-nav');
const modalBackdrop = document.querySelector('.modal-backdrop');
const bookingButtons = document.querySelectorAll('[data-book]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const bookingForm = document.querySelector('#booking-form');
const dayField = document.querySelector('#day');
const timeField = document.querySelector('#time');
const pillButtons = document.querySelectorAll('.pill-btn');
const methodologyTitle = document.querySelector('#methodology-title');
const methodologyDescription = document.querySelector('#methodology-description');
const methodologyImage = document.querySelector('#methodology-image');
const tabButtons = document.querySelectorAll('.tab-btn');
const scheduleHighlight = document.querySelector('#schedule-highlight');

menuButton?.addEventListener('click', () => {
  navigation?.classList.toggle('active');
});

bookingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const day = button.dataset.day || '';
    const time = button.dataset.time || '';
    if (dayField) dayField.value = day;
    if (timeField) timeField.value = time;
    modalBackdrop?.classList.add('active');
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modalBackdrop?.classList.remove('active');
    bookingForm?.reset();
  });
});

modalBackdrop?.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) {
    modalBackdrop.classList.remove('active');
    bookingForm?.reset();
  }
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = bookingForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = 'Mensagem enviada!';
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = 'Enviar mensagem';
      submitButton.disabled = false;
      modalBackdrop?.classList.remove('active');
      bookingForm.reset();
    }, 1400);
  }
});

pillButtons.forEach((button) => {
  button.addEventListener('click', () => {
    pillButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    if (methodologyTitle) methodologyTitle.textContent = button.dataset.title || '';
    if (methodologyDescription) methodologyDescription.textContent = button.dataset.description || '';
    if (methodologyImage) methodologyImage.src = button.dataset.image || '';
  });
});

const scheduleContent = {
  Infantil: {
    title: 'Infantil (5 a 10 anos)',
    text: 'Foco na coordenação, disciplina lúdica e socialização através dos princípios marciais.',
  },
  Adolescentes: {
    title: 'Adolescentes (11 a 15 anos)',
    text: 'Desenvolvimento do condicionamento físico, postura, foco nos estudos e respeito mútuo.',
  },
  'Alto Rendimento': {
    title: 'Alto Rendimento (Atletas e Competidores)',
    text: 'Preparação técnica e tática extrema para campeonatos oficiais, sparring de nível olímpico e alta intensidade.',
  },
  Adultos: {
    title: 'Adultos (16+ anos)',
    text: 'Defesa pessoal avançada, alívio do estresse diário, queima calórica intensa e condicionamento de elite.',
  },
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const content = scheduleContent[button.dataset.category] || scheduleContent.Adultos;
    if (scheduleHighlight) {
      scheduleHighlight.innerHTML = `
        <div>
          <span class="section-label">FAIXA ETÁRIA / PÚBLICO</span>
          <h3>${content.title}</h3>
          <p>${content.text}</p>
        </div>
        <span class="schedule-badge">1 Aula Experimental Grátis</span>
      `;
    }
  });
});
