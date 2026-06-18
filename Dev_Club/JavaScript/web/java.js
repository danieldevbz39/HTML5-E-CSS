/* Document -> HTML
    getElementById -> Trás um elemento pelo Id
    getElementByClassName-> Trás todos os elementos com essa classe
    getElementByTagName -> Trás todos os elementos com essa tag
    getElementByName -> Trás todos os elementos com esse name

    querySelector -> Trás um elemento, o primeiro que encontrar
    querySelectorAll -> Trás todos os elementos que encontrar
*/

const input = document.getElementById("main-input")
const elements = document.getElementsByClassName("paragraph-js")
const element = document.getElementsByTagName("h1")
const elementn = document.getElementsByName("nome-completo")

const elementsp = document.querySelector(".paragraph-js")
const elementtodos = document.querySelectorAll("pargraph-js")

console.log(input, elements,element,elementn,elementsp)