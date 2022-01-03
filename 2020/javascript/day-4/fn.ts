import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IPassport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

export const isPassportValid = (passport: IPassport) => {
  const keys: ReadonlyArray<keyof IPassport> = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
  ];
  return keys.every((key) => Boolean(passport[key]));
};

export const isPassportPropertyValid = (
  key: string,
  value: string,
) => {
  switch (key) {
    case "byr":
      const byr = Number.parseInt(value, 10);
      return !isNaN(byr) && byr >= 1920 && byr <= 2002;
    case "cid":
      return true;
    case "ecl":
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    case "eyr":
      const eyr = Number.parseInt(value, 10);
      return !isNaN(eyr) && eyr >= 2020 && eyr <= 2030;
    case "hcl":
      return /#([0-9]|[a-f]){6}/gs.test(value);
    case "hgt":
      const unit = value.substring(value.length - 2, value.length);
      if (unit !== "cm" && unit !== "in") return false;
      if (unit === "cm") {
        const size = Number.parseInt(value.substring(0, 3), 10);
        return !isNaN(size) && size >= 150 && size <= 193;
      }
      if (unit === "in") {
        const size = Number.parseInt(value.substring(0, 2), 10);
        return !isNaN(size) && size >= 59 && size <= 76;
      }
    case "iyr":
      const iyr = Number.parseInt(value, 10);
      return !isNaN(iyr) && iyr >= 2010 && iyr <= 2020;
    case "pid":
      return value.length === 9 && !isNaN(Number.parseInt(value, 10));
    default:
      return false;
  }
};

export const parse = (input: IAoCInput) => {
  return input.input.reduce(
    (previousValue, currentValue) => {
      if (currentValue === "") {
        return [...previousValue, {}];
      }
      const properties = currentValue.split(" ").map((str) => str.split(":"));

      properties.forEach((prop) => {
        previousValue[previousValue.length - 1] = {
          ...previousValue[previousValue.length - 1],
          [prop[0]]: prop[1],
        };
      });

      return previousValue;
    },
    [{}] as Array<IPassport>,
  ) as ReadonlyArray<IPassport>;
};

export const yolo = (key: keyof IPassport, arr: ReadonlyArray<IPassport>) => {
  const dictionnary = arr.reduce((previousValue, currentValue) => {
    const value = currentValue[key] as string;
    if (previousValue[value]) return previousValue;
    return {
      ...previousValue,
      [value]: isPassportPropertyValid(key, value),
    };
  }, {} as { [key: string]: boolean });

  return dictionnary;
};

export const fn1 = (input: IAoCInput) => {
  const passports: ReadonlyArray<IPassport> = parse(input);

  return passports.filter((passport) => isPassportValid(passport)).length;
};
export const fn2 = (input: IAoCInput) => {
  const passports: ReadonlyArray<IPassport> = parse(input);

  const filteredPassportByRequired = passports.filter((passport) =>
    isPassportValid(passport)
  );
  const filteredPassportByValidField = filteredPassportByRequired.filter(
    (passport) => {
      return Object.entries(passport).every(([key, value]) =>
        isPassportPropertyValid(key, value)
      );
    },
  );

  console.log(yolo("hcl", filteredPassportByRequired));

  return filteredPassportByValidField.length;
};
