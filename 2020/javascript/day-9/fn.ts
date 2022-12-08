import {
  getInput,
  IAoCInput,
} from "../../../utils/javascript/deno-utils/input.ts";

const parser: (input: IAoCInput) => ReadonlyArray<number> = (
  { input }: IAoCInput,
) => input.map((str) => Number.parseInt(str, 10));

const hasPerSumValid: (
  data: ReadonlyArray<number>,
) => (target: number) => boolean = (
  data: ReadonlyArray<number>,
) =>
(target: number) => {
  return data.some((n1, i, array) => {
    const subArray = array.filter((_, j) => j !== i);
    return subArray.some((n2) => n1 + n2 === target);
  });
};

const isSumValid: (data: ReadonlyArray<number>) => (target: number) => boolean =
  (data: ReadonlyArray<number>) => (target: number) =>
    data.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    ) === target;

export const fn1 = (size: number) => (input: IAoCInput) => {
  const dictionnary = parser(input);

  let result: number = 0;

  for (let i = size; i < dictionnary.length; i++) {
    result = dictionnary[i];
    const data = Array.from(
      { length: size },
      (_, index) => dictionnary[i - (index + 1)],
    );
    if (!hasPerSumValid(data)(result)) {
      break;
    }
  }

  return result;
};
export const fn2 = (size: number) => (input: IAoCInput) => {
  const dictionnary = parser(input);
  const invalidNumber = fn1(size)(input);
  let validSet: ReadonlyArray<number> | undefined = undefined;

  for (let i = 0; i < dictionnary.length - 1; i++) {
    const remainingDictionnary = dictionnary.filter((_, index) => index >= i);
    for (let j = 0; j < remainingDictionnary.length; j++) {
      const dataSet = remainingDictionnary.filter((_, index) => index <= j);
      if (isSumValid(dataSet)(invalidNumber)) {
        validSet = dataSet;
        break;
      }
    }
    if (Boolean(validSet)) break;
  }

  return Math.max(...(validSet as ReadonlyArray<number>)) +
    Math.min(...(validSet as ReadonlyArray<number>));
};
