const input = require("./input");
const utils = require("./utils");

const parsedInput = input.map(rawRecord => utils.parseRawRecord(rawRecord));
const sortPerDateParsedInput = utils.sortRecordPerDate(parsedInput);
const shiftsRecords = utils.organizeRecordsPerGuard(sortPerDateParsedInput);

console.log("Raw input compute");

const minutesAsleepDetails = shiftsRecords.map(shiftRecords => ({
  idGuard: shiftRecords[0].idGuard,
  minutesSlept: utils.getMinuteSleepingForShiftRecords(shiftRecords)
}));

console.log("Minutes asleep details compute");

const minutesAsleepperGuardsObj = {};
minutesAsleepDetails.forEach(obj => {
  if (minutesAsleepperGuardsObj[obj.idGuard] === undefined) {
    minutesAsleepperGuardsObj[obj.idGuard] = obj.minutesSlept;
  } else {
    minutesAsleepperGuardsObj[obj.idGuard] = [
      ...minutesAsleepperGuardsObj[obj.idGuard],
      ...obj.minutesSlept
    ];
  }
});

const minutesAsleepperGuardsArray = Object.keys(minutesAsleepperGuardsObj).map(
  idGuard => ({
    idGuard,
    minutesArray: minutesAsleepperGuardsObj[idGuard]
  })
);

console.log("Minutes asleep per guards compute");

const minutesAsleepperGuardsArrayWithCount = minutesAsleepperGuardsArray.map(
  ({ idGuard, minutesArray }) => {
    const minutesCounter = {};
    minutesArray.forEach(minute => {
      if (minutesCounter[minute] === undefined) {
        minutesCounter[minute] = 1;
      } else {
        minutesCounter[minute] += 1;
      }
    });
    return {
      idGuard,
      minutesCounter
    };
  }
);

const minutesAsleepperGuardsArrayWithMaxMinute = minutesAsleepperGuardsArrayWithCount.map(
  ({ idGuard, minutesCounter }) => {
    if (Object.values(minutesCounter).length === 0) {
      return {
        idGuard,
        minute: null,
        count: 0
      };
    }
    const count = Object.values(minutesCounter)
      .sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      })
      .pop();
    let minute = undefined;
    for (let m in minutesCounter) {
      if (minutesCounter[m] === count) {
        minute = Number.parseInt(m, 10);
      }
    }

    return {
      idGuard,
      minute,
      count
    };
  }
);

const minutesAsleepperGuardsArrayWithMaxMinuteSorted = minutesAsleepperGuardsArrayWithMaxMinute.sort(
  (a, b) => {
    if (a.count > b.count) return 1;
    if (a.count < b.count) return -1;
    return 0;
  }
);

const theFinalMaxiSleeperGuardOnThisMinute = minutesAsleepperGuardsArrayWithMaxMinuteSorted.pop();

console.log(`The guard: ${theFinalMaxiSleeperGuardOnThisMinute}`);
console.log(
  `Final result: ${theFinalMaxiSleeperGuardOnThisMinute.idGuard *
    theFinalMaxiSleeperGuardOnThisMinute.minute}`
);
