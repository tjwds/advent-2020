const rotateDir = (start, deg, reverse) => {
    // bad hack because I forgot all my pre-calc
    const directions = reverse ? ['N', 'W', 'S', 'E'] : ['N', 'E', 'S', 'W'];
    if (directions.indexOf(start) < 0) {
        throw new Error(`Invalid start direction ${start} given`);
    }
    const mod = ((deg / 90) + directions.indexOf(start)) % 4;
    return directions[mod];
};

// this mirrors, not rotates!!
// const rotateWaypoint = (waypoint, deg, reverse) => {
//     const quadrants = reverse ? ['I', 'II', 'III', 'IV'] : ['I', 'IV', 'III', 'II'];
//     // figure out which direction the waypoint lies to get our index
//     let start = 'I';
//     if (waypoint.east < 0 && waypoint.north >= 0) {
//         start = 'II';
//     }
//     if (waypoint.east < 0 && waypoint.north < 0) {
//         start = 'III';
//     }
//     if (waypoint.east >= 0 && waypoint.north < 0) {
//         start = 'IV';
//     }

//     // figure out the new direction
//     console.log(start)
//     console.log(((deg / 90) + quadrants.indexOf(start)) % 4)
//     const transform = quadrants[((deg / 90) + quadrants.indexOf(start)) % 4];
//     console.log(transform)

//     // set the direction by abs and multiplying by negative -1 where applicable
//     switch (transform) {
//         case 'I':
//             waypoint.east = Math.abs(waypoint.east);
//             waypoint.north = Math.abs(waypoint.north);
//             break;
//         case 'II':
//             waypoint.east = Math.abs(waypoint.east) * -1;
//             waypoint.north = Math.abs(waypoint.north);
//             break;
//         case 'III':
//             waypoint.east = Math.abs(waypoint.east) * -1;
//             waypoint.north = Math.abs(waypoint.north) * -1;
//             break;
//         case 'IV':
//             waypoint.east = Math.abs(waypoint.east);
//             waypoint.north = Math.abs(waypoint.north) * -1;
//             break;
//         default:
//             break;
//     }
//
//     // return waypoint;
//
// };

// advice from https://github.com/apisdel/aoc/blob/master/2020/12/index.mjs
// 90 deg rotation is the same as swapping coordinates and inverting the sign of the x(right), y(left) coordinate
const rotateWaypoint = (waypoint, deg, reverse) => {
    let numTimes = deg / 90;
    while (numTimes > 0) {
        if (reverse) {
            let hold = waypoint.north;
            waypoint.north = waypoint.east;
            waypoint.east = hold * -1;
        } else {
            let hold = waypoint.east;
            waypoint.east = waypoint.north;
            waypoint.north = hold * -1;
        }
        numTimes--;
    }
    return waypoint;
};

const movement = {
    'N': (amount, target) => target.north += amount,
    'S': (amount, target) => target.north -= amount,
    'E': (amount, target) => target.east += amount,
    'W': (amount, target) => target.east -= amount,
    'L': (amount, target) => target.dir = rotateDir(target.dir, amount, true),
    'R': (amount, target) => target.dir = rotateDir(target.dir, amount),
    'F': (amount, target) => movement[target.dir](amount, target),
};

const Ship = {
    dir: 'E',
    east: 0,
    north: 0,
};

const Waypoint = {
    east: 10,
    north: 1,
};

const partOne = input => {
    const commands = input.split('\n');
    commands.forEach(command =>
        movement[command.slice(0, 1)](+command.slice(1), Ship)
    );
    return Math.abs(Ship.east) + Math.abs(Ship.north);
};

const partTwo = input => {
    movement.F = (amount, waypoint, ship) => {
        ship.east += (waypoint.east * amount);
        ship.north += (waypoint.north * amount);
    };
    movement.L = (amount, waypoint) => {
        rotateWaypoint(waypoint, amount, true);
    };
    movement.R = (amount, waypoint) => {
        rotateWaypoint(waypoint, amount);
    };
    const commands = input.split('\n');
    commands.forEach(command =>
        movement[command.slice(0, 1)](+command.slice(1), Waypoint, Ship)
    );
    return Math.abs(Ship.east) + Math.abs(Ship.north);
};

module.exports = { partOne, partTwo };
