import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData1: IAoCInput = {
  day: 0,
  year: 0,
  input: [
    "Player 1:",
    "9",
    "2",
    "6",
    "3",
    "1",
    "",
    "Player 2:",
    "5",
    "8",
    "4",
    "7",
    "10",
  ],
};

const testData2: IAoCInput = {
  day: 0,
  year: 0,
  input: ["Player 1:", "43", "19", "", "Player 2:", "2", "29", "14"],
};

console.log(fn1(testData1));

console.log(fn2(testData1));
console.log(fn2(testData2));
