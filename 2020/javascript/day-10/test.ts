import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const littleTestData: IAoCInput = {
  day: 0,
  year: 0,
  input: ["16", "10", "15", "5", "1", "11", "7", "19", "6", "12", "4"],
};

const bigTestData: IAoCInput = {
  day: 0,
  year: 0,
  input: [
    "28",
    "33",
    "18",
    "42",
    "31",
    "14",
    "46",
    "20",
    "48",
    "47",
    "24",
    "23",
    "49",
    "45",
    "19",
    "38",
    "39",
    "11",
    "1",
    "32",
    "25",
    "35",
    "8",
    "17",
    "7",
    "9",
    "4",
    "2",
    "34",
    "10",
    "3",
  ],
};

console.log(fn1(bigTestData));
console.log(fn2(bigTestData));
