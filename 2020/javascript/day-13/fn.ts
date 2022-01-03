import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IData {
  earliestTimestamp: number;
  busIds: ReadonlyArray<number>;
}

const parser: (input: IAoCInput) => IData = ({ input }: IAoCInput) => ({
  earliestTimestamp: Number.parseInt(input[0], 10),
  busIds: input[1].split(",").filter((str) => str !== "x").map((str) =>
    parseInt(str, 10)
  ),
});

export const fn1 = (input: IAoCInput) => {
  const data = parser(input);
  const earliestBus = data.busIds.map((id) => ({
    id,
    timeToWait: (Math.floor(data.earliestTimestamp / id) + 1) * id -
      data.earliestTimestamp,
  })).sort((a, b) => a.timeToWait - b.timeToWait);
  return earliestBus[0].id * earliestBus[0].timeToWait;
};

const generateCheckFn = (busIds: ReadonlyArray<string>) =>
  busIds.map((str, index) => {
    if (str !== "x") {
      return (n: number) => (n + index) % Number.parseInt(str, 10) === 0;
    }
    return undefined;
  }).filter((fn) => fn !== undefined) as ReadonlyArray<
    (n: number) => boolean
  >;

export const fn2 = (startingNumber: number) =>
  ({ input }: IAoCInput) => {
    const rawbusIds = input[1].split(",");

    return undefined;
  };

//while (!checkNumberFunctions.every((fn) => fn(result))) {
//  result += 1;
//}
