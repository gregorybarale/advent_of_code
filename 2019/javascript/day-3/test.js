const assert = require("assert");
const fn = require("./fn");

const testCases1 = [
  {
    input: ['R8,U5,L5,D3', 'U7,R6,D4,L4'], result: 6
  },
  {
    input: ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'], result: 159
  },
  {
    input: ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'], result: 135
  },
];

const testCases2 = [
  {
    input: ['R8,U5,L5,D3', 'U7,R6,D4,L4'], result: 30
  },
  {
    input: ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'], result: 610
  },
  {
    input: ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'], result: 410
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
