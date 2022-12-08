import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface Iinstruction {
  mask: string;
  address: number;
  value: number;
}

export type BiteArray = ReadonlyArray<"0" | "1" | "X">;

const parser: (input: IAoCInput) => ReadonlyArray<Iinstruction> = (
  { input }: IAoCInput,
) => {
  let result: ReadonlyArray<Iinstruction> = [];

  let currentMask: string = "";

  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("mask")) {
      currentMask = input[i].split("=")[1].trim();
    } else if (input[i].startsWith("mem")) {
      const value = Number.parseInt(input[i].split("=")[1].trim(), 10);
      const address = Number.parseInt(
        input[i].split("=")[0].split("[")[1].split("]")[0],
      );
      result = [...result, {
        mask: currentMask,
        address,
        value,
      }];
    }
  }
  return result;
};

const convertMaskToBiteArray: (str: string) => BiteArray = (str: string) =>
  str.split("") as BiteArray;

const convertNumberToBiteArray: (n: number) => BiteArray = (n: number) =>
  (n >>> 0).toString(2).split("") as BiteArray;

const convertBiteArrayToNumber: (arr: BiteArray) => number = (arr: BiteArray) =>
  Number.parseInt(arr.join(""), 2);

const applyMaskToValue: (mask: BiteArray) => (value: BiteArray) => BiteArray = (
  mask: BiteArray,
) =>
(value: BiteArray) => {
  const temp = [
    ...Array.from({ length: mask.length - value.length }, (_) => "0"),
    ...value,
  ];

  const result = [];
  for (let i = 0; i < mask.length; i++) {
    switch (mask[i]) {
      case "X":
        result.push(temp[i]);
        break;
      case "1":
        result.push("1");
        break;
      case "0":
        result.push("0");
    }
  }
  return result as BiteArray;
};

const getAddressesTroughMask: (
  mask: BiteArray,
) => (address: BiteArray) => ReadonlyArray<BiteArray> =
  (mask: BiteArray) => (address: BiteArray) => {
    const temp = [
      ...Array.from({ length: mask.length - address.length }, (_) => "0"),
      ...address,
    ];

    let addressMasked: BiteArray = [];
    for (let i = 0; i < mask.length; i++) {
      switch (mask[i]) {
        case "X":
          addressMasked = [...addressMasked, "X"];
          break;
        case "1":
          addressMasked = [...addressMasked, "1"];
          break;
        case "0":
          addressMasked = [...addressMasked, temp[i] as "0" | "1"];
      }
    }

    return getMaskPossibility(addressMasked);
  };

const getMaskPossibility: (mask: BiteArray) => ReadonlyArray<BiteArray> = (
  mask: BiteArray,
) => {
  const indexNextX = mask.findIndex((str) => str === "X");
  if (indexNextX === -1) return [mask];
  const mask1 = [...mask];
  mask1[indexNextX] = "0";
  const mask2 = [...mask];
  mask2[indexNextX] = "1";
  return [...getMaskPossibility(mask1), ...getMaskPossibility(mask2)];
};

export const applyMaskToNumber: (mask: string) => (n: number) => number = (
  mask: string,
) =>
(n: number) =>
  convertBiteArrayToNumber(
    applyMaskToValue(
      convertMaskToBiteArray(mask),
    )(
      convertNumberToBiteArray(n),
    ),
  );

export const applyMaskToAddress: (
  mask: string,
) => (address: number) => ReadonlyArray<number> =
  (mask: string) => (address: number) =>
    getAddressesTroughMask(
      convertMaskToBiteArray(mask),
    )(
      convertNumberToBiteArray(address),
    ).map((value) => convertBiteArrayToNumber(value));

export const fn1 = (input: IAoCInput) => {
  const instructions = parser(input);

  const map = instructions.reduce((previousValue, currentValue) => {
    const newValue = applyMaskToNumber(currentValue.mask)(currentValue.value);
    previousValue.set(currentValue.address, newValue);
    return previousValue;
  }, new Map<number, number>());

  return [...map.entries()].map((value) => value[1]).filter((value) =>
    value !== 0
  ).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};
export const fn2 = (input: IAoCInput) => {
  const instructions = parser(input);

  const map = instructions.reduce((previousValue, currentValue) => {
    const newAddresses = applyMaskToAddress(currentValue.mask)(
      currentValue.address,
    );
    newAddresses.forEach((address) => {
      previousValue.set(address, currentValue.value);
    });
    return previousValue;
  }, new Map<number, number>());

  return [...map.entries()].map((value) => value[1]).filter((value) =>
    value !== 0
  ).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};
