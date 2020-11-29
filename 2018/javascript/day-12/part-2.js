const input = require("./input");
const utils = require("./utils");

let state = input.initialState;
let generation = 0;
const rules = input.rawRules.map((rawRule) => utils.parseRawRule(rawRule));
const noPlantArr = [".", ".", ".", "."];
let initialIndex = 0;
let offset;

while (generation < 50000000000) {
  const exInitialIndex = initialIndex;
  const stateArr = [...noPlantArr, ...state.split(""), ...noPlantArr];
  initialIndex -= 2;
  let newStateArr = [];
  for (let i = 2; i < stateArr.length - 2; i++) {
    const pattern = stateArr.slice(i - 2, i + 3);
    const rule = rules.find((rule) => rule.pattern === pattern.join(""));
    if (rule) {
      newStateArr.push(rule.replacement);
    } else {
      newStateArr.push(".");
    }
  }
  while (newStateArr[0] === ".") {
    initialIndex++;
    newStateArr.shift();
  }
  while (newStateArr[newStateArr.length - 1] === ".") {
    newStateArr.pop();
  }
  /* if (state === newStateArr.join("")) {
    offset = generation - initialIndex;
    break;
  } */
  state = newStateArr.join("");
  console.log(initialIndex - exInitialIndex);
  generation++;
}

console.log(`Offset: ${offset}`);
console.log(50000000000 - offset);

initialIndex = 50000000000 - offset;

const finalStateArr = state.split("");
const finalSum = finalStateArr.reduce((acc, char, index) => {
  if (char === "#") {
    return acc + index + initialIndex;
  }
  return acc;
}, 0);

console.log(`Final sum: ${finalSum}`);
