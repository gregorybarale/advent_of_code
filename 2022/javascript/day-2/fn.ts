import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

type OpponentPossibleShape = "A" | "B" | "C"; // A for Rock, B for Paper, C for Scissors
type YourPossibleShape = "X" | "Y" | "Z"; // X for Rock, Y for Paper, Z for Scissors
type RoundOutcome = "X" | "Y" | "Z"; // X for lose, Y for draw, Z for win

const scoreForRockShape = 1;
const scoreForPaperShape = 2;
const scoreForScissorsShape = 3;

const scoreForLoss = 0;
const scoreForDraw = 3;
const scoreForWin = 6;

const computeScoreForRoud1 = (
  [opponentShape, yourShape]: [OpponentPossibleShape, YourPossibleShape],
) => {
  if (opponentShape === "A") {
    if (yourShape === "X") return scoreForDraw + scoreForRockShape;
    if (yourShape === "Y") return scoreForWin + scoreForPaperShape;
    if (yourShape === "Z") return scoreForLoss + scoreForScissorsShape;
  }
  if (opponentShape === "B") {
    if (yourShape === "X") return scoreForLoss + scoreForRockShape;
    if (yourShape === "Y") return scoreForDraw + scoreForPaperShape;
    if (yourShape === "Z") return scoreForWin + scoreForScissorsShape;
  }
  if (opponentShape === "C") {
    if (yourShape === "X") return scoreForWin + scoreForRockShape;
    if (yourShape === "Y") return scoreForLoss + scoreForPaperShape;
    if (yourShape === "Z") return scoreForDraw + scoreForScissorsShape;
  }
};

const computeScoreForRound2 = (
  [opponentShape, roudOutcome]: [OpponentPossibleShape, RoundOutcome],
) => {
  if (opponentShape === "A") {
    if (roudOutcome === "X") return scoreForLoss + scoreForScissorsShape;
    if (roudOutcome === "Y") return scoreForDraw + scoreForRockShape;
    if (roudOutcome === "Z") return scoreForWin + scoreForPaperShape;
  }
  if (opponentShape === "B") {
    if (roudOutcome === "X") return scoreForLoss + scoreForRockShape;
    if (roudOutcome === "Y") return scoreForDraw + scoreForPaperShape;
    if (roudOutcome === "Z") return scoreForWin + scoreForScissorsShape;
  }
  if (opponentShape === "C") {
    if (roudOutcome === "X") return scoreForLoss + scoreForPaperShape;
    if (roudOutcome === "Y") return scoreForDraw + scoreForScissorsShape;
    if (roudOutcome === "Z") return scoreForWin + scoreForRockShape;
  }
};

export const fn1 = ({ input }: IAoCInput) => {
  const points = input.map((line) => {
    const [opponentShape, yourShape] = line.split(" ") as [
      OpponentPossibleShape,
      YourPossibleShape,
    ];
    return computeScoreForRoud1([opponentShape, yourShape]) as number;
  });
  return points.reduce((acc, curr) => acc + curr, 0);
};
export const fn2 = ({ input }: IAoCInput) => {
  const points = input.map((line) => {
    const [opponentShape, roudOutcome] = line.split(" ") as [
      OpponentPossibleShape,
      RoundOutcome,
    ];
    return computeScoreForRound2([opponentShape, roudOutcome]) as number;
  });
  return points.reduce((acc, curr) => acc + curr, 0);
};
