const partOne = input => {
    const groups = input.split('\n\n');
    let sum = 0;
    for (let group of groups) {
        const questions = [];
        const answers = group.split('\n');
        for (let answer of answers) {
            answer.split('').forEach(letter => {
                if (!questions.includes(letter)) questions.push(letter);
            });
        }
        sum += questions.length;
    }
    console.log(sum);
};

const partTwo = input => {
    const groups = input.split('\n\n');
    let sum = 0;
    for (let group of groups) {
        const questions = [];
        const answers = group.split('\n');
        answers[0].split('').forEach(letter => {
            if (answers.every(answer => answer.includes(letter))) {
                questions.push(letter);
            }
        });
        sum += questions.length;
    }
    console.log(sum);
};

module.exports = {
    partOne,
    partTwo,
};
