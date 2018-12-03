const input = require("./input");
const utils = require("./utils");

console.log(input.map(rawClaim => utils.parseRawClaim(rawClaim)));
