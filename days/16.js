const partOne = (validFields, input) => {
    // I am really, really hoping that one ticket having two fields that would
    // be valid of only one field is out of scope.
    const tickets = input.split('\n').map(line => line.split(',').map(x => +x));
    const validityChecks = validFields.split('\n').map(line =>
        line.split(': ')[1].split(' or ').map(split =>
            split.split('-').map(x => +x)
        )
    );
    let errorRate = 0;
    tickets.forEach(ticket => {
        ticket.forEach(value => {
            let valid = false;
            for (let i = 0; i < validityChecks.length; i++) {
                const checks = validityChecks[i];
                if (
                    (value >= checks[0][0] && value <= checks[0][1]) ||
                    (value >= checks[1][0] && value <= checks[1][1])
                ) {
                    valid = true;
                    continue;
                }
            }
            if (!valid) {
                errorRate += value;
            }
        });
    });
    return errorRate;
};

const partTwo = (validFields, input, myTicket) => {
    const tickets = input.split('\n').map(line => line.split(',').map(x => +x));
    const validityChecks = validFields.split('\n').map(line =>
        line.split(': ')[1].split(' or ').map(split =>
            split.split('-').map(x => +x)
        )
    );
    const discardedTickets = [];
    tickets.forEach((ticket, index) => {
        ticket.forEach(value => {
            let valid = false;
            for (let i = 0; i < validityChecks.length; i++) {
                const checks = validityChecks[i];
                if (
                    (value >= checks[0][0] && value <= checks[0][1]) ||
                    (value >= checks[1][0] && value <= checks[1][1])
                ) {
                    valid = true;
                    continue;
                }
            }
            if (!valid) {
                // probably woulb be better to escape this loop here, but oh well
                discardedTickets.push(index);
            }
        });
    });

    // again writing really, really inefficient code; I'm just going to iterate
    // _again_ now that we've excluded invalid tickets.
    const possibleFields = []; // Number[][]
    for (let i = 0; i < tickets.length; i++) {
        if (discardedTickets.includes(i)) {
            continue;
        }
        const ticket = tickets[i];
        ticket.forEach((value, valueIndex) => {
            // first pass
            if (!possibleFields[valueIndex]) {
                possibleFields[valueIndex] = [];
                validityChecks.forEach((checks, checkIndex) => {
                    if (
                        (value >= checks[0][0] && value <= checks[0][1]) ||
                        (value >= checks[1][0] && value <= checks[1][1])
                    ) {
                        possibleFields[valueIndex].push(checkIndex);
                    }
                });
            } else {
                const thesePossible = possibleFields[valueIndex];
                for (let j = 0; j < validityChecks.length; j++) {
                    if (!thesePossible.includes(j)) {
                        continue;
                    }
                    let checks = validityChecks[j];
                    if ( !(
                        //todo actually apply demorgan's laws here
                        (value >= checks[0][0] && value <= checks[0][1]) ||
                        (value >= checks[1][0] && value <= checks[1][1])
                    )) {
                        // thesePossible delete by value
                        possibleFields[valueIndex] = possibleFields[valueIndex]
                            .filter(val => val !== j);
                    }
                }
            }
        });
    }

    // okay, so now we know that possibleFields is a list of the only fields
    // that are possible, like:
    // [ [ 1 ], [ 0, 1 ], [ 0, 1, 2 ] ]
    // now we have to make a "final answer" list and start popping some keys
    // to solve the puzzle.

    // q: do I really want to write code to solve this, or should I do it by
    //    hand?
    // a: it actually took less time to write the code than I think it would
    //    have to do it by hand, which was surprising to me!

    const answers = {};
    while (Object.keys(answers).length < possibleFields.length) {
        for (let i = 0; i < possibleFields.length; i++) {
            const possible = possibleFields[i];
            if (possible.length === 1) {
                answers[i] = possible[0];
                possibleFields.forEach((value, index) => {
                    possibleFields[index] = possibleFields[index].filter(
                        x => x != possible[0]
                    );
                });
                continue;
            }
        }
    }

    // okay, now answers is a dictionary where the key is the position on our
    // ticket and the value is the line number.
    // this is a song about validFields.  Remember validFields?
    const names = validFields.split('\n').map(field => field.split(': ')[0]);
    Object.keys(answers).forEach(key => {
        const index = answers[key];
        answers[key] = names[index];
    });

    let finallyHere = 1;
    let myTicketValues = myTicket.split(',').map(x => +x);
    Object.keys(answers).forEach(key => {
        const name = answers[key];
        if (name.startsWith('departure')) {
            finallyHere *= myTicketValues[key];
        }
    });

    return finallyHere;
};

module.exports = {
    partOne,
    partTwo
};
