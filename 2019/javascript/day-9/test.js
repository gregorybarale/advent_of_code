const fn = require("./fn");

const testCases1 = [
    {
        input: [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]
    },
    {
        input: [1102, 34915192, 34915192, 7, 4, 7, 99, 0]
    },
    {
        input: [104, 1125899906842624, 99]
    }
];

const testCases2 = [
];

testCases1.forEach(testCase => {
    fn.fn(testCase.input, 42);
});

// testCases2.forEach(testCase => {
//     testCase.values.forEach(value => {
//         console.log("----- New Test -----");
//         console.log(testCase.description);
//         console.log("Input:", testCase.input);
//         console.log("Value:", value);
//         fn.fn(testCase.input, value)
//     });
// });
