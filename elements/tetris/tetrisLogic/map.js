export class TetrisMap {
    constructor(size) {
        this.width = size[0]
        this.height = size[1]
        this.map = Array(this.height).fill().map(()=>Array(this.width).fill())
    }

    validateState(t, x, y) {
        for (let i = 0; i < t.length; i++) {
            for (let j = 0; j < t[i].length; j++) {
                if ((x + j < 0 || x + j >= this.width) && t[i][j]) {
                    return false
                }
                if (y + i < 0) {
                    continue
                }
                if (!t[i][j]) {
                    continue
                }
                if (this.#canSetPixel(x + j, y + i)) {
                    continue
                }
                else {
                    return false
                }
            }
        }
        return true
    }

    #canSetPixel(newColumn, newRow) {
        return this.#inMap(newColumn, newRow) && !this.map[newRow][newColumn]
    }

    #inMap(newColumn, newRow) {
        return newColumn >= 0 && newRow >= 0 && newColumn < this.width && newRow < this.height
    }

    setItem(t, x, y, itemText) {
        for (let i = 0; i < t.length; i++) {
            if (y + i < 0) {
                continue
            }

            for (let j = 0; j < t[i].length; j++) {
                if (!t[i][j]) {
                    continue
                }
                this.map[y + i][x + j] = itemText
            }
        }
    }

    findFullLines(start = 0) {
        let count = 0
        for (let i = this.height - 1; i >= 0; i--) {
            let columns = 0

            for (let j = 0; j < this.width; j++) {
                if (this.map[i][j]) {
                    columns += 1
                }
            }
            if (count) {
                this.map[i + count] = this.map[i]
                this.map[i] = Array(this.width).fill()
            }
            if (columns === this.width) {
                count += 1
            }

        }
        if (count) {
            for (let i = 0; i < this.width; i++) {
                this.map[0][i] = undefined
            }
        }
        return count

    }
}