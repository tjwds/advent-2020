const findContainers = (target, bags, stepContainers, finalContainers) => {
    bags.forEach(bag => {
        if (bag.includes(target) && !bag.startsWith(target)) {
            const lineBag = bag.split(' ').slice(0, 2).join(' ');
            if (!finalContainers.includes(lineBag)) {
                finalContainers.push(lineBag);
                stepContainers.push(lineBag);
            }
        }
    });
};

const partOne = input => {
    const bags = input.split('\n');
    const containers = [];
    let stepContainers = [];
    findContainers('shiny gold', bags, containers, stepContainers, containers);
    while (stepContainers.length) {
        const nextContainers = [...stepContainers];
        stepContainers = [];
        nextContainers.forEach(target => {
            findContainers(target, bags, stepContainers, containers);
        });
    }
    return containers.length;
};

const parseBag = line => {
    const splitLine = line.slice(0, -1).split(' contain ');
    const results = [];
    if (splitLine[1] !== 'no other bags') {
        splitLine[1].trim().split(',').forEach(bagLine => {
            const bag = bagLine.split(' ');
            if (bag[0] === '') bag.shift();
            results.push([
                +bag[0],
                bag.slice(1, -1).join(' ')
            ]);
        });
    }
    return [splitLine[0].slice(0, -5), results];
};

const walkPurchases = (target, bags, purchases, multiplier) => {
    const targetBag = bags.find(bag => bag[0] === target);
    targetBag[1].forEach(bag => {
        purchases[0] += (bag[0] * multiplier);
        walkPurchases(
            bag[1],
            bags,
            purchases,
            multiplier * bag[0]
        );
    });
};

const partTwo = input => {
    const bags = input.split('\n').map(line => parseBag(line));
    const purchases = [
        0, // result
    ];
    walkPurchases('shiny gold', bags, purchases, 1);
    return purchases[0];
};

module.exports = {
    partOne,
    partTwo,
};
