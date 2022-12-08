import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

enum DirectionEnum {
  EAST = "e",
  SOUTH_EAST = "se",
  SOUTH_WEST = "sw",
  WEST = "w",
  NORTH_WEST = "nw",
  NORTH_EAST = "ne",
}

enum ColorEnum {
  WHITE = "w",
  BLACK = "b",
}

interface ICoordinate {
  x: number;
  y: number;
  z: number;
}

type Tiles = Map<string, ColorEnum>;

const parser: (
  input: IAoCInput,
) => ReadonlyArray<ReadonlyArray<DirectionEnum>> = ({ input }: IAoCInput) =>
  input.map((str) =>
    str.split("").reduce<{
      result: ReadonlyArray<DirectionEnum>;
      buffer: string;
    }>((previousValue, currentValue) => {
      let tempResult: DirectionEnum | undefined;
      let tempBuffer: string = "";
      switch (currentValue) {
        case "e":
          if (previousValue.buffer === "s" || previousValue.buffer === "n") {
            tempResult = previousValue.buffer === "s"
              ? DirectionEnum.SOUTH_EAST
              : DirectionEnum.NORTH_EAST;
          } else {
            tempResult = DirectionEnum.EAST;
          }
          break;
        case "w":
          if (previousValue.buffer === "s" || previousValue.buffer === "n") {
            tempResult = previousValue.buffer === "s"
              ? DirectionEnum.SOUTH_WEST
              : DirectionEnum.NORTH_WEST;
          } else {
            tempResult = DirectionEnum.WEST;
          }
          break;
        case "n":
          tempBuffer = "n";
          break;
        case "s":
          tempBuffer = "s";
          break;
      }

      return {
        result: Boolean(tempResult)
          ? [...previousValue.result, tempResult as DirectionEnum]
          : previousValue.result,
        buffer: tempBuffer,
      };
    }, {
      result: [],
      buffer: "",
    }).result
  );

const convertDirectionToCoordinateTransformFn: (
  direction: DirectionEnum,
) => (coord: ICoordinate) => ICoordinate = (direction: DirectionEnum) => {
  switch (direction) {
    case DirectionEnum.EAST:
      return (coord: ICoordinate) => ({
        ...coord,
        x: coord.x + 1,
        y: coord.y - 1,
      });
    case DirectionEnum.NORTH_EAST:
      return (coord: ICoordinate) => ({
        ...coord,
        x: coord.x + 1,
        z: coord.z - 1,
      });
    case DirectionEnum.NORTH_WEST:
      return (coord: ICoordinate) => ({
        ...coord,
        y: coord.y + 1,
        z: coord.z - 1,
      });
    case DirectionEnum.SOUTH_EAST:
      return (coord: ICoordinate) => ({
        ...coord,
        y: coord.y - 1,
        z: coord.z + 1,
      });
    case DirectionEnum.SOUTH_WEST:
      return (coord: ICoordinate) => ({
        ...coord,
        x: coord.x - 1,
        z: coord.z + 1,
      });
    case DirectionEnum.WEST:
      return (coord: ICoordinate) => ({
        ...coord,
        x: coord.x - 1,
        y: coord.y + 1,
      });
  }
};

const convertCoordinateToTileId: (coordinate: ICoordinate) => string = (
  coordinate: ICoordinate,
) => `${coordinate.x}/${coordinate.y}/${coordinate.z}`;

const convertTileIdToCoordinate: (id: string) => ICoordinate = (id: string) => {
  const arr = id.split("/");
  return {
    x: Number.parseInt(arr[0], 10),
    y: Number.parseInt(arr[1], 10),
    z: Number.parseInt(arr[2], 10),
  };
};

const countBlackTiles: (tiles: Map<string, ColorEnum>) => number = (
  tiles: Tiles,
) =>
  [...tiles.values()].reduce((previousValue, currentValue) => {
    if (currentValue === ColorEnum.BLACK) {
      return previousValue + 1;
    }
    return previousValue;
  }, 0);

const applyInitialInstructionsList: (
  instructionsList: ReadonlyArray<ReadonlyArray<DirectionEnum>>,
) => Tiles = (
  instructionsList: ReadonlyArray<ReadonlyArray<DirectionEnum>>,
) => {
  const tiles: Tiles = new Map<string, ColorEnum>();
  instructionsList.forEach((instructions) => {
    let coordinate: ICoordinate = {
      x: 0,
      y: 0,
      z: 0,
    };
    instructions.forEach((instruction) => {
      coordinate = convertDirectionToCoordinateTransformFn(instruction)(
        coordinate,
      );
    });

    const id = convertCoordinateToTileId(coordinate);

    if (tiles.has(id)) {
      tiles.set(
        id,
        tiles.get(id) === ColorEnum.BLACK ? ColorEnum.WHITE : ColorEnum.BLACK,
      );
    } else {
      tiles.set(id, ColorEnum.BLACK);
    }
  });
  return tiles;
};

const getAdjacentTiles: (
  coordinate: ICoordinate,
) => ReadonlyArray<ICoordinate> = (coordinate: ICoordinate) =>
  [
    DirectionEnum.EAST,
    DirectionEnum.NORTH_EAST,
    DirectionEnum.NORTH_WEST,
    DirectionEnum.SOUTH_EAST,
    DirectionEnum.SOUTH_WEST,
    DirectionEnum.WEST,
  ].map((direction) =>
    convertDirectionToCoordinateTransformFn(direction)(coordinate)
  );

const runCycle: (blackTiles: ReadonlyArray<string>) => ReadonlyArray<string> = (
  blackTiles: ReadonlyArray<string>,
) => {
  const adjacentWhiteIds = getWhiteAdjacentsFromBlack(blackTiles);
  const blackTilesToKeep = filterBlackTilesWithAdjacents(blackTiles);
  const whiteTilesToFlip = filterWhiteTilesWithAdjacents(blackTiles)(
    adjacentWhiteIds,
  );

  //console.log(blackTiles);
  //console.log(adjacentWhiteIds);
  //console.log(blackTilesToKeep);
  //console.log(whiteTilesToFlip);

  return [...blackTilesToKeep, ...whiteTilesToFlip];
};

const getWhiteAdjacentsFromBlack: (
  blackTilesId: ReadonlyArray<string>,
) => ReadonlyArray<string> = (blackTilesId: ReadonlyArray<string>) =>
  blackTilesId.map((id) =>
    getAdjacentTiles(convertTileIdToCoordinate(id)).map(
      convertCoordinateToTileId,
    )
  ).flat().reduce((previousValue, currentValue) => {
    if (previousValue.includes(currentValue)) {
      return previousValue;
    }
    return [...previousValue, currentValue];
  }, [] as ReadonlyArray<string>).filter((id) => !blackTilesId.includes(id));

const filterBlackTilesWithAdjacents: (
  blackTilesId: ReadonlyArray<string>,
) => ReadonlyArray<string> = (
  blackTilesId: ReadonlyArray<string>,
) =>
  blackTilesId.reduce((previousValue, currentValue, _, array) => {
    const adjacentIds = getAdjacentTiles(
      convertTileIdToCoordinate(currentValue),
    ).map((coord) => convertCoordinateToTileId(coord));
    const adjacentBlackIds = adjacentIds.filter((id) => array.includes(id));
    if (adjacentBlackIds.length === 0 || adjacentBlackIds.length > 2) {
      return previousValue;
    }
    return [...previousValue, currentValue];
  }, [] as ReadonlyArray<string>);

const filterWhiteTilesWithAdjacents: (
  blackTilesId: ReadonlyArray<string>,
) => (whiteTilesId: ReadonlyArray<string>) => ReadonlyArray<string> = (
  blackTilesId: ReadonlyArray<string>,
) =>
(whiteTilesId: ReadonlyArray<string>) =>
  whiteTilesId.reduce((previousValue, currentValue) => {
    const adjacentIds = getAdjacentTiles(
      convertTileIdToCoordinate(currentValue),
    ).map((coord) => convertCoordinateToTileId(coord));
    const adjacentBlackIds = adjacentIds.filter((id) =>
      blackTilesId.includes(id)
    );
    if (adjacentBlackIds.length === 2) {
      return [...previousValue, currentValue];
    }
    return previousValue;
  }, [] as ReadonlyArray<string>);

export const fn1 = (input: IAoCInput) => {
  const instructionsList = parser(input);
  const tiles = applyInitialInstructionsList(instructionsList);
  return countBlackTiles(tiles);
};
export const fn2 = (input: IAoCInput) => {
  const instructionsList = parser(input);
  const tiles = applyInitialInstructionsList(instructionsList);
  let blackTiles = [...tiles.entries()].filter((value) =>
    value[1] === ColorEnum.BLACK
  ).map((value) => value[0]) as ReadonlyArray<string>;
  let turn = 0;
  console.log(`Turn: ${turn} / Count: ${blackTiles.length}`);

  while (turn < 100) {
    blackTiles = runCycle(blackTiles);
    turn += 1;
    console.log(`Turn: ${turn} / Count: ${blackTiles.length}`);
  }

  return blackTiles.length;
};
