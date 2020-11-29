const utils = require("./utils");

const squareWidth = 3,
  squareLength = 3,
  areaWidth = 300,
  areaLength = 300,
  serialNumber = 9798;

let maxPower = Number.MIN_SAFE_INTEGER,
  xMaxPower,
  yMaxPower;

for (let x = 1; x < areaWidth - squareWidth + 1; x++) {
  for (let y = 1; y < areaLength - squareLength + 1; y++) {
    const power = utils.computeBlockCellPower(
      x,
      y,
      serialNumber,
      squareWidth,
      squareLength,
    );
    if (power > maxPower) {
      maxPower = power;
      xMaxPower = x;
      yMaxPower = y;
    }
  }
}

console.log(`Max power ${maxPower} at (${xMaxPower},${yMaxPower})`);
