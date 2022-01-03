import { parser, retrieveContained } from "./fn.ts";

const testData = {
  day: 0,
  year: 0,
  input: [
    "shiny gold bags contain 2 dark red bags.",
    "dark red bags contain 2 dark orange bags.",
    "dark orange bags contain 2 dark yellow bags.",
    "dark yellow bags contain 2 dark green bags.",
    "dark green bags contain 2 dark blue bags.",
    "dark blue bags contain 2 dark violet bags.",
    "dark violet bags contain no other bags.",
  ],
};

const parsedData = parser(testData);

console.log(retrieveContained(parsedData)("shiny-gold"));
