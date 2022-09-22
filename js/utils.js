export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function rotateMatrix(box) {
    return box[0].map((val, index) => box.map(row => row[index]).reverse())
}