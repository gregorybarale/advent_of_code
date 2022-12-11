import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IInstruction {
  op: "addx" | "noop";
  remainingCyclesToComplete: number;
  arg?: number;
}

const parseInstruction = (instruction: string): IInstruction => {
  const [op, arg] = instruction.split(" ");
  return {
    op,
    remainingCyclesToComplete: op === "noop" ? 1 : 2,
    arg: arg ? parseInt(arg) : undefined,
  } as IInstruction;
};

const runInstruction = (
  currentRegisterValue: number,
  currentInstruction: IInstruction | undefined,
): [number, IInstruction | undefined] => {
  if (!currentInstruction) {
    console.warn("No instruction to run");
    return [currentRegisterValue, undefined];
  }
  if (currentInstruction.remainingCyclesToComplete - 1 === 0) {
    if (currentInstruction.op === "noop") {
      return [currentRegisterValue, undefined];
    }
    if (currentInstruction.op === "addx") {
      return [
        currentRegisterValue + (currentInstruction.arg as number),
        undefined,
      ];
    }
  }
  return [currentRegisterValue, {
    ...currentInstruction,
    remainingCyclesToComplete: currentInstruction.remainingCyclesToComplete - 1,
  }];
};

export const fn1 = ({ input }: IAoCInput) => {
  const signalStrengthCycle: ReadonlyArray<number> = [
    20,
    60,
    100,
    140,
    180,
    220,
  ];
  let signalStrength: ReadonlyArray<number> = [];
  const instructions = input.map(parseInstruction);
  let currentInstruction = instructions.shift();
  let registerValue = 1;
  let cycle = 0;
  do {
    cycle++;
    if (signalStrengthCycle.includes(cycle)) {
      signalStrength = [...signalStrength, registerValue * cycle];
    }
    [registerValue, currentInstruction] = runInstruction(
      registerValue,
      currentInstruction,
    );
    if (!currentInstruction) {
      currentInstruction = instructions.shift();
    }
  } while (
    instructions.length > 0 || currentInstruction !== undefined
  );
  return signalStrength.reduce((a, b) => a + b, 0);
};
export const fn2 = ({ input }: IAoCInput) => {
  const cyclesToChangeRow = [40, 80, 120, 160, 200, 240];
  const instructions = input.map(parseInstruction);
  let currentInstruction = instructions.shift();
  let registerValue = 1;
  let cycle = 0;
  let currentRow = "";
  let currentOffset = 0;
  let rows: ReadonlyArray<string> = [];
  do {
    cycle++;
    if (
      cycle - 1 - currentOffset >= registerValue - 1 &&
      cycle - 1 - currentOffset <= registerValue + 1
    ) {
      currentRow = currentRow + "#";
    } else {
      currentRow = currentRow + ".";
    }
    if (cyclesToChangeRow.includes(cycle)) {
      rows = [...rows, currentRow];
      currentOffset = cycle;
      currentRow = "";
    }
    [registerValue, currentInstruction] = runInstruction(
      registerValue,
      currentInstruction,
    );
    if (!currentInstruction) {
      currentInstruction = instructions.shift();
    }
  } while (
    instructions.length > 0 || currentInstruction !== undefined
  );
  for (const row of rows) {
    console.log(row);
  }
  return undefined;
};
