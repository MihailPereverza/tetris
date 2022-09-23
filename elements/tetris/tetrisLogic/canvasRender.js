export class CanvasRender {
    constructor(canvas) {
        this._canvas = canvas
        this._context = canvas.getContext('2d');
    }

    clearCanvas() {
        this._context.clearRect(0,0, this._canvas.width, this._canvas.height);
    }

    renderFrameByMap(startX, startY, colorMap, gridSize, line) {
        if (line) {
        }
        for (let i = 0; i < colorMap.length; i++) {
            for (let j = 0; j < colorMap[i].length; j++) {
                if (!colorMap[i][j]) {
                    continue
                }
                this._context.fillStyle = colorMap[i][j]
                this._context.fillRect((j + startX) * gridSize + 1, (i + startY) * gridSize + 1, gridSize - 2, gridSize - 2)
            }
        }
    }

    renderGameOver(score) {
        this._context.fillStyle = 'black';
        this._context.globalAlpha = 0.75;
        this._context.fillRect(0, this._canvas.height / 2 - 30, this._canvas.width, 60);

        this._context.globalAlpha = 1;
        this._context.fillStyle = 'white';
        this._context.font = '36px monospace';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.fillText('GAME OVER!', this._canvas.width / 2, this._canvas.height / 2);
        this._context.fillText(`SCORE: ${score}`, this._canvas.width / 2, this._canvas.height / 2 + 40);
    }
}
