import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2022,
  year: 14,
  input: [
    "498,4 -> 498,6 -> 496,6",
    "503,4 -> 502,4 -> 502,9 -> 494,9",
  ],
};

console.log(fn1(testData));
console.log(fn2(testData));
