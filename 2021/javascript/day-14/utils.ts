export interface Template {
  pair: string;
  insertion: string;
}

export const parseInput = (
  input: ReadonlyArray<string>,
): [Map<string, number>, Map<string, number>, ReadonlyArray<Template>] => {
  const [rawPolymersAsString, _, ...rawTemplates] = input;
  const rawPolymers = rawPolymersAsString.split("");

  const countMap = new Map<string, number>();
  const map = new Map<string, number>();
  countMap.set(rawPolymers[0], 1);
  for (let i = 1; i < rawPolymers.length; i++) {
    const key = rawPolymers[i - 1] + rawPolymers[i];
    map.set(key, (map.get(key) ?? 0) + 1);
    countMap.set(rawPolymers[i], (countMap.get(rawPolymers[i]) ?? 0) + 1);
  }

  return [
    countMap,
    map,
    rawTemplates.map((str) => ({
      pair: str.split("->")[0].trim(),
      insertion: str.split("->")[1].trim(),
    })),
  ];
};

export const applyTemplate =
  (templates: ReadonlyArray<Template>, countMap: Map<string, number>) =>
  (map: Map<string, number>): Map<string, number> => {
    const nextMap = new Map<string, number>();

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];
      if (map.has(template.pair)) {
        const pair1 = template.pair.at(0) + template.insertion;
        const pair2 = template.insertion + template.pair.at(1);
        nextMap.set(
          pair1,
          (nextMap.get(pair1) ?? 0) + (map.get(template.pair) as number),
        );
        nextMap.set(
          pair2,
          (nextMap.get(pair2) ?? 0) + (map.get(template.pair) as number),
        );
        countMap.set(
          template.insertion,
          (countMap.get(template.insertion) ?? 0) +
            (map.get(template.pair) as number),
        );
      }
    }

    return nextMap;
  };

export const computeResultStep1 = (countMap: Map<string, number>): number => {
  const values = [...countMap.values()];
  return Math.max(...values) - Math.min(...values);
};
