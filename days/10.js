const partOne = input => {
    const adaptors = input.split('\n').map(n => +n).sort((a, b) => a - b);
    let ones = 0;
    let threes = 1; // rolling my eyes so hard
    let previous = 0;
    adaptors.forEach(adaptor => {
        if (adaptor - previous === 1) ones++;
        if (adaptor - previous === 3) threes++;
        previous = adaptor;
    });
    return ones * threes;
};

// 1, 3, 4, 6
// weird permutations, one of either but not both
// num fractorial / greatest number for each "but not both"?  yeesh

// "climbing stairs problem"
// with help from:
// https://github.com/adhokshaja/AdventOfCode2020/blob/main/Day10/js-10.ipynb
// https://github.com/adrianosmond/adventofcode/blob/master/2020/day10.js
const partTwo = input => {
    const adaptors = input.split('\n').map(n => +n).sort((a, b) => a - b).reverse();
    adaptors.push(0);
    adaptors.unshift(Math.max.apply(Math, adaptors) + 3);
    const paths = {};
    adaptors.forEach(adaptor => {
        const possible = adaptors.filter(
            jump => jump > adaptor && jump <= adaptor + 3
        );
        paths[adaptor] = possible.map(jump => paths[jump])
            .reduce((a, b) => a + b, 0) || 1;
    });

    return paths[0];
};

module.exports = {
    partOne,
    partTwo,
};
