const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  {
    input: [
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L"
    ],
    result: 42
  }
];

const testCases2 = [
  {
    input: [
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L",
      "K)YOU",
      "I)SAN",
    ],
    result: 4
  }
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
