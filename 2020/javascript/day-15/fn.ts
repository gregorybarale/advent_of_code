import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

const parseToStack: (input: IAoCInput) => ReadonlyArray<number> = (
  { input }: IAoCInput,
) => input[0].split(",").map((n) => Number.parseInt(n, 10)).reverse();

export const fn1 = (input: IAoCInput) => {
  let stack = parseToStack(input);
  const end = 2020;
  while (stack.length < end) {
    const [lastNumberSpoken, ...rest] = stack;
    const turnLastNumberSpoken = stack.length;
    const indexLastNumberSpokenBefore = rest.findIndex((n) =>
      n === lastNumberSpoken
    );
    if (indexLastNumberSpokenBefore === -1) {
      stack = [0, ...stack];
    } else {
      stack = [
        turnLastNumberSpoken - (rest.length - indexLastNumberSpokenBefore),
        ...stack,
      ];
    }
  }

  return stack[0];
};
export const fn2 = (input: IAoCInput) => {
  let stack = parseToStack(input);
  const end = 30000000;
  while (stack.length < end) {
    const [lastNumberSpoken, ...rest] = stack;
    const turnLastNumberSpoken = stack.length;
    const indexLastNumberSpokenBefore = rest.findIndex((n) =>
      n === lastNumberSpoken
    );
    if (indexLastNumberSpokenBefore === -1) {
      stack = [0, ...stack];
    } else {
      stack = [
        turnLastNumberSpoken - (rest.length - indexLastNumberSpokenBefore),
        ...stack,
      ];
    }
  }

  return stack[0];
};

export const fn = (lastTurn: number) =>
  ({ input }: IAoCInput) => {
    const parsedInput = input[0].split(",").map((n) => Number.parseInt(n, 10));
    const map = parsedInput.reduce(
      (previousValue, currentValue, currentIndex) => {
        previousValue.set(currentValue, currentIndex + 1);
        return previousValue;
      },
      new Map<number, number>(),
    );

    let currentTurn = parsedInput.length + 1;
    let lastNumberSpoken = parsedInput[parsedInput.length - 1];
    let isFirstTime =
      parsedInput.filter((n) => n === lastNumberSpoken).length < 2;

    while (currentTurn <= lastTurn) {
      const temp = isFirstTime ? 0 : currentTurn - map;

      if (currentTurn % 100000 === 0) {
        console.log(currentTurn);
      }

      console.log(currentTurn);
      console.log(lastNumberSpoken);
      console.log(map);
      console.log("-------");

      currentTurn += 1;
    }

    return lastNumberSpoken;
  };
