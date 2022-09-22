import {Tetramino} from "./tetramino.js";
import {getRandomInt} from "../../../js/utils.js";


export class TetraminoSequence {
    constructor(frequency) {
        this._frequency = frequency
        this.sequence = this._generateTetraminoSequence(frequency)
    }

    _createTetraminoList(frequency) {
        let tetraminoSymbols = []
        for (let i in frequency){
            for (let j = 0; j < frequency[i]; j++) {
                tetraminoSymbols.push(i)
            }
        }
        return tetraminoSymbols
    }

    _generateTetraminoSequence(frequency) {
        const tetraminoSymbols = this._createTetraminoList(frequency)
        const sequence = []

        for (let i = tetraminoSymbols.length - 1; i > -1; i--) {
            const rand = getRandomInt(0, i)
            const symbol = tetraminoSymbols.splice(rand, 1)[0]
            sequence.push(new Tetramino(symbol))
        }
        return sequence
    }

    next() {
        if (!this.sequence.length) {
            this.sequence = this._generateTetraminoSequence(this._frequency)
        }
        return this.sequence.pop()
    }
}
