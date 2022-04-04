'use strict'
const PACMAN = '😷';

var gPacman;

var gPowerTimerId

var isSuper = false

function createPacman(board) {
    // DONE
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]


    // DONE: return if cannot move
    if (nextCell === WALL) return


    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (isSuper) {
            removeGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodAmount--
        if (!gFoodAmount) gameOver()
    } else if (nextCell === SUPER_FOOD && !isSuper) {
        activateSuperPower()
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }




    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)
}


function getNextLocation(eventKey) {
    // DONE: figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKey) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            return null;
    }

    return nextLocation;
}


function activateSuperPower() {
    isSuper = true
    gPowerTimerId = setTimeout(cancelSuperPower, 5000)
    renderGhostsColor()
}


function cancelSuperPower() {
    console.log('canceled!');
    isSuper = false
    renderGhostsColor()
    reviveAll()
    console.log('CANCEL POWER');
}


