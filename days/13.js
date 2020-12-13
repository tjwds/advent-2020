// no input file today, because this is just weird

const startMinutes = 1002576; // …that's over 696 days.
const busIdsString = '13,x,x,x,x,x,x,37,x,x,x,x,x,449,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,773,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17';

// const startMinutes = 939;
// const busIdsString = "7,13,x,x,59,x,31,19";

const busEntries = busIdsString.split(',');
const busIds = busEntries.filter(x => x !== 'x').map(x => +x);
const busSplits = busIds.map(bus => bus - busEntries.indexOf(bus + ''));

// const busIds = [3, 5, 7];
// const busSplits = [2, 3, 2];

const partOne = () => {
    let lowestWait = Infinity;
    let bestBus = 0;
    busIds.forEach(bus => {
        const overtime = (bus - startMinutes % bus);
        if (overtime < lowestWait) {
            bestBus = bus;
            lowestWait = overtime;
        }
    });
    return lowestWait * bestBus;
};

// const partTwo = () => {
//     // However, with so many bus IDs in your list, surely the actual earliest timestamp will be larger than 100000000000000!
//     let test = busIds[0];
//     while (true) {
//         if (busIds.every((bus, index) => !((test + busSplits[index]) % bus))) return test;
//         test += busIds[0];
//     }
// }

// This was so frustrating.  Just implemented what was described in this video:
// https://www.youtube.com/watch?v=0dbXaSkZ-vc
const partTwo = () => {
    const bigM = busIds.reduce((a, b) => a * b);
    const bigMs = busIds.map(bus => bigM / bus);
    const Ys = bigMs.map((M, index) => {
        let y = 1;
        while (true) {
            if ((M * y) % busIds[index] === 1) return y;
            y++;
        }
    });
    let X = BigInt(0);
    for (let n = 0; n < busIds.length; n++) {
        X += BigInt(busSplits[n]) * BigInt(bigMs[n]) * BigInt(Ys[n]);
    }

    return X % BigInt(bigM);
};

module.exports = { partOne, partTwo };
