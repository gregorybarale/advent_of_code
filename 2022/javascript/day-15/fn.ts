import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface ICoord {
  x: number;
  y: number;
}

interface ISensor extends ICoord {
  closestBeacon: ICoord;
  manhattanDistanceToClosest: number;
}

const getManhattanDistance = (a: ICoord, b: ICoord) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const coordToString = (c: ICoord) => `${c.x},${c.y}`;
const stringToCoord = (s: string) => {
  const [x, y] = s.split(",").map((n) => parseInt(n, 10));
  return { x, y };
};

const parseInput = (lines: ReadonlyArray<string>): ReadonlyArray<ISensor> => {
  return lines.map((line) => {
    const [_, rawX, rawY, rawBx, rawBy] = line.match(
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/,
    )!;
    const x = parseInt(rawX, 10);
    const y = parseInt(rawY, 10);
    const bx = parseInt(rawBx, 10);
    const by = parseInt(rawBy, 10);
    const manhattanDistanceToClosest = getManhattanDistance(
      { x, y },
      { x: bx, y: by },
    );
    return {
      x,
      y,
      closestBeacon: {
        x: bx,
        y: by,
      },
      manhattanDistanceToClosest,
    };
  });
};

const filterSensorSensingLine =
  (line: number) => (sensors: ReadonlyArray<ISensor>) =>
    sensors.filter((sensor) => {
      return Math.abs(sensor.y - line) <= sensor.manhattanDistanceToClosest;
    });

const coordSensedBySensorInLine = (
  coords: Set<string>,
  sensor: ISensor,
  config?: { min: number; max: number },
) =>
(line: number) => {
  let xMin: number;
  let xMax: number;
  if (config) {
    xMin = Math.max(
      config.min,
      sensor.x -
        Math.abs(
          sensor.manhattanDistanceToClosest - Math.abs(line - sensor.y),
        ),
    );
    xMax = Math.min(
      config.max,
      sensor.x +
        Math.abs(
          sensor.manhattanDistanceToClosest - Math.abs(line - sensor.y),
        ),
    );
  } else {
    xMin = sensor.x -
      Math.abs(sensor.manhattanDistanceToClosest - Math.abs(line - sensor.y));
    xMax = sensor.x +
      Math.abs(sensor.manhattanDistanceToClosest - Math.abs(line - sensor.y));
  }
  for (let x = xMin; x <= xMax; x++) {
    coords.add(coordToString({ x, y: line }));
  }
};

const doesSensorSeeingCoord = (coord: ICoord) => (sensor: ISensor): boolean => {
  return getManhattanDistance(sensor, coord) <=
    sensor.manhattanDistanceToClosest;
};

export const fn1 = ({ input }: IAoCInput, line: number) => {
  const sensors = parseInput(input);
  const sensorsSensingLine = filterSensorSensingLine(line)(sensors);
  const coords = new Set<string>();
  const coordsSensedBySensorsInLineFns = sensorsSensingLine.map(
    (sensor) => coordSensedBySensorInLine(coords, sensor),
  );
  coordsSensedBySensorsInLineFns.forEach((fn) => fn(line));
  const beacons = new Set(
    sensors.map((sensor) => coordToString(sensor.closestBeacon)),
  );
  beacons.forEach((beacon) => coords.delete(beacon));
  return coords.size;
};

export const fn2old = ({ input }: IAoCInput, min: number, max: number) => {
  const lineLenght = max - min + 1;
  const sensors = parseInput(input);
  let coordsSensedInOnlyPossibleLine: Set<string> | undefined = undefined;
  const sensorsByLineMap = Array.from({ length: max - min + 1 }, (_, i) => i)
    .reduce((acc, curr) => {
      const sensorsSensingLine = filterSensorSensingLine(curr)(sensors);
      acc.set(curr, new Set(sensorsSensingLine));
      return acc;
    }, new Map<number, Set<ISensor>>());
  for (let y = min; y <= max; y++) {
    const coords = new Set<string>();
    console.log("Handling line", y);
    const coordsSensedBySensorsInLineFns = [...sensorsByLineMap.get(y)!].map(
      (sensor) => coordSensedBySensorInLine(coords, sensor, { min, max }),
    );
    coordsSensedBySensorsInLineFns.forEach((fn) => fn(y));
    if (coords.size !== lineLenght) {
      coordsSensedInOnlyPossibleLine = coords;
      break;
    }
  }
  const coords = [...coordsSensedInOnlyPossibleLine!].map(stringToCoord);
  for (let i = min; i <= max; i++) {
    if (!coords.some((c) => c.x === i)) {
      return i * 4000000 + coords[0].y;
    }
  }
};

export const fn2 = ({ input }: IAoCInput, min: number, max: number) => {
  const sensors = parseInput(input);
  const sensorsSeeingLineMap = Array.from(
    { length: max - min + 1 },
    (_, i) => i,
  )
    .reduce((acc, curr) => {
      const sensorsSensingLine = filterSensorSensingLine(curr)(sensors);
      acc.set(curr, new Set(sensorsSensingLine));
      return acc;
    }, new Map<number, Set<ISensor>>());
  for (let y = min; y <= max; y++) {
    const sensorsSeeingLine = sensorsSeeingLineMap.get(y)!;
    for (let x = min; x <= max; x++) {
      console.log("Handling", x, y);
      const coord: ICoord = { x, y };
      const predicate = doesSensorSeeingCoord(coord);
      let sensed = false;
      for (const sensor of sensorsSeeingLine) {
        if (predicate(sensor)) {
          sensed = true;
          break;
        }
      }
      if (!sensed) {
        return x * 4000000 + y;
      }
    }
  }
};
