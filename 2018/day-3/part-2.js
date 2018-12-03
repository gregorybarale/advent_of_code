const input = require("./input");
const utils = require("./utils");

const claims = input.map(rawClaim => utils.parseRawClaim(rawClaim));

console.log("Claims done");

const data = claims.map(claim => ({
  claim,
  squareCoord: utils.getSquareArrayFromClaim(claim),
  hasOverLap: false
}));

console.log("Data done");

const coordMap = {};
input
  .map(rawClaim => utils.getSquareArrayFromClaim(utils.parseRawClaim(rawClaim)))
  .reduce((acc, coordArray) => [...acc, ...coordArray], [])
  .forEach(coord => {
    if (coordMap[coord] !== undefined) {
      coordMap[coord] += 1;
    } else {
      coordMap[coord] = 1;
    }
  });

console.log('CoordMap done');

const finalData = data.map(claim => ({
    ...claim,
    hasOverLap: claim.squareCoord.some(coord => coordMap[coord] > 1)
}));

console.log('FinalData done');

console.log(finalData.filter(claim => claim.hasOverLap === false));
