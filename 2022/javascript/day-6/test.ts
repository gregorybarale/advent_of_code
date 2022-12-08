import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData1: IAoCInput = {
  day: 2021,
  year: 6,
  input: ["mjqjpqmgbljsphdztnvjfqwrcgsmlb"],
};

const testData2: IAoCInput = {
  day: 2021,
  year: 6,
  input: ["bvwbjplbgvbhsrlpgdmjqwftvncz"],
};

const testData3: IAoCInput = {
  day: 2021,
  year: 6,
  input: ["nppdvjthqldpwncqszvftbrmjlhg"],
};

const testData4: IAoCInput = {
  day: 2021,
  year: 6,
  input: ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"],
};

const testData5: IAoCInput = {
  day: 2021,
  year: 6,
  input: ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"],
};

console.log([testData1, testData2, testData3, testData4, testData5].map(fn1));
console.log([testData1, testData2, testData3, testData4, testData5].map(fn2));
