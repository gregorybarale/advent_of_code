const fn = require("./fn");

const testCases1 = [
  {
    input: [3, 0, 4, 0, 99],
  },
  {
    input: [1002, 4, 3, 4, 33],
  },
];

const testCases2 = [
  {
    input: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    values: [0, 8],
    description:
      "Using position mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).",
  },
  {
    input: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    values: [0, 9],
    description:
      "Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).",
  },
  {
    input: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    values: [0, 8],
    description:
      "Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).",
  },
  {
    input: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    values: [0, 9],
    description:
      "Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).",
  },
  {
    input: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    values: [0, 8],
    description:
      "Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero: using position mode",
  },
  {
    input: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
    values: [0, 8],
    description:
      "Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero: using immediate mode",
  },
  {
    input: [
      3,
      21,
      1008,
      21,
      8,
      20,
      1005,
      20,
      22,
      107,
      8,
      21,
      20,
      1006,
      20,
      31,
      1106,
      0,
      36,
      98,
      0,
      0,
      1002,
      21,
      125,
      20,
      4,
      20,
      1105,
      1,
      46,
      104,
      999,
      1105,
      1,
      46,
      1101,
      1000,
      1,
      20,
      4,
      20,
      1105,
      1,
      46,
      98,
      99,
    ],
    values: [0, 8, 10],
    description:
      "The program will then output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8.",
  },
];

//testCases1.forEach(testCase => {
//    fn.fn(testCase.input, 42);
//});

testCases2.forEach((testCase) => {
  testCase.values.forEach((value) => {
    console.log("----- New Test -----");
    console.log(testCase.description);
    console.log("Input:", testCase.input);
    console.log("Value:", value);
    fn.fn(testCase.input, value);
  });
});
