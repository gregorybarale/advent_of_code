import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1 } from "./fn.ts";

const testData: IAoCInput = {
  day: 0,
  year: 0,
  input: ["5764801", "17807724"],
};

console.log(fn1(testData));
