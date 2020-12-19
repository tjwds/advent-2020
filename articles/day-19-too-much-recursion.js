/*
Alright, well, this was attempt number four to solve this problem, but I hit the
call-stack limit.

Also, this doesn't even check the existing results.
*/

const processRuleSteps = (ruleText, rules, process) => {
    const ruleSteps = ruleText.split(' ');
    ruleSteps.forEach(rule => {
        const nextSteps = [];
        if (!process) {
            process = rules[rule]();
        } else {
            const next = rules[rule]();
            process.forEach(cur => {
                next.forEach(nxt => {
                    // todo:  is this right, though?
                    nextSteps.push(cur + nxt);
                });
            });
            process = nextSteps;
        }
    });
    return process;
};

const partOne = rulesInput => {
    const ruleLines = rulesInput.split('\n');
    const rules = {
        current: null,
    };
    ruleLines.forEach((ruleLine, index) => {
        const ruleText = ruleLine.split(': ')[1];
        if (ruleText.indexOf('"') > -1) {
            rules[index] = () => [ruleText.match(/\w+/)[0]];
        } else if (ruleText.indexOf('|') > -1) {
            rules[index] = () => {
                const ruleSplits = ruleText.split(' | ');
                // make new strings for each split
                const newStrings = ruleSplits.map(split => processRuleSteps(split, rules, rules.current));
                // merge 'em
                return newStrings.flat();
            };
        } else {
            rules[index] = () => {
                rules.current = processRuleSteps(ruleText, rules, rules.current);
                return rules.current;
            };
        }
    });
    return rules[0]().filter((x, i, a) => a.indexOf(x) === i).length;
};

module.exports = { partOne };
