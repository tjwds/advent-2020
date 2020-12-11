/* eslint-disable no-empty */
let somethingChanged = true;

const seatWouldFlip = (row, column, type, seats, threshold, canSee) => {
    if (type === '.') {
        return '.';
    }
    let adjacentOccupiedSeats = 0;
    const seatTests = [];
    // lol, this is so lazy
    if (!canSee) {
        try {
            seatTests.push(seats[row - 1][column]);
        } catch (e) { }
        try {
            seatTests.push(seats[row - 1][column - 1]);
        } catch (e) { }
        try {
            seatTests.push(seats[row - 1][column + 1]);
        } catch (e) { }
        try {
            seatTests.push(seats[row + 1][column]);
        } catch (e) { }
        try {
            seatTests.push(seats[row + 1][column - 1]);
        } catch (e) { }
        try {
            seatTests.push(seats[row + 1][column + 1]);
        } catch (e) { }
        try {
            seatTests.push(seats[row][column - 1]);
        } catch (e) { }
        try {
            seatTests.push(seats[row][column + 1]);
        } catch (e) { }
    } else {
        const seatFinderFunctions = [
            i => [-i, 0],
            i => [-i, -i],
            i => [-i, +i],
            i => [+i, 0],
            i => [+i, -i],
            // just spent 20 minutes hunting down the bug that I'd written
            // i => [-i, +i] again here
            i => [+i, +i],
            i => [0, -i],
            i => [0, +i],
        ];
        seatFinderFunctions.forEach(seatFinder => {
            let foundSeat = false;
            let inc = 1;
            try {
                while (!foundSeat) {
                    const seat = seats[
                        row + seatFinder(inc)[0]
                    ][
                        column + seatFinder(inc)[1]
                    ];
                    if (seat === undefined) {
                        foundSeat = true;
                    } else if (seat !== '.') {
                        foundSeat = true;
                        seatTests.push(seat);
                        inc = 1;
                    } else {
                        inc++;
                    }
                }
            } catch (e) { }
        });
    }
    seatTests.forEach(seat => {
        if (seat === "#") adjacentOccupiedSeats++;
    });
    if (type === "L" && adjacentOccupiedSeats === 0) {
        somethingChanged = true;
        return "#";
    }
    if (type === "#" && adjacentOccupiedSeats >= threshold) {
        somethingChanged = true;
        return "L";
    }
    return type;

};

const partOne = (input, threshold, canSee) => {
    let seats = input.split('\n').map(line => line.split(''));
    while (somethingChanged) {
        somethingChanged = false;
        const newSeats = seats.map((row, rowIndex) => row.map((column, columnIndex) =>
            seatWouldFlip(rowIndex, columnIndex, column, seats, threshold, canSee)
        ));
        if (!somethingChanged) {
            let occupied = 0;
            newSeats.map(row => row.map(column => {
                if (column === "#") occupied++;
            }));
            return occupied;
        }
        seats = newSeats;
    }
};

const partTwo = partOne;

module.exports = {
    partOne,
    partTwo,
};
