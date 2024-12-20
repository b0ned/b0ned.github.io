const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'icecream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'icecream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
]

cardArray.sort(() => 0.5 - Math.random()) 

const resultDisplay = document.querySelector('#result')
const gridDisplay = document.querySelector('#grid')

let cardsChosen = []
let cardsChosenID = []
const cardsMatch = []


function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
       const card = document.createElement('img')
       card.setAttribute('src', 'images/blank.png')
       card.setAttribute('data-id', i)
       card.addEventListener('click', cardFlip)
       gridDisplay.append(card)
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenID[0]
    const optionTwoId = cardsChosenID[1]
    console.log(cards)

    if (optionOneId == optionTwoId ) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('you selected the same square')
        
    } else if (cardsChosen[0] == cardsChosen[1]) {
        alert('You have found a match')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', cardFlip)
        cards[optionTwoId].removeEventListener('click', cardFlip)
        cardsMatch.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('sorry try again')
    }

    resultDisplay.textContent = cardsMatch.length
    cardsChosen = []
    cardsChosenID = []

    if (cardsMatch.length == (cardArray.length/2)) {
        resultDisplay.textContent = 'Congratulations! You win'
    }
}

function cardFlip() {
    const cardId = this.getAttribute('data-id')
    console.log(cardId)
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenID.push(cardId)
    console.log(cardsChosenID)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500)
    }
}0







