const input = require("./input");
const utils = require("./utils");

const inputArr = input.split("");
const dictionnaryArr = "abcdefghijklmnopqrstuvwxyz".split('');

const counterArr = dictionnaryArr.map(char => {
  return utils.reactChain(
    inputArr.filter(c => c !== char).filter(c => c !== char.toUpperCase())
  ).length;
});

const best = counterArr
  .sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  })
  .shift();

console.log(best);
