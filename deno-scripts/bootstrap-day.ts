import { getInput, IAoCInput } from "../utils/javascript/deno-utils/input.ts";
import { ensureDir } from "https://deno.land/std/fs/mod.ts";

const [yearStr, dayStr, token] = Deno.args;
const year = Number.parseInt(yearStr, 10);
const day = Number.parseInt(dayStr, 10);

const input: IAoCInput = await getInput(year, day, token);

const folderPath = `${year}/javascript/day-${day}`;

await ensureDir(folderPath);
await Deno.writeTextFile(
  `${folderPath}/input.ts`,
  `import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';

export const input: IAoCInput = ${JSON.stringify(input)};
`,
);
await Deno.writeTextFile(
  `${folderPath}/fn.ts`,
  `import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';

export const fn1 = (input: IAoCInput) => {
    console.info('[${year}-${day}] fn1', input);
    return undefined;
};
export const fn2 = (input: IAoCInput) => {
    console.info('[${year}-${day}] fn2', input);
    return undefined;
};
`,
);
await Deno.writeTextFile(
  `${folderPath}/solution.ts`,
  `import { input } from './input.ts';
import { fn1, fn2 } from './fn.ts';

console.log(
  \`Solution for part 1 is \${ fn1(input) } \`,
);
console.log(
  \`Solution for part 2 is \${ fn2(input) }\`,
);`,
);
await Deno.create(`${folderPath}/test.ts`);
