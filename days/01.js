const partOne = input => {
    for (let num of input) {
        let opp = 2020 - num;
        if (input.includes(opp)) return num * opp;
    }
}

const partTwo = input => {
    for (let num of input) {
        for (let test of input) {
            let opp = (2020 - num) - test;
            if (input.includes(opp)) return num * opp * test;
        }
    }
}

module.exports = { partOne, partTwo };
