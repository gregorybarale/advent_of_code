import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

const PRIORITIES: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const convertItemsToMap = (items: ReadonlyArray<string>): Map<string, number> =>
  items.reduce((acc, item) => {
    if (acc.has(item)) {
      acc.set(item, acc.get(item) + 1);
    } else {
      acc.set(item, 1);
    }
    return acc;
  }, new Map());

const findDuplicate = (items: string): string => {
  const compartmentSize = items.length / 2;
  const compartment1 = Array.from(
    { length: compartmentSize },
    (_, i) => items[i],
  );
  const compartment2 = Array.from(
    { length: compartmentSize },
    (_, i) => items[i + compartmentSize],
  );

  const setCompartment1 = new Set(compartment1);
  const setCompartment2 = new Set(compartment2);

  const allItemsCount = convertItemsToMap([
    ...setCompartment1.values(),
    ...setCompartment2.values(),
  ]);
  const duplicate = [...allItemsCount.entries()].find(([_, count]) =>
    count > 1
  ) as [string, number];
  return duplicate[0];
};

const groupBy3 = (
  items: ReadonlyArray<string>,
): ReadonlyArray<ReadonlyArray<string>> =>
  items.reduce((acc, item) => {
    if (acc[acc.length - 1].length === 3) {
      return [...acc, [item]];
    }
    return [...acc.slice(0, acc.length - 1), [...acc[acc.length - 1], item]];
  }, [[]] as ReadonlyArray<ReadonlyArray<string>>);

const findCommon = (items: ReadonlyArray<string>): string => {
  const values = items.map((item) => [...(new Set(item)).values()]);
  return values[0].filter((item) =>
    values[1].includes(item) && values[2].includes(item)
  )[0];
};

export const fn1 = ({ input }: IAoCInput) => {
  const duplicates = input.map(findDuplicate);
  return duplicates.reduce((acc, item) => acc + PRIORITIES[item], 0);
};
export const fn2 = ({ input }: IAoCInput) => {
  const groups = groupBy3(input);
  const commons = groups.map(findCommon);
  return commons.reduce((acc, item) => acc + PRIORITIES[item], 0);
};
