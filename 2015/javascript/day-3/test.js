const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: ">", result: 2 },
  { input: "^>v<", result: 4 },
  { input: "^v^v^v^v^v", result: 2 },
];

const testCases2 = [
  { input: "^v", result: 3 },
  { input: "^>v<", result: 3 },
  { input: "^v^v^v^v^v", result: 11 },
];

testCases1.forEach((testCase) => {
  assert.equal(
    fn.fn1(testCase.input),
    testCase.result,
    `Expect ${testCase.result} for ${testCase.input} input in part 1 instead of ${
      fn.fn1(testCase.input)
    }`,
  );
});

testCases2.forEach((testCase) => {
  assert.equal(
    fn.fn2(testCase.input),
    testCase.result,
    `Expect ${testCase.result} for ${testCase.input} input in part 2 instead of ${
      fn.fn2(testCase.input)
    }`,
  );
});
