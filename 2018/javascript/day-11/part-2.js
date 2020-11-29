const utils = require("./utils");

const areaWidth = 300,
  areaLength = 300,
  serialNumber = 42;

let maxPower = Number.MIN_SAFE_INTEGER,
  xMaxPower,
  yMaxPower,
  sizeMaxPower;

const cellsPower = {};
for (let x = 1; x <= areaWidth; x++) {
  for (let y = 1; y <= areaLength; y++) {
    cellsPower[`x${x}y${y}`] = utils.computeCellPower(x, y, serialNumber);
  }
}

for (let size = 1; size <= 2; size++) {
  const maxFrameForSize = {
    topLeftX: 1,
    topLeftY: 1,
    power: 0,
    size: size,
  };
  // Compute power for initial frame
  for (
    let x = maxFrameForSize.topLeftX; x < maxFrameForSize.topLeftX + size; x++
  ) {
    for (
      let y = maxFrameForSize.topLeftY; y < maxFrameForSize.topLeftY + size; y++
    ) {
      maxFrameForSize.power += cellsPower[`x${x}y${y}`];
    }
  }

  // Move Frame
  if (size !== 300) {
  }
  console.log(`Size ${size} done`);
}

/* console.log(
  `Max power ${maxPower} with size of ${sizeMaxPower} at (${xMaxPower},${yMaxPower})`
); */
