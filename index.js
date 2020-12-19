const {
    partOne,
    partTwo,
} = require('./days/19.js');
const {messageInput, rulesInput} = require('./input/19.js');

// const input = `0: 1 2
// 1: "a"
// 2: 1 3 | 3 1
// 3: "b"`;

// const input = `0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"`;

console.log(
    partOne(rulesInput, messageInput),
    partTwo(rulesInput, messageInput),
);
