const countALetter = (letter, phrase) => phrase.split(letter).length - 1;

const partOne = input => {
    let valid = 0;
    for (let phrase of input) {
        const keys = phrase.split(' ');
        const highAndLow = keys[0].split('-');
        const occurrences = countALetter(keys[1].slice(0, -1), keys[2]);
        if (highAndLow[0] <= occurrences && highAndLow[1] >= occurrences) {
            valid++;
        }
    }
    return valid;
}

const partTwo = input => {
    let valid = 0;
    for (let phrase of input) {
        let occurrences = 0;
        const keys = phrase.split(' ');
        const highAndLow = keys[0].split('-');
        const letter = keys[1].slice(0, -1);
        if (keys[2][highAndLow[0] - 1] === letter) occurrences++;
        if (keys[2][highAndLow[1] - 1] === letter) occurrences++;
        if (occurrences === 1) {
            valid++;
        }
    }
    return valid;
}

module.exports = { partOne, partTwo };
