/* eslint-disable no-constant-condition */
const lineContainsParentheticals = line => line.indexOf('(') > -1;

const reduceLeftToRight = line => {
    const process = line.split(' ');
    let result = +process[0];
    for (let i = 1; i < process.length; i += 2) {
        if (process[i] === "*") result *= (+process[i+1]);
        if (process[i] === "+") result += (+process[i+1]);
    }
    return result;
};

const processAdditionFirst = line => {
    // do addition first
    while (true) {
        const match = line.match(/\d+ \+ \d+/);
        if (!match) {
            break;
        }
        const expression = match[0];
        const operands = expression.split(' + ');
        line = line.replace(expression, +operands[0] + +operands[1]);
    }
    // then multiplication
    while (true) {
        const match = line.match(/\d+ \* \d+/);
        if (!match) {
            break;
        }
        const expression = match[0];
        const operands = expression.split(' * ');
        line = line.replace(expression, +operands[0] * +operands[1]);
    }
    return line;
};

const reduceParentheticals = (line, logic) => {
    const validParenthetical = line.match(/\([\d *+]+\)/);
    if (validParenthetical) {
        const expression = validParenthetical[0];
        const result = logic(expression.slice(1, -1));
        return line.replace(expression, "" + result);
    }
    return line;
};

const evaluateNewMath = (line, logic) => {
    // first, we need to reduce the parenthetical statements
    while(lineContainsParentheticals(line)) {
        line = reduceParentheticals(line, logic);
    }
    line = logic(line, logic);
    return line;
};

const processLines = (input, logic) => {
    const lines = input.split('\n');
    let result = 0;
    lines.forEach(line => result += +evaluateNewMath(line, logic));
    return result;
};

const partOne = lines => processLines(lines, reduceLeftToRight);
const partTwo = lines => processLines(lines, processAdditionFirst);

module.exports = { partOne, partTwo };
