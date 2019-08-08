const input = require("./input");
const utils = require("./utils");
const example = [
  "Step C must be finished before step A can begin.",
  "Step C must be finished before step F can begin.",
  "Step A must be finished before step B can begin.",
  "Step A must be finished before step D can begin.",
  "Step B must be finished before step E can begin.",
  "Step D must be finished before step E can begin.",
  "Step F must be finished before step E can begin."
];

const stepConditionArray = input.map(instruction =>
  utils.parseInstruction(instruction)
);
const stepDictionnary = utils
  .getAllStepList(stepConditionArray)
  .map((stepId, index) => ({
    id: stepId,
    timeRemaining: 60 + index + 1
  }));

const firstSteps = stepDictionnary.filter(step =>
  stepConditionArray.every(stepCondition => step.id !== stepCondition.next)
);

let stackStepsOngoing = [];
let stepsDone = [];
let availableSteps = [];
let time = 0;
let nbOfAvailablesWorkers = 5;
let isFirstIter = true;

while (stepsDone.length < stepDictionnary.length) {
  //
  stackStepsOngoing.forEach(stepOngoing => stepOngoing.timeRemaining--);
  //
  if (stackStepsOngoing.some(stepOngoing => stepOngoing.timeRemaining === 0)) {
    const stepsNewlyDone = stackStepsOngoing.filter(
      stepOngoing => stepOngoing.timeRemaining === 0
    );
    stepsDone = [...stepsDone, ...stepsNewlyDone];
    nbOfAvailablesWorkers += stepsNewlyDone.length;
    stackStepsOngoing = stackStepsOngoing.filter(
      stepOngoing => stepOngoing.timeRemaining > 0
    );
  }
  //
  availableSteps = [
    ...firstSteps.filter(
      step =>
        stepsDone.every(stepDone => step.id !== stepDone.id) &&
        stackStepsOngoing.every(stepOngoing => step.id !== stepOngoing.id)
    ),
    ...stepDictionnary.filter(
      step =>
        stepsDone.every(stepDone => step.id !== stepDone.id) &&
        stackStepsOngoing.every(stepOngoing => step.id !== stepOngoing.id) &&
        stepConditionArray
          .filter(stepCondition => stepCondition.next === step.id)
          .every(stepCondition =>
            stepsDone.map(stepDone => stepDone.id).includes(stepCondition.need)
          )
    )
  ]
    .reduce(
      (acc, step) =>
        acc.map(accStep => accStep.id).includes(step.id) ? acc : [...acc, step],
      []
    )
    .sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
  //
  while (nbOfAvailablesWorkers > 0 && availableSteps.length > 0) {
    stackStepsOngoing.push(availableSteps.shift());
    nbOfAvailablesWorkers--;
  }
  //
  console.log(`Workers used: ${stackStepsOngoing.length}`);
  console.log(
    `Steps ongoing: ${stackStepsOngoing.map(step => step.id).join(",")}`
  );
  //
  if (!isFirstIter && stepsDone.length < stepDictionnary.length) time++;
  isFirstIter = false;
  //
}

console.log(time);
