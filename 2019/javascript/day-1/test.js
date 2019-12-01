const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: 12, result: 2 },
  { input: 14, result: 2 },
  { input: 1969, result: 654 },
  { input: 100756, result: 33583 },
];

const testCases2 = [
  { input: 14, result: 2 },
  { input: 1969, result: 966 },
  { input: 100756, result: 50346 },
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
