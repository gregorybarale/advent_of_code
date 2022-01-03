import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 0,
  year: 0,
  input: ["F10", "N3", "F7", "R90", "F11"],
};

console.log(fn1(testData));
console.log(fn2(testData));
