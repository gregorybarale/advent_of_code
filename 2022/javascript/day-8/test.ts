import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2021,
  year: 8,
  input: [
    "30373",
    "25512",
    "65332",
    "33549",
    "35390",
  ],
};

console.log(fn1(testData));
console.log(fn2(testData));
