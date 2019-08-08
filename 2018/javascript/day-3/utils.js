const parseRawClaim = strg => {
  const [rawID, _, rawCoordonate, rawDimension] = strg.split(" "),
    id = rawID.replace("#", ""),
    [left, top] = rawCoordonate.replace(":", "").split(","),
    [width, height] = rawDimension.split("x");
  return {
    id: Number.parseInt(id, 10),
    left: Number.parseInt(left, 10),
    top: Number.parseInt(top, 10),
    width: Number.parseInt(width, 10),
    height: Number.parseInt(height, 10)
  };
};

const getSquareArrayFromClaim = (claim) => {
  let squareArray = [];
  for(let x = claim.left + 1; x <= claim.left + claim.width; x++) {
    for(let y = claim.top + 1; y <= claim.top + claim.height; y++) {
      squareArray = [...squareArray, `x${x}y${y}`];
    }
  }
  return squareArray;
}

module.exports = {
  parseRawClaim,
  getSquareArrayFromClaim
};
