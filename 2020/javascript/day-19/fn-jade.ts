import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

type Dictionnary = Map<number, ReadonlyArray<ReadonlyArray<number>>>;

const parser: (input: IAoCInput) => {
  dictionnary: Dictionnary;
  idRuleA: number;
  idRuleB: number;
  messages: ReadonlyArray<string>;
} = ({ input }: IAoCInput) => {
  const dictionnary = new Map<number, ReadonlyArray<ReadonlyArray<number>>>();
  const indexSeparator = input.findIndex((s) => s === "");
  const rawRules = [];
  const messages: Array<string> = [];
  let idRuleA: number;
  let idRuleB: number;

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

  idRuleA = rawRulesWithId.find(({ rawBody }) => rawBody.includes("a"))
    ?.id as number;
  idRuleB = rawRulesWithId.find(({ rawBody }) => rawBody.includes("b"))
    ?.id as number;

  rawRulesWithId.forEach(({ id, rawBody }) => {
    if (id !== idRuleA && id !== idRuleB) {
    }
  });

  return {
    dictionnary,
    messages,
    idRuleA,
    idRuleB,
  };
};

export const fn1 = (input: IAoCInput) => {
};
export const fn2 = (input: IAoCInput) => {
  return undefined;
};
