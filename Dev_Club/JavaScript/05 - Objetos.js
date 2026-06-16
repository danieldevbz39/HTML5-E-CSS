
const name = "Daniel"
const age = 40
const address = "Rua Angelonia, 126"

const adriano = {
    name: "adriano",
    age: 60,
    address: "Rua Jabuticaba, 126"
}


const daniel = {
    name: "Daniel",
    age: 40,
    address: {
        street: "Rua Angelônia",
        number: 126,
        city: "Belo Horizonte",
        state: "MG",
        country: "Brasil"
    }
}

console.log(daniel, adriano)