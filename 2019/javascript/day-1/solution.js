const parser = require(
  "../../../utils/javascript/txt-file-parser/txt-file-parser",
);
const fn = require("./fn");

console.log(
  `Solution for part 1 is ${
    parser
      .parseToArray("./input.txt", (x) => Number.parseInt(x, 10))
      .map((n) => fn.fn1(n))
      .reduce((acc, n) => acc + n, 0)
  }`,
);
console.log(
  `Solution for part 2 is ${
    parser
      .parseToArray("./input.txt", (x) => Number.parseInt(x, 10))
      .map((n) => fn.fn2(n))
      .reduce((acc, n) => acc + n, 0)
  }`,
);
