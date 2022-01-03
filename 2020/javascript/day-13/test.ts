import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 0,
  year: 0,
  input: ["939", "7,13,x,x,59,x,31,19"],
};

const test2Datas: ReadonlyArray<{
  n: number;
  input: IAoCInput;
}> = [
  //[1068700, "7,13,x,x,59,x,31,19"],
  [3400, "17,x,13,19"],
  //[754000, "67,7,59,61"],
  //[779200, "67,x,7,59,61"],
  //[1261400, "67,7,x,59,61"],
  //[1202161400, "1789,37,47,1889"],
].map((arr) => ({
  n: arr[0],
  input: {
    day: 0,
    year: 0,
    input: ["", arr[1]],
  },
})) as ReadonlyArray<{
  n: number;
  input: IAoCInput;
}>;

console.log(`Test 1 : ${fn1(testData)}`);
console.log(`Test 2 : ${test2Datas.map((data) => fn2(data.n)(data.input))}`);
