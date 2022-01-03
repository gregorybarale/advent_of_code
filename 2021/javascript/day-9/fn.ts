import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, isLocalLower, getRiskLevel, addPointToBasin } from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    const heatMap = parseInput(input);
    const localLowerPoints = heatMap.filter(isLocalLower(heatMap));
    return localLowerPoints.reduce((acc, point) => acc + getRiskLevel(point), 0);
};
export const fn2 = ({ input }: IAoCInput) => {
    const heatMap = parseInput(input);
    const localLowerPoints = heatMap.filter(isLocalLower(heatMap));
    const basins = localLowerPoints.map(point => addPointToBasin(heatMap)([point]));
    const basinSizes = basins.map(basin => basin.length).sort((a, b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];
};
