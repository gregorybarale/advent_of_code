const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  {
    input: '111111', result: true
  },
  {
    input: '223450', result: false
  },
  {
    input: '123789', result: false
  },
];

const testCases2 = [
  {
    input: '112233', result: true
  },
  {
    input: '123444', result: false
  },
  {
    input: '111122', result: true
  },
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
