const parseRawData = (rawData) => {
  const regexResult =
    /^position=<( *-?\d+),( *-?\d+)> velocity=<( *-?\d+),( *-?\d+)>$/gm.exec(
      rawData,
    );
  return {
    x: Number.parseInt(regexResult[1].trim(), 10),
    y: Number.parseInt(regexResult[2].trim(), 10),
    dx: Number.parseInt(regexResult[3].trim(), 10),
    dy: Number.parseInt(regexResult[4].trim(), 10),
  };
};

const getAreaCorners = (stars) => {
  const arrayX = stars.map((star) => star.x),
    arrayY = stars.map((star) => star.y);
  return [
    Math.min(...arrayX),
    Math.max(...arrayX),
    Math.min(...arrayY),
    Math.max(...arrayY),
  ];
};

const moveStars = (stars) => {
  stars.forEach((star) => {
    star.x += star.dx;
    star.y += star.dy;
  });
};

const printGalaxy = (stars, time, minX, maxX, minY, maxY) => {
  console.log(`-- Galaxy at ${time}`);
  for (let y = minY; y <= maxY; y++) {
    let line = "";
    for (let x = minX; x <= maxX; x++) {
      line += stars.find((star) => star.x === x && star.y === y) !== undefined
        ? "#"
        : ".";
    }
    console.log(line);
  }
};

module.exports = {
  parseRawData,
  getAreaCorners,
  printGalaxy,
  moveStars,
};
