const getValueFromParameterMode = (
  array,
  parameterMode,
  index,
  relativeBase,
) => {
  console.log(`getValueFromParameterMode: ${index} ${relativeBase}`);
  switch (parameterMode) {
    case 0:
      return array[array[index]];
    case 1:
      return array[index];
    case 2:
      return array[array[index + relativeBase]];
    default:
      throw new Error(
        `Wrong parameter mode in getValueFromParameterMode: ${parameterMode}`,
      );
  }
};

const setValueFromParameterMode = (
  array,
  parameterMode,
  index,
  relativeBase,
) =>
(value) => {
  switch (parameterMode) {
    case 0:
      array[array[index]] = value;
      break;
    case 1:
      array[index] = value;
      break;
    case 2:
      array[array[index + relativeBase]] = value;
      break;
    default:
      throw new Error(
        `Wrong parameter mode in setValueFromParameterMode: ${parameterMode}`,
      );
  }
};

const instructionParser = (inputValue) => (instructionAsNumber) => {
  const instructionAsString = `${instructionAsNumber}`;
  let opCode, firstParameterMode, secondParameterMode, thirdParameterMode;

  switch (instructionAsString.length) {
    case 1:
      opCode = "0" + instructionAsString;
      firstParameterMode = secondParameterMode = thirdParameterMode = 0;
      break;
    case 2:
      opCode = instructionAsString;
      firstParameterMode = secondParameterMode = thirdParameterMode = 0;
      break;
    case 3:
      opCode = instructionAsString.substring(instructionAsString.length - 2);
      if (
        instructionAsString[0] !== "0" &&
        instructionAsString[0] !== "1" &&
        instructionAsString[0] !== "2"
      ) {
        throw new Error(
          `Invalid Parameter Mode A: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      firstParameterMode = Number.parseInt(instructionAsString[0], 10);
      secondParameterMode = thirdParameterMode = 0;
      break;
    case 4:
      opCode = instructionAsString.substring(instructionAsString.length - 2);
      if (
        instructionAsString[1] !== "0" &&
        instructionAsString[1] !== "1" &&
        instructionAsString[0] !== "2"
      ) {
        throw new Error(
          `Invalid Parameter Mode A: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      if (
        instructionAsString[0] !== "0" &&
        instructionAsString[0] !== "1" &&
        instructionAsString[0] !== "2"
      ) {
        throw new Error(
          `Invalid Parameter Mode B: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      firstParameterMode = Number.parseInt(instructionAsString[1], 10);
      secondParameterMode = Number.parseInt(instructionAsString[0], 10);
      thirdParameterMode = 0;
      break;
    case 5:
      opCode = instructionAsString.substring(instructionAsString.length - 2);
      if (
        instructionAsString[2] !== "0" &&
        instructionAsString[2] !== "1" &&
        instructionAsString[0] !== "2"
      ) {
        throw new Error(
          `Invalid Parameter Mode A: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      if (
        instructionAsString[1] !== "0" &&
        instructionAsString[1] !== "1" &&
        instructionAsString[0] !== "2"
      ) {
        throw new Error(
          `Invalid Parameter Mode B: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      if (
        instructionAsString[0] !== "0" &&
        instructionAsString[0] !== "1" &&
        instructionAsString[0] !== "2"
      ) {
        throw new Error(
          `Invalid Parameter Mode C: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      firstParameterMode = Number.parseInt(instructionAsString[2], 10);
      secondParameterMode = Number.parseInt(instructionAsString[1], 10);
      thirdParameterMode = Number.parseInt(instructionAsString[0], 10);
      break;
    default:
      throw new Error(`Invalid instruction length: ${instructionAsString}`);
  }

  switch (opCode) {
    case "01":
      return {
        opCode,
        numberOfParameter: 3,
        transformationFunction: (relativeBase) =>
        (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          setValueFromParameterMode(
            array,
            thirdParameterMode,
            thirdParameterIndex,
            relativeBase,
          )(
            getValueFromParameterMode(
              array,
              firstParameterMode,
              firstParameterIndex,
              relativeBase,
            ) +
              getValueFromParameterMode(
                array,
                secondParameterMode,
                secondParameterIndex,
                relativeBase,
              ),
          );
        },
      };
    case "02":
      return {
        opCode,
        numberOfParameter: 3,
        transformationFunction: (relativeBase) =>
        (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          setValueFromParameterMode(
            array,
            thirdParameterMode,
            thirdParameterIndex,
            relativeBase,
          )(
            getValueFromParameterMode(
              array,
              firstParameterMode,
              firstParameterIndex,
              relativeBase,
            ) +
              getValueFromParameterMode(
                array,
                secondParameterMode,
                secondParameterIndex,
                relativeBase,
              ),
          );
        },
      };
    case "03":
      return {
        opCode,
        numberOfParameter: 1,
        transformationFunction:
          (relativeBase) => (firstParameterIndex) => (array) => {
            setValueFromParameterMode(
              array,
              firstParameterMode,
              firstParameterIndex,
              relativeBase,
            )(inputValue);
          },
      };
    case "04":
      return {
        opCode,
        numberOfParameter: 1,
        transformationFunction:
          (relativeBase) => (firstParameterIndex) => (array) => {
            console.log(
              `Output value: ${
                getValueFromParameterMode(
                  array,
                  firstParameterMode,
                  firstParameterIndex,
                  relativeBase,
                )
              }`,
            );
          },
      };
    case "05":
      return {
        opCode,
        numberOfParameter: 2,
        getIndexToJump: (relativeBase) =>
        (
          firstParameterIndex,
          secondParameterIndex,
        ) =>
        (array) => {
          const firstValue = getValueFromParameterMode(
            array,
            firstParameterIndex,
            firstParameterIndex,
            relativeBase,
          );
          const secondValue = getValueFromParameterMode(
            array,
            secondParameterIndex,
            secondParameterIndex,
            relativeBase,
          );
          if (firstValue !== 0) {
            return secondValue;
          } else {
            return undefined;
          }
        },
      };
    case "06":
      return {
        opCode,
        numberOfParameter: 2,
        getIndexToJump: (relativeBase) =>
        (
          firstParameterIndex,
          secondParameterIndex,
        ) =>
        (array) => {
          const firstValue = getValueFromParameterMode(
            array,
            firstParameterIndex,
            firstParameterIndex,
            relativeBase,
          );
          const secondValue = getValueFromParameterMode(
            array,
            secondParameterIndex,
            secondParameterIndex,
            relativeBase,
          );
          if (firstValue === 0) {
            return secondValue;
          } else {
            return undefined;
          }
        },
      };
    case "07":
      return {
        opCode,
        numberOfParameter: 3,
        transformationFunction: (relativeBase) =>
        (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          const firstValue = getValueFromParameterMode(
            array,
            firstParameterIndex,
            firstParameterIndex,
            relativeBase,
          );
          const secondValue = getValueFromParameterMode(
            array,
            secondParameterIndex,
            secondParameterIndex,
            relativeBase,
          );
          setValueFromParameterMode(
            array,
            thirdParameterMode,
            thirdParameterIndex,
            relativeBase,
          )(firstValue < secondValue ? 1 : 0);
        },
      };
    case "08":
      return {
        opCode,
        numberOfParameter: 3,
        transformationFunction: (relativeBase) =>
        (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          const firstValue = getValueFromParameterMode(
            array,
            firstParameterIndex,
            firstParameterIndex,
            relativeBase,
          );
          const secondValue = getValueFromParameterMode(
            array,
            secondParameterIndex,
            secondParameterIndex,
            relativeBase,
          );
          setValueFromParameterMode(
            array,
            thirdParameterMode,
            thirdParameterIndex,
            relativeBase,
          )(firstValue === secondValue ? 1 : 0);
        },
      };
    case "09": {
      return {
        opCode,
        numberOfParameter: 1,
        transformationFunction:
          (relativeBase) => (firstParameterIndex) => (array) => {
            return getValueFromParameterMode(
              array,
              firstParameterIndex,
              firstParameterIndex,
              relativeBase,
            );
          },
      };
    }
    case "99":
      return {
        opCode,
      };
    default:
      throw new Error(`Invalid Opcode: ${instructionAsString}`);
  }
};

const fn = (array, firstValue) => {
  let currentInstructionIndex = 0;
  let relativeBase = 0;
  let currentInstruction = instructionParser(firstValue)(
    array[currentInstructionIndex],
  );

  while (currentInstruction.opCode !== "99") {
    console.log("------");
    console.log(array);
    console.log(currentInstructionIndex);
    console.log(relativeBase);
    console.log(currentInstruction);
    if (
      currentInstruction.opCode === "05" ||
      currentInstruction.opCode === "06"
    ) {
      const indexToJump = currentInstruction.getIndexToJump(relativeBase)(
        currentInstructionIndex + 1,
        currentInstructionIndex + 2,
      )(array);
      if (indexToJump) {
        currentInstructionIndex = indexToJump;
      } else {
        currentInstructionIndex += currentInstruction.numberOfParameter + 1;
      }
      currentInstruction = instructionParser(firstValue)(
        array[currentInstructionIndex],
      );
    } else if (currentInstruction.opCode === "09") {
      relativeBase += currentInstruction.transformationFunction(relativeBase)(
        currentInstructionIndex + 1,
      )(array);
      currentInstructionIndex += 2;
      currentInstruction = instructionParser(firstValue)(
        array[currentInstructionIndex],
      );
    } else {
      switch (currentInstruction.numberOfParameter) {
        case 3:
          currentInstruction.transformationFunction(relativeBase)(
            currentInstructionIndex + 1,
            currentInstructionIndex + 2,
            currentInstructionIndex + 3,
          )(array);
          currentInstructionIndex += 4;
          currentInstruction = instructionParser(firstValue)(
            array[currentInstructionIndex],
          );
          break;
        case 1:
          currentInstruction.transformationFunction(relativeBase)(
            currentInstructionIndex + 1,
          )(array);
          currentInstructionIndex += 2;
          currentInstruction = instructionParser(firstValue)(
            array[currentInstructionIndex],
          );
          break;
        default:
          throw new Error("Invalid number of parameter");
      }
    }
  }

  console.log("Program halted!");
};

module.exports = {
  instructionParser,
  fn,
};
