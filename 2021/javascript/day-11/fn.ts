import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { parseInput, print, runStep } from "./utils.ts";

export const fn1 = ({ input }: IAoCInput) => {
  const dumboPopulation = parseInput(input);
  let nextDumboPopulation = dumboPopulation;
  let step = 0;
  let nbrOfFlash = 0;
  while (step < 100) {
    step += 1;
    const [state, n] = runStep(nextDumboPopulation);
    nextDumboPopulation = state;
    nbrOfFlash += n;
  }
  print(nextDumboPopulation);
  return nbrOfFlash;
};
export const fn2 = ({ input }: IAoCInput) => {
  const dumboPopulation = parseInput(input);
  let nextDumboPopulation = dumboPopulation;
  let step = 0;
  while (!nextDumboPopulation.every(({ energyLevel }) => energyLevel === 0)) {
    step += 1;
    nextDumboPopulation = runStep(nextDumboPopulation)[0];
    print(nextDumboPopulation);
  }
  return step;
};
