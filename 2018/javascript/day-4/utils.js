const parseRawRecord = rawRecord => {
  rawRecordArray = rawRecord.split(" ");
  const date = new Date(
    `${rawRecordArray[0].replace("[", "")} ${rawRecordArray[1].replace(
      "]",
      ""
    )}`
  );
  const isBeginShiftRecord = rawRecordArray.length === 6;
  if (isBeginShiftRecord) {
    const idGuard = Number.parseInt(rawRecordArray[3].replace("#", ""), 10);
    return {
      date,
      isBeginShiftRecord,
      idGuard,
      isWakingUp: undefined
    };
  }
  const isWakingUp = rawRecordArray[2] === "wakes";
  return {
    date,
    isBeginShiftRecord,
    idGuard: undefined,
    isWakingUp
  };
};

const sortRecordPerDate = recordsArray => {
  return recordsArray.sort((rA, rB) => {
    const dA = rA.date,
      dB = rB.date;
    if (dA.getTime() > dB.getTime()) {
      return 1;
    }
    if (dA.getTime() < dB.getTime()) {
      return -1;
    }
    return 0;
  });
};

const organizeRecordsPerGuard = recordsArray => {
  const organizedRecords = [];
  recordsArray.forEach(record => {
    if (record.isBeginShiftRecord) {
      organizedRecords.push([record]);
    } else {
      const recordWithId = {
        ...record,
        idGuard: organizedRecords[organizedRecords.length - 1][0].idGuard
      };
      organizedRecords[organizedRecords.length - 1].push(recordWithId);
    }
  });
  return organizedRecords;
};

const computeTotalTimeAsleepPerShift = shiftRecords => {
  const shiftRecordsWithoutBeginShift = shiftRecords.filter(
    r => !r.isBeginShiftRecord
  );
  let totalTime = 0;
  let currentFallAsleepDate = undefined;
  shiftRecordsWithoutBeginShift.forEach(r => {
    if (r.isWakingUp) {
      const sleepDuration = r.date.getTime() - currentFallAsleepDate.getTime();
      const hoursAsleep = new Date(sleepDuration).getUTCHours();
      const minutesAssleep = new Date(sleepDuration).getUTCMinutes();
      totalTime += hoursAsleep * 60 + minutesAssleep;
    } else {
      currentFallAsleepDate = r.date;
    }
  });
  return totalTime;
};

const getMinuteSleepingForShiftRecords = shiftRecords => {
  const shiftRecordsWithoutBeginShift = shiftRecords.filter(
    r => !r.isBeginShiftRecord
  );
  const minuteArray = [];
  let currentFallAsleepDate = undefined;
  shiftRecordsWithoutBeginShift.forEach(r => {
    if (r.isWakingUp) {
      const sleepDuration = r.date.getTime() - currentFallAsleepDate.getTime();
      const hoursAsleep = new Date(sleepDuration).getUTCHours();
      const minutesAssleep = new Date(sleepDuration).getUTCMinutes();
      const nbOfMinutes = hoursAsleep * 60 + minutesAssleep;
      for (
        let i = currentFallAsleepDate.getUTCMinutes();
        i < currentFallAsleepDate.getUTCMinutes() + nbOfMinutes;
        i++
      ) {
        minuteArray.push(i);
      }
    } else {
      currentFallAsleepDate = r.date;
    }
  });
  return minuteArray;
};

module.exports = {
  parseRawRecord,
  sortRecordPerDate,
  organizeRecordsPerGuard,
  computeTotalTimeAsleepPerShift,
  getMinuteSleepingForShiftRecords
};
