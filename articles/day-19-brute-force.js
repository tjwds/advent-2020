/* Another failed attempt, added here for posterity */

const partOne = rulesInput => {
    const ruleLines = rulesInput.split('\n').map(text => text.split(': ')[1]);
    let numberList = [];
    const numbersToLetters = {};
    ruleLines.forEach((rule, index) => {
        if (rule.indexOf('"') > -1) {
            numbersToLetters[index] = rule.match(/\w+/)[0];
        }
    });
    let timer = 0;
    // turn the line into a number list
    numberList = [ruleLines[0].split(' ')];
    let foundAReduction = true;
    while (foundAReduction) {
        let indexIsBroken = false;
        foundAReduction = false;
        numberList.forEach((list, index) => {
            // turn [1, 2] into [1, 1, 3] and [1, 3, 1]
            list.forEach(item => {
                if (!indexIsBroken) {
                    if (!Object.keys(numbersToLetters).includes(item)) {
                        foundAReduction = true;
                        const newLine = ruleLines[item];
                        if (newLine.indexOf('|') === -1) {
                            // if it's a normal substitution, just do that
                            const substitution = newLine.split(' ');
                            const newList = [];
                            list.forEach(test => {
                                if (test === item) {
                                    newList.push(substitution);
                                } else {
                                    newList.push(test);
                                }
                            });
                            numberList[index] = newList;
                        } else {
                            // otherwise, our numberList length effectively doubles.
                            const replacementNumberList = [];
                            const processes = newLine.split(' | ');
                            processes.forEach(process => {
                                const substitution = process.split(' ');
                                const newList = [];
                                list.forEach(test => {
                                    if (test === item) {
                                        newList.push(...substitution);
                                    } else {
                                        newList.push(test);
                                    }
                                });
                                replacementNumberList.push(newList);
                            });
                            const newNumberList = [];
                            numberList.forEach(testList => {
                                // so bad
                                if (JSON.stringify(testList) === JSON.stringify(list)) {
                                    newNumberList.push(...replacementNumberList);
                                } else {
                                    newNumberList.push(testList);
                                }
                            });
                            numberList = newNumberList;
                            indexIsBroken = true;
                        }
                    }
                }
            });
        });
        timer++;
        if (timer % 500 === 0) console.log(numberList.length);
    }
    const stringList = numberList.map(list => list.map(int => numbersToLetters[int]).join(''));
    return stringList.filter((x, i, a) => a.indexOf(x) === i).length;
};

module.exports = { partOne };
