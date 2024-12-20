const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    console.log(userChoice + ': user choice')
    generateComputerChoice()
    
}))




function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length);
    // console.log(`${randomNumber}`);
    optionSelect();

    function optionSelect() {
        const options = ['rock', 'paper', 'scissors'];
        computerChoice = options[randomNumber];
        console.log(computerChoice + ': comp choice');
        computerChoiceDisplay.innerHTML = computerChoice;
    
        resultOfClash()
    }
}

let computerChoice

function resultOfClash() {
    if (computerChoice === userChoice) {
        result = 'Tie';
        console.log('tie');

    } else if ( computerChoice === 'rock' && userChoice == 'paper') {
        result = 'Player wins';
        console.log('player wins');

    } else if ( computerChoice === 'rock' && userChoice === "scissors") {
        result = 'Computer wins';
        console.log('comp wins');

    } else if ( computerChoice === 'paper' && userChoice === "scissors") {
        result = 'Player wins';
        console.log('player wins');

    } else if ( computerChoice === 'paper' && userChoice === "rock") {
        result = 'Computer wins';
        console.log('comp wins');
        
    } else if ( computerChoice === 'scissors' && userChoice === "rock") {
        result = 'player wins';
        console.log('player wins');
        
    } else if ( computerChoice === 'scissors' && userChoice === "paper") {
        result = 'Computer wins';
        console.log('comp wins');
        
    } 
    resultDisplay.innerHTML = result;
}

console.log('answering');

