import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
    day: 2021,
    year: 1,
    input: ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"],
};

console.log(fn1(testData));
console.log(fn2(testData));