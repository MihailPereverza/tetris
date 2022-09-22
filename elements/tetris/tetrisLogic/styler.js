export class Styler {
    constructor(colors) {
        this._colors = colors
    }

    tetraminoColor(tetramino) {
        return this._colors[tetramino.name]
    }

    tetraminoColorMap(tetramino) {
        const colorMap = []
        for (let i = 0; i < tetramino.matrix.length; i++) {
            colorMap.push([])
            for (let j = 0; j < tetramino.matrix[i].length; j++) {
                if (tetramino.matrix[i][j]) {
                    colorMap[i].push(this._colors[tetramino.name])
                }
                else {
                    colorMap[i].push(undefined)
                }
            }
        }
        return colorMap
    }
}
