export interface ISignal {
  input: ReadonlyArray<string>;
  output: ReadonlyArray<string>;
}

export type Wire = "a" | "b" | "c" | "d" | "e" | "f" | "g";
export type Digit = ReadonlyArray<Wire>;
export type DigitPredicate = (digit: Digit) => boolean;
export type Dictionnary = ReadonlyArray<{
  real: Wire;
  wrong: Wire;
}>;

export const stringToDigit = (str: string): Digit => str.split("") as Digit;
export const digitToString = (wires: Digit): string => wires.join("");

export const parseInput = (
  input: ReadonlyArray<string>,
): ReadonlyArray<ISignal> =>
  input.map((str) => {
    const [inputStr, outputStr] = str.split("|").map((s) => s.trim());
    return {
      input: inputStr.split(" ").map((s) => s.trim()),
      output: outputStr.split(" ").map((s) => s.trim()),
    };
  });

export const isDigitOne = (digit: Digit) => digit.length === 2;
export const isDigitFour = (digit: Digit) => digit.length === 4;
export const isDigitSeven = (digit: Digit) => digit.length === 3;
export const isDigitEight = (digit: Digit) => digit.length === 7;

export const filterByDigit =
  (predicate: DigitPredicate) =>
  (digits: ReadonlyArray<Digit>): ReadonlyArray<Digit> =>
    digits.filter(predicate);

export const findDigit =
  (predicate: DigitPredicate) => (signal: ISignal): Digit => {
    const allDigits = [
      ...signal.input.map(stringToDigit),
      ...signal.output.map(stringToDigit),
    ];
    const digit = filterByDigit(predicate)(allDigits)[0];
    if (digit === undefined) throw new Error("No corresponding digit");
    return digit;
  };

export const findRuleInDictionnary =
  (dictionnary: Dictionnary, isLookingForReal = true) => (wire: Wire) =>
    dictionnary.find(({ real, wrong }) =>
      isLookingForReal ? real === wire : wrong === wire
    );

export const correctDigit =
  (dictionnary: Dictionnary) => (digit: Digit): Digit =>
    digit.map((wire) =>
      findRuleInDictionnary(dictionnary, false)(wire)?.real as Wire
    );

export const digitToStringNumber = (digit: Digit): string => {
  const code = [...digit].sort().join("");
  switch (code) {
    case "abcefg":
      return "0";
    case "cf":
      return "1";
    case "acdeg":
      return "2";
    case "acdfg":
      return "3";
    case "bcdf":
      return "4";
    case "abdfg":
      return "5";
    case "abdefg":
      return "6";
    case "acf":
      return "7";
    case "abcdefg":
      return "8";
    case "abcdfg":
      return "9";
  }
  return "Something went wrong";
};

export const findRules = (signal: ISignal): Dictionnary => {
  let dictionnary: Dictionnary = [];
  dictionnary = findARule(signal)(dictionnary);
  dictionnary = findGRule(signal)(dictionnary);
  dictionnary = findDRule(signal)(dictionnary);
  dictionnary = findBRule(signal)(dictionnary);
  dictionnary = findFRule(signal)(dictionnary);
  dictionnary = findCRule(signal)(dictionnary);
  dictionnary = findERule(signal)(dictionnary);
  return dictionnary;
};

const findARule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const oneDigit = findDigit(isDigitOne)(signal);
    const sevenDigit = findDigit(isDigitSeven)(signal);

    const wrongValueForA =
      sevenDigit.filter((wire) => !oneDigit.includes(wire))[0];
    return [
      ...dictionnary.filter(({ real }) => real !== "a"),
      {
        real: "a",
        wrong: wrongValueForA,
      },
    ];
  };

const findGRule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const fourDigit = findDigit(isDigitFour)(signal);
    const sevenDigit = findDigit(isDigitSeven)(signal);
    const allDigits = [
      ...signal.input.map(stringToDigit),
      ...signal.output.map(stringToDigit),
    ];

    const possibleNineDigits = allDigits.filter((digit) =>
      digit.length === 6 &&
      digit.reduce((acc, wire) => {
          if (
            fourDigit.includes(wire) || sevenDigit.includes(wire)
          ) return acc + 1;
          return acc;
        }, 0) === 5
    );

    if (possibleNineDigits.length === 0) {
      throw new Error("No corresponding digit for 9");
    }

    const wrongValueForG =
      possibleNineDigits[0].filter((wire) =>
        !fourDigit.includes(wire) && !sevenDigit.includes(wire)
      )[0];
    return [
      ...dictionnary.filter(({ real }) => real !== "g"),
      {
        real: "g",
        wrong: wrongValueForG,
      },
    ];
  };

