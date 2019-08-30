const input = require("./input");
const fn = require("./fn");

console.log(
  `Solution for part 1 is ${input.reduce((acc, x) => {
    return fn.fn1(x) ? acc + 1 : acc;
  }, 0)}`
);
console.log(
  `Solution for part 2 is ${input.reduce((acc, x) => {
    return fn.fn2(x) ? acc + 1 : acc;
  }, 0)}`
);
