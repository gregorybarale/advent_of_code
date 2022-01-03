import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import {
    parseInput,
    stringToDigit,
    filterByDigit,
    isDigitEight,
    isDigitFour,
    isDigitOne,
    isDigitSeven,
    Dictionnary,
    findRules,
    correctDigit,
    digitToStringNumber,
} from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    const signals = parseInput(input);
    return signals.reduce((acc, { output }) => {
        return acc
            + filterByDigit(isDigitOne)(output.map(stringToDigit)).length
            + filterByDigit(isDigitFour)(output.map(stringToDigit)).length
            + filterByDigit(isDigitSeven)(output.map(stringToDigit)).length
            + filterByDigit(isDigitEight)(output.map(stringToDigit)).length;
    }, 0);
};
export const fn2 = ({ input }: IAoCInput) => {
    const signals = parseInput(input);
    const signalsAsNumber = signals.map(signal => {
        const dictionnary = findRules(signal);
        return Number.parseInt(signal.output.map(stringToDigit)
            .map(correctDigit(dictionnary))
            .map(digitToStringNumber)
            .join(''), 10)
    });
    return signalsAsNumber.reduce((acc, n) => acc + n, 0);
};
