import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface ICoord {
  x: number;
  y: number;
}

interface IElement extends ICoord {
  type: Type;
}

type Type = "#" | "o";

const coordToString = ({ x, y }: ICoord) => `${x},${y}`;

const createElements = (
  coord1: ICoord,
  coord2: ICoord,
): ReadonlyArray<IElement> => {
  if (coord1.x === coord2.x) {
    const yMin = Math.min(coord1.y, coord2.y);
    const yMax = Math.max(coord1.y, coord2.y);
    return Array.from(
      { length: yMax - yMin + 1 },
      (_, i) => ({ x: coord1.x, y: yMin + i, type: "#" }),
    );
  }
  if (coord1.y === coord2.y) {
    const xMin = Math.min(coord1.x, coord2.x);
    const xMax = Math.max(coord1.x, coord2.x);
    return Array.from(
      { length: xMax - xMin + 1 },
      (_, i) => ({ x: xMin + i, y: coord1.y, type: "#" }),
    );
  }
  throw new Error("Invalid input");
};

const parseInput = (input: ReadonlyArray<string>): ReadonlyArray<IElement> => {
  const lines = input.map((row) => row.split(" -> "));
  let elements: ReadonlyArray<IElement> = [];
  for (const line of lines) {
    const coords = line.map((coord) => {
      const [x, y] = coord.split(",").map((n) => parseInt(n, 10));
      return { x, y };
    });
    for (let i = 0; i < coords.length - 1; i++) {
      elements = [...elements, ...createElements(coords[i], coords[i + 1])];
    }
  }
  return elements.reduce((acc, curr) => {
    if (acc.some((e) => e.x === curr.x && e.y === curr.y)) {
      return acc;
    }
    return [...acc, curr];
  }, [] as ReadonlyArray<IElement>);
};

const getNextInitialCoord = () => ({
  x: 500,
  y: 0,
});

const canFallBelow =
  (elements: Map<string, Type>) => (coord: ICoord): boolean =>
    !elements.has(coordToString({ x: coord.x, y: coord.y + 1 }));
const canFallLeft = (elements: Map<string, Type>) => (coord: ICoord): boolean =>
  !elements.has(coordToString({ x: coord.x - 1, y: coord.y + 1 }));
const canFallRight =
  (elements: Map<string, Type>) => (coord: ICoord): boolean =>
    !elements.has(coordToString({ x: coord.x + 1, y: coord.y + 1 }));

const getNextCoord =
  (elements: Map<string, Type>) => (coord: ICoord): ICoord => {
    if (canFallBelow(elements)(coord)) {
      return { x: coord.x, y: coord.y + 1 };
    }
    if (canFallLeft(elements)(coord)) {
      return { x: coord.x - 1, y: coord.y + 1 };
    }
    if (canFallRight(elements)(coord)) {
      return { x: coord.x + 1, y: coord.y + 1 };
    }
    return coord;
  };

export const fn1 = ({ input }: IAoCInput) => {
  const coords = parseInput(input);
  const maxY = Math.max(...coords.map((e) => e.y));
  const elementsMap = coords.reduce((acc, curr) => {
    acc.set(coordToString(curr), curr.type);
    return acc;
  }, new Map<string, Type>());
  let currentCoord: ICoord = getNextInitialCoord();
  do {
    const nextCoord = getNextCoord(elementsMap)(currentCoord);
    if (nextCoord === currentCoord) {
      elementsMap.set(coordToString(currentCoord), "o");
      currentCoord = getNextInitialCoord();
      continue;
    }
    if (nextCoord.y > maxY) {
      break;
    }
    currentCoord = nextCoord;
  } while (true);
  return [...elementsMap.values()].filter((type) => type === "o").length;
};
export const fn2 = ({ input }: IAoCInput) => {
  const coords = parseInput(input);
  const maxY = Math.max(...coords.map((e) => e.y)) + 2;
  const elementsMap = coords.reduce((acc, curr) => {
    acc.set(coordToString(curr), curr.type);
    return acc;
  }, new Map<string, Type>());
  let currentCoord: ICoord = getNextInitialCoord();
  do {
    const nextCoord = getNextCoord(elementsMap)(currentCoord);
    if (
      nextCoord.x === getNextInitialCoord().x &&
      nextCoord.y === getNextInitialCoord().y
    ) {
      break;
    }
    if (nextCoord === currentCoord) {
      elementsMap.set(coordToString(currentCoord), "o");
      currentCoord = getNextInitialCoord();
      continue;
    }
    if (nextCoord.y >= maxY) {
      elementsMap.set(coordToString(currentCoord), "o");
      currentCoord = getNextInitialCoord();
      continue;
    }
    currentCoord = nextCoord;
  } while (true);
  return [...elementsMap.values()].filter((type) => type === "o").length + 1;
};
