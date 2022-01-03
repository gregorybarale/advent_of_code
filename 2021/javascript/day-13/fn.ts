import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, foldPaper, printPaper } from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    const [paper, instructions] = parseInput(input);
    const firstFoldedPaper = foldPaper(paper)(instructions[0]);
    //printPaper(firstFoldedPaper);
    return firstFoldedPaper.length;
};
export const fn2 = ({ input }: IAoCInput) => {
    const [paper, instructions] = parseInput(input);
    let foldedPaper = paper;
    instructions.forEach(instruction => {
        foldedPaper = foldPaper(foldedPaper)(instruction);
    });
    printPaper(foldedPaper);
    return undefined;
};
