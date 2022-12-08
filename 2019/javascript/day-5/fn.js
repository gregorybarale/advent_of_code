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
      if (instructionAsString[0] !== "0" && instructionAsString[0] !== "1") {
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
      if (instructionAsString[1] !== "0" && instructionAsString[1] !== "1") {
        throw new Error(
          `Invalid Parameter Mode A: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      if (instructionAsString[0] !== "0" && instructionAsString[0] !== "1") {
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
      if (instructionAsString[2] !== "0" && instructionAsString[2] !== "1") {
        throw new Error(
          `Invalid Parameter Mode A: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      if (instructionAsString[1] !== "0" && instructionAsString[1] !== "1") {
        throw new Error(
          `Invalid Parameter Mode B: ${
            instructionAsString[instructionAsString]
          }`,
        );
      }
      if (instructionAsString[0] !== "0" && instructionAsString[0] !== "1") {
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
        transformationFunction: (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          if (thirdParameterMode) {
            array[thirdParameterIndex] = (firstParameterMode
              ? array[firstParameterIndex]
              : array[array[firstParameterIndex]]) +
              (secondParameterMode
                ? array[secondParameterIndex]
                : array[array[secondParameterIndex]]);
          } else {
            array[array[thirdParameterIndex]] = (firstParameterMode
              ? array[firstParameterIndex]
              : array[array[firstParameterIndex]]) +
              (secondParameterMode
                ? array[secondParameterIndex]
                : array[array[secondParameterIndex]]);
          }
        },
      };
    case "02":
      return {
        opCode,
        numberOfParameter: 3,
        transformationFunction: (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          if (thirdParameterMode) {
            array[thirdParameterIndex] = (firstParameterMode
              ? array[firstParameterIndex]
              : array[array[firstParameterIndex]]) *
              (secondParameterMode
                ? array[secondParameterIndex]
                : array[array[secondParameterIndex]]);
          } else {
            array[array[thirdParameterIndex]] = (firstParameterMode
              ? array[firstParameterIndex]
              : array[array[firstParameterIndex]]) *
              (secondParameterMode
                ? array[secondParameterIndex]
                : array[array[secondParameterIndex]]);
          }
        },
      };
    case "03":
      return {
        opCode,
        numberOfParameter: 1,
        transformationFunction: (firstParameterIndex) => (array) => {
          if (firstParameterMode) {
            array[firstParameterIndex] = inputValue;
          } else {
            array[array[firstParameterIndex]] = inputValue;
          }
        },
      };
    case "04":
      return {
        opCode,
        numberOfParameter: 1,
        transformationFunction: (firstParameterIndex) => (array) => {
          if (firstParameterMode) {
            console.log(array[firstParameterIndex]);
          } else {
            console.log(array[array[firstParameterIndex]]);
          }
        },
      };
    case "05":
      return {
        opCode,
        numberOfParameter: 2,
        getIndexToJump: (
          firstParameterIndex,
          secondParameterIndex,
        ) =>
        (array) => {
          const firstValue = firstParameterMode
            ? array[firstParameterIndex]
            : array[array[firstParameterIndex]];
          const secondValue = secondParameterMode
            ? array[secondParameterIndex]
            : array[array[secondParameterIndex]];
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
        getIndexToJump: (
          firstParameterIndex,
          secondParameterIndex,
        ) =>
        (array) => {
          const firstValue = firstParameterMode
            ? array[firstParameterIndex]
            : array[array[firstParameterIndex]];
          const secondValue = secondParameterMode
            ? array[secondParameterIndex]
            : array[array[secondParameterIndex]];
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
        transformationFunction: (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          const firstValue = firstParameterMode
            ? array[firstParameterIndex]
            : array[array[firstParameterIndex]];
          const secondValue = secondParameterMode
            ? array[secondParameterIndex]
            : array[array[secondParameterIndex]];
          let thirdValue = firstValue < secondValue ? 1 : 0;
          if (thirdParameterMode) {
            array[thirdParameterIndex] = thirdValue;
          } else {
            array[array[thirdParameterIndex]] = thirdValue;
          }
        },
      };
    case "08":
      return {
        opCode,
        numberOfParameter: 3,
        transformationFunction: (
          firstParameterIndex,
          secondParameterIndex,
          thirdParameterIndex,
        ) =>
        (array) => {
          const firstValue = firstParameterMode
            ? array[firstParameterIndex]
            : array[array[firstParameterIndex]];
          const secondValue = secondParameterMode
            ? array[secondParameterIndex]
            : array[array[secondParameterIndex]];
          let thirdValue = firstValue === secondValue ? 1 : 0;
          if (thirdParameterMode) {
            array[thirdParameterIndex] = thirdValue;
          } else {
            array[array[thirdParameterIndex]] = thirdValue;
          }
        },
      };
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
  let currentInstruction = instructionParser(firstValue)(
    array[currentInstructionIndex],
  );

  while (currentInstruction.opCode !== "99") {
    if (
      currentInstruction.opCode === "05" ||
      currentInstruction.opCode === "06"
    ) {
      const indexToJump = currentInstruction.getIndexToJump(
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
    } else {
      switch (currentInstruction.numberOfParameter) {
        case 3:
          currentInstruction.transformationFunction(
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
          currentInstruction.transformationFunction(
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
