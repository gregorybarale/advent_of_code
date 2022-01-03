import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

function countTree(rowIncrement: number, columnIncrement: number) {
  return (input: IAoCInput) => {
    let treeCount = 0;
    let row = 0;
    let column = 0;

    const inputLength = input.input[0].length;

    while (row < input.input.length - 1) {
      row += rowIncrement;
      column = column + columnIncrement < inputLength
        ? column + columnIncrement
        : column + columnIncrement - inputLength;

      treeCount = input.input[row].charAt(column) === "."
        ? treeCount
        : treeCount + 1;
    }

    return treeCount;
  };
}

export const fn1 = (input: IAoCInput) => {
  return countTree(1, 3)(input);
};
export const fn2 = (input: IAoCInput) => {
  return countTree(1, 1)(input) * countTree(1, 3)(input) *
    countTree(1, 5)(input) * countTree(1, 7)(input) * countTree(2, 1)(input);
};
