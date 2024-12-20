// Game variables
const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
let timerId 
let outcomeTimerId 
let currentTime = 20

//Car variables
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

//Log variables
const logLeft = document.querySelectorAll('.log-left')
const logRight = document.querySelectorAll('.log-right')

//Frog variables
let currentFrogIndex = 76


// logic for controlling frog and defining usable game space
function moveFrog(e) {
    // removes frog from previous position before adding to new position
    squares[currentFrogIndex].classList.remove('frog')

    switch(e.key) {
        case 'a' : 
            if (currentFrogIndex % 9 !== 0)
            currentFrogIndex -= 1
            break
        case 'd' :
            if (currentFrogIndex % 9 < 9 - 1) 
            currentFrogIndex += 1
            break
        case 'w' : 
            if (currentFrogIndex - 9 >= 0)
            currentFrogIndex -= 9
            break
        case 's' :
            if (currentFrogIndex + 9 < 9 * 9 )
            currentFrogIndex += 9
            break
    }

    squares[currentFrogIndex].classList.add('frog') 
    youWin()
    youLose()
    
}
document.addEventListener('keyup', moveFrog)

// automates all moving elements
function autoMoveElements() {
        currentTime --
        timeLeftDisplay.textContent = currentTime 
        logLeft.forEach(logLeft => moveLogLeft(logLeft))
        logRight.forEach(logRight => moveLogRight(logRight))
        carsLeft.forEach(carsLeft => moveCarLeft(carsLeft))
        carsRight.forEach(carsRight => moveCarRight(carsRight))
    
}

function checkOutcomes() {
    youLose()
    youWin()
}


// Logic for moving logs left
function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1') : 
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2') : 
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3') : 
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4') : 
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5') : 
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }

}


// Logic for moving logs right
function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1') : 
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2') : 
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3') : 
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4') : 
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5') : 
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }

}

// Logic for moving cars left
function moveCarLeft(carsLeft) {
    switch(true) {
        case carsLeft.classList.contains('c1') :
            carsLeft.classList.remove('c1')
            carsLeft.classList.add('c2')
            break
        case carsLeft.classList.contains('c2') :
            carsLeft.classList.remove('c2')
            carsLeft.classList.add('c3')
            break
        case carsLeft.classList.contains('c3') :
            carsLeft.classList.remove('c3')
            carsLeft.classList.add('c1')
            break
    }

}

// Logic for cars moving right
function moveCarRight(carsRight) {
    switch(true) {
        case carsRight.classList.contains('c1') :
            carsRight.classList.remove('c1')
            carsRight.classList.add('c3')
            break
        case carsRight.classList.contains('c2') :
            carsRight.classList.remove('c2')
            carsRight.classList.add('c1')
            break
        case carsRight.classList.contains('c3') :
            carsRight.classList.remove('c3')
            carsRight.classList.add('c2')
            break
    }

}

// Logic for determining if a loss has occurred 
function youLose() {
    if (squares[currentFrogIndex].classList.contains('c1') || squares[currentFrogIndex].classList.contains('l4') || squares[currentFrogIndex].classList.contains('l5') || currentTime <= 0) {
        resultDisplay.textContent = "You lose!"
        clearInterval(timerId)
        squares[currentFrogIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

// Logic for determining if a win has occurred 
function youWin() {
    if (squares[currentFrogIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = "You Win!"
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
    }
}


startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})