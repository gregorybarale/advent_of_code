const input = require("./input");
const utils = require("./utils");

const parsedInput = input.map(rawRecord => utils.parseRawRecord(rawRecord));
const sortPerDateParsedInput = utils.sortRecordPerDate(parsedInput);
const shiftsRecords = utils.organizeRecordsPerGuard(sortPerDateParsedInput);

console.log('Raw input compute');

const timeAsleepPerShift = shiftsRecords.map(shifthRecords => ({
    idGuard: shifthRecords[0].idGuard,
    timeAsleep: utils.computeTotalTimeAsleepPerShift(shifthRecords)
}));

console.log('Time asleep per shift compute');

const totalTimeAsleepPerGuard = {};
timeAsleepPerShift.forEach(obj => {
    if(totalTimeAsleepPerGuard[obj.idGuard] === undefined) {
        totalTimeAsleepPerGuard[obj.idGuard] = obj.timeAsleep;
    } else {
        totalTimeAsleepPerGuard[obj.idGuard] = totalTimeAsleepPerGuard[obj.idGuard] + obj.timeAsleep
    }
});

const maxTimeAsleep = Object.values(totalTimeAsleepPerGuard).sort().pop();
let bigSleeperId = undefined;
for(let idGuard in totalTimeAsleepPerGuard) {
    if(totalTimeAsleepPerGuard[idGuard] === maxTimeAsleep) {
        bigSleeperId = idGuard;
    }
}

console.log(`Big sleeper found: ${bigSleeperId}`);
