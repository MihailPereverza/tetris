const HTMLPlayerList =
'<table class="player-list">\n' +
'</table>'


export const createPlayerList = (players, onDelete, clickOnRecord, clickOnName) => {
    let table = document.createElement('div')
    table.innerHTML = HTMLPlayerList
    table = table.children[0]
    table.append(createRow({'name': 'Имя', 'record': 'Рекорд'}, 'Удалить', ()=>{}, ()=>{}, ()=>{}))

    for (let player of players) {
        table.append(createRow(player, createCancelImg(), onDelete, clickOnRecord, clickOnName))
    }

    return table
}


const createRow = (player, deleteElem, onDelete, clickOnRecord, clickOnName) => {
    let row = document.createElement('tr')

    row.setAttribute('class', 'player-list-row')

    let name = document.createElement('th')
    let record = document.createElement('th')
    let deleteButton = document.createElement('th')

    name.setAttribute('class', 'player-list-name player-list-column')
    record.setAttribute('class', 'player-list-record player-list-column')
    deleteButton.setAttribute('class', 'player-list-delete-button player-list-column')

    name.onclick = (event) => {
        clickOnName(event, row, player['name'], player['record'])
    }
    record.onclick = (event) => {
        clickOnRecord(event, row, player['name'], player['record'])
    }
    deleteButton.onclick = (event) => {
        onDelete(event, row, player['name'], player['record'])
    }

    name.innerHTML = player['name']
    record.innerHTML = player['record'].toString()
    deleteButton.append(deleteElem)

    row.append(name, record, deleteButton)
    return row
}


const createCancelImg = () => {
    let deleteProfile = document.createElement('img')
    deleteProfile.setAttribute('src', '../../img/cancel.png')
    deleteProfile.setAttribute('alt', 'удалить рекорд')
    deleteProfile.setAttribute('width', '40')
    deleteProfile.setAttribute('height', '40')
    return deleteProfile
}


export const replaceAllPlayerList = (players, clickOnName, clickOnRecord, clickOnDelete) => {
    let replaceDiv = document.getElementsByClassName('playerList')
    for (let el of replaceDiv) {
        el.replaceWith(createPlayerList(players, clickOnDelete, clickOnRecord, clickOnName))
    }
}


export const rerenderList = (players, clickOnName, clickOnRecord, clickOnDelete) => {
    let elems = document.getElementsByClassName('player-list')
    console.log(elems)
    for (let elem of elems) {
        console.log('replace')
        console.log(localStorage)
        let replaceElem = createPlayerList(players, clickOnDelete, clickOnRecord, clickOnName)
        console.log(replaceElem)
        elem.replaceWith(replaceElem)
    }
}
