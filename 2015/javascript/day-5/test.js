const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: "ugknbfddgicrmopn", result: true },
  { input: "aaa", result: true },
  { input: "jchzalrnumimnmhp", result: false },
  { input: "haegwjzuvuyypxyu", result: false },
  { input: "dvszwmarrgswjxmb", result: false },
];

const testCases2 = [
  { input: "qjhvhtzxzqqjkmpb", result: true },
  { input: "xxyxx", result: true },
  { input: "uurcxstgmygtbstg", result: false },
  { input: "ieodomkazucvgmuy", result: false },
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
      fn.fn1(testCase.input)
    }`,
  );
});
