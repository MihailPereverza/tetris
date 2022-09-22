export class KeyControl {
    constructor(up, down, left, right) {
        this._up = up
        this._down = down
        this._left = left
        this._right = right
    }

    keyDownListener(event) {
        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault()
        }
        if (event.which === 37) {
            this._left()
        }
        else if (event.which === 39) {
            this._right()
        }
        else if (event.which === 38) {
            this._up()
        }
        else if (event.which === 40) {
            this._down()
        }
    }
}