import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, getFirstInvalidChar, getMissingChars, computeSyntaxErrorCode, computeMissingCode, ClosingChar } from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    const lines = parseInput(input);
    const firstWrongChars = lines.map(getFirstInvalidChar).filter(c => c !== undefined);
    return computeSyntaxErrorCode(firstWrongChars as ReadonlyArray<ClosingChar>);
};
export const fn2 = ({ input }: IAoCInput) => {
    const lines = parseInput(input);
    const missingChars = lines.filter(line => getFirstInvalidChar(line) === undefined).map(getMissingChars);
    const scores = missingChars.map(computeMissingCode).sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
};
