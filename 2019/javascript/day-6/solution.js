const parser = require(
  "../../../utils/javascript/txt-file-parser/txt-file-parser",
);
const fn = require("./fn");

console.log(
  `Solution for part 1 is ${
    fn.fn1(parser.parseToArray("./input.txt", (x) => x))
  }`,
);
console.log(
  `Solution for part 2 is ${
    fn.fn2(parser.parseToArray("./input.txt", (x) => x))
  }`,
);
