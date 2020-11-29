const input = require("./input");
const fn = require("./fn");

console.log(
  `Solution for part 1 is ${
    fn.fn(input.split(",").map((s) => Number.parseInt(s, 10)), 1)
  }`,
);
console.log(
  `Solution for part 2 is ${
    fn.fn(input.split(",").map((s) => Number.parseInt(s, 10)), 5)
  }`,
);
