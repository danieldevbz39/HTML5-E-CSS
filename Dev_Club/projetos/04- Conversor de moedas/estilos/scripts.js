const convertButton = document.querySelector(".convert-button"); //campo de selção primeira moeda
const currencySelect = document.querySelector(".currency-select"); //campo de seleção segunda moeda

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert",
  ); // Valor em Real
  const currencyValueConverted = document.querySelector(".currency-value"); // Valor convertido

  console.log(currencySelect.value);
  const dolarToday = 5.12;
  const euroToday = 6.2;
  const libraToday = 6.81;
  const btcToday = 328487.71;

  const convertedValue = inputCurrencyValue / dolarToday;

  if (currencySelect.value == "dolar") { //se o select estiver selecionado o valor do dolar, entre aqui...
    currencyValueConverted.innerHTML = new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD"
    }).format(convertedValue);
  }

  if (currencySelect.value == "euro") { // Se o select estiver selecionado o valor de euro, entre aqui
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(inputCurrencyValue/euroToday)
  }

  if (currencySelect.value == "libra") {  // Se o select estiver selecionado o valor de libra, entre aqui
    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-Pt", {
      style: "currency",
      currency: "GBP"
    }).format(inputCurrencyValue/libraToday)
  }

  if (currencySelect.value == "btc") {  // Se o select estiver selecionado o valor de btc, entre aqui
    currencyValueConverted.innerHTML = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "BTC"
    }).format(inputCurrencyValue/btcToday)
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);

  console.log(convertedValue);
}

function changeCurrency(){
    const currencyName = document.getElementById("currency-name")
    const currencyimg = document.querySelector(".currency-img")

    if (currencySelect.value == "dolar"){
        currencyName.innerHTML = "Dólar americano"
        currencyimg.src = "./assets/dolar.png"
    }

    if (currencySelect.value == "euro"){
        currencyName.innerHTML = "Euro"
        currencyimg.src = "./assets/euro.png"
    }
    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues);
