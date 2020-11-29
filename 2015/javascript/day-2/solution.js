const input = require("./input");
const fn = require("./fn");

console.log(
  `Solution for part 1 is ${input.reduce((acc, x) => acc + fn.fn1(x), 0)}`,
);
console.log(
  `Solution for part 2 is ${input.reduce((acc, x) => acc + fn.fn2(x), 0)}`,
);
