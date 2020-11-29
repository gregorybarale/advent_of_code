const input = require("./input");
const fn = require("./fn");

function permute(possibilities) {
  if (possibilities.length === 1) {
    return [possibilities];
  }
  let permArr = [];
  for (let i = 0; i < possibilities.length; i++) {
    let remainingPossibilities = [...possibilities];
    let possibility = remainingPossibilities.splice(i, 1)[0];
    const permutations = permute(remainingPossibilities).map((arr) => [
      possibility,
      ...arr,
    ]);
    permArr = [...permArr, ...permutations];
  }
  return permArr;
}

console.log(
  `Solution for part 1 is ${
    Math.max(
      ...permute([0, 1, 2, 3, 4]).map((seetings) => fn.fn1(input, seetings)),
    )
  }`,
);
console.log(`Solution for part 2 is ${undefined}`);
