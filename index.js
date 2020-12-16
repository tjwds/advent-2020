const {
    partOne,
    partTwo,
} = require('./days/16.js');
const {
    input,
    validFields,
    myTicket
} = require('./input/16.js');

// const validFields = `class: 0-1 or 4-19
// row: 0-5 or 8-19
// seat: 0-13 or 16-19`;
// const input = `3,9,18
// 15,1,5
// 5,14,9
// 3,9,20`;

console.log(
    partOne(validFields, input),
    partTwo(validFields, input, myTicket)
);
