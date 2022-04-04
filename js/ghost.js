'use strict'
const GHOST = '&#9781;';
var gGhosts = []
var gIntervalGhosts;

var gDeletedGhosts = []


function createGhost(board) {
    // DONE
    var ghost = {
        location: {
            i: 3,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    ghost.defaultColor = ghost.color

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}


function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}


function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (!isSuper) gameOver()
        return
    }
    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {

    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var color = isSuper ? 'blue' : ghost.color
    return `<span style ="color: ${color}" class="ghost">${GHOST}</span>`
}


function removeGhost(pos) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (
            ghost.location.i === pos.i &&
            ghost.location.j === pos.j
        ) {
            var deletedGhost = gGhosts.splice(i, 1)[0]
            if(deletedGhost.currCellContent === FOOD) {
                gFoodAmount--
                deletedGhost.currCellContent === EMPTY
            }
            gDeletedGhosts.push(deletedGhost)
        }
    }
}


function getGhostByLocation(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (location.i === ghost.location.i && location.j === ghost.location.j) {
            return ghost
        }
    }
}


function renderGhostsColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        // if(isSuper) ghost.color = 'blue'
        // else ghost.color = ghost.defaultColor

        renderCell(ghost.location, getGhostHTML(ghost))
    }

}


function reviveAll() {
    for (var i = 0; i <  gDeletedGhosts.length; i++) {
        var ghost = gDeletedGhosts[i]
        gGhosts.push(ghost)
    }
    gDeletedGhosts = []
}