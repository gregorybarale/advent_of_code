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

module.exports = {
  parseRawClaim
};
