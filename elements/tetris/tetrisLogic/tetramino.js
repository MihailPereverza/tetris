export class Tetramino {
    _tetraminoMatrix = {
        J: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
        L: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ],
        I: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        O: [
            [1, 1],
            [1, 1],
        ],
        Z: [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
        ],
        T: [
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
        S: [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
        ],

    }

    constructor(name) {
        this.name = name
        this.matrix = this._tetraminoMatrix[name]
        this.row = -this.matrix.length
        this.column = 4
    }

    move(deltaX, deltaY) {
        this.row += deltaY
        this.column += deltaX
    }
}
