import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, printCeiling } from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    const cavernCeiling = parseInput(input);
    printCeiling(cavernCeiling);
    return undefined;
};
export const fn2 = ({ input }: IAoCInput) => {
    //console.info('[2021-15] fn2', input);
    return undefined;
};
