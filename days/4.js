const requiredPassportFields = [
    ["byr", input => input.length === 4 && input >= 1920 && input <= 2002],
    ["iyr", input => input.length === 4 && input >= 2010 && input <= 2020],
    ["eyr", input => input.length === 4 && input >= 2020 && input <= 2030],
    ["hgt", input => {
        if (!input.match(/[0-9]*(cm|in)/)) {
            return false;
        }
        const num = input.match(/[0-9]*/);
        if (input.endsWith('cm')) {
            return num[0] >= 150 && num[0] <= 193;
        } else if (input.endsWith('in')) {
            return num[0] >= 59 && num[0] <= 76;
        }
        return false;
    }],
    ["hcl", input => !!input.match(/#[0-9a-f]{6}/)],
    ["ecl", input => !!input.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)],
    ["pid", input =>  !!input.match(/^[0-9]{9}$/)],
    // "cid",
];

const partOne = input => {
    let valid = 0;
    const passports = input.split('\n\n');
    passports.forEach(passport => {
        if (requiredPassportFields.every(
            req => passport.includes(req[0] + ":")
        )) {
            valid++;
        }
    })
    console.log(valid)
}

const partTwo = input => {
    let valid = 0;
    const passports = input.split('\n\n');
    // generate required passport regexen
    requiredPassportFields.forEach(req => {
        const regexReq = new RegExp(req[0] + ":([a-z0-9#]*)", 'mg');
        req.push(regexReq)
    })
    passports.forEach(passport => {
        if (requiredPassportFields.every(req => {
            const match = passport.match(req[2]);
            if (match) {
                //meant for this to have a capturing group, /shrug
                const matchRes = match[0].split(':')[1];
                if (req[1](matchRes)) {
                    return true;
                }
            }
        })) {
            valid++;
        }
    })
    console.log(valid)
}

module.exports = {
    partOne,
    partTwo,
};
