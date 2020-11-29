const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: [
    "",
    "abc",
    "aaa\"aaa",
    "\x27"
  ], result: 12 }
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
