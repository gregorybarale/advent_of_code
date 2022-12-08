import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

export type MoveType = "forward" | "up" | "down";

export interface IPosition {
  horizontal: number;
  depth: number;
  aim?: number;
}

export interface ICommand {
  type: MoveType;
  nbr: number;
}

export const parseRawInput = (raw: IAoCInput): ReadonlyArray<ICommand> => {
  return raw.input.map((str) => {
    const [type, strNbr] = str.split(" ");
    return {
      type,
      nbr: Number.parseInt(strNbr, 10),
    } as ICommand;
  });
};

export const updatePosition =
  (command: ICommand) => (position: IPosition): IPosition => {
    const hasAim = position.aim !== undefined;
    if (hasAim) {
      if (command.type === "down") {
        return {
          ...position,
          aim: (position.aim as number) + command.nbr,
        };
      }
      if (command.type === "up") {
        return {
          ...position,
          aim: (position.aim as number) - command.nbr,
        };
      }
      return {
        ...position,
        horizontal: position.horizontal + command.nbr,
        depth: position.depth + Math.abs(position.aim as number) * command.nbr,
      };
    }

    if (command.type === "down") {
      return {
        ...position,
        depth: position.depth + command.nbr,
      };
    }
    if (command.type === "up") {
      return {
        ...position,
        depth: position.depth - command.nbr,
      };
    }
    return {
      ...position,
      horizontal: position.horizontal + command.nbr,
    };
  };
