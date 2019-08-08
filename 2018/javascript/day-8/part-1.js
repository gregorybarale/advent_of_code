const input = require("./input");
const utils = require("./utils");

const tree = utils.getTree(input);

console.log(`Sum: ${utils.getSum(tree)}`);
