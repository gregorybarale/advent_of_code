import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { fn1, fn2 } from "./fn.ts";

const testData: IAoCInput = {
  day: 2021,
  year: 7,
  input: [
    "$ cd /",
    "$ ls",
    "dir a",
    "14848514 b.txt",
    "8504156 c.dat",
    "dir d",
    "$ cd a",
    "$ ls",
    "dir e",
    "29116 f",
    "2557 g",
    "62596 h.lst",
    "$ cd e",
    "$ ls",
    "584 i",
    "$ cd ..",
    "$ cd ..",
    "$ cd d",
    "$ ls",
    "4060174 j",
    "8033020 d.log",
    "5626152 d.ext",
    "7214296 k",
  ],
};

console.log(fn1(testData));
console.log(fn2(testData));
