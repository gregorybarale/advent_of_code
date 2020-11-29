const input = require("./input");
const utils = require("./utils");

const parsedInput = input.map((rawRecord) => utils.parseRawRecord(rawRecord));
const sortPerDateParsedInput = utils.sortRecordPerDate(parsedInput);
const shiftsRecords = utils.organizeRecordsPerGuard(sortPerDateParsedInput);

console.log("Raw input compute");

const timeAsleepPerShift = shiftsRecords.map((shifthRecords) => ({
  idGuard: shifthRecords[0].idGuard,
  timeAsleep: utils.computeTotalTimeAsleepPerShift(shifthRecords),
}));

console.log("Time asleep per shift compute");

const totalTimeAsleepPerGuard = {};
timeAsleepPerShift.forEach((obj) => {
  if (totalTimeAsleepPerGuard[obj.idGuard] === undefined) {
    totalTimeAsleepPerGuard[obj.idGuard] = obj.timeAsleep;
  } else {
    totalTimeAsleepPerGuard[obj.idGuard] =
      totalTimeAsleepPerGuard[obj.idGuard] + obj.timeAsleep;
  }
});

const maxTimeAsleep = Object.values(totalTimeAsleepPerGuard)
  .sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  })
  .pop();
let bigSleeperId = undefined;
for (let idGuard in totalTimeAsleepPerGuard) {
  if (totalTimeAsleepPerGuard[idGuard] === maxTimeAsleep) {
    bigSleeperId = Number.parseInt(idGuard, 10);
  }
}
console.log(`Big sleeper found: ${bigSleeperId}`);

const shiftsRecordsFromBigSleeper = shiftsRecords.filter(
  (shiftRecords) => shiftRecords[0].idGuard === bigSleeperId,
);

console.log("Big sleeper shifts records filtered");

const minutesAsleepForBigSleeperDetails = shiftsRecordsFromBigSleeper.map(
  (shiftRecords) => utils.getMinuteSleepingForShiftRecords(shiftRecords),
);
const minutesAsleepForBigSleeperCount = {};
minutesAsleepForBigSleeperDetails
  .reduce((acc, nextArray) => [...acc, ...nextArray], [])
  .forEach((minute) => {
    if (minutesAsleepForBigSleeperCount[minute] === undefined) {
      minutesAsleepForBigSleeperCount[minute] = 1;
    } else {
      minutesAsleepForBigSleeperCount[minute] =
        minutesAsleepForBigSleeperCount[minute] + 1;
    }
  });

console.log("Big sleeper minutes count done");

const maxMinuteCountAsleep = Object.values(minutesAsleepForBigSleeperCount)
  .sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  })
  .pop();

let minuteMostSlept;
for (let minute in minutesAsleepForBigSleeperCount) {
  if (minutesAsleepForBigSleeperCount[minute] === maxMinuteCountAsleep) {
    minuteMostSlept = Number.parseInt(minute, 10);
  }
}

console.log("Final result");
console.log(`Id Guard: ${bigSleeperId}`);
console.log(`Minute most slept: ${minuteMostSlept}`);
console.log(`Id Guard * Minute most slept: ${bigSleeperId * minuteMostSlept}`);
