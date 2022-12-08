import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface ILinkedListItem {
  value: number;
  previous: ILinkedListItem;
  next: ILinkedListItem;
}

type LinkedList = ReadonlyArray<ILinkedListItem>;

const parser: (input: IAoCInput) => LinkedList = ({ input }: IAoCInput) => {
  const result = input[0].split("").map((s) => Number.parseInt(s, 10)).map(
    (n) => ({
      value: n,
    } as ILinkedListItem),
  );
  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      result[i].next = result[i + 1];
      result[i].previous = result[result.length - 1];
    } else if (i === result.length - 1) {
      result[i].next = result[0];
      result[i].previous = result[i - 1];
    } else {
      result[i].next = result[i + 1];
      result[i].previous = result[i - 1];
    }
  }
  return result;
};

const runMove: (list: LinkedList) => (currentCup: number) => number = (
  list: LinkedList,
) =>
(currentCup: number) => {
  const removedItems = removeNext3Items(list)(currentCup);
  const destionationCup = getDestinationCup(list)(currentCup);
  putItemsAfterDestination(list)(destionationCup)(removedItems);
  return (list.find((item) => item.value === currentCup) as ILinkedListItem)
    .next.value;
};

const removeNext3Items: (
  list: LinkedList,
) => (currentCup: number) => ReadonlyArray<ILinkedListItem> = (
  list: LinkedList,
) =>
(currentCup: number) => {
  const currentItem = list.find((item) =>
    item.value === currentCup
  ) as ILinkedListItem;
  const removed1 = currentItem.next;
  const removed2 = removed1.next;
  const removed3 = removed2.next;
  const nextToCurrentItem = removed3.next;
  currentItem.next = nextToCurrentItem;
  nextToCurrentItem.previous = currentItem;
  return [removed1, removed2, removed3];
};

const putItemsAfterDestination: (
  list: LinkedList,
) => (
  destinationCup: number,
) => (addedItems: ReadonlyArray<ILinkedListItem>) => void = (
  list: LinkedList,
) =>
(destinationCup: number) =>
(addedItems: ReadonlyArray<ILinkedListItem>) => {
  const destinationItem = list.find((item) =>
    item.value === destinationCup
  ) as ILinkedListItem;
  const nextToDestinationItem = destinationItem.next;
  destinationItem.next = addedItems[0];
  addedItems[0].previous = destinationItem;
  addedItems[addedItems.length - 1].next = nextToDestinationItem;
  nextToDestinationItem.previous = addedItems[addedItems.length - 1];
};

const getDestinationCup: (list: LinkedList) => (currentCup: number) => number =
  (list: LinkedList) => (currentCup: number) => {
    const currentItem = list.find((item) =>
      item.value === currentCup
    ) as ILinkedListItem;
    let destinationItem: ILinkedListItem | undefined;
    let valueToFind = currentItem.value - 1;
    while (!Boolean(destinationItem) && valueToFind > 0) {
      destinationItem = list.find((item) => item.value === valueToFind);
      valueToFind -= 1;
    }
    return Boolean(destinationItem)
      ? (destinationItem as ILinkedListItem).value
      : Math.max(...list.map(({ value }) => value));
  };

const getCupsLabel: (list: LinkedList) => string = (list: LinkedList) => {
  const firstItem = list.find((item) => item.value === 1) as ILinkedListItem;
  let result = "";
  let currentItem = firstItem;
  while (true) {
    currentItem = currentItem.next;
    if (currentItem.value === 1) return result;
    result = result + currentItem.value;
  }
};

export const fn1 = (movesNumber: number) => (input: IAoCInput) => {
  const list = parser(input);
  let count = 0;
  let currentCup = list[0].value;

  while (count <= movesNumber) {
    currentCup = runMove(list)(currentCup);
    count += 1;
  }

  return getCupsLabel(list);
};
export const fn2 = (input: IAoCInput) => {
  console.info("[2020-23] fn2", input);
  return undefined;
};
