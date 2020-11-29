const input = require("./input");
const utils = require("./utils");

const allCoordArray = input
  .map((rawClaim) =>
    utils.getSquareArrayFromClaim(utils.parseRawClaim(rawClaim))
  )
  .reduce((acc, coordArray) => [...acc, ...coordArray], []);

const coordMap = {};
allCoordArray.forEach((coord) => {
  if (coordMap[coord] !== undefined) {
    coordMap[coord] += 1;
  } else {
    coordMap[coord] = 1;
  }
});

const nbOfShareSquare = Object.values(coordMap).filter((n) => n > 1).length;

console.log(nbOfShareSquare);
