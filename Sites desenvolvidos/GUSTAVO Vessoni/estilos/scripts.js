const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  // Verifica se as senhas coincidem
  if (password.value !== confirm_password.value) {
    confirm_password.classList.add("invalid");
  } else {
    confirm_password.classList.remove("invalid");
  }

  // Verifica comprimento mínimo
  if (password.value.length < 8) {
    password.classList.add("invalid");
  } else {
    password.classList.remove("invalid");
  }
}

// Executa a função sempre que o usuário digita algo
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

let currentCaptcha = "";

function generateCaptcha() {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptcha = code;
  document.getElementById("captcha-display").innerText = code;
}

// Chamar a função ao carregar a página
window.onload = generateCaptcha;

// Exemplo de validação no envio do formulário
function validateForm(event) {
  const userInput = document.getElementById("captcha-input").value;
  if (userInput !== currentCaptcha) {
    event.preventDefault(); // Impede o envio
    document.getElementById("captcha-error").style.display = "block";
    generateCaptcha(); // Gera um novo para segurança
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", function (e) {
  var response = grecaptcha.getResponse();

  if (response.length == 0) {
    // reCAPTCHA não foi clicado
    e.preventDefault();
    alert("Por favor, verifique o reCAPTCHA antes de enviar.");
  }
});

async function carregarPaises() {
    const select = document.getElementById('country-list');
    
    try {
        // Busca todos os países da API mundial
        const response = await fetch('https://restcountries.com/v3.1/all?fields=translations');
        const data = await response.json();

        // Extrai o nome em português e ordena alfabeticamente
        const paises = data
            .map(p => p.translations.por.common)
            .sort((a, b) => a.localeCompare(b));

        // Adiciona cada país ao select
        paises.forEach(nome => {
            const option = document.createElement('option');
            option.value = nome;
            option.textContent = nome;
            if (nome === "Brasil") option.selected = true; // Mantém Brasil como padrão
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao carregar lista de países:", error);
    }
}

carregarPaises();

const daySelect = document.getElementById('day');
const yearSelect = document.getElementById('year');
const dateInputs = document.querySelectorAll('.date-input');
const errorMsg = document.getElementById('date-error-msg');

// Preencher Dias (1-31)
for (let i = 1; i <= 31; i++) {
    daySelect.add(new Option(i, i));
}

// Preencher Anos (do atual até 100 anos atrás)
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= currentYear - 100; i--) {
    yearSelect.add(new Option(i, i));
}

function validarData() {
    const d = parseInt(daySelect.value);
    const m = parseInt(document.getElementById('month').value);
    const y = parseInt(yearSelect.value);

    if (d && m && y) {
        // Verifica se a data é válida (ex: 31 de abril não existe)
        const data = new Date(y, m - 1, d);
        const dataValida = data.getFullYear() === y && data.getMonth() === m - 1 && data.getDate() === d;

        if (!dataValida) {
            exibirErro(true);
        } else {
            exibirErro(false);
        }
    }
}

function exibirErro(show) {
    dateInputs.forEach(input => {
        show ? input.classList.add('invalid') : input.classList.remove('invalid');
    });
    errorMsg.style.display = show ? 'flex' : 'none';
}

// Escuta mudanças nos campos
dateInputs.forEach(input => input.addEventListener('change', validarData));