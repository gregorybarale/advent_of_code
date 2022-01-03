import { MuxAsyncIterator } from "https://deno.land/std@0.79.0/async/mux_async_iterator.ts";
import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

enum InstructionTypeEnum {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  FORWARD = "F",
  LEFT = "L",
  RIGHT = "R",
}

interface IMoveInstruction {
  type: InstructionTypeEnum;
  value: number;
}

interface ICoordinate {
  x: number;
  y: number;
}

interface IShip {
  coordinate: ICoordinate;
  facing: number;
}

const getFacingAsDirection: (
  n: number,
) =>
  | InstructionTypeEnum.NORTH
  | InstructionTypeEnum.SOUTH
  | InstructionTypeEnum.WEST
  | InstructionTypeEnum.EAST = (n: number) => {
    if (n % 360 === 0) return InstructionTypeEnum.NORTH;
    if (n % 360 === 90) return InstructionTypeEnum.EAST;
    if (n % 360 === 180) return InstructionTypeEnum.SOUTH;
    return InstructionTypeEnum.WEST;
  };

const getTransformFunctionForShip: (
  instructionType: InstructionTypeEnum,
) => (value: number) => (ship: IShip) => IShip = (
  instructionType: InstructionTypeEnum,
) => {
  switch (instructionType) {
    case InstructionTypeEnum.NORTH:
      return (value: number) =>
        (ship: IShip) => ({
          ...ship,
          coordinate: {
            ...ship.coordinate,
            y: ship.coordinate.y + value,
          },
        });
    case InstructionTypeEnum.SOUTH:
      return (value: number) =>
        (ship: IShip) => ({
          ...ship,
          coordinate: {
            ...ship.coordinate,
            y: ship.coordinate.y - value,
          },
        });
    case InstructionTypeEnum.EAST:
      return (value: number) =>
        (ship: IShip) => ({
          ...ship,
          coordinate: {
            ...ship.coordinate,
            x: ship.coordinate.x + value,
          },
        });
    case InstructionTypeEnum.WEST:
      return (value: number) =>
        (ship: IShip) => ({
          ...ship,
          coordinate: {
            ...ship.coordinate,
            x: ship.coordinate.x - value,
          },
        });
    case InstructionTypeEnum.FORWARD:
      return (value: number) =>
        (ship: IShip) =>
          getTransformFunctionForShip(getFacingAsDirection(ship.facing))(value)(
            ship,
          );
    case InstructionTypeEnum.LEFT:
      return (value: number) =>
        (ship: IShip) => ({
          ...ship,
          facing: ship.facing - value,
        });
    case InstructionTypeEnum.RIGHT:
      return (value: number) =>
        (ship: IShip) => ({
          ...ship,
          facing: ship.facing + value,
        });
    default:
      return (value: number) => (ship: IShip) => ({ ...ship });
  }
};

const rotateAroundCenter: (
  center: ICoordinate,
) => (rotation: number) => (coordinate: ICoordinate) => ICoordinate = (
  center: ICoordinate,
) =>
  (rotation: number) =>
    (coordinate: ICoordinate) => {
      const realRotation = rotation % 360;

      let result = { ...coordinate };

      if (realRotation === 90 || realRotation === -270) {
        result = {
          x: coordinate.y,
          y: coordinate.x * -1,
        };
      } else if (realRotation === -90 || realRotation === 270) {
        result = {
          x: coordinate.y * -1,
          y: coordinate.x,
        };
      } else if (realRotation === 180 || realRotation === -180) {
        result = {
          x: coordinate.x * -1,
          y: coordinate.y * -1,
        };
      }

      return result;
    };

const getTransformFunctionForCoordinate: (
  instructionType: InstructionTypeEnum,
  configCoodinate: ICoordinate,
) => (
  value: number,
) => (
  coordinateToChanged: ICoordinate,
) => ICoordinate = (
  instructionType: InstructionTypeEnum,
  configCoodinate: ICoordinate,
) => {
  switch (instructionType) {
    case InstructionTypeEnum.NORTH:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) => ({
          ...coordinateToChanged,
          y: coordinateToChanged.y + value,
        });
    case InstructionTypeEnum.SOUTH:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) => ({
          ...coordinateToChanged,
          y: coordinateToChanged.y - value,
        });
    case InstructionTypeEnum.EAST:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) => ({
          ...coordinateToChanged,
          x: coordinateToChanged.x + value,
        });
    case InstructionTypeEnum.WEST:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) => ({
          ...coordinateToChanged,
          x: coordinateToChanged.x - value,
        });
    case InstructionTypeEnum.FORWARD:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) => ({
          x: coordinateToChanged.x + value * configCoodinate.x,
          y: coordinateToChanged.y + value * configCoodinate.y,
        });
    case InstructionTypeEnum.LEFT:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) =>
          rotateAroundCenter(configCoodinate)(value * -1)(coordinateToChanged);
    case InstructionTypeEnum.RIGHT:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) =>
          rotateAroundCenter(configCoodinate)(value)(coordinateToChanged);
    default:
      return (value: number) =>
        (coordinateToChanged: ICoordinate) => ({ ...coordinateToChanged });
  }
};

const parser: (input: IAoCInput) => ReadonlyArray<IMoveInstruction> = (
  { input }: IAoCInput,
) =>
  input.map((value) => {
    const [instruction, ...strNumber] = value.split("");
    return {
      type: instruction as InstructionTypeEnum,
      value: Number.parseInt(strNumber.join("")),
    };
  });

export const fn1 = (input: IAoCInput) => {
  const instructions = parser(input);
  let ship: IShip = {
    coordinate: {
      x: 0,
      y: 0,
    },
    facing: 90,
  };

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    ship = getTransformFunctionForShip(instruction.type)(instruction.value)(
      ship,
    );
  }

  return Math.abs(ship.coordinate.x) + Math.abs(ship.coordinate.y);
};
export const fn2 = (input: IAoCInput) => {
  const instructions = parser(input);
  let wayPoint: ICoordinate = {
    x: 10,
    y: 1,
  };
  let ship: ICoordinate = {
    x: 0,
    y: 0,
  };

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction.type === InstructionTypeEnum.FORWARD) {
      ship = getTransformFunctionForCoordinate(instruction.type, wayPoint)(
        instruction.value,
      )(ship);
    } else {
      wayPoint = getTransformFunctionForCoordinate(instruction.type, ship)(
        instruction.value,
      )(wayPoint);
    }
  }

  return Math.abs(ship.x) + Math.abs(ship.y);
};
