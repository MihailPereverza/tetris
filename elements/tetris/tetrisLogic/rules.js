export class TetrisRules {
    constructor(
        frequencyJ = 1,
        frequencyL = 1,
        frequencyI = 1,
        frequencyO = 1,
        frequencyT = 1,
        frequencyZ = 1,
        frequencyS = 1,
    ) {
        this._frequencyJ = frequencyJ
        this._frequencyL = frequencyL
        this._frequencyI = frequencyI
        this._frequencyO = frequencyO
        this._frequencyT = frequencyT
        this._frequencyZ = frequencyZ
        this._frequencyS = frequencyS

        this.baseFrameTime = 0.3

        this.baseRevard = 100
        this.rewardMultipliers = [0, 1, 3, 7, 15]
        this.scoreThreshold = 1300

        this.mapSize = [10, 20]
    }

    calculateTimeMultiplier(lvl) {
        return Math.log(0.05 * (lvl + 1) + Math.exp(1) - 0.05)
    }

    getTetraminoFrequency() {
        return {
            J: this._frequencyJ,
            L: this._frequencyL,
            T: this._frequencyT,
            O: this._frequencyO,
            I: this._frequencyI,
            Z: this._frequencyZ,
            S: this._frequencyS,
        }
    }
}