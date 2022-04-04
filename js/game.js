'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const GRAVE = '<img src="img/grave.png" />'
const SUPER_FOOD = '⚪'
const CHERRY = '🍒'

var gBoard;
var gFoodAmount = 0

var gCherryTimeId

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('Game Start')
    gDeletedGhosts = []
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    // gCherryTimeId = setInterval(randCherry, 15000)
}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === SIZE - 2) ||
                (i === 1 && j === 1) ||
                (i === SIZE - 2 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD;
            }
            if (board[i][j] === FOOD) gFoodAmount++
        }
    }
    // minus 1 because of pacman location
    gFoodAmount--
    return board;
}


function updateScore(diff) {
    // DONE: update model and dom

    // Model
    gGame.score += diff
    //DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over');
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryTimeId)
    renderCell(gPacman.location, '☠️')
    gGame.isOn = false
    openModal()
}



function openModal() {
    var elModal = document.querySelector('.modal')
    var elModalH = elModal.querySelector('.modalH')
    if (!gFoodAmount) elModalH.innerText = 'You Won!'
    else elModalH.innerText = 'You Lost!'
    elModal.style.display = 'initial'
}


function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}


function restart() {
    closeModal()
    gGame.score = 0
    gFoodAmount = 0
    document.querySelector('h2 span').innerText = 0
    init()
}


function randCherry() {
    var newPos = getEmptyCells(gBoard)
    gBoard[newPos.i][newPos.j] = CHERRY
    renderCell(newPos, CHERRY)
}
