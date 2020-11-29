class Amplifier {
  currentInputIndex = undefined;
  inputs = undefined;
  output = undefined;

  instructionParser = instructionAsNumber => {
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
        if (instructionAsString[0] !== "0" && instructionAsString[0] !== "1")
          throw new Error(
            `Invalid Parameter Mode A: ${instructionAsString[instructionAsString]}`
          );
        firstParameterMode = Number.parseInt(instructionAsString[0], 10);
        secondParameterMode = thirdParameterMode = 0;
        break;
      case 4:
        opCode = instructionAsString.substring(instructionAsString.length - 2);
        if (instructionAsString[1] !== "0" && instructionAsString[1] !== "1")
          throw new Error(
            `Invalid Parameter Mode A: ${instructionAsString[instructionAsString]}`
          );
        if (instructionAsString[0] !== "0" && instructionAsString[0] !== "1")
          throw new Error(
            `Invalid Parameter Mode B: ${instructionAsString[instructionAsString]}`
          );
        firstParameterMode = Number.parseInt(instructionAsString[1], 10);
        secondParameterMode = Number.parseInt(instructionAsString[0], 10);
        thirdParameterMode = 0;
        break;
      case 5:
        opCode = instructionAsString.substring(instructionAsString.length - 2);
        if (instructionAsString[2] !== "0" && instructionAsString[2] !== "1")
          throw new Error(
            `Invalid Parameter Mode A: ${instructionAsString[instructionAsString]}`
          );
        if (instructionAsString[1] !== "0" && instructionAsString[1] !== "1")
          throw new Error(
            `Invalid Parameter Mode B: ${instructionAsString[instructionAsString]}`
          );
        if (instructionAsString[0] !== "0" && instructionAsString[0] !== "1")
          throw new Error(
            `Invalid Parameter Mode C: ${instructionAsString[instructionAsString]}`
          );
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
            thirdParameterIndex
          ) => array => {
            if (thirdParameterMode) {
              array[thirdParameterIndex] =
                (firstParameterMode
                  ? array[firstParameterIndex]
                  : array[array[firstParameterIndex]]) +
                (secondParameterMode
                  ? array[secondParameterIndex]
                  : array[array[secondParameterIndex]]);
            } else {
              array[array[thirdParameterIndex]] =
                (firstParameterMode
                  ? array[firstParameterIndex]
                  : array[array[firstParameterIndex]]) +
                (secondParameterMode
                  ? array[secondParameterIndex]
                  : array[array[secondParameterIndex]]);
            }
          }
        };
      case "02":
        return {
          opCode,
          numberOfParameter: 3,
          transformationFunction: (
            firstParameterIndex,
            secondParameterIndex,
            thirdParameterIndex
          ) => array => {
            if (thirdParameterMode) {
              array[thirdParameterIndex] =
                (firstParameterMode
                  ? array[firstParameterIndex]
                  : array[array[firstParameterIndex]]) *
                (secondParameterMode
                  ? array[secondParameterIndex]
                  : array[array[secondParameterIndex]]);
            } else {
              array[array[thirdParameterIndex]] =
                (firstParameterMode
                  ? array[firstParameterIndex]
                  : array[array[firstParameterIndex]]) *
                (secondParameterMode
                  ? array[secondParameterIndex]
                  : array[array[secondParameterIndex]]);
            }
          }
        };
      case "03":
        return {
          opCode,
          numberOfParameter: 1,
          transformationFunction: firstParameterIndex => array => {
            if (firstParameterMode) {
              array[firstParameterIndex] = this.inputs[this.currentInputIndex];
            } else {
              array[array[firstParameterIndex]] = this.inputs[
                this.currentInputIndex
              ];
            }
            this.currentInputIndex += 1;
          }
        };
      case "04":
        return {
          opCode,
          numberOfParameter: 1,
          transformationFunction: firstParameterIndex => array => {
            if (firstParameterMode) {
              this.output = array[firstParameterIndex];
            } else {
              this.output = array[array[firstParameterIndex]];
            }
          }
        };
      case "05":
        return {
          opCode,
          numberOfParameter: 2,
          getIndexToJump: (
            firstParameterIndex,
            secondParameterIndex
          ) => array => {
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
          }
        };
      case "06":
        return {
          opCode,
          numberOfParameter: 2,
          getIndexToJump: (
            firstParameterIndex,
            secondParameterIndex
          ) => array => {
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
          }
        };
      case "07":
        return {
          opCode,
          numberOfParameter: 3,
          transformationFunction: (
            firstParameterIndex,
            secondParameterIndex,
            thirdParameterIndex
          ) => array => {
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
          }
        };
      case "08":
        return {
          opCode,
          numberOfParameter: 3,
          transformationFunction: (
            firstParameterIndex,
            secondParameterIndex,
            thirdParameterIndex
          ) => array => {
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
          }
        };
      case "99":
        return {
          opCode
        };
      default:
        throw new Error(`Invalid Opcode: ${instructionAsString}`);
    }
  };

  constructor(program) {
    this.program = [...program];
  }

  run(setting, signal) {
    this.output = undefined;
    this.inputs = [setting, signal];
    this.currentInputIndex = 0;

    const currentProgram = [...this.program];

    let currentInstructionIndex = 0;
    let currentInstruction = this.instructionParser(
      currentProgram[currentInstructionIndex]
    );

    while (currentInstruction.opCode !== "99") {
      if (
        currentInstruction.opCode === "05" ||
        currentInstruction.opCode === "06"
      ) {
        const indexToJump = currentInstruction.getIndexToJump(
          currentInstructionIndex + 1,
          currentInstructionIndex + 2
        )(currentProgram);
        if (indexToJump) {
          currentInstructionIndex = indexToJump;
        } else {
          currentInstructionIndex += currentInstruction.numberOfParameter + 1;
        }
        currentInstruction = this.instructionParser(
          currentProgram[currentInstructionIndex]
        );
      } else {
        switch (currentInstruction.numberOfParameter) {
          case 3:
            currentInstruction.transformationFunction(
              currentInstructionIndex + 1,
              currentInstructionIndex + 2,
              currentInstructionIndex + 3
            )(currentProgram);
            currentInstructionIndex += 4;
            currentInstruction = this.instructionParser(
              currentProgram[currentInstructionIndex]
            );
            break;
          case 1:
            currentInstruction.transformationFunction(
              currentInstructionIndex + 1
            )(currentProgram);
            currentInstructionIndex += 2;
            currentInstruction = this.instructionParser(
              currentProgram[currentInstructionIndex]
            );
            break;
          default:
            throw new Error("Invalid number of parameter");
        }
      }
    }
  }
}

const fn1 = (program, seetings) => {
  const amplifierA = new Amplifier(program);
  const amplifierB = new Amplifier(program);
  const amplifierC = new Amplifier(program);
  const amplifierD = new Amplifier(program);
  const amplifierE = new Amplifier(program);

  amplifierA.run(seetings[0], 0);
  amplifierB.run(seetings[1], amplifierA.output);
  amplifierC.run(seetings[2], amplifierB.output);
  amplifierD.run(seetings[3], amplifierC.output);
  amplifierE.run(seetings[4], amplifierD.output);

  return amplifierE.output;
};

const fn2 = (program, seetings) => {

};

module.exports = {
  fn1,
  fn2
};
