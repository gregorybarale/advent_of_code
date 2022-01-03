import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface ISeat {
  row: number;
  column: number;
}

const getSeatId = (seat: ISeat) => seat.row * 8 + seat.column;

const processRowInstruction: (
  instruction: string,
  min: number,
  max: number,
) => number = (instruction: string, min: number, max: number) => {
  const [letter, ...rest] = instruction.split("");
  let newMax: number = max;
  let newMin: number = min;

  console.log(letter);

  if (letter === "F") {
    newMax = max - (max - min + 1) / 2;
  } else if (letter === "B") {
    newMin = min + (max - min + 1) / 2;
  } else {
    throw new Error("trololo");
  }

  if (newMax === newMin) {
    return newMax;
  } else {
    return processRowInstruction(rest.join(""), newMin, newMax);
  }
};

const processColumnInstruction: (
  instruction: string,
  min: number,
  max: number,
) => number = (instruction: string, min: number, max: number) => {
  const [letter, ...rest] = instruction.split("");
  let newMax: number = max;
  let newMin: number = min;

  if (letter === "L") {
    newMax = max - (max - min + 1) / 2;
  } else if (letter === "R") {
    newMin = min + (max - min + 1) / 2;
  } else {
    throw new Error("trololo 2");
  }

  if (newMax === newMin) {
    return newMax;
  } else {
    return processColumnInstruction(rest.join(""), newMin, newMax);
  }
};

const getSeatFromBoardingPass: (pass: string) => ISeat = (pass: string) => {
  const rowInstructions = pass.substring(0, 7);
  const columnInstructions = pass.substring(7, 10);

  const row = processRowInstruction(rowInstructions, 0, 127);
  const column = processColumnInstruction(columnInstructions, 0, 7);

  return {
    row,
    column,
  };
};

export const fn1 = (input: IAoCInput) => {
  const seatsID: ReadonlyArray<number> = input.input.map(
    getSeatFromBoardingPass,
  )
    .map(getSeatId);

  return Math.max(...seatsID);
};
export const fn2 = (input: IAoCInput) => {
  const seatsID: ReadonlyArray<number> = input.input.map(
    getSeatFromBoardingPass,
  )
    .map(getSeatId);

  let theoricalSeatsId: ReadonlyArray<number> = [];
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        !seatsID.includes(getSeatId({
          row: i,
          column: j,
        }))
      ) {
        theoricalSeatsId = [
          ...theoricalSeatsId,
          getSeatId({
            row: i,
            column: j,
          }),
        ];
      }
    }
  }

  return theoricalSeatsId;
};
