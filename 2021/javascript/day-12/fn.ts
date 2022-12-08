import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { findAllPaths, isSmallCave, parseInput } from "./utils.ts";

export const fn1 = ({ input }: IAoCInput) => {
  const connections = parseInput(input);
  const paths = findAllPaths(connections);
  return paths.length;
};
export const fn2 = ({ input }: IAoCInput) => {
  const connections = parseInput(input);
  const paths = findAllPaths(connections, false);
  return paths.length;
};
