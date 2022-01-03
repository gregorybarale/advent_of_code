import { IGameConsole, IInstruction, OperationEnum } from "./interfaces.ts";

export const findInstructionById = (
  instructions: ReadonlyArray<IInstruction>,
) =>
  (id: number) => {
    return instructions.find((i) => id === i.id) as IInstruction;
  };

export const getIndexInLoop = (loopLength: number) =>
  (increment: number) =>
    (index: number) => {
      if (index + increment > loopLength - 1) {
        return (index + increment) % loopLength;
      } else if (index + increment < 0) {
        return ((index + increment) % loopLength) * 1;
      }
      return index + increment;
    };

export const filterInstructionsByOperation: (
  instructions: ReadonlyArray<IInstruction>,
) => (operation: OperationEnum) => ReadonlyArray<IInstruction> = (
  instructions: ReadonlyArray<IInstruction>,
) =>
  (operation: OperationEnum) =>
    instructions.filter((instruction) => operation === instruction.operation);

export const hasInstructionTwice: (
  instructions: ReadonlyArray<IInstruction>,
) => boolean = (instructions: ReadonlyArray<IInstruction>) => {
  const mapInstruction: Map<number, number> = instructions.map((instruction) =>
    instruction.id
  ).reduce(
    (previousValue, currentValue) => {
      if (previousValue.has(currentValue)) {
        previousValue.set(
          currentValue,
          previousValue.get(currentValue) as number + 1,
        );
      } else {
        previousValue.set(currentValue, 1);
      }
      return previousValue;
    },
    new Map<number, number>(),
  );
  return [
    ...mapInstruction.values(),
  ].some((n) => n > 1);
};

export const getNextInstruction: (
  instructionsDictionnary: ReadonlyArray<IInstruction>,
) => (instructionsStack: ReadonlyArray<IInstruction>) => IInstruction = (
  instructionsDictionnary: ReadonlyArray<IInstruction>,
) =>
  (instructionsStack: ReadonlyArray<IInstruction>) => {
    let nextInstruction: IInstruction;

    if (instructionsStack.length === 0) {
      nextInstruction = instructionsDictionnary[0];
    } else {
      const { length, [length - 1]: lastIntruction } = instructionsStack;

      switch (lastIntruction.operation) {
        case OperationEnum.ACC:
          nextInstruction = findInstructionById(instructionsDictionnary)(
            getIndexInLoop(instructionsDictionnary.length)(1)(
              lastIntruction.id,
            ),
          );
          break;
        case OperationEnum.JMP:
          nextInstruction = findInstructionById(instructionsDictionnary)(
            getIndexInLoop(instructionsDictionnary.length)(
              lastIntruction.argument,
            )(
              lastIntruction.id,
            ),
          );
          break;
        case OperationEnum.NOP:
          nextInstruction = findInstructionById(instructionsDictionnary)(
            getIndexInLoop(instructionsDictionnary.length)(1)(
              lastIntruction.id,
            ),
          );
      }
    }

    return nextInstruction;
  };

export const generateInstructionStack: (
  instructionsDictionnary: ReadonlyArray<IInstruction>,
) => (
  predicate: (currentStack: ReadonlyArray<IInstruction>) => boolean,
) => ReadonlyArray<IInstruction> = (
  instructionsDictionnary: ReadonlyArray<IInstruction>,
) =>
  (predicate: (currentStack: ReadonlyArray<IInstruction>) => boolean) => {
    let instructionsStack: ReadonlyArray<IInstruction> = [];
    while (predicate(instructionsStack)) {
      instructionsStack = [
        ...instructionsStack,
        getNextInstruction(instructionsDictionnary)(instructionsStack),
      ];
    }

    instructionsStack = instructionsStack.filter((
      _,
      index,
      array,
    ) => index !== array.length - 1);

    return instructionsStack;
  };

export const runInstruction: (
  gameConsole: IGameConsole,
) => (instruction: IInstruction) => IGameConsole = (
  gameConsole: IGameConsole,
) =>
  (instruction: IInstruction) => ({
    runnedInstruction: [...gameConsole.runnedInstruction],
    accumulator: instruction.operation === OperationEnum.ACC
      ? gameConsole.accumulator + instruction.argument
      : gameConsole.accumulator,
  });

export const runLastInstruction: (gameConsole: IGameConsole) => IGameConsole = (
  gameConsole: IGameConsole,
) => {
  return runInstruction(gameConsole)(
    gameConsole.runnedInstruction[gameConsole.runnedInstruction.length - 1],
  );
};

export const generateInstructionsPossibilitiesByOperationChange: (
  previous: OperationEnum,
) => (
  next: OperationEnum,
) => (
  instructions: ReadonlyArray<IInstruction>,
) => ReadonlyArray<ReadonlyArray<IInstruction>> = (previous: OperationEnum) =>
  (next: OperationEnum) =>
    (instructions: ReadonlyArray<IInstruction>) => {
      const instructionsFiltered = filterInstructionsByOperation(instructions)(
        previous,
      );
      return instructionsFiltered.reduce(
        (
          previousValue: ReadonlyArray<ReadonlyArray<IInstruction>>,
          currentValue: IInstruction,
        ) => {
          return [
            ...previousValue,
            instructions.map((instruction) => ({
              ...instruction,
              operation: instruction.id === currentValue.id
                ? next
                : instruction.operation,
            })),
          ];
        },
        [],
      );
    };

export const runInstructionsStack: (
  instructionsStack: ReadonlyArray<IInstruction>,
) => (initialAccumulator: number) => IGameConsole = (
  instructionsStack: ReadonlyArray<IInstruction>,
) =>
  (initialAccumulator: number) => {
    const gameConsole: IGameConsole = {
      runnedInstruction: instructionsStack,
      accumulator: initialAccumulator,
    };

    return gameConsole.runnedInstruction.reduce(
      (previousValue, currentValue) =>
        runInstruction(previousValue)(currentValue),
      gameConsole,
    );
  };
