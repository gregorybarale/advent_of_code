import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IBag {
  type: string;
  contains: ReadonlyArray<{
    number: number;
    type: string;
  }>;
}

const parseRawBag = (withNumber: boolean) => (raw: string) => {
  const data = raw.trim().split(" ");
  return withNumber
    ? {
      number: Number.parseInt(data[0], 10),
      type: [data[1], data[2]].join("-"),
    }
    : {
      number: 1,
      type: [data[0], data[1]].join("-"),
    };
};

export const parser: (data: IAoCInput) => ReadonlyArray<IBag> = (
  data: IAoCInput,
) => {
  return data.input.map<IBag>((value) => {
    const [rawContainer, rawBags] = value.split("contain");
    const bags = rawBags.split(",");
    return {
      type: parseRawBag(false)(rawContainer).type,
      contains: bags.map(parseRawBag(true)),
    };
  });
};

const retrieveContainer: (
  rules: ReadonlyArray<IBag>,
) => (type: string) => ReadonlyArray<IBag> = (
  rules: ReadonlyArray<IBag>,
) =>
(type: string) => {
  const containers = rules.filter((rule) =>
    rule.contains.some((x) => x.type === type)
  );
  if (containers.length === 0) {
    return [];
  }
  const innerContainers = containers.map((c) =>
    retrieveContainer(rules)(c.type)
  );
  return [
    ...containers,
    ...innerContainers.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue],
      [],
    ),
  ];
};

export const retrieveContained: (
  rules: ReadonlyArray<IBag>,
) => (type: string) => number =
  (rules: ReadonlyArray<IBag>) => (type: string) => {
    const typeRule = rules.find((rule) => rule.type === type) as IBag;
    const innerBags = typeRule.contains;

    if (innerBags.length === 1 && innerBags[0].type === "other-bags.") return 1;
    return 1 + innerBags.reduce(
      (previousValue, currentValue) =>
        previousValue +
        currentValue.number * retrieveContained(rules)(currentValue.type),
      0,
    );
  };

export const fn1 = (input: IAoCInput) => {
  const rules = parser(input);

  const possibleContainers = retrieveContainer(rules)("shiny-gold");
  const map = new Map<string, IBag>();
  possibleContainers.forEach((container) => {
    if (map.has(container.type)) return;
    map.set(container.type, container);
  });

  return map.size;
};
export const fn2 = (input: IAoCInput) => {
  const rules = parser(input);
  return retrieveContained(rules)("shiny-gold") - 1;
};
