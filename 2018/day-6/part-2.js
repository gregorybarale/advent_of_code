const input = require("./input");
const utils = require("./utils");

// TODO REFACTOR IT

const pointArr = utils.processPoint(input);

const [minX, maxX, minY, maxY] = utils.getMinMaxGlobalArea(pointArr);

const coordInAreaRaw = [];
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    coordInAreaRaw.push({
      x,
      y
    });
  }
}

const coordInArea = coordInAreaRaw.map(coord => {
  const totalDistance = pointArr
    .map(point => utils.computeDistance(coord, point)).reduce((acc, distance) => acc + distance, 0);
  return totalDistance;
});

const regionSize = coordInArea.filter(totalDistance => totalDistance < 10000).length;

console.log(regionSize);
