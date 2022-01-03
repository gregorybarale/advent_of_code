import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData1: IAoCInput = {
    day: 2021,
    year: 11,
    input: [
        "11111",
        "19991",
        "19191",
        "19991",
        "11111",
    ],
};

const testData2: IAoCInput = {
    day: 2021,
    year: 11,
    input: [
        "5483143223",
        "2745854711",
        "5264556173",
        "6141336146",
        "6357385478",
        "4167524645",
        "2176841721",
        "6882881134",
        "4846848554",
        "5283751526",
    ],
};

console.log(fn1(testData2));
console.log(fn2(testData2));