const randomquote = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('textDisplay')
const quoteInputElement = document.getElementById('textInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () =>{
const arrayQuote = quoteDisplayElement.querySelectorAll('span')
const arrayValue = quoteInputElement.value.split('')

let correct = true
arrayQuote.forEach((CharacterSpan, index) => {
    const character = arrayValue[index]

    if (character == null) {
        CharacterSpan.classList.remove('correct')
        CharacterSpan.classList.remove('incorrect')
        correct = false
    }
    
    else if (character === CharacterSpan.innerText) {
        CharacterSpan.classList.add('correct')
        CharacterSpan.classList.remove('incorrect')
    } else {
        CharacterSpan.classList.remove('correct')
        CharacterSpan.classList.add('incorrect')
        correct = false 
    }
    })

    if (correct) renderNewQuote()
})

function getRandomQuote() {
   return fetch(randomquote)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ""
   quote.split("").forEach(character => {
       const CharacterSpan = document.createElement('span')
       CharacterSpan.innerText = character
       quoteDisplayElement.appendChild(CharacterSpan)

   });
    quoteInputElement.value = null
    startTimer()

}
let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}
function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()