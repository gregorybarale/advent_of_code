const assert = require("assert");
const txtFileParser = require("./txt-file-parser");

const numberArray = [
    3,
    8,
    -5,
    15,
    9,
    -17,
    11,
    -6,
    11,
    -14,
    -11,
    6,
    9,
    -7,
    19,
    -17,
    -18
];

txtFileParser
    .parseToArray("./number-array.txt", s => Number.parseInt(s, 10))
    .forEach((n, i) => {
        assert.strictEqual(n, numberArray[i]);
    });
