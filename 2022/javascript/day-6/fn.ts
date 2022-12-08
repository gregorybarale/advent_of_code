import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IChainedItem {
  id: number;
  next: IChainedItem | null;
  value: string;
}

type ChainedList = ReadonlyArray<IChainedItem>;

const parseInput = (input: string): ChainedList => {
  const characters = input.split("");
  return characters.reduce((acc, value, index) => {
    const item = {
      id: index + 1,
      next: null,
      value,
    };
    if (index > 0) {
      acc[index - 1].next = item;
    }
    return [...acc, item];
  }, [] as ReadonlyArray<IChainedItem>);
};

const getPacket = (length: number) => (item: IChainedItem): boolean => {
  const values = [];
  let currentItem = item;
  for (let i = 0; i < length; i++) {
    values.push(currentItem.value);
    currentItem = currentItem.next!;
  }
  return (new Set(values)).size === length;
};

export const fn1 = ({ input }: IAoCInput) => {
  const packetLength = 4;
  const list = parseInput(input[0]);
  let item = list[0];
  while (!getPacket(packetLength)(item)) {
    item = item.next!;
  }
  return item.id + packetLength - 1;
};
export const fn2 = ({ input }: IAoCInput) => {
  const packetLength = 14;
  const list = parseInput(input[0]);
  let item = list[0];
  while (!getPacket(packetLength)(item)) {
    item = item.next!;
  }
  return item.id + packetLength - 1;
};
