import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

export const fn1 = (rawInput: IAoCInput) => {
  console.info("[2020-1] fn1", rawInput);
  const input = rawInput.input.map((s) => Number.parseInt(s, 10));
  let isFound = false;
  let a: number = 0;
  let b: number = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === 2020) {
        a = input[i];
        b = input[j];
        isFound = true;
        break;
      }
    }
    if (isFound) break;
  }
  return a * b;
};
export const fn2 = (rawInput: IAoCInput) => {
  console.info("[2020-1] fn2", rawInput);
  const input = rawInput.input.map((s) => Number.parseInt(s, 10));
  let isFound = false;
  let a: number = 0;
  let b: number = 0;
  let c: number = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      for (let k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === 2020) {
          a = input[i];
          b = input[j];
          c = input[k];
          isFound = true;
          break;
        }
      }
      if (isFound) break;
    }
    if (isFound) break;
  }
  return a * b * c;
};
