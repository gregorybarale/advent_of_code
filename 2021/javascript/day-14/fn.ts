import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, applyTemplate, computeResultStep1 } from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    const [countMap, initialMap, templates] = parseInput(input);
    let step = 0;
    let currentMap = initialMap;
    while (step < 10) {
        step += 1;
        currentMap = applyTemplate(templates, countMap)(currentMap);
    }
    return computeResultStep1(countMap);
};
export const fn2 = ({ input }: IAoCInput) => {
    const [countMap, initialMap, templates] = parseInput(input);
    let step = 0;
    let currentMap = initialMap;
    while (step < 40) {
        step += 1;
        currentMap = applyTemplate(templates, countMap)(currentMap);
    }
    return computeResultStep1(countMap);
};
