import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

type RulesMap = Map<number, CheckerFn | undefined>;

type CheckerFn = (dictionnary: RulesMap) => (message: string) => boolean;

const parser: (input: IAoCInput) => {
  dictionnary: RulesMap;
  messages: ReadonlyArray<string>;
} = ({ input }: IAoCInput) => {
  const dictionnary = new Map<number, CheckerFn | undefined>();
  const indexSeparator = input.findIndex((s) => s === "");
  const rawRules = [];
  const messages: Array<string> = [];

  for (let i = 0; i < input.length; i++) {
    if (i < indexSeparator) {
      rawRules.push(input[i]);
    } else if (i > indexSeparator) {
      messages.push(input[i]);
    }
  }

  const rawRulesWithId = rawRules.map((str) => ({
    id: Number.parseInt(str.split(":")[0], 10),
    rawBody: str.split(":")[1].trim(),
  }));

  rawRulesWithId.forEach(({ id, rawBody }) => {
    if (rawBody.includes("a")) {
      dictionnary.set(id, (_: RulesMap) => (str: string) => str === "a");
    } else if (rawBody.includes("b")) {
      dictionnary.set(id, (_: RulesMap) => (str: string) => str === "b");
    } else {
      dictionnary.set(id, undefined);
    }
  });

  while ([...dictionnary.values()].every((x) => x !== undefined)) {
  }

  for (let i = 0; i < rawRules.length; i++) {
    const [rawNumber, rawRule] = rawRules[i].split(":");
    const id = Number.parseInt(rawNumber, 10);
  }

  return {
    dictionnary,
    messages,
  };
};

const generateCheckerFn: (
  dictionnary: RulesMap,
) => (ids: ReadonlyArray<number>) => CheckerFn = (dictionnary: RulesMap) =>
  (ids: ReadonlyArray<number>) => {
    return (map: RulesMap) =>
      (str: string) => {
        let stringToCheck = str;
        for (let j = 0; j < ids.length - 1; j++) {
          const validString = getSubStringValid(
            (map.get(ids[j]) as CheckerFn)(map),
          )(stringToCheck);
          stringToCheck = stringToCheck.substring(validString.length);
          if (stringToCheck.length === 0) return false;
        }
        return (map.get(ids[ids.length - 1]) as CheckerFn)(map)(stringToCheck);
      };
  };

const getSubStringValid: (
  fn: (s: string) => boolean,
) => (value: string) => string = (fn: (s: string) => boolean) =>
  (value: string) => {
    let indexEnd = 1;
    while (indexEnd <= value.length) {
      console.log(value.substring(0, indexEnd));
      if (fn(value.substring(0, indexEnd))) {
        return value.substring(0, indexEnd);
      }
      indexEnd += 1;
    }
    return value;
  };

export const fn1 = (input: IAoCInput) => {
  const { dictionnary, messages } = parser(input);

  // return messages.filter((message) => {
  //   console.log(`Checking ${message}`);
  //   return (dictionnary.get(0) as CheckerFn)(dictionnary)(message);
  // }).length;
};
export const fn2 = (input: IAoCInput) => {
  return undefined;
};

// if (rawRule.includes("a")) {
//   dictionnary.set(id, (_: RulesMap) => (str: string) => str === "a");
// } else if (rawRule.includes("b")) {
//   dictionnary.set(id, (_: RulesMap) => (str: string) => str === "b");
// } else if (rawRule.includes("|")) {
//   const [rawGrp1, rawGrp2] = rawRule.split("|");
//   const grp1 = rawGrp1.trim().split(" ").map((str) =>
//     Number.parseInt(str, 10)
//   );
//   const grp2 = rawGrp2.trim().split(" ").map((str) =>
//     Number.parseInt(str, 10)
//   );
//
//   dictionnary.set(
//     id,
//     (dictionnary: RulesMap) =>
//       (message: string) =>
//         generateCheckerFn(dictionnary)(grp1)(dictionnary)(message) ||
//         generateCheckerFn(dictionnary)(grp2)(dictionnary)(message),
//   );
// } else {
//   const grp = rawRule.trim().split(" ").map((str) =>
//     Number.parseInt(str, 10)
//   );
//   dictionnary.set(id, generateCheckerFn(dictionnary)(grp));
// }
