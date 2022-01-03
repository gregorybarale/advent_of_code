import { findIndex } from "https://deno.land/std@0.79.0/bytes/mod.ts";
import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IData {
  fieldRules: ReadonlyArray<IFieldRule>;
  yourTicket: ITicket;
  nearbyTickets: ReadonlyArray<ITicket>;
}

interface IFieldRule {
  name: string;
  intervals: ReadonlyArray<IInterval>;
}

type ITicket = ReadonlyArray<number>;
type IInterval = [number, number];

const parser: (input: IAoCInput) => IData = ({ input }: IAoCInput) => {
  const dataSeparatorIndex = [
    input.findIndex((x) => x === ""),
    input.lastIndexOf(""),
  ];
  const rawFieldRules = input.filter((_, index) =>
    index < dataSeparatorIndex[0]
  );
  const rawYourTicket = input[dataSeparatorIndex[1] - 1];
  const rawNearbyTickets = input.filter((_, index) =>
    index > dataSeparatorIndex[1] + 1
  );

  return {
    fieldRules: rawFieldRules.reduce((previousValue, currentValue) => {
      const [name, rest] = currentValue.split(":");
      const [rest1, rest2] = rest.trim().split("or");
      const rule1 = rest1.trim().split("-").map((x) =>
        Number.parseInt(x, 10)
      ) as IInterval;
      const rule2 = rest2.trim().split("-").map((x) =>
        Number.parseInt(x, 10)
      ) as IInterval;
      return [...previousValue, {
        name,
        intervals: [rule1, rule2],
      }];
    }, [] as ReadonlyArray<IFieldRule>),
    yourTicket: rawYourTicket.split(",").map((x) => Number.parseInt(x, 10)),
    nearbyTickets: rawNearbyTickets.map((x) =>
      x.split(",").map((y) => Number.parseInt(y, 10))
    ),
  };
};

const createTableFromTuple: (tuple: IInterval) => ReadonlyArray<number> = (
  tuple: IInterval,
) => {
  const result = [];
  for (let i = tuple[0]; i <= tuple[1]; i++) {
    result.push(i);
  }
  return result;
};

const getAllValidNumber: (
  fieldRules: ReadonlyArray<IFieldRule>,
) => ReadonlyArray<number> = (fieldRules: ReadonlyArray<IFieldRule>) =>
  fieldRules.reduce((previousValue, currentValue) => {
    const tables = currentValue.intervals.map((interval) =>
      createTableFromTuple(interval)
    );
    return [...previousValue, ...tables[0], ...tables[1]];
  }, [] as Array<number>).reduce((previousValue, currentValue) => {
    if (previousValue.includes(currentValue)) {
      return previousValue;
    }
    return [...previousValue, currentValue];
  }, [] as Array<number>);

const getNumbersAtIndex: (
  index: number,
) => (tickets: ReadonlyArray<ITicket>) => ReadonlyArray<number> = (
  index: number,
) =>
  (tickets: ReadonlyArray<ITicket>) => tickets.map((ticket) => ticket[index]);

const checkRuleValidityAtIndex: (
  index: number,
) => (rule: IFieldRule) => (tickets: ReadonlyArray<ITicket>) => boolean = (
  index: number,
) =>
  (rule: IFieldRule) =>
    (tickets: ReadonlyArray<ITicket>) => {
      const numbers = getNumbersAtIndex(index)(tickets);
      return numbers.every((n) =>
        n >= rule.intervals[0][0] && n <= rule.intervals[0][1] ||
        n >= rule.intervals[1][0] && n <= rule.intervals[1][1]
      );
    };

export const fn1 = (input: IAoCInput) => {
  const data = parser(input);
  const invalidNumbers = [] as Array<number>;

  const validNumbers = getAllValidNumber(data.fieldRules);

  data.nearbyTickets.forEach((ticket) =>
    ticket.forEach((n) => {
      if (!validNumbers.includes(n)) {
        invalidNumbers.push(n);
      }
    })
  );

  return invalidNumbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );
};
export const fn2 = (input: IAoCInput) => {
  const data = parser(input);
  const validNumbers = getAllValidNumber(data.fieldRules);
  const validTickets = data.nearbyTickets.filter((ticket) =>
    ticket.every((n) => validNumbers.includes(n))
  );

  const length = validTickets[0].length;

  const crossTable: Array<
    { name: string; validityTable: Array<boolean>; indexValid: Array<number> }
  > = [];
  data.fieldRules.forEach((rule) => {
    const validityTable = [];
    for (let i = 0; i < length; i++) {
      validityTable.push(
        checkRuleValidityAtIndex(i)(rule)(validTickets),
      );
    }
    crossTable.push({
      name: rule.name,
      validityTable,
      indexValid: validityTable.reduce(
        (previousValue, currentValue, currentIndex) => {
          if (currentValue) {
            return [...previousValue, currentIndex];
          }
          return previousValue;
        },
        [] as Array<number>,
      ),
    });
  });

  crossTable.forEach((row) => {
    console.log(row.validityTable.map((b) => b ? "X" : "-").join(" | "));
  });

  const sortedCrossTable = crossTable.sort((a, b) =>
    a.validityTable.filter((x) => x).length -
    b.validityTable.filter((x) => x).length
  );
  console.log(sortedCrossTable);
};
