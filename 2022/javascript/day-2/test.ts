import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2021,
  year: 2,
  input: [
    "A Y",
    "B X",
    "C Z",
  ],
};

console.log(fn1(testData));
console.log(fn2(testData));
