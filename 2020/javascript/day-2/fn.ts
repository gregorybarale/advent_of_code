import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IPasswordConfig {
  min: number;
  max: number;
  letter: string;
  password: string;
}

const parser: (str: string) => IPasswordConfig = (str: string) => {
  const [minMax, rawLetter, password] = str.split(" ");
  const [minStr, maxStr] = minMax.split("-");
  const letter = rawLetter[0];

  return {
    min: Number.parseInt(minStr, 10),
    max: Number.parseInt(maxStr, 10),
    letter,
    password,
  };
};

const checkPasswordValidity1: (config: IPasswordConfig) => boolean = (
  config: IPasswordConfig,
) => {
  const regexp = new RegExp(`${config.letter}`, "g");
  const n = config.password.match(regexp)?.length as number;
  return n >= config.min && n <= config.max;
};

const checkPasswordValidity2: (config: IPasswordConfig) => boolean = (
  config: IPasswordConfig,
) => {
  const letterMin = config.password.charAt(config.min - 1);
  const letterMax = config.password.charAt(config.max - 1);

  return letterMin === config.letter && letterMax !== config.letter ||
    letterMin !== config.letter && letterMax === config.letter;
};

export const fn1 = (input: IAoCInput) => {
  const passwordConfigs: ReadonlyArray<IPasswordConfig> = input.input.map(
    (str) => parser(str),
  );

  return passwordConfigs.filter((config) => checkPasswordValidity1(config))
    .length;
};
export const fn2 = (input: IAoCInput) => {
  const passwordConfigs: ReadonlyArray<IPasswordConfig> = input.input.map(
    (str) => parser(str),
  );
  return passwordConfigs.filter((config) => checkPasswordValidity2(config))
    .length;
};
