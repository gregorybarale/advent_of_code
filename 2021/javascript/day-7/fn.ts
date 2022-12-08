import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import {
  computeFuelConsumptionComplex,
  computeFuelConsumptionSimple,
  computeTargets,
} from "./utils.ts";

export const fn1 = ({ input }: IAoCInput) => {
  const positions = input[0].split(",").map((n) => Number.parseInt(n, 10));
  const targetsToTest = computeTargets(positions);
  const mapConsumption = targetsToTest.reduce((acc, n) => {
    acc.set(n, computeFuelConsumptionSimple(positions)(n));
    return acc;
  }, new Map<number, number>());
  return Math.min(...mapConsumption.values());
};
export const fn2 = ({ input }: IAoCInput) => {
  const positions = input[0].split(",").map((n) => Number.parseInt(n, 10));
  const targetsToTest = computeTargets(positions);
  const distanceMap = new Map<number, number>();
  const mapConsumption = targetsToTest.reduce((acc, n) => {
    acc.set(n, computeFuelConsumptionComplex(positions, distanceMap)(n));
    return acc;
  }, new Map<number, number>());
  return Math.min(...mapConsumption.values());
};
