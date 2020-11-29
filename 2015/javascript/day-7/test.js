const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  {
    input: [
      "123 -> x",
      "456 -> y",
      "x AND y -> d",
      "x OR y -> e",
      "x LSHIFT 2 -> f",
      "y RSHIFT 2 -> g",
      "NOT x -> h",
      "NOT y -> i",
    ],
    result: {
      d: 72,
      e: 507,
      f: 492,
      g: 114,
      h: 65412,
      i: 65079,
      x: 123,
      y: 456,
    },
  },
];

testCases1.forEach((testCase) => {
  const result = fn.fn1(testCase.input);
  Object.keys(result).forEach((key) => {
    assert.equal(
      result[key],
      testCase.result[key],
      `Expect ${testCase.result[key]} for ${key} input in part 1 instead of ${
        result[key]
      }`,
    );
  });
});
