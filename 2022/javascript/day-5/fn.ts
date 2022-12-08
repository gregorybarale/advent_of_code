import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IMove {
  from: number;
  to: number;
  value: number;
}

interface IData {
  stacks: ReadonlyArray<Array<string>>;
  moves: ReadonlyArray<IMove>;
}

const parseStacks = (
  stacksRaw: ReadonlyArray<string>,
): ReadonlyArray<Array<string>> => {
  const [stacksIds, ...stacksContent] = [...stacksRaw].reverse();
  return stacksIds.split("").reduce((acc, stackId, index) => {
    if (stackId === " ") {
      return acc;
    }
    return [
      ...acc,
      stacksContent.map((line) => line[index]).filter((c) => c !== " "),
    ];
  }, [] as ReadonlyArray<Array<string>>);
};

const parseInput = (input: ReadonlyArray<string>): IData => {
  const [stacksRaw, movesRaw] = input.reduce((acc, line) => {
    if (line.startsWith("move ")) {
      acc[1] = [...acc[1], line];
    } else if (line !== "") {
      acc[0] = [...acc[0], line];
    }
    return acc;
  }, [[], []] as [string[], string[]]);
  const stacks: ReadonlyArray<Array<string>> = parseStacks(stacksRaw);
  const moves: ReadonlyArray<IMove> = movesRaw.map<IMove>((moveRaw) => ({
    value: parseInt(moveRaw.split(" ")[1], 10),
    from: parseInt(moveRaw.split(" ")[3], 10),
    to: parseInt(moveRaw.split(" ")[5], 10),
  }));
  return { stacks, moves };
};

const moveFn1 = (stacks: ReadonlyArray<Array<string>>) => (move: IMove) => {
  for (let i = 0; i < move.value; i++) {
    stacks[move.to - 1].push(stacks[move.from - 1].pop() as string);
  }
};

const moveFn2 = (stacks: ReadonlyArray<Array<string>>) => (move: IMove) => {
  const cratesMoved = stacks[move.from - 1].splice(
    stacks[move.from - 1].length - move.value,
  );
  stacks[move.to - 1].push(...cratesMoved);
};

export const fn1 = ({ input }: IAoCInput) => {
  const data = parseInput(input);
  const move = moveFn1(data.stacks);
  data.moves.forEach(move);
  return data.stacks.map((stack) => stack.at(-1)).join("");
};
export const fn2 = ({ input }: IAoCInput) => {
  const data = parseInput(input);
  const move = moveFn2(data.stacks);
  data.moves.forEach(move);
  return data.stacks.map((stack) => stack.at(-1)).join("");
};
