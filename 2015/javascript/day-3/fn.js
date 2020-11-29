const fn1 = (input) => {
  const intructions = input.split("");
  const coords = { latitude: 0, longitude: 0 };
  const visitedHousesCoords = {
    "0x0": 1,
  };
  intructions.forEach((element) => {
    switch (element) {
      case ">":
        coords.longitude = coords.longitude + 1;
        break;
      case "<":
        coords.longitude = coords.longitude - 1;
        break;
      case "^":
        coords.latitude = coords.latitude + 1;
        break;
      case "v":
        coords.latitude = coords.latitude - 1;
        break;
    }
    const visitedHouseCoord = `${coords.latitude}x${coords.longitude}`;
    if (visitedHousesCoords[visitedHouseCoord]) {
      visitedHousesCoords[visitedHouseCoord] =
        visitedHousesCoords[visitedHouseCoord] + 1;
    } else {
      visitedHousesCoords[visitedHouseCoord] = 1;
    }
  });
  return Object.keys(visitedHousesCoords).length;
};

const fn2 = (input) => {
  const intructions = input.split("");
  const santaCoords = { latitude: 0, longitude: 0 };
  const robotCoords = { latitude: 0, longitude: 0 };
  const visitedHousesCoords = {
    "0x0": 1,
  };
  intructions.forEach((element, index) => {
    let visitedHouseCoord;
    if (index % 2 === 0) {
      switch (element) {
        case ">":
          santaCoords.longitude = santaCoords.longitude + 1;
          break;
        case "<":
          santaCoords.longitude = santaCoords.longitude - 1;
          break;
        case "^":
          santaCoords.latitude = santaCoords.latitude + 1;
          break;
        case "v":
          santaCoords.latitude = santaCoords.latitude - 1;
          break;
      }
      visitedHouseCoord = `${santaCoords.latitude}x${santaCoords.longitude}`;
    } else {
      switch (element) {
        case ">":
          robotCoords.longitude = robotCoords.longitude + 1;
          break;
        case "<":
          robotCoords.longitude = robotCoords.longitude - 1;
          break;
        case "^":
          robotCoords.latitude = robotCoords.latitude + 1;
          break;
        case "v":
          robotCoords.latitude = robotCoords.latitude - 1;
          break;
      }
      visitedHouseCoord = `${robotCoords.latitude}x${robotCoords.longitude}`;
    }
    if (visitedHousesCoords[visitedHouseCoord]) {
      visitedHousesCoords[visitedHouseCoord] =
        visitedHousesCoords[visitedHouseCoord] + 1;
    } else {
      visitedHousesCoords[visitedHouseCoord] = 1;
    }
  });
  return Object.keys(visitedHousesCoords).length;
};

module.exports = {
  fn1,
  fn2,
};
