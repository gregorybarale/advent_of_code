const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: "2x3x4", result: 58 },
  { input: "1x1x10", result: 43 }
];

const testCases2 = [
  { input: "2x3x4", result: 34 },
  { input: "1x1x10", result: 14 }
];

testCases1.forEach(testCase => {
  assert.equal(
    fn.fn1(testCase.input),
    testCase.result,
    `Expect ${testCase.result} for ${
      testCase.input
    } input in part 1 instead of ${fn.fn1(testCase.input)}`
  );
});

testCases2.forEach(testCase => {
  assert.equal(
    fn.fn2(testCase.input),
    testCase.result,
    `Expect ${testCase.result} for ${
      testCase.input
    } input in part 2 instead of ${fn.fn2(testCase.input)}`
  );
});
