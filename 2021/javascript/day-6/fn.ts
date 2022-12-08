import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { runDayNaive, runDayPro } from "./utils.ts";

export const fn1 = ({ input }: IAoCInput) => {
  let day = 0;
  let populationState: ReadonlyArray<number> = input[0].split(",").map((s) =>
    Number.parseInt(s, 10)
  );
  while (day < 80) {
    day++;
    populationState = runDayNaive(populationState);
  }
  return populationState.length;
};
export const fn2 = ({ input }: IAoCInput) => {
  let day = 0;
  const inputParsed: ReadonlyArray<number> = input[0].split(",").map((s) =>
    Number.parseInt(s, 10)
  );
  let populationState = inputParsed.reduce((acc, n) => {
    if (acc.has(n)) {
      acc.set(n, (acc.get(n) as number) + 1);
    } else {
      acc.set(n, 1);
    }
    return acc;
  }, new Map<number, number>());
  while (day < 256) {
    day++;
    populationState = runDayPro(populationState);
  }
  return [...populationState.values()].reduce((acc, n) => acc + n, 0);
};
