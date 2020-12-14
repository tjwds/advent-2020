const {
    partOne,
    partTwo,
} = require('./days/14.js');
const input = require('./input/14.js');
// const input = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1`;

console.log(
    partOne(input),
    partTwo(input)
);
