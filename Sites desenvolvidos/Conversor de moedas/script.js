// Pega o campo de entrada do valor
const amountInput = document.getElementById('amount'); 

// Pega o menu de seleção da moeda de origem
const fromSelect = document.getElementById('fromCurrency'); 

// Pega o menu de seleção da moeda de destino
const toSelect = document.getElementById('toCurrency'); 

// Pega o botão de conversão
const convertBtn = document.getElementById('convertBtn'); 

// Pega o elemento onde o resultado será exibido
const resultText = document.getElementById('result'); 

// Cria a função assíncrona que faz a conversão
async function convertCurrency() { 

  // Converte o valor digitado de texto para número decimal
  const amount = parseFloat(amountInput.value); 

  // Pega a moeda selecionada na origem (ex: "USD")
  const from = fromSelect.value; 

  // Pega a moeda selecionada no destino (ex: "BRL")
  const to = toSelect.value; 

  // Verifica se o valor não é um número ou é menor/igual a zero
  if (isNaN(amount) || amount <= 0) { 

    // Exibe mensagem de erro na tela
    resultText.innerText = 'Digite um valor válido.'; 

    // Para a execução da função aqui
    return; 
  }

  // Verifica se a moeda de origem é igual à de destino
  if (from === to) { 

    // Exibe o mesmo valor sem precisar consultar a API
    resultText.innerText = `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`; 

    // Para a execução da função aqui
    return; 
  }

  // Exibe mensagem temporária enquanto busca os dados
  resultText.innerText = 'Buscando cotação...'; 

  // Tenta executar o bloco de código de busca da API
  try { 

    // Faz a requisição para a API de cotação e aguarda a resposta
    const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-${to}`); 

    // Converte a resposta recebida para o formato JSON
    const data = await response.json(); 

    // Monta a chave de busca do objeto (ex: "USDBRL")
    const key = `${from}${to}`; 
    
    // Verifica se os dados da cotação existem na resposta
    if (data[key]) { 

      // Pega o valor da cotação e converte para número
      const rate = parseFloat(data[key].bid); 

      // Multiplica o valor digitado pela taxa de câmbio
      const convertedValue = amount * rate; 
      
      // Formata o valor calculado no padrão monetário do país de destino
      const formattedResult = convertedValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: to
      });

      // Exibe o resultado final formatado na tela
      resultText.innerText = `${amount} ${from} = ${formattedResult}`; 

    // Caso a API não encontre aquele par de moedas
    } else { 

      // Exibe mensagem informando que o par não foi encontrado
      resultText.innerText = 'Par de moedas não encontrado.'; 
    }

  // Captura qualquer erro de rede ou de requisição
  } catch (error) { 

    // Exibe mensagem de erro genérica na tela
    resultText.innerText = 'Erro ao consultar a cotação.'; 

    // Mostra o erro detalhado no console do navegador para depuração
    console.error('Erro na requisição:', error); 
  }
}

// Adiciona o ouvinte para disparar a função convertCurrency ao clicar no botão
convertBtn.addEventListener('click', convertCurrency);