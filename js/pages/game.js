import {replaceAllPlayerList, rerenderList} from "../../elements/playerList/playerList.js";
import {replaceAllTetris} from "../../elements/tetris/game.js";


let currentPlayerNameLabel = document.getElementsByClassName('current-player-label')[0].firstElementChild
currentPlayerNameLabel.textContent = localStorage.getItem('currentPlayer')

let players = JSON.parse(localStorage.getItem('players'))
if (!players) {
    players = []
    localStorage.setItem('players', JSON.stringify(players))
}

const goToLoginPage = (name) => {
    window.location.href = 'index.html'
    localStorage.setItem('currentPlayer', name)
}

const clickOnName = (event, row, name, record) => {
    goToLoginPage(name)
}

const clickOnRecord = (event, row, name, record) => {
    goToLoginPage(name)
}

const clickOnDelete = (event, row, name, record) => {

}

const onGameOver = () => {
    console.log('rerender')
    players = JSON.parse(localStorage.getItem('players'))
    rerenderList(players, clickOnName, clickOnRecord, clickOnDelete)
}


replaceAllPlayerList(players, clickOnName, clickOnRecord, clickOnDelete)
replaceAllTetris(onGameOver)