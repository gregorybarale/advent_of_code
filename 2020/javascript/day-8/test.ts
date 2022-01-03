import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testInput: IAoCInput = {
  day: 0,
  year: 0,
  input: [
    "nop +0",
    "acc +1",
    "jmp +4",
    "acc +3",
    "jmp -3",
    "acc -99",
    "acc +1",
    "jmp -4",
    "acc +6",
  ],
};

console.log(fn1(testInput));

console.log(fn2(testInput));
