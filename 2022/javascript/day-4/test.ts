import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2021,
  year: 4,
  input: [
    "2-4,6-8",
    "2-3,4-5",
    "5-7,7-9",
    "2-8,3-7",
    "6-6,4-6",
    "2-6,4-8",
  ],
};

console.log(fn1(testData));
console.log(fn2(testData));
