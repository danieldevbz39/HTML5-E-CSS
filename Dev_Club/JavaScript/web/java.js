/* Document -> HTML
    getElementById -> Trás um elemento pelo Id
    getElementByClassName-> Trás todos os elementos com essa classe
    getElementByTagName -> Trás todos os elementos com essa tag
    getElementByName -> Trás todos os elementos com esse name

    querySelector -> Trás um elemento, o primeiro que encontrar
    querySelectorAll -> Trás todos os elementos que encontrar
*/

// const input = document.getElementById("main-input")
// const elements = document.getElementsByClassName("paragraph-js")
// const element = document.getElementsByTagName("h1")
// const elementn = document.getElementsByName("nome-completo")

//-----------------------------------_-_--------------------------

// const elementsp = document.querySelector(".paragraph-js")
// const elementtodos = document.querySelectorAll("pargraph-js")

// const element = document.querySelector("#main-input") // criando um elemento

// element.value = "Digite aqui!" //adicinando valor no campo
// console.log(element.placeholder) //exibindo no console

//-------------------------------_-_--------------------------------

// Alterando e acessndo textos

//textContent -> Pega todo conteúdo
//innerText -> Pega apenas o texto
//innerHTML -> Permite adicionar HTML e texto

// const element = document.querySelector(".paragraph-js")


// // element.innerText = "Novo texto"  // alterando texto
// console.log(element.textContent) // Só html
// console.log(element.innerText) // Leva em conta o css
// console.log(element.innweHTML) // Trás tudo

//-------------------------------_-_--------------------------------

// const button = document.querySelector(".main-button")

// button.style.color = "white" //trocando cor
// button.style.backgroundColor = "red" //alterrando cor do fundo botão


//-------------------------------_-_--------------------------------

// EVENTOS - Funções

// const input = document.querySelector("#main-input")

// function cliqueiNoBotao(){
//     alert("Botão clicado com sucesso!")
// }

// function digiteiNoInput(){
//     console.log(input.value)
// }

const input = document.querySelector("#main-input")

function cliqueiNoBotao(){
    console.log(input.value)
}

function digiteiNoInput(){
    console.log("Digitei no input")
}