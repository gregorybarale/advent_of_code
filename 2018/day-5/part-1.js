const input = require("./input");
const utils = require("./utils");

const inputArr = input.split("");
const result = utils.reactChain(inputArr);

console.log(result.length);
