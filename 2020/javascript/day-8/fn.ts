import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { IInstruction, OperationEnum } from "./interfaces.ts";
import {
  generateInstructionsPossibilitiesByOperationChange,
  generateInstructionStack,
  hasInstructionTwice,
  runInstructionsStack,
} from "./utils.ts";

export const parseInputToInstruction: (
  input: IAoCInput,
) => ReadonlyArray<IInstruction> = (input: IAoCInput) => {
  return input.input.map<IInstruction>((value, index) => ({
    id: index,
    operation: value.split(" ")[0] as OperationEnum,
    argument: Number.parseInt(value.split(" ")[1]),
  }));
};

export const fn1 = (input: IAoCInput) => {
  const instructions = parseInputToInstruction(input);

  const instructionsStack = generateInstructionStack(instructions)((
    currentStack,
  ) => !hasInstructionTwice(currentStack));

  const finalState = runInstructionsStack(instructionsStack)(0);

  return finalState.accumulator;
};

export const fn2 = (input: IAoCInput) => {
  const initialInstructions = parseInputToInstruction(input);

  const jmpToNopPossibilities =
    generateInstructionsPossibilitiesByOperationChange(OperationEnum.JMP)(
      OperationEnum.NOP,
    )(initialInstructions);
  const nopToJmpPossibilities =
    generateInstructionsPossibilitiesByOperationChange(OperationEnum.NOP)(
      OperationEnum.JMP,
    )(initialInstructions);

  const allPossibilities = [...jmpToNopPossibilities, ...nopToJmpPossibilities];
  const allPossibleStack = allPossibilities.map((possibility) =>
    generateInstructionStack(possibility)((
      currentStack,
    ) => !hasInstructionTwice(currentStack))
  );

  const fixedStack = allPossibleStack.find((stack) =>
    stack[stack.length - 1].id ===
      initialInstructions[initialInstructions.length - 1].id
  ) as ReadonlyArray<IInstruction>;

  const finalState = runInstructionsStack(fixedStack)(0);

  return finalState.accumulator;
};
