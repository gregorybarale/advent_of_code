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

const coordSensedBySensorInLine =
  (sensor: ISensor) => (line: number): Set<string> => {
    const coord = new Set<string>();
    const xMin = sensor.x -
      Math.abs(sensor.manhattanDistanceToClosest - Math.abs(line - sensor.y));
    const xMax = sensor.x +
      Math.abs(sensor.manhattanDistanceToClosest - Math.abs(line - sensor.y));
    for (let x = xMin; x <= xMax; x++) {
      coord.add(coordToString({ x, y: line }));
    }
    return coord;
  };

export const fn1 = ({ input }: IAoCInput, line: number) => {
  const sensors = parseInput(input);
  const sensorsSensingLine = filterSensorSensingLine(line)(sensors);
  const coordsSensedBySensorsInLineFns = sensorsSensingLine.map(
    coordSensedBySensorInLine,
  );
  const coordsSensedBySensorsInLine = coordsSensedBySensorsInLineFns.reduce(
    (acc, curr) => {
      const coords = curr(line);
      return new Set([...acc, ...coords]);
    },
    new Set<string>(),
  );
  const beacons = new Set(
    sensors.map((sensor) => coordToString(sensor.closestBeacon)),
  );
  beacons.forEach((beacon) => coordsSensedBySensorsInLine.delete(beacon));
  return coordsSensedBySensorsInLine.size;
};
export const fn2 = (input: IAoCInput) => {
  return undefined;
};
