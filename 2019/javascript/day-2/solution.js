const input = require("./input");
const fn = require("./fn");

function prepareInput(input) {
  const array = input.split(",").map((x) => Number.parseInt(x, 10));
  array[1] = 12;
  array[2] = 2;
  return array.join(",");
}

console.log(
  `Solution for part 1 is ${fn.fn1(prepareInput(input))[0]}`,
);
console.log(
  `Solution for part 2 is ${fn.fn2(input, 19690720)}`,
);
