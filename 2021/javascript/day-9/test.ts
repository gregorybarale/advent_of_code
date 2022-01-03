import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData1: IAoCInput = {
    day: 2021,
    year: 9,
    input: [
        "2199943210",
        "3987894921",
        "9856789892",
        "8767896789",
        "9899965678",
    ],

};

console.log(fn1(testData1));
console.log(fn2(testData1));