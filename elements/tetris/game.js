import {GameLogic} from "./tetrisLogic/gameLogic.js";


const tetrisHTML =
    '        <div id="game-container-canvas">\n' +
    '            <div class="next-elem-container game-elemg">' +
    '                <div class="next-elem-label">' +
    '                   Следующая фигура:' +
    '                </div>' +
    '                <canvas width="120" height="120" class="next-elem ">\n' +
    '                </canvas>\n' +
    '                <div class="game-rules">' +
    '                    <table class="rules-list">' +
    '                        <tr>' +
    '                            <th class="rule">' +
    '                                ⟵' +
    '                            </th>' +
    '                            <th class="rule">' +
    '                                подвинуть фигуру влево' +
    '                            </th>' +
    '                        </tr>' +
    '                        <tr>' +
    '                            <th class="rule">' +
    '                                ⟶' +
    '                            </th>' +
    '                            <th class="rule">' +
    '                                подвинуть фигуру вправо' +
    '                            </th>' +
    '                        </tr>' +
    '                        <tr>' +
    '                            <th class="rule">' +
    '                                ↓' +
    '                            </th>' +
    '                            <th class="rule">' +
    '                                подвинуть фигуру вниз' +
    '                            </th>' +
    '                        </tr>' +
    '                        <tr>' +
    '                            <th class="rule">' +
    '                                ↑' +
    '                            </th>' +
    '                            <th class="rule">' +
    '                                повернуть фигуру на 90°' +
    '                            </th>' +
    '                        </tr>' +
    '                    </table>' +
    '                </div>' +
    '            </div>' +
    '\n' +
    '            <canvas width="300" height="600" class="tetris game-elem">\n' +
    '\n' +
    '            </canvas>\n' +
    '        </div>\n' +
    '        <div class="container-start-game">\n' +
    '            <div class="start-game">\n' +
    '                старт гейм\n' +
    '            </div>\n' +
    '        </div>\n'


class Game {
    _buttonTexts = {
        start: 'Летс гейм',
        stop: 'Наигрался?'
    }

    constructor(nextElemCanvas, tetrisCanvas, startStopButton, gameOverCallback) {
        this._nextElemCanvas = nextElemCanvas
        this._tetrisCanvas = tetrisCanvas
        this._startStopButton = startStopButton
        this._gameLogic = null
        this._startStopButton.onclick = this.#clickOnStartGame.bind(this)
        this._gameOverCallBack = gameOverCallback
    }

    #clickOnStartGame() {
        this._gameLogic = new GameLogic(localStorage.getItem('currentPlayer'), this._tetrisCanvas, this._nextElemCanvas, this.#onGameOver.bind(this))
        this._startStopButton.onclick = this.#clickOnStopGame.bind(this)
        this._gameLogic.start()
        this._startStopButton.textContent = this._buttonTexts.stop
    }

    #clickOnStopGame() {
        this._gameLogic.gameOver()
    }

    #onGameOver() {
        console.log(localStorage.getItem('players'))
        this._gameOverCallBack()
        this._startStopButton.onclick = this.#clickOnStartGame.bind(this)
        this._startStopButton.textContent = this._buttonTexts.start
    }
}


export const createTetrisElem = (onGameOver) => {
    let elem = document.createElement('div')
    elem.innerHTML = tetrisHTML
    let game = new Game(
        elem.getElementsByClassName('next-elem')[0],
        elem.getElementsByClassName('tetris')[0],
        elem.getElementsByClassName('start-game')[0],
        onGameOver
    )
    return elem
}


export const replaceAllTetris = (onGameOver) => {
    const tetris = document.getElementsByClassName('Tetris')[0]
    tetris.replaceWith(createTetrisElem(onGameOver))
}
