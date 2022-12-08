import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IAdapter {
  joltage: number;
  possibleInputs: ReadonlyArray<number>;
  possibleOutputs: ReadonlyArray<number>;
}

const parser: (input: IAoCInput) => ReadonlyArray<IAdapter> = (
  { input }: IAoCInput,
) =>
  input.map((str) => {
    const joltage = Number.parseInt(str, 10);
    return {
      joltage,
      possibleInputs: [joltage - 3, joltage - 2, joltage - 1].filter((n) =>
        n >= 0
      ),
      possibleOutputs: [joltage + 1, joltage + 2, joltage + 3],
    };
  });

const compareAdapter: (a: IAdapter, b: IAdapter) => number = (
  a: IAdapter,
  b: IAdapter,
) => a.joltage - b.joltage;

const findSuitableAdapterWithLessOutput: (
  adaptersDictionnary: ReadonlyArray<IAdapter>,
) => (currentEffectiveJoltage: number) => IAdapter = (
  adaptersDictionnary: ReadonlyArray<IAdapter>,
) =>
(currentEffectiveJoltage: number) =>
  [...findSuitableAdapter(adaptersDictionnary)(currentEffectiveJoltage)].sort(
    compareAdapter,
  )[0];

const findSuitableAdapter: (
  adaptersDictionnary: ReadonlyArray<IAdapter>,
) => (currentEffectiveJoltage: number) => ReadonlyArray<IAdapter> = (
  adaptersDictionnary: ReadonlyArray<IAdapter>,
) =>
(currentEffectiveJoltage: number) => {
  const viableAdapters = adaptersDictionnary.filter((adapter) =>
    adapter.possibleInputs.includes(currentEffectiveJoltage)
  );
  return viableAdapters;
};

export const fn1 = (input: IAoCInput) => {
  const adaptersDictionnary = parser(input);
  const differenceMap = new Map<1 | 3, number>([[1, 0], [3, 0]]);

  let currentEffectiveJoltage: number = 0;
  let adaptersLeftToUse: ReadonlyArray<IAdapter> = [...adaptersDictionnary];

  while (adaptersLeftToUse.length > 0) {
    const nextAdapterToUse = findSuitableAdapterWithLessOutput(
      adaptersLeftToUse,
    )(
      currentEffectiveJoltage,
    );
    switch (nextAdapterToUse.joltage - currentEffectiveJoltage) {
      case 1:
        differenceMap.set(1, differenceMap.get(1) as number + 1);
        break;
      case 3:
        differenceMap.set(3, differenceMap.get(3) as number + 1);
        break;
      default:
        // Do nothing
    }
    currentEffectiveJoltage = nextAdapterToUse.joltage;
    adaptersLeftToUse = adaptersLeftToUse.filter((adapter) =>
      nextAdapterToUse.joltage !== adapter.joltage
    );
  }

  differenceMap.set(3, differenceMap.get(3) as number + 1);

  return (differenceMap.get(1) as number * (differenceMap.get(3) as number));
};

const isAdapterInStep: (
  step: ReadonlyArray<{
    weight: number;
    adapter: IAdapter;
  }>,
) => (adapter: IAdapter) => boolean = (
  step: ReadonlyArray<{
    weight: number;
    adapter: IAdapter;
  }>,
) =>
(adapter: IAdapter) =>
  step.some((value) => value.adapter.joltage === adapter.joltage);

const getNextStep: (
  dictionnary: ReadonlyArray<IAdapter>,
) => (
  currentStep: ReadonlyArray<{
    weight: number;
    adapter: IAdapter;
  }>,
) => ReadonlyArray<{
  weight: number;
  adapter: IAdapter;
}> = (
  dictionnary: ReadonlyArray<IAdapter>,
) =>
(
  currentStep: ReadonlyArray<{
    weight: number;
    adapter: IAdapter;
  }>,
) =>
  currentStep.reduce((previousValue, currentValue) => {
    let nextStep = [...previousValue];

    const nextAdapters = currentValue.adapter.possibleOutputs.map((joltage) =>
      dictionnary.find((adapter) => joltage === adapter.joltage)
    ).filter((adapter) => Boolean(adapter)) as ReadonlyArray<IAdapter>;

    nextAdapters.forEach((adapter) => {
      if (isAdapterInStep(nextStep)(adapter)) {
        const stepElement = nextStep.find((value) =>
          value.adapter.joltage === adapter.joltage
        ) as {
          weight: number;
          adapter: IAdapter;
        };
        nextStep = [
          ...nextStep.filter((value) =>
            value.adapter.joltage !== adapter.joltage
          ),
          {
            ...stepElement,
            weight: stepElement.weight + currentValue.weight,
          },
        ];
      } else {
        nextStep = [
          ...nextStep,
          {
            adapter,
            weight: currentValue.weight,
          },
        ];
      }
    });

    return nextStep;
  }, [] as ReadonlyArray<{
    weight: number;
    adapter: IAdapter;
  }>);

export const fn2 = (input: IAoCInput) => {
  const adaptersDictionnary = parser(input);

  const sortedAdapters = [...adaptersDictionnary].sort(compareAdapter);
  const possibleStart = adaptersDictionnary.filter((adapter) =>
    adapter.possibleInputs.includes(0)
  );

  const { length, 0: weakerAdapter, [length - 1]: strongestAdapter } =
    sortedAdapters;

  let count = 0;
  let step = possibleStart.map((adapter) => ({
    adapter,
    weight: 1,
  }));

  let stepCount = 1;

  while (step.length > 0) {
    const tempStep = getNextStep(adaptersDictionnary)(step);

    const tempStrongestAdapter = tempStep.find((value) =>
      strongestAdapter.joltage === value.adapter.joltage
    ) || {
      adapter: null,
      weight: 0,
    };

    const tempStepFiltered = tempStep.filter((value) =>
      strongestAdapter.joltage !== value.adapter.joltage
    );

    console.log(
      `Step n°${stepCount}: count ${count} / available-adapters ${tempStepFiltered.length}`,
    );

    stepCount += 1;
    count += tempStrongestAdapter.weight;
    step = tempStepFiltered;
  }

  return count;
};
