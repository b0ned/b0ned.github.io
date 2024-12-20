const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const statusDisplay = document.querySelector('#status')
const blockWidth = 100
const blockHeight = 20
const gridWidth = 560
const gridHeight = 300

let score = 0
let timerId

const userStartPos = [230, 10]
let userCurrentPos = userStartPos

const ballStartPos = [270, 40]
let ballCurrentPos = ballStartPos
const ballDiameter = 20
let xDirection = 2
let yDirection = 2

//block class
class Block {
    constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// array of blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]
console.log(blocks[0])

// draws all block
function addBlocks() { 
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

// adds user
const user = document.createElement('div')
    user.classList.add('user')
    drawUser()
    grid.appendChild(user)

// draw user
function drawUser() {
    user.style.left = userCurrentPos[0] + 'px'
    user.style.bottom = userCurrentPos[1] + 'px'
}

// draw ball
function drawBall() {
    ball.style.left = ballCurrentPos[0] + 'px'
    ball.style.bottom = ballCurrentPos[1] + 'px'
}


// moves the user

function moveUserPos(e) {
    switch(e.key) {
        case 'ArrowLeft' : 
            if (userCurrentPos[0] > 0) {
                userCurrentPos[0] -= 10
                drawUser()
            }
                break;
        case 'ArrowRight' :
            if (userCurrentPos[0] < gridWidth - blockWidth) {
                userCurrentPos[0] += 10
                drawUser()
            }
                break;
    }
}

document.addEventListener('keydown', moveUserPos)

// add ball

const ball = document.createElement('div')
    ball.classList.add('ball')
    drawBall()
    grid.appendChild(ball)


// ball movement
function moveBall() {
    ballCurrentPos[0] += xDirection
    ballCurrentPos[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 30)

// check for collisions
function checkForCollisions() {
    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // checking for win 
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'YOU WIN'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUserPos())
            }
        }
    }


    //check for wall collision
    if (ballCurrentPos[0] >= (gridWidth - ballDiameter) || ballCurrentPos[1] >= (gridHeight -ballDiameter) || ballCurrentPos[0] <= 0) {
        changeDirection()
    }

// checks for user collision
if 
(
    (ballCurrentPos[0] > userCurrentPos[0] && ballCurrentPos[0] < (userCurrentPos[0] + blockWidth)) &&
    (ballCurrentPos[1] > userCurrentPos[1] && ballCurrentPos[1] < (userCurrentPos[1] + blockHeight))
) {
    changeDirection()
}

//check for gameover
if (ballCurrentPos[1] <= 0) {
    clearInterval(timerId)
    statusDisplay.innerHTML = 'You lose'
    document.removeEventListener('keydown', moveUserPos)

}



// change direction on collision
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}}
