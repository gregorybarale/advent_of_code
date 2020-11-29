const fn1 = (dimension) => {
  const dimensionArray = dimension.split("x");
  const areas = [
    dimensionArray[0] * dimensionArray[1],
    dimensionArray[0] * dimensionArray[2],
    dimensionArray[1] * dimensionArray[2],
  ].sort((a, b) => a - b);
  return 3 * areas[0] + 2 * areas[1] + 2 * areas[2];
};

const fn2 = (dimension) => {
  const dimensionArray = dimension.split("x");
  const sortedDimensionArray = dimensionArray
    .map((x) => Number.parseInt(x, 10))
    .sort((a, b) => +a - +b);
  return (
    2 * sortedDimensionArray[0] +
    2 * sortedDimensionArray[1] +
    sortedDimensionArray[0] * sortedDimensionArray[1] * sortedDimensionArray[2]
  );
};

module.exports = {
  fn1,
  fn2,
};