const findDRule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const sevenDigit = findDigit(isDigitSeven)(signal);
    const allDigits = [
      ...signal.input.map(stringToDigit),
      ...signal.output.map(stringToDigit),
    ];
    const gRule = findRuleInDictionnary(dictionnary)("g");

    const possibleThreeDigits = allDigits.filter((digit) =>
      digit.length === 5 &&
      digit.reduce((acc, wire) => {
          if (sevenDigit.includes(wire) || wire === gRule?.wrong) {
            return acc + 1;
          }
          return acc;
        }, 0) === 4
    );

    if (possibleThreeDigits.length === 0) {
      throw new Error("No corresponding digit for 3");
    }

    const wrongValueForD =
      possibleThreeDigits[0].filter((wire) =>
        !sevenDigit.includes(wire) && wire !== gRule?.wrong
      )[0];
    return [
      ...dictionnary.filter(({ real }) => real !== "d"),
      {
        real: "d",
        wrong: wrongValueForD,
      },
    ];
  };

const findBRule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const oneDigit = findDigit(isDigitOne)(signal);
    const fourDigit = findDigit(isDigitFour)(signal);
    const dRule = findRuleInDictionnary(dictionnary)("d");

    const wrongValueForD =
      fourDigit.filter((wire) =>
        !oneDigit.includes(wire) && wire !== dRule?.wrong
      )[0];
    return [
      ...dictionnary.filter(({ real }) => real !== "b"),
      {
        real: "b",
        wrong: wrongValueForD,
      },
    ];
  };

const findFRule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const allDigits = [
      ...signal.input.map(stringToDigit),
      ...signal.output.map(stringToDigit),
    ];
    const aRule = findRuleInDictionnary(dictionnary)("a");
    const bRule = findRuleInDictionnary(dictionnary)("b");
    const dRule = findRuleInDictionnary(dictionnary)("d");
    const gRule = findRuleInDictionnary(dictionnary)("g");

    const possibleFiveDigits = allDigits.filter((digit) =>
      digit.length === 5 &&
      digit.reduce((acc, wire) => {
          if (
            wire === aRule?.wrong || wire === bRule?.wrong ||
            wire === dRule?.wrong || wire === gRule?.wrong
          ) return acc + 1;
          return acc;
        }, 0) === 4
    );
    if (possibleFiveDigits.length === 0) {
      throw new Error("No corresponding digit for 5");
    }

    const wrongValueForF =
      possibleFiveDigits[0].filter((wire) =>
        wire !== aRule?.wrong &&
        wire !== bRule?.wrong &&
        wire !== dRule?.wrong &&
        wire !== gRule?.wrong
      )[0];

    return [
      ...dictionnary.filter(({ real }) => real !== "f"),
      {
        real: "f",
        wrong: wrongValueForF,
      },
    ];
  };

const findCRule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const fourDigit = findDigit(isDigitFour)(signal);
    const bRule = findRuleInDictionnary(dictionnary)("b");
    const dRule = findRuleInDictionnary(dictionnary)("d");
    const fRule = findRuleInDictionnary(dictionnary)("f");

    const wrongValueForC = fourDigit.filter((wire) =>
      wire !== fRule?.wrong &&
      wire !== bRule?.wrong &&
      wire !== dRule?.wrong
    )[0];

    return [
      ...dictionnary.filter(({ real }) => real !== "c"),
      {
        real: "c",
        wrong: wrongValueForC,
      },
    ];
  };

const findERule =
  (signal: ISignal) => (dictionnary: Dictionnary): Dictionnary => {
    const aRule = findRuleInDictionnary(dictionnary)("a");
    const bRule = findRuleInDictionnary(dictionnary)("b");
    const cRule = findRuleInDictionnary(dictionnary)("c");
    const dRule = findRuleInDictionnary(dictionnary)("d");
    const fRule = findRuleInDictionnary(dictionnary)("f");
    const gRule = findRuleInDictionnary(dictionnary)("g");

    const allDigits = [
      ...signal.input.map(stringToDigit),
      ...signal.output.map(stringToDigit),
    ];
    const possibleEightDigits = allDigits.filter((digit) => digit.length === 7);
    if (possibleEightDigits.length === 0) {
      throw new Error("No corresponding digit for 8");
    }

    const wrongValueForE =
      possibleEightDigits[0].filter((wire) =>
        wire !== aRule?.wrong &&
        wire !== bRule?.wrong &&
        wire !== cRule?.wrong &&
        wire !== dRule?.wrong &&
        wire !== fRule?.wrong &&
        wire !== gRule?.wrong
      )[0];

    return [
      ...dictionnary.filter(({ real }) => real !== "e"),
      {
        real: "e",
        wrong: wrongValueForE,
      },
    ];
  };
