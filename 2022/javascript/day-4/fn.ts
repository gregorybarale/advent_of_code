import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

type Pairs = [[number, number], [number, number]];

const parsePairs = (input: string) =>
  input.split(",").map((pair) => pair.split("-").map(Number)) as Pairs;

const doesContain = (paires: Pairs) =>
  paires[0][0] <= paires[1][0] && paires[0][1] >= paires[1][1] ||
  paires[0][0] >= paires[1][0] && paires[0][1] <= paires[1][1];

const doesOverlap = (paires: Pairs) =>
  paires[0][1] >= paires[1][0] && paires[0][1] <= paires[1][1] ||
  paires[0][0] >= paires[1][0] && paires[0][0] <= paires[1][1];

export const fn1 = ({ input }: IAoCInput) => {
  const pairs: ReadonlyArray<Pairs> = input.map(parsePairs);
  return pairs.filter(doesContain).length;
};
export const fn2 = ({ input }: IAoCInput) => {
  const pairs: ReadonlyArray<Pairs> = input.map(parsePairs);
  const onlyOverlap = pairs.filter((paires) => doesOverlap(paires));
  const containsNotOverlap = pairs.filter((pair) => {
    return !doesOverlap(pair) && doesContain(pair);
  });
  return onlyOverlap.length + containsNotOverlap.length;
};
