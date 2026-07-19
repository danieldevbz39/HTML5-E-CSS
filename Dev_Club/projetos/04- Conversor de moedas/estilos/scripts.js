//----------------------- selecionando botão e convertendo click --------------------

//console.log("oi") //testando js

// const convertButton = document.querySelector(".convert-button") //selecionando botão

// console.log(convertButton)

// const convertButton = document.querySelector(".convert-button"); //adicionando ouvinte de eventos

// function convertValues() {// criando função
//   console.log ("Oi")
// }

// convertButton.addEventListener("click", convertValues); //chamando função por click

// //----------------------- Pegando valores dos campos  --------------------

// const convertButton = document.querySelector(".convert-button");

// function convertValues() {// criando função
//   const inputCurrencyValue = document.querySelector(".input-currency").value //pegando valor
//   console.log(inputCurrencyValue) // exibindo valor
// }

// convertButton.addEventListener("click", convertValues); //convertendo click e valor

// //----------------------- Convertendo valores dos campos  --------------------


// const convertButton = document.querySelector(".convert-button");

// function convertValues() {// criando função
//   const inputCurrencyValue = document.querySelector(".input-currency").value
//   const currencyValueToConvert = document.querySelector(".currency-value-to-convert") //valor em real
//   const currencyValueConverted = document.querySelector(".currency-value") //outras moedas


//   const dolarToday = 5.2

//   const convertedValue = inputCurrencyValue / dolarToday

//   currencyValueToConvert.innerHTML = inputCurrencyValue //pegando valor convertido
//   currencyValueConverted.innerHTML = convertedValue //convertendo em OUTRA MOEDA
// }

// convertButton.addEventListener("click", convertValues) //convertendo click e valor


//-------------------------------------- Formatando valor convertido ---------------------------------------------------


const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

function convertValues() {// criando função
  const inputCurrencyValue = document.querySelector(".input-currency").value
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert") //valor em real
  const currencyValueConverted = document.querySelector(".currency-value") //outras moedas

  const dolarToday = 5.2
  const euroToday = 5.87
  const libraToday = 6.87
  const btcToday = 329816.83

  if (currencySelect.value == "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(inputCurrencyValue / dolarToday)  //convertendo em OUTRA MOEDA
  }

  if (currencySelect.value == "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(inputCurrencyValue / euroToday)  //convertendo em OUTRA MOEDA
  }

  if (currencySelect.value == "libra") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("uk-UK", {
      style: "currency",
      currency: "GBP"
    }).format(inputCurrencyValue / libraToday)
  }

  if (currencySelect.value == "btc") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("pp-PP", {
      style: "currency",
      currency: "BTC"
    }).format(inputCurrencyValue / btcToday)
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(inputCurrencyValue) //pegando valor convertido

  currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(convertedValue)  //convertendo em OUTRA MOEDA
}

convertButton.addEventListener("click", convertValues) //convertendo click e valor


