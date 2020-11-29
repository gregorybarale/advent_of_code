const utils = require("./utils");
const input = require("./input");

const result = input
  .map((id) =>
    input
      .filter((otherId) => otherId !== id)
      .map((otherId) => utils.compareId(id, otherId))
      .filter(({ diffA }) => diffA.length === 1)
  )
  .filter((arr) => arr.length !== 0)
  .map(([x]) => x)[0].same;

console.log(result);
