const fs = require('fs');

/**
 * Function to get the .txt file as a string
 */
const getFile = (path) => fs.readFileSync(path, {
    encoding: 'utf8'
});

/**
 * Function to get the .txt file as an array. You can provide a line parser
 */
const parseToArray = (path, lineParser = x => x) => getFile(path).split("\n").map(line => lineParser(line))

module.exports = { getFile, parseToArray };