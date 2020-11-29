const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: "abcdef", result: 609043 },
  { input: "pqrstuv", result: 1048970 },
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
