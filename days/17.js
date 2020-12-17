const someDimensionSignifiers = ['z', 'w', 'v', 'u', 't', 's', 'stop, you are going to break the universe', 'it is too late'];
const totalDimensionSignifiers = ['x', 'y', ...someDimensionSignifiers];

const generateCubeGridFromInput = (input, dimensions) => {
    const cubes = [];
    const additionalDimensions = dimensions - 2;
    input.split('\n').forEach((line, y) => {
        line.split('').forEach((cube, x) => {
            const newCube = {
                x,
                y,
            };
            for (let i = 0; i < additionalDimensions; i++) {
                newCube[someDimensionSignifiers[i]] = 0;
            }
            if (cube === '.') {
                newCube.state = 0;
            }
            if (cube === "#") {
                newCube.state = 1;
            }
            cubes.push(newCube);
        });
    });

    return cubes;
};

const cubesAreNotTheSameCube = (one, two, dimensions) => {
    for (let i = 0; i < dimensions; i++) {
        const thisDim = totalDimensionSignifiers[i];
        if (one[thisDim] !== two[thisDim]) return true;
    }
    return false;
};

const cubesAreNeighbors = (one, two, dimensions) => {
    if (!cubesAreNotTheSameCube(one, two, dimensions)) {
        return false;
    }
    for (let i = 0; i < dimensions; i++) {
        const thisDim = totalDimensionSignifiers[i];
        if (!(
            (one[thisDim] - 1 <= two[thisDim]) &&
            (one[thisDim] + 1 >= two[thisDim])
        )) {
            return false;
        }
    }
    return true;
};

const activeCubesInGroup = cubes => cubes.reduce((a, b) => ({state: a.state + b.state}), {state: 0}).state;

const populateImportantEmptyCubes = (cubes, dimensions) => {
    let coords = [[]];
    // for each dimension, there is a -, neutral, and + to check
    for (let i = 0; i < dimensions; i++) {
        const newCoords = [];
        coords.forEach(coord => {
            newCoords.push([...coord, -1]);
            newCoords.push([...coord, 0]);
            newCoords.push([...coord, 1]);
        });
        coords = newCoords;
    }

    cubes.forEach(testCube => {
        if (testCube.state) {
            coords.forEach(coord => {
                // if these coordinates don't have a cube, cubes.push an inactive cube
                const newCube = {
                    state: 0,
                };
                for (let i = 0; i < dimensions; i++) {
                    const thisDim = totalDimensionSignifiers[i];
                    newCube[thisDim] = coord[i] + testCube[thisDim];
                }
                const collision = cubes.filter(oldCube => !cubesAreNotTheSameCube(oldCube, newCube, dimensions));
                if (collision.length > 1) {
                    throw new Error("oh dear.");
                }
                if (!collision.length) {
                    cubes.push(newCube);
                }
            });
        }
    });
};

const cycleActivity = (originals, dimensions) => {
    const cubes = originals.map(cube => Object.assign({}, cube));
    populateImportantEmptyCubes(cubes, dimensions);
    cubes.forEach(cube => {
        const neighbors = originals.filter(testCube =>
            cubesAreNeighbors(cube, testCube, dimensions));
        const activeNeighbors = activeCubesInGroup(neighbors);
        if (cube.state) {
            // If a cube is active and exactly 2 or 3 of its neighbors are also
            // active, the cube remains active. Otherwise, the cube becomes
            // inactive.
            if (activeNeighbors !== 2 && activeNeighbors !== 3) {
                cube.state = 0;
            }
        } else {
            // If a cube is inactive but exactly 3 of its neighbors are active,
            // the cube becomes active. Otherwise, the cube remains inactive.
            if (activeNeighbors === 3) {
                cube.state = 1;
            }
        }
    });
    return cubes;
};

const prettyPrintCubes = cubes => {
    const result = {};
    cubes.forEach(cube => {
        let z = result["z" + cube.z];
        if (!z) {
            z = result["z" + cube.z] = {};
        }
        let y = z["y" + cube.y];
        if (!y) {
            y = z["y" + cube.y] = {};
        }
        y["x" + cube.x] = cube.state ? "X" : ".";
    });
    console.log(result);
};

const processCubes = (input, times, dimensions) => {
    let cubes = generateCubeGridFromInput(input, dimensions);

    for (let i = 0; i < times; i++) {
        cubes = cycleActivity(cubes, dimensions);
        // prettyPrintCubes(cubes)
    }

    return activeCubesInGroup(cubes);
};

const partOne = input => processCubes(input, 6, 3);
const partTwo = input => processCubes(input, 6, 4);

module.exports = {
    partOne,
    partTwo,
};
