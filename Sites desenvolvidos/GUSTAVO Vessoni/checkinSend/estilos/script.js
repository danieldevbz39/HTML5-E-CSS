const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    const lines = document.querySelectorAll('.line');
    if (mobileMenu.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        lines[1].style.transform = 'rotate(-45deg) translate(0px, 0px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.transform = 'none';
    }
});

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const continueButton = document.querySelector('.btn-continue');
const emailError = document.getElementById('email-error');
const passError = document.getElementById('pass-error');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const valid = emailRegex.test(emailValue);

    if (!valid && emailValue.length > 0) {
        emailInput.classList.add('input-error');
        emailError.style.display = 'block';
    } else {
        emailInput.classList.remove('input-error');
        emailError.style.display = 'none';
    }

    return valid;
}

function validatePassword() {
    const passwordValue = passwordInput.value;
    const valid = passwordValue.length >= 6;

    if (!valid && passwordValue.length > 0) {
        passwordInput.classList.add('input-error');
        passError.style.display = 'block';
    } else {
        passwordInput.classList.remove('input-error');
        passError.style.display = 'none';
    }

    return valid;
}

function updateContinueButton() {
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    continueButton.disabled = !(emailValid && passwordValid);
}

emailInput.addEventListener('input', updateContinueButton);
passwordInput.addEventListener('input', updateContinueButton);

loginForm.addEventListener('submit', event => {
    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    if (!emailValid || !passwordValid) {
        event.preventDefault();
    }
});
