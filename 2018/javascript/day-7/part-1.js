const input = require("./input");
const utils = require("./utils");

const stepConditionArray = input.map((instruction) =>
  utils.parseInstruction(instruction)
);
const stepDictionnary = utils.getAllStepList(stepConditionArray);
const firstSteps = utils.getFirstSteps(stepConditionArray, stepDictionnary);
const orderedStep = [];
let availableStep = [...firstSteps];
while (availableStep.length !== 0) {
  const nextStep = availableStep.shift();
  orderedStep.push(nextStep);
  availableStep = utils.getNextAvaibleSteps(
    orderedStep,
    availableStep,
    nextStep,
    stepConditionArray,
  );
}

console.log(orderedStep.join(""));
