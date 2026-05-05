const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

function validatePassword() {
    // Verifica se as senhas coincidem
    if (password.value !== confirm_password.value) {
        confirm_password.classList.add('invalid');
    } else {
        confirm_password.classList.remove('invalid');
    }
    
    // Verifica comprimento mínimo
    if (password.value.length < 8) {
        password.classList.add('invalid');
    } else {
        password.classList.remove('invalid');
    }
}

// Executa a função sempre que o usuário digita algo
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;