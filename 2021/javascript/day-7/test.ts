import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2021,
  year: 7,
  input: ["16,1,2,0,4,2,7,1,2,14"],
};

console.log(fn1(testData));
console.log(fn2(testData));
