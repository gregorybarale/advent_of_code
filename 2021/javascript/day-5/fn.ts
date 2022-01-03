import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, isVerticalLine, isHorizontalLine, print } from './utils.ts'

export const fn1 = ({ input }: IAoCInput) => {
    const lines = parseInput(input);
    const filteredLines = lines.filter(line => isVerticalLine(line) || isHorizontalLine(line));

    const crossMap = filteredLines.reduce((acc, line) => {
        line.positions.forEach(position => {
            const key = JSON.stringify(position);
            acc.set(key, acc.has(key) ? (acc.get(key) as number) + 1 : 1);
        });
        return acc;
    }, new Map<string, number>());

    return [...crossMap.values()].filter(n => n >= 2).length;
};
export const fn2 = ({ input }: IAoCInput) => {
    const lines = parseInput(input);

    const crossMap = lines.reduce((acc, line) => {
        line.positions.forEach(position => {
            const key = JSON.stringify(position);
            acc.set(key, acc.has(key) ? (acc.get(key) as number) + 1 : 1);
        });
        return acc;
    }, new Map<string, number>());

    return [...crossMap.values()].filter(n => n >= 2).length;
};
