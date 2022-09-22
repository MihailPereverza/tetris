import {TetrisRules} from './rules.js'
import {TetraminoSequence} from "./tetraminoSequence.js";
import {TetrisMap} from "./map.js";
import {CanvasRender} from "./canvasRender.js";
import {Styler} from "./styler.js";
import {KeyControl} from "./operateKeyDown.js";
import {rotateMatrix} from "../../../js/utils.js";





export class GameLogic {
    _colors = {
        L: '#f292a7',
        J: '#f292a7',
        S: '#0bbfcf',
        Z: '#0bbfcf',
        T: '#fad134',
        I: '#283548',
        O: '#283548',
    }

    constructor(login, canvasTetris, canvasNextElem, gameOverCallBack) {
        this._gameOverCallBack = gameOverCallBack

        this._grid = canvasTetris.width / 10
        this._currentTetramino = null
        this._nextTetramino = null
        this._start = window.performance.now()
        this._login = login

        this._rules = new TetrisRules()
        this._map = new TetrisMap(this._rules.mapSize)
        this._sequence = new TetraminoSequence(this._rules.getTetraminoFrequency())
        this._keyControl = new KeyControl(
            this.#rotateTetramino.bind(this),
            this.#shiftDown.bind(this),
            this.#shiftLeft.bind(this),
            this.#shiftRight.bind(this)
        )

        this._lvl = 0
        this._score = 0
        this._totalScore = 0

        this._styler = new Styler(this._colors)
        this._renderTetris = new CanvasRender(canvasTetris)
        this._renderNextElem = new CanvasRender(canvasNextElem)

        this._rAF = null

        this.#iterateTetraminoSequence()
        this.#iterateTetraminoSequence()

        this._renderNextElem.clearCanvas()
        this._renderTetris.clearCanvas()
        document.onkeydown = this._keyControl.keyDownListener.bind(this._keyControl)
    }

    gameOver() {
        cancelAnimationFrame(this._rAF);
        this._renderTetris.renderGameOver(this._totalScore)
        this.#fixRecord()
        this._gameOverCallBack()
    }

    #iterateTetraminoSequence() {
        this._currentTetramino = this._nextTetramino
        this._nextTetramino = this._sequence.next()
        return this._currentTetramino
    }

    #showNextElem() {
        this._renderNextElem.clearCanvas()
        this._renderNextElem.renderFrameByMap(
            0,
            0,
            this._styler.tetraminoColorMap(this._nextTetramino),
            this._grid
        )

    }

    #fixRecord() {
        const players = JSON.parse(localStorage.getItem('players'))
        const player = players.filter(player => player['name'] === this._login)[0]
        console.log(player)
        console.log(typeof player['record'])
        console.log(typeof this._totalScore)
        console.log(Math.max(player['record'], this._totalScore))
        player['record'] = Math.max(player['record'], this._totalScore)

        localStorage.setItem('players', JSON.stringify(players))
    }

    #moveCurrentTetromino(deltaX, deltaY) {
        if (!this._map.validateState(
            this._currentTetramino.matrix,
            this._currentTetramino.column + deltaX,
            this._currentTetramino.row + deltaY,
        )) {
            return false
        }
        this._currentTetramino.move(deltaX, deltaY)
        return true
    }

    #setStaticPositionCurrentTetromino() {
        this._map.setItem(
            this._currentTetramino.matrix,
            this._currentTetramino.column,
            this._currentTetramino.row,
            this._styler.tetraminoColor(this._currentTetramino)
        )
        const res = this._currentTetramino.row < 0
        this.#iterateTetraminoSequence()
        return res
    }

    #shiftLeft() {
        this.#moveCurrentTetromino(-1, 0)
    }

    #shiftRight() {
        this.#moveCurrentTetromino(1, 0)
    }

    #shiftDown() {
        this.#moveCurrentTetromino(0, 1)
    }


    #rotateTetramino() {
        const newMatrix = rotateMatrix(this._currentTetramino.matrix)
        if (this._map.validateState(newMatrix, this._currentTetramino.column, this._currentTetramino.row)) {
            this._currentTetramino.matrix = newMatrix
        }
    }

    #renderFrame(line) {
        this._renderTetris.clearCanvas()
        this._renderTetris.renderFrameByMap(0, 0, this._map.map, this._grid, line)
        this._renderTetris.renderFrameByMap(
            this._currentTetramino.column,
            this._currentTetramino.row,
            this._styler.tetraminoColorMap(this._currentTetramino),
            this._grid
        )
    }

    #checkNewPoints() {
        const lines = this._map.findFullLines()
        if (!lines) return

        const reward = this._rules.rewardMultipliers[lines] * this._rules.baseRevard
        this._totalScore += reward
        this._score += reward
        this._lvl += Math.trunc(this._score / this._rules.scoreThreshold)
        this._score %= this._rules.scoreThreshold
    }

    start() {
        this.#clearMonitor()
        this._rAF = requestAnimationFrame(this.#loop.bind(this))
    }

    #clearMonitor() {
        this._renderNextElem.clearCanvas()
        this._renderTetris.clearCanvas()
    }

    #loop() {
        this._rAF = requestAnimationFrame(this.#loop.bind(this))
        let lines = null
        if (window.performance.now() - this._start >= this._rules.baseFrameTime * 1000 / this._rules.calculateTimeMultiplier(this._lvl)) {
            this._start = window.performance.now()
            if (!this.#moveCurrentTetromino(0, 1)) {
                if (!this.#setStaticPositionCurrentTetromino()) {
                    this.#checkNewPoints()
                }
                else {
                    this.gameOver()
                    return
                }
            }
        }
        this.#renderFrame(lines)
        this.#showNextElem()
    }
}



















