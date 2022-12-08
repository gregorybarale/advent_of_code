import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

export const fn1 = (input: IAoCInput) => {
  const data = input.input.map((str) => Number.parseInt(str, 10));
  return data.reduce((acc, _, i, arr) => {
    if (i === 0) return acc;
    return arr[i - 1] < arr[i] ? acc + 1 : acc;
  }, 0);
};
export const fn2 = (input: IAoCInput) => {
  const data = input.input.map((str) => Number.parseInt(str, 10));
  return data.reduce((acc, _, i, arr) => {
    if (i <= 2) return acc;
    return arr[i - 3] + arr[i - 2] + arr[i - 1] <
        arr[i - 2] + arr[i - 1] + arr[i]
      ? acc + 1
      : acc;
  }, 0);
};
