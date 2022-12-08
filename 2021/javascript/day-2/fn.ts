import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { IPosition, parseRawInput, updatePosition } from "./utils.ts";

export const fn1 = (input: IAoCInput) => {
  const commands = parseRawInput(input);
  let position: IPosition = {
    horizontal: 0,
    depth: 0,
  };
  commands.forEach((command) => {
    position = updatePosition(command)(position);
  });
  return position.depth * position.horizontal;
};
export const fn2 = (input: IAoCInput) => {
  const commands = parseRawInput(input);
  let position: IPosition = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };
  commands.forEach((command) => {
    position = updatePosition(command)(position);
  });
  return position.depth * position.horizontal;
};
