const amountInput = document.querySelector('#amount') //Values
const fromSelect = document.querySelector('fromCurrency')//De...
const toSelect = document.querySelector('toCurrency')//Para...
const convertBtn = document.querySelector('#convertBtn') //Botão
const resultText = document.querySelector('result')//Resutado 

    function convertValues (){
        const amountInput = document.querySelector('#amount').value
        console.log(amountInput)
    }


convertBtn.addEventListener('click', convertValues)