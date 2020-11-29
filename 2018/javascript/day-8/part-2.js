const input = require("./input");
const utils = require("./utils");

const tree = utils.getTree(input);

console.log(`Node value: ${utils.getNodeValue(tree)}`);
