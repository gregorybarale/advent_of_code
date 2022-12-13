import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2021,
  year: 12,
  input: [
    "Sabqponm",
    "abcryxxl",
    "accszExk",
    "acctuvwj",
    "abdefghi",
  ],
};

console.log(fn1(testData));
console.log(fn2(testData));
