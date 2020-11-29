const computeDistance = (coord1, coord2) => {
  return Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);
};

const processPoint = (input) => {
  return input.map((raw) => ({
    id: raw.replace(", ", ""),
    x: Number.parseInt(raw.split(",")[0], 10),
    y: Number.parseInt(raw.split(",")[1].replace(" ", ""), 10),
  }));
};

const getMinMaxGlobalArea = (pointArr) => {
  return [
    (minX = Math.min(...pointArr.map((coord) => coord.x))),
    (maxX = Math.max(...pointArr.map((coord) => coord.x))),
    (minY = Math.min(...pointArr.map((coord) => coord.y))),
    (maxY = Math.max(...pointArr.map((coord) => coord.y))),
  ];
};

module.exports = {
  computeDistance,
  processPoint,
  getMinMaxGlobalArea,
};
