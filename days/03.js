const createMap = input => {
    const map = input.map(line => line.split(''));
    const len = input[0].length;
    return {
        findTreeAt: (x, y) => map[x][y % len],
        length: input.length,
    }
}


const countTreesForSlope = (map, down, right) => {
    let numTrees = 0;
    let y = 0;
    for (let x = 0; x < map.length; x += down) {
        if (map.findTreeAt(x, y) === "#") numTrees++;
        y += right;
    }
    return numTrees;
}

const partOne = input => {
    const map = createMap(input);
    return countTreesForSlope(map, 1, 3);
}

const partTwo = input => {
    const map = createMap(input);
    const paths = [
        [1, 1],
        [1, 3],
        [1, 5],
        [1, 7],
        [2, 1],
    ];
    return paths
        .map(slope => countTreesForSlope(map, slope[0], slope[1]))
        .reduce((a, b) => a * b);
}

module.exports = { partOne, partTwo };
