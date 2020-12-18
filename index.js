const {
    partOne,
    partTwo,
} = require('./days/18.js');
const input = require('./input/18.js');

// const input = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

console.log(
    partOne(input),
    partTwo(input)
);
