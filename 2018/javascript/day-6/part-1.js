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
      y,
    });
  }
}

const coordInArea = coordInAreaRaw.map((coord) => {
  const distanceArr = pointArr
    .map((point) => ({
      id: point.id,
      distance: utils.computeDistance(coord, point),
    }))
    .sort((a, b) => {
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      return 0;
    });
  const firstDist = distanceArr.shift(),
    secondDist = distanceArr.shift();
  if (firstDist.distance === secondDist.distance) {
    return {
      idOwner: undefined,
      x: coord.x,
      y: coord.y,
    };
  } else {
    return {
      idOwner: firstDist.id,
      x: coord.x,
      y: coord.y,
    };
  }
});

const coordInEdge = coordInArea.filter(
  (coord) =>
    coord.x === minX || coord.x === maxX || coord.y === minY ||
    coord.y === maxY,
);

const pointWithNotInfiniteArea = pointArr.filter((point) =>
  coordInEdge.every((coord) => coord.idOwner !== point.id)
);

const pointArea = pointWithNotInfiniteArea.map((point) => ({
  id: point.id,
  area: coordInArea.filter((coord) => coord.idOwner === point.id).length,
}));

const largestArea = pointArea
  .sort((a, b) => {
    if (a.area > b.area) return 1;
    if (a.area < b.area) return -1;
    return 0;
  })
  .pop().area;

console.log(largestArea);
