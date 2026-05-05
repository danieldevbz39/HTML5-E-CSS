const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  // Verifica se as senhas coincidem
  if (confirm_password.value !== '' && password.value !== confirm_password.value) {
    confirm_password.classList.add("invalid");
  } else {
    confirm_password.classList.remove("invalid");
  }

  // Verifica comprimento mínimo
  if (password.value.length > 0 && password.value.length < 8) {
    password.classList.add("invalid");
  } else if (password.value.length === 0) {
    password.classList.remove("invalid");
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
  var emailIsValid = validateEmailField();

  if (!emailIsValid) {
    e.preventDefault();
    return;
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

/* ===== VALIDAÇÃO DE CAMPOS COM BLUR ===== */

// Função genérica para validar campos de texto
function setupFieldValidation(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorElement = field.parentElement.querySelector('.error-msg-field');
    
    field.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.classList.add('input-error');
            if (errorElement) {
                errorElement.classList.add('show');
            }
        } else {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });

    // Também remove o erro ao digitar
    field.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });
}

// Função para validar email
function setupEmailValidation(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorElement = field.parentElement.querySelector('.error-msg-field');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    field.addEventListener('blur', function() {
        if (this.value.trim() === '' || !emailRegex.test(this.value)) {
            this.classList.add('input-error');
            if (errorElement) {
                errorElement.classList.add('show');
            }
        } else {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });

    // Remove o erro ao digitar
    field.addEventListener('input', function() {
        if (this.value.trim() !== '' && emailRegex.test(this.value)) {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateEmailField() {
    const field = document.getElementById('email');
    const errorElement = field.parentElement.querySelector('.error-msg-field');
    const valid = field && isValidEmail(field.value);

    if (!valid) {
        field.classList.add('input-error');
        if (errorElement) {
            errorElement.classList.add('show');
        }
    } else {
        field.classList.remove('input-error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    return valid;
}

// Função para validar telefone
function setupPhoneValidation(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorElement = field.parentElement.querySelector('.error-msg-field');
    
    field.addEventListener('blur', function() {
        // Remove caracteres não numéricos para validação
        const phoneNumbers = this.value.replace(/\D/g, '');
        
        if (this.value.trim() === '' || phoneNumbers.length < 10) {
            this.classList.add('input-error');
            if (errorElement) {
                errorElement.classList.add('show');
            }
        } else {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });

    // Remove o erro ao digitar
    field.addEventListener('input', function() {
        const phoneNumbers = this.value.replace(/\D/g, '');
        if (this.value.trim() !== '' && phoneNumbers.length >= 10) {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });
}

// Função para validar select (país/região)
function setupSelectValidation(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorElement = field.parentElement.parentElement.querySelector('.error-msg-field');
    
    field.addEventListener('blur', function() {
        if (this.value === '' || this.value === null) {
            this.classList.add('input-error');
            if (errorElement) {
                errorElement.classList.add('show');
            }
        } else {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });

    // Remove o erro ao mudar
    field.addEventListener('change', function() {
        if (this.value !== '' && this.value !== null) {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });
}

// Função para validar campo de senha
function setupPasswordValidation(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorElement = field.closest('.input-container').querySelector('.error-msg-field');
    
    field.addEventListener('blur', function() {
        if (fieldId === 'password') {
            // Validar comprimento mínimo de 8 caracteres
            if (this.value.trim() === '') {
                this.classList.add('input-error');
                if (errorElement) {
                    errorElement.classList.add('show');
                }
            } else if (this.value.length < 8) {
                this.classList.add('input-error');
                if (errorElement) {
                    errorElement.classList.add('show');
                }
            } else {
                this.classList.remove('input-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        } else if (fieldId === 'confirm_password') {
            // Validar se as senhas coincidem
            if (this.value.trim() === '') {
                this.classList.add('input-error');
                if (errorElement) {
                    errorElement.classList.add('show');
                }
            } else if (this.value !== document.getElementById('password').value) {
                this.classList.add('input-error');
                if (errorElement) {
                    errorElement.classList.add('show');
                }
            } else {
                this.classList.remove('input-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        }
    });

    // Remove o erro ao digitar
    field.addEventListener('input', function() {
        if (fieldId === 'password') {
            if (this.value.length >= 8) {
                this.classList.remove('input-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        } else if (fieldId === 'confirm_password') {
            if (this.value !== '' && this.value === document.getElementById('password').value) {
                this.classList.remove('input-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    setupFieldValidation('nome', 'Insira o seu nome.');
    setupFieldValidation('sobrenome', 'Insira o seu sobrenome.');
    setupSelectValidation('country-list');
    setupEmailValidation('email');
    setupPhoneValidation('telefone');
    setupDateFieldValidation('day', 'Dia');
    setupDateFieldValidation('month', 'Mês');
    setupDateFieldValidation('year', 'Ano');
    setupPasswordValidation('password', 'A senha deve ter pelo menos 8 caracteres.');
    setupPasswordValidation('confirm_password', 'As senhas não coincidem.');
});

// Função para validar campos de data individualmente
function setupDateFieldValidation(fieldId, label) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const wrapper = field.closest('.date-field-wrapper');
    const errorElement = wrapper ? wrapper.querySelector('.error-msg-field') : null;
    
    field.addEventListener('blur', function() {
        if (this.value === '' || this.value === null) {
            this.classList.add('input-error');
            if (errorElement) {
                errorElement.classList.add('show');
            }
        } else {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });

    // Remove o erro ao mudar
    field.addEventListener('change', function() {
        if (this.value !== '' && this.value !== null) {
            this.classList.remove('input-error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    });
}