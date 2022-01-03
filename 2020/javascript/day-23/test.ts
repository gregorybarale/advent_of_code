import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1 } from "./fn.ts";

const testData: IAoCInput = {
  day: 0,
  year: 0,
  input: ["32415"],
};

console.groupCollapsed(fn1(10)(testData));
console.groupCollapsed(fn1(100)(testData));
