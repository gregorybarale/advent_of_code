const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: "(())", result: 0 },
  { input: "()()", result: 0 },
  { input: "(((", result: 3 },
  { input: "(()(()(", result: 3 },
  { input: "))(((((", result: 3 },
  { input: "())", result: -1 },
  { input: "))(", result: -1 },
  { input: ")))", result: -3 },
  { input: ")())())", result: -3 }
];

const testCases2 = [{ input: ")", result: 1 }, { input: "()())", result: 5 }];

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
