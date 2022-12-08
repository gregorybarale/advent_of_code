export interface Position {
  x: number;
  y: number;
  riskLevel: number;
}

export type CavernCeiling = ReadonlyArray<Position>;

export const parseInput = (input: ReadonlyArray<string>): CavernCeiling =>
  input.reduce((acc, row, y) => {
    return [
      ...acc,
      ...row.split("").map((str, x) => ({
        x,
        y,
        riskLevel: Number.parseInt(str, 10),
      })),
    ];
  }, [] as CavernCeiling);

export const printCeiling = (ceiling: CavernCeiling): void => {
  const maxX = Math.max(...ceiling.map(({ x }) => x));
  const maxY = Math.max(...ceiling.map(({ y }) => y));
  console.log("---");
  for (let i = 0; i <= maxY; i++) {
    let row = "";
    for (let j = 0; j <= maxX; j++) {
      row = row +
        (ceiling.find(({ x, y }) => x === j && y === i)?.riskLevel ?? ".");
    }
    console.log(row);
  }
  console.log("---");
};
