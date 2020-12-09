const partOne = input => {
    const nums = input.split('\n').map(x => +x);
    for (let i = 25; i < nums.length; i++) {
        const prevTwentyFive = nums.slice(i - 25, i);
        let match = false;
        prevTwentyFive.forEach(start => {
            prevTwentyFive.forEach(end => {
                if (start + end === nums[i]) match = true;
            });
        });
        if (!match) return nums[i];
    }
};

const partTwo = input => {
    const targetNumber = partOne(input);
    const nums = input.split('\n').map(x => +x);
    let range = [];
    let start = 0;
    for (let current = 0; current < nums.length; current++) {
        range.push(nums[current]);
        const currSum = range.reduce((a, b) => a + b, 0);
        if (currSum === targetNumber) {
            return Math.min.apply(Math, range) + Math.max.apply(Math, range);
        } else if (currSum > targetNumber) {
            start++;
            current = start;
            range = [];
        }
    }
};

module.exports = {
    partOne,
    partTwo,
};
