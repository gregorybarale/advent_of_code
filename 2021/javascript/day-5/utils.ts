export interface IPosition {
  x: number;
  y: number;
}

export interface ILine {
  start: IPosition;
  end: IPosition;
  positions: ReadonlyArray<IPosition>;
}

export const isVerticalLine = (line: ILine) => line.start.y === line.end.y;
export const isHorizontalLine = (line: ILine) => line.start.x === line.end.x;
export const isPositionsEqual = (a: IPosition, b: IPosition) =>
  a.x === b.x && a.y === b.y;

export const computeVerticalPositions = (
  partialLine: Partial<ILine>,
): ReadonlyArray<IPosition> => {
  if (!Boolean(partialLine?.start) || !Boolean(partialLine?.end)) {
    throw new Error("[computeVerticalPositions] Missing Data");
  }
  const y = (partialLine.start as IPosition).y;
  const min = Math.min(
    (partialLine.start as IPosition).x,
    (partialLine.end as IPosition).x,
  );
  const max = Math.max(
    (partialLine.start as IPosition).x,
    (partialLine.end as IPosition).x,
  );
  let positions: ReadonlyArray<IPosition> = [];
  for (let i = min; i <= max; i++) {
    positions = [...positions, {
      x: i,
      y,
    }];
  }
  return positions;
};

export const computeHorizontalPositions = (
  partialLine: Partial<ILine>,
): ReadonlyArray<IPosition> => {
  if (!Boolean(partialLine?.start) || !Boolean(partialLine?.end)) {
    throw new Error("[computeHorizontalPositions] Missing Data");
  }
  const x = (partialLine.start as IPosition).x;
  let positions: ReadonlyArray<IPosition> = [];
  const min = Math.min(
    (partialLine.start as IPosition).y,
    (partialLine.end as IPosition).y,
  );
  const max = Math.max(
    (partialLine.start as IPosition).y,
    (partialLine.end as IPosition).y,
  );
  for (let i = min; i <= max; i++) {
    positions = [...positions, {
      x,
      y: i,
    }];
  }
  return positions;
};

export const computeDiagonalPositions = (
  partialLine: Partial<ILine>,
): ReadonlyArray<IPosition> => {
  let positions: ReadonlyArray<IPosition> = [];
  let currentPosition: IPosition = partialLine.start as IPosition;
  const changeX =
    (partialLine.start as IPosition).x < (partialLine.end as IPosition).x
      ? (x: number) => x + 1
      : (x: number) => x - 1;
  const changeY =
    (partialLine.start as IPosition).y < (partialLine.end as IPosition).y
      ? (y: number) => y + 1
      : (y: number) => y - 1;
  while (!isPositionsEqual(currentPosition, partialLine.end as IPosition)) {
    positions = [...positions, { ...currentPosition }];
    currentPosition = {
      x: changeX(currentPosition.x),
      y: changeY(currentPosition.y),
    };
  }
  return [...positions, { ...partialLine.end as IPosition }];
};

export const parseInput = (
  input: ReadonlyArray<string>,
): ReadonlyArray<ILine> => {
  const partialLines: ReadonlyArray<Partial<ILine>> = input.map((str) => ({
    start: {
      x: Number.parseInt(str.split(" -> ")[0].split(",")[0], 10),
      y: Number.parseInt(str.split(" -> ")[0].split(",")[1], 10),
    },
    end: {
      x: Number.parseInt(str.split(" -> ")[1].split(",")[0], 10),
      y: Number.parseInt(str.split(" -> ")[1].split(",")[1], 10),
    },
  }));

  return partialLines.map((line) => {
    if (isVerticalLine(line as ILine)) {
      return {
        ...line,
        positions: computeVerticalPositions(line),
      } as ILine;
    }
    if (isHorizontalLine(line as ILine)) {
      return {
        ...line,
        positions: computeHorizontalPositions(line),
      } as ILine;
    }
    return {
      ...line,
      positions: computeDiagonalPositions(line),
    } as ILine;
  });
};

export const print = (crossMap: Map<string, number>) => {
  for (let y = 0; y <= 9; y++) {
    let newLine: string = "";
    for (let x = 0; x <= 9; x++) {
      const key = JSON.stringify({ x, y } as IPosition);
      newLine = newLine + (crossMap.has(key) ? crossMap.get(key) : ".");
    }
    console.log(newLine);
  }
};
