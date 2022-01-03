import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

const parser = (input: IAoCInput) =>
  input.input.reduce(
    (previousValue: Array<Array<string>>, currentValue: string) => {
      if (currentValue === "") {
        return [...previousValue, []];
      }
      if (previousValue.length === 0) {
        return [[currentValue]];
      }
      const lastElement = previousValue.pop() as Array<string>;
      previousValue.push([...lastElement, currentValue]);
      return previousValue;
    },
    [],
  );

export const fn1 = (input: IAoCInput) => {
  return parser(input).map((arr) => arr.join("")).map((str) => {
    const dictionnary = new Set<string>();
    for (let i = 0; i < str.length; i++) {
      if (!dictionnary.has(str[i])) {
        dictionnary.add(str[i]);
      }
    }
    return dictionnary.size;
  }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};
export const fn2 = (input: IAoCInput) => {
  return parser(input).map((arr) => ({
    n: arr.length,
    allAnswer: arr.join(""),
  })).map((group) => {
    const map = new Map<string, number>();
    for (let i = 0; i < group.allAnswer.length; i++) {
      if (map.has(group.allAnswer[i])) {
        map.set(group.allAnswer[i], map.get(group.allAnswer[i]) as number + 1);
      } else {
        map.set(group.allAnswer[i], 1);
      }
    }
    return {
      ...group,
      map,
    };
  }).map((group) => {
    return [...group.map.values()].filter((n) => n === group.n).length;
  }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};
