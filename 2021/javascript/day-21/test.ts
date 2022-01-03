import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData1: IAoCInput = {
    day: 2021,
    year: 22,
    input: [
        "Player 1 starting position: 4",
        "Player 2 starting position: 8",
    ],
};

//console.log(fn1(testData1));
console.log(fn2(testData1));