import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IMonkey<T> {
  id: number;
  items: ReadonlyArray<T>;
  operation: (old: T) => T;
  toThrow: (newItem: T) => number;
  numberOfItemInspected: number;
}

const idRegex = /Monkey (\d):/;
const itemsRegex = /Starting items: (.*)/;
const operationRegex = /Operation: new = old (.*)/;
const testRegex = /Test: divisible by (.*)/;
const trueRegex = /If true: throw to monkey (.*)/;
const falseRegex = /If false: throw to monkey (.*)/;

const parseRawMonkey = (lines: ReadonlyArray<string>): IMonkey<number> => {
  const [idLine, itemsLine, operationLine, testLine, trueLine, falseLine] =
    lines.map((line) => line.trim());
  const id = parseInt(idRegex.exec(idLine)![1], 10);
  const items = itemsRegex.exec(itemsLine)![1].split(", ").map(
    (item) => parseInt(item),
    10,
  );
  const operationRaw = operationRegex.exec(operationLine)![1];
  const [operator, parameter] = operationRaw.split(" ");
  const test = parseInt(testRegex.exec(testLine)![1], 10);
  const trueMonkey = parseInt(trueRegex.exec(trueLine)![1], 10);
  const falseMonkey = parseInt(falseRegex.exec(falseLine)![1], 10);
  return {
    id,
    items,
    operation: operator === "*"
      ? (old: number) =>
        old * (parameter === "old" ? old : parseInt(parameter, 10))
      : (old: number) =>
        old + (parameter === "old" ? old : parseInt(parameter, 10)),
    toThrow: (newItem: number) =>
      newItem % test === 0 ? trueMonkey : falseMonkey,
    numberOfItemInspected: 0,
  };
};

const parseRawMonketV2 = (lines: ReadonlyArray<string>): IMonkey<bigint> => {
  const [idLine, itemsLine, operationLine, testLine, trueLine, falseLine] =
    lines.map((line) => line.trim());
  const id = parseInt(idRegex.exec(idLine)![1], 10);
  const items = itemsRegex.exec(itemsLine)![1].split(", ").map(BigInt);
  const operationRaw = operationRegex.exec(operationLine)![1];
  const [operator, parameter] = operationRaw.split(" ");
  const test = BigInt(testRegex.exec(testLine)![1]);
  const trueMonkey = parseInt(trueRegex.exec(trueLine)![1], 10);
  const falseMonkey = parseInt(falseRegex.exec(falseLine)![1], 10);
  return {
    id,
    items,
    operation: operator === "*"
      ? (old: bigint) => old * (parameter === "old" ? old : BigInt(parameter))
      : (old: bigint) => old + (parameter === "old" ? old : BigInt(parameter)),
    toThrow: (newItem: bigint) =>
      newItem % test === 0n ? trueMonkey : falseMonkey,
    numberOfItemInspected: 0,
  };
};

const parseInput = (
  input: ReadonlyArray<string>,
): ReadonlyArray<IMonkey<number>> => {
  const monkeys = [];
  const monkeysRaw: Array<Array<string>> = input.reduce(
    (acc, line) => {
      if (line !== "") {
        const [head, ...tail] = acc;
        return [[...head, line], ...tail];
      }
      return [[], ...acc];
    },
    [[]] as Array<Array<string>>,
  );
  for (const monkeyRaw of monkeysRaw.reverse()) {
    const monkey = parseRawMonkey(monkeyRaw);
    monkeys.push(monkey);
  }
  return monkeys;
};

const parseInputV2 = (
  input: ReadonlyArray<string>,
): ReadonlyArray<IMonkey<bigint>> => {
  const monkeys = [];
  const monkeysRaw: Array<Array<string>> = input.reduce(
    (acc, line) => {
      if (line !== "") {
        const [head, ...tail] = acc;
        return [[...head, line], ...tail];
      }
      return [[], ...acc];
    },
    [[]] as Array<Array<string>>,
  );
  for (const monkeyRaw of monkeysRaw.reverse()) {
    const monkey = parseRawMonketV2(monkeyRaw);
    monkeys.push(monkey);
  }
  return monkeys;
};

const runMonkeyTurn =
  <T>(monkeys: ReadonlyArray<IMonkey<T>>, worryFn: (n: T) => T) =>
  (monkey: IMonkey<T>) => {
    for (const item of monkey.items) {
      const newItemAfterInspection = monkey.operation(item);
      const itemAfterRelief = worryFn(newItemAfterInspection);
      const monkeyToThrow = monkey.toThrow(itemAfterRelief);
      const monkeyReceiver = monkeys.find((m) => m.id === monkeyToThrow)!;
      monkeyReceiver.items = [...monkeyReceiver.items, itemAfterRelief];
      monkey.numberOfItemInspected += 1;
    }
    monkey.items = [];
  };

export const fn1 = ({ input }: IAoCInput) => {
  const monkeys = parseInput(input);
  const maxRound = 20;
  let currentRound = 0;

  while (currentRound < maxRound) {
    currentRound++;
    for (const monkey of monkeys) {
      runMonkeyTurn(monkeys, (n) => Math.floor(n / 3))(monkey);
    }
  }
  const numberOfItemInspectedSorted = monkeys.map((m) =>
    m.numberOfItemInspected
  ).sort((a, b) => b - a);
  return numberOfItemInspectedSorted[0] * numberOfItemInspectedSorted[1];
};
export const fn2 = ({ input }: IAoCInput) => {
  const roundToLog = [
    1,
    20,
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
  ];
  const monkeys = parseInputV2(input);
  const maxRound = 10000;
  let currentRound = 0;

  while (currentRound < maxRound) {
    currentRound++;
    for (const monkey of monkeys) {
      runMonkeyTurn(monkeys, (n) => n)(monkey);
    }
    if (roundToLog.includes(currentRound)) {
      console.log("Round", currentRound);
      for (const monkey of monkeys) {
        console.log(monkey.id, monkey.numberOfItemInspected);
      }
    }
  }
  const numberOfItemInspectedSorted = monkeys.map((m) =>
    m.numberOfItemInspected
  ).sort((a, b) => b - a);
  return numberOfItemInspectedSorted[0] * numberOfItemInspectedSorted[1];
};
