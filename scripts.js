//Definindo valor cotação moedas
const USD = 5.63
const EUR = 6.32
const GBP = 6.88

//Obtendo os elementos do HTML
const form = document.querySelector ("form")
const amount = document.getElementById("amount")
const curreny = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//Permitir inserir apenas números: Manipulando o input amount para registrar somente os numeros digitados.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g 
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Capturando o evento "submit" (enviar) do formulário 
form.onsubmit = (event) => {
    event.preventDefault()
    
    switch(curreny.value){
        case "USD": convertCurrency(amount.value, USD,"US$")
        break
        case "EUR": convertCurrency(amount.value, EUR,"€")
        break
        case "GBP": convertCurrency(amount.value, GBP,"£")
    }

}

//Função para converter a moeda
function convertCurrency (amount, price, symbol) {
    try {
        //Exibindo a cotação da moeda
        description.textContent=`${symbol}1 = ${formatCurrencyBRL(price)}`
        
        //Aplica a classe que exibe o footer para mostrar o resutlado. a "show-result" está no arquivo CSS
        footer.classList.add("show-result")

        //Calcula o total
        let total = amount * price

        //Verifica se o valor é um numero
        if (isNaN(total)) {
            return alert("Por favor, digite apenas números")
        }

        //Formatar valor total
        total = formatCurrencyBRL(total)

        //Exibe o resultado total
        result.textContent = `${total}`

    } catch (error) {
        //Remove a classe do footer quando existe um erro na conversão.
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possível converter.")
    }

}


// Formata a moeda em Real Brasileiro. 
function formatCurrencyBRL(value) {
    //Converte pra numero para poder usar o toLocaleString para formatar no padrão pt-BR R$)
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

