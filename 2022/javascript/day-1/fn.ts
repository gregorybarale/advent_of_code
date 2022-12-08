import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

export const fn1 = ({ input }: IAoCInput) => {
  const itemsByElf = input.reduce((acc, item) => {
    if (item === "") {
      return [[], ...acc];
    }
    const [first, ...rest] = acc;
    return [[...first, parseInt(item, 10)], ...rest];
  }, [[]] as ReadonlyArray<ReadonlyArray<number>>);
  const caloriesByElf = itemsByElf.map((items) =>
    items.reduce((acc, item) => acc + item, 0)
  );
  return Math.max(...caloriesByElf);
};
export const fn2 = ({ input }: IAoCInput) => {
  const itemsByElf = input.reduce((acc, item) => {
    if (item === "") {
      return [[], ...acc];
    }
    const [first, ...rest] = acc;
    return [[...first, parseInt(item, 10)], ...rest];
  }, [[]] as ReadonlyArray<ReadonlyArray<number>>);
  const caloriesByElf = itemsByElf.map((items) =>
    items.reduce((acc, item) => acc + item, 0)
  );
  const sortedCaloriesByElf = caloriesByElf.sort((a, b) => b - a);
  return sortedCaloriesByElf[0] + sortedCaloriesByElf[1] +
    sortedCaloriesByElf[2];
};
