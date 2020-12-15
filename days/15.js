const speakNumbers = (inputString, numbersToSpeak) => {
    const input = inputString.split(',').map(x => +x);
    let numbersSpoken = 1;
    let turnsAgo = {};
    let twoTurnsAgo = {};
    let speakNumber = 0;
    input.forEach(number => {
        turnsAgo[number] = numbersSpoken;
        speakNumber = number;
        numbersSpoken++;
    });
    while (numbersSpoken <= numbersToSpeak) {
        if (!turnsAgo[speakNumber] || !twoTurnsAgo[speakNumber]) {
            speakNumber = 0;
        } else {
            speakNumber = turnsAgo[speakNumber] - twoTurnsAgo[speakNumber];
        }
        twoTurnsAgo[speakNumber] = turnsAgo[speakNumber] || 0;
        turnsAgo[speakNumber] = numbersSpoken;
        numbersSpoken++;
        if (numbersSpoken % 1000 === 0) {
            console.log(numbersSpoken);
        }
    }
    return speakNumber;
};

const partOne = input => speakNumbers(input, 2020);
const partTwo = input => speakNumbers(input, 30000000);

module.exports = {
    partOne,
    partTwo
};
