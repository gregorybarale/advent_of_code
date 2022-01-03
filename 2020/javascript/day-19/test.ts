import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1 } from "./fn.ts";

const testData: IAoCInput = {
  day: 0,
  year: 0,
  input: [
    "0: 4 1 5",
    "1: 2 3 | 3 2",
    "2: 4 4 | 5 5",
    "3: 4 5 | 5 4",
    "4: 'a'",
    "5: 'b'",
    "",
    "ababbb",
    "bababa",
    "abbbab",
    "aaabbb",
    "aaaabbb",
  ],
};

console.log(fn1(testData));
