const fs = require('fs');

const txtToArray = (path) => fs.readFileSync(path, {
    encoding: 'utf8'
}).split("\n")

module.exports = { txtToArray };