const input = require('./input');

const result = input.reduce((acc, next) => acc + next, 0);
console.log(result);
