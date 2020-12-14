const partOne = input => {
    const commands = input.split('\n');
    const memory = [];
    let maskRemove = [];
    let maskAdd = [];
    commands.forEach(command => {
        if (command.startsWith('mask')) {
            maskRemove = [];
            maskAdd = [];
            const maskInput = command.split(' = ')[1].split('').reverse();
            maskInput.forEach((item, index) => {
                if (item === '0') {
                    maskRemove.push(BigInt(1) << BigInt(index));
                }
                if (item === '1') {
                    maskAdd.push(BigInt(1) << BigInt(index));
                }
            });
        } else {
            const location = +(command.match(/mem\[(\d+)\]/)[1]);
            let amount = BigInt(+(command.split(' = ')[1]));
            maskRemove.forEach(remove => {
                // surely there is a better way to do this.
                if (amount & remove) {
                    amount -= remove;
                }
            });
            maskAdd.forEach(add => {
                if (!(amount & add)) {
                    amount += add;
                }
            });
            memory[location] = amount;
        }
    });
    return memory.reduce((a, b) => a + b, BigInt(0));
};

const getCombinations = numbers => {
    const result = [];
    const func = (prefix, numbers) => {
        for (let i = 0; i < numbers.length; i++) {
            result.push(prefix + numbers[i]);
            func(prefix + numbers[i], numbers.slice(i + 1));
        }
    };
    func(BigInt(0), numbers);
    return result;
};

const partTwo = input => {
    const commands = input.split('\n');
    const memory = {};
    let maskAdd = [];
    let memoryFlux = [];
    commands.forEach(command => {
        if (command.startsWith('mask')) {
            maskAdd = [];
            memoryFlux = [];
            const maskInput = command.split(' = ')[1].split('').reverse();
            maskInput.forEach((item, index) => {
                if (item === 'X') {
                    memoryFlux.push(BigInt(1) << BigInt(index));
                }
                if (item === '1') {
                    maskAdd.push(BigInt(1) << BigInt(index));
                }
            });
        } else {
            let location = BigInt(+(command.match(/mem\[(\d+)\]/)[1]));
            let amount = BigInt(+(command.split(' = ')[1]));
            maskAdd.forEach(add => {
                if (!(location & add)) {
                    location += add;
                }
            });
            memoryFlux.forEach(remove => {
                if (location & remove) {
                    location -= remove;
                }
            });
            const memoryLocations = getCombinations(memoryFlux);
            memoryLocations.sort().unshift(BigInt(0));
            memoryLocations.forEach(locAdd => {
                memory[location + locAdd] = amount;
            });
        }
    });
    return Object.values(memory).reduce((a, b) => a + b, BigInt(0));
};

module.exports = { partOne, partTwo };
