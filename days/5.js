const binaryWalk = string => {
    const chars = string.split('');
    let length = 64;
    if (string.length === 3) length = 4; // horrible hack
    let section = length;
    let number = 0
    for (let i of chars) {
        if (i === "B" || i === "R") {
            number += section;
        }
        section /= 2;
    }
    return number;
}

const parsePositionFromString = string => [
    binaryWalk(string.slice(0,7)),
    binaryWalk(string.slice(7))
]

const partOne = input => {
    let highest = 0;
    for (let i of input) {
        const coords = parsePositionFromString(i);
        const seatId = coords[0] * 8 + coords [1];
        if (seatId > highest) highest = seatId;
    }
    return highest;
}

const partTwo = input => {
    const filledSeats = [];
    for (let i of input) {
        const coords = parsePositionFromString(i);
        const seatId = coords[0] * 8 + coords [1];
        filledSeats.push(seatId);
    }
    filledSeats.sort()
    // 1023
    for (let i = 0; i < 1024; i++) {
        if (!filledSeats.includes(i)) console.log(i)
    }
}

module.exports = {
    partOne,
    partTwo,
};
