const computeCellPower = (x, y, serialNumber) => {
  const rackId = x + 10,
    startPowerLevel = rackId * y,
    finalPowerLevel = (startPowerLevel + serialNumber) * rackId,
    finalPowerLevelStrg = finalPowerLevel.toString();
  return (
    Number.parseInt(
      finalPowerLevelStrg.length >= 3
        ? finalPowerLevelStrg[finalPowerLevelStrg.length - 3]
        : "0",
      10
    ) - 5
  );
};

const computeBlockCellPower = (
  topLeftX,
  topLeftY,
  serialNumber,
  width,
  length
) => {
  let totalPower = 0;
  for (let x = topLeftX; x < topLeftX + width; x++) {
    for (let y = topLeftY; y < topLeftY + length; y++) {
      totalPower += computeCellPower(x, y, serialNumber);
    }
  }
  return totalPower;
};

module.exports = {
  computeCellPower,
  computeBlockCellPower
};
