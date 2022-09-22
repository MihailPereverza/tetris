import {replaceAllPlayerList, rerenderList} from "../../elements/playerList/playerList.js";
import {replaceAllLoginForm} from '../../elements/loginForm/createLoginForm.js'


let players = JSON.parse(localStorage.getItem('players'))
if (!players) {
    players = []
    localStorage.setItem('players', JSON.stringify(players))
}


const clickOnLoginButton = (event, name) => {
    event.preventDefault();
    if (!name) return
    window.location.href = 'game.html'
    let player = players.filter(player => player['name'] === name)[0]
    if (!player) {
        player = {'name': name, 'record': 0}
        players.unshift(player)
        localStorage.setItem('players', JSON.stringify(players))
        rerenderList(players, clickOnName, clickOnRecord, clickOnDelete)
    }
    localStorage.setItem('currentPlayer', name)
}


const clickOnName = (event, row, name, record) => {
    document.getElementsByClassName('login-form-name')[0].value = name
}


const clickOnRecord = (event, row, name, record) => {
    document.getElementsByClassName('login-form-name')[0].value = name
}


const clickOnDelete = (event, row, name, record) => {
    players = players.filter(player => player['name'] !== name)
    localStorage.setItem('players', JSON.stringify(players))
    row.remove()
}


replaceAllLoginForm(clickOnLoginButton, 'game.html')
replaceAllPlayerList(players, clickOnName, clickOnRecord, clickOnDelete)
