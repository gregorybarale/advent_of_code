import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn } from "./fn.ts";
[
  ["0,3,6"],
  //["1,3,2"],
  //["2,1,3"],
  //["1,2,3"],
  //["2,3,1"],
  //["3,2,1"],
  //["3,1,2"],
].map((arr) =>
  ({
    day: 0,
    year: 0,
    input: arr,
  }) as IAoCInput
).forEach((input) => {
  console.log(fn(10)(input));
});

[
  ["0,3,6"],
  ["1,3,2"],
  ["2,1,3"],
  ["1,2,3"],
  ["2,3,1"],
  ["3,2,1"],
  ["3,1,2"],
].map((arr) =>
  ({
    day: 0,
    year: 0,
    input: arr,
  }) as IAoCInput
).forEach((input) => {
  //console.log(fn(30000000)(input));
});
