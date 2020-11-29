const fn1 = (instructions) =>
  instructions
    .split("")
    .reduce((acc, instruction) => (instruction === "(" ? acc + 1 : acc - 1), 0);

const fn2 = (instructions) => {
  const instructionsSplitted = instructions.split("");
  let currentFloor = 0;
  for (let i = 1; i <= instructionsSplitted.length; i++) {
    currentFloor = instructionsSplitted[i - 1] === "("
      ? currentFloor + 1
      : currentFloor - 1;
    if (currentFloor === -1) {
      return i;
    }
  }
};

module.exports = {
  fn1,
  fn2,
};
