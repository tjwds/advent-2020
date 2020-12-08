const partOne = input => {
    const lines = input.split('\n');
    let acc = 0;
    let currentLine = 0;
    const touchedLines = [];
    let working = true;
    while (working) {
        const ops = lines[currentLine].split(' ');
        switch (ops[0]) {
            case 'nop':
                currentLine += 1;
                break;
            case 'jmp':
                currentLine += +ops[1];
                break;
            case 'acc':
                acc += +ops[1];
                currentLine += 1;
                break;
        }
        if (touchedLines.includes(currentLine)) working = false;
        touchedLines.push(currentLine);
    }
    return acc;
};

const trySwitch = (lines, currentLine, jmpOrNop, currentSwitch) => {
    let touchedLines = [];
    let acc = 0;
    let working = true;
    while (working) {
        const ops = lines[currentLine].split(' ');
        let tryOp = ops[0];
        if (currentLine === jmpOrNop[currentSwitch]) {
            tryOp = (tryOp === 'jmp') ? 'nop' : 'jmp';
        }
        switch (tryOp) {
            case 'nop':
                currentLine += 1;
                break;
            case 'jmp':
                currentLine += +ops[1];
                break;
            case 'acc':
                acc += +ops[1];
                currentLine += 1;
                break;
        }
        if (touchedLines.includes(currentLine)) return -1;
        if (currentLine > lines.length) return -1;
        if (currentLine === lines.length) return acc;
        touchedLines.push(currentLine);
    }
};

const partTwo = input => {
    const lines = input.split('\n');
    let currentLine = 0;
    let touchedLines = [];
    let working = true;
    const jmpOrNop = [];
    let currentSwitch = 0;
    while (working) {
        const ops = lines[currentLine].split(' ');
        switch (ops[0]) {
            case 'nop':
                jmpOrNop.push(currentLine);
                currentLine += 1;
                break;
            case 'jmp':
                jmpOrNop.push(currentLine);
                currentLine += +ops[1];
                break;
            case 'acc':
                currentLine += 1;
                break;
        }
        if (touchedLines.includes(currentLine)) working = false;
        touchedLines.push(currentLine);
    }

    let test = -1;
    currentLine = 0;
    touchedLines = [];
    while (test < 0) {
       test = trySwitch(lines, currentLine, jmpOrNop, currentSwitch);
       currentSwitch += 1;
    }

    return test;
};

module.exports = {
    partOne,
    partTwo,
};
