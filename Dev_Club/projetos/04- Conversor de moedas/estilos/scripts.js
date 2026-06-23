const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert",
  ); // Valor em Real
  const currencyValueConverted = document.querySelector(".currency-value"); // Valor convertido

  console.log(currencySelect.value);
  const dolarToday = 5.2;
  const euroToday = 6.2;

  const convertedValue = inputCurrencyValue / dolarToday;

  if (currencySelect.value == "dolar") {
    // Se o select estiver selecionado o valor de dolar, entre aqui
    currencyValueConverted.innerHTML = new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD"
    }).format(convertedValue);
  }

  if (currencySelect.value == "euro") {
    // Se o select estiver selecionado o valor de dolar, entre aqui
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(inputCurrencyValue/euroToday)
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);

  console.log(convertedValue);
}

convertButton.addEventListener("click", convertValues);
