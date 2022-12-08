import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { Board, checkBoard, getUnmarkedNumbers, parseInput } from "./utils.ts";

export const fn1 = ({ input }: IAoCInput) => {
  const [drawnedNumbers, boards] = parseInput(input);
  let counter = 0;
  let numbers: ReadonlyArray<number> = [];
  let winningBoard: Board | null = null;
  while (!winningBoard) {
    numbers = drawnedNumbers.filter((_, i) => i <= counter);
    const winningBoards = boards.filter((board) => checkBoard(numbers)(board));
    if (winningBoards.length >= 1) {
      winningBoard = winningBoards[0];
    } else {
      counter++;
    }
  }
  const sumOfUnmarked = getUnmarkedNumbers(numbers)(winningBoard).reduce(
    (acc, n) => acc + n,
    0,
  );
  return sumOfUnmarked * ([...numbers].pop() as number);
};
export const fn2 = ({ input }: IAoCInput) => {
  const [drawnedNumbers, boards] = parseInput(input);
  let counter = 0;
  let numbers: ReadonlyArray<number> = [];
  let tempWinningBoard: ReadonlyArray<Board> = [];
  let lastWinningBoard: Board | null = null;
  while (!lastWinningBoard) {
    numbers = drawnedNumbers.filter((_, i) => i <= counter);
    const winningBoards = boards.filter((board) => checkBoard(numbers)(board));
    tempWinningBoard = [
      ...tempWinningBoard,
      ...winningBoards.filter((board) => !tempWinningBoard.includes(board)),
    ];
    if (tempWinningBoard.length == boards.length) {
      lastWinningBoard = tempWinningBoard.at(-1) as Board;
    } else {
      counter++;
    }
  }
  const sumOfUnmarked = getUnmarkedNumbers(numbers)(lastWinningBoard).reduce(
    (acc, n) => acc + n,
    0,
  );
  return sumOfUnmarked * ([...numbers].pop() as number);
};
