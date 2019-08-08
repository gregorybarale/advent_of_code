const parseInstruction = instruction => {
  const instructionArr = instruction.split(" ");
  return {
    need: instructionArr[1],
    next: instructionArr[7]
  };
};

const getAllStepList = stepConditionArr => {
  return Object.keys(
    stepConditionArr.reduce((acc, stepCondition) => {
      acc[stepCondition.next] = "";
      acc[stepCondition.need] = "";
      return acc;
    }, {})
  );
};

const getFirstSteps = (stepConditionArr, stepDictionnary) => {
  return stepDictionnary
    .filter(step =>
      stepConditionArr.every(stepCondition => step !== stepCondition.next)
    );
};

const getNextAvaibleSteps = (
  currentStepsDone,
  currentAvaibleStep,
  currentStep,
  stepConditionArr
) => {
  return [
    ...currentAvaibleStep,
    ...stepConditionArr
      .filter(stepCondition => stepCondition.need === currentStep)
      .map(stepCondition => stepCondition.next)
      .filter(nextPossibleStep =>
        stepConditionArr
        .filter(
          stepCondition => stepCondition.next === nextPossibleStep
        )
        .every(stepCondition => currentStepsDone.includes(stepCondition.need))
      )
  ].sort();
};

module.exports = {
  parseInstruction,
  getAllStepList,
  getFirstSteps,
  getNextAvaibleSteps
};
