const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  { input: '1,0,0,0,99', result: '2,0,0,0,99' },
  { input: '2,3,0,3,99', result: '2,3,0,6,99' },
  { input: '2,4,4,5,99,0', result: '2,4,4,5,99,9801' },
  { input: '1,1,1,4,99,5,6,0,99', result: '30,1,1,4,2,5,6,0,99' },
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

//testCases2.forEach(testCase => {
//  assert.equal(
//    fn.fn2(testCase.input),
//    testCase.result,
//    `Expect ${testCase.result} for ${
//    testCase.input
//    } input in part 2 instead of ${fn.fn2(testCase.input)}`
//  );
//});
