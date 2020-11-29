const input = require("./input");
const fn = require("./fn");

const valuesToCheck = [];
for (
    let i = Number.parseInt(input.split("-")[0], 10);
    i <= Number.parseInt(input.split("-")[1], 10);
    i++
) {
    valuesToCheck.push(`${i}`);
}

console.log(
    `Solution for part 1 is ${valuesToCheck.filter(x => fn.fn1(x)).length}`
);
console.log(
    `Solution for part 2 is ${valuesToCheck.filter(x => fn.fn2(x)).length}`
);
