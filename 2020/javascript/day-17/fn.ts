import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

enum StateEnum {
  ACTIVE = "#",
  INACTIVE = ".",
}

interface ICoordinate {
  x: number;
  y: number;
  z: number;
}

interface ICube {
  coordinate: ICoordinate;
  state: StateEnum;
  neighbours: ReadonlyArray<ICube>;
}

type Dimension = Map<string, ICube>;

const coordinateToId: (coordinate: ICoordinate) => string = (
  coordinate: ICoordinate,
) => `${coordinate.x},${coordinate.y},${coordinate.z}`;

const idToCoordinate: (id: string) => ICoordinate = (id: string) => {
  const arr = id.split(",");
  return {
    x: Number.parseInt(arr[0], 10),
    y: Number.parseInt(arr[1], 10),
    z: Number.parseInt(arr[2], 10),
  };
};

const parser: (input: IAoCInput) => Dimension = (
  { input }: IAoCInput,
) => {
  const cubes = input.map((str) => str.split("")).reduce(
    (previousValue, currentValue, currentIndex) => {
      const temp = [];
      for (let i = 0; i < currentValue.length; i++) {
        temp.push({
          state: currentValue[i],
          coordinate: {
            x: i,
            y: currentIndex,
            z: 0,
          },
        } as ICube);
      }
      return [...previousValue, ...temp];
    },
    [] as ReadonlyArray<ICube>,
  );
  const dimension = new Map<string, ICube>();
  cubes.forEach((cube) => {
    dimension.set(coordinateToId(cube.coordinate), cube);
  });
  return dimension;
};

const createEmptyCube: (coordinate: ICoordinate) => ICube = (
  coordinate: ICoordinate,
) => ({
  coordinate,
  state: StateEnum.INACTIVE,
  neighbours: [],
});

const findNeighbours: (
  dimension: Dimension,
) => (cube: ICube) => {
  existing: ReadonlyArray<ICube>;
  created: ReadonlyArray<ICube>;
} = (dimension: Dimension) =>
  (cube: ICube) => {
    const xPossibility = [
      cube.coordinate.x - 1,
      cube.coordinate.x,
      cube.coordinate.x + 1,
    ];
    const yPossibility = [
      cube.coordinate.y - 1,
      cube.coordinate.y,
      cube.coordinate.y + 1,
    ];
    const zPossibility = [
      cube.coordinate.z - 1,
      cube.coordinate.z,
      cube.coordinate.z + 1,
    ];
    let coordinatePossibility: Array<ICoordinate> = [];
    let neighbours: {
      existing: ReadonlyArray<ICube>;
      created: ReadonlyArray<ICube>;
    } = {
      existing: [],
      created: [],
    };

    for (let i = 0; i < xPossibility.length; i++) {
      for (let j = 0; j < yPossibility.length; j++) {
        for (let k = 0; k < zPossibility.length; k++) {
          coordinatePossibility.push({
            x: xPossibility[i],
            y: yPossibility[j],
            z: zPossibility[k],
          });
        }
      }
    }

    coordinatePossibility = coordinatePossibility.filter((coordinate) =>
      coordinateToId(coordinate) === coordinateToId(cube.coordinate)
    );

    coordinatePossibility.forEach((coordinate) => {
      const id = coordinateToId(coordinate);
      if (dimension.has(id)) {
        neighbours.existing = [
          ...neighbours.existing,
          dimension.get(id) as ICube,
        ];
      } else {
        neighbours.created = [
          ...neighbours.created,
          createEmptyCube(coordinate),
        ];
      }
    });

    return neighbours;
  };

export const fn1 = (input: IAoCInput) => {
  let dimension = parser(input);

  console.log(dimension);

  return undefined;
};
export const fn2 = (input: IAoCInput) => {
  return undefined;
};
