export interface IDumboOctopus {
    x: number;
    y: number;
    energyLevel: number;
    hasFlashedInStep: boolean;
}

export const parseInput = (input: ReadonlyArray<string>): ReadonlyArray<IDumboOctopus> => input.map(str => str.split('').map(s => Number.parseInt(s, 10)))
    .reduce((acc, row, x) => [...acc, ...row.map((energyLevel, y) => ({
        x,
        y,
        energyLevel,
        hasFlashedInStep: false,
    }))], [] as ReadonlyArray<IDumboOctopus>);;

export const getAdjacents = (population: ReadonlyArray<IDumboOctopus>) =>
    ({ x, y }: IDumboOctopus): ReadonlyArray<IDumboOctopus> => population.filter(dumbo => {
        return dumbo.x === x && dumbo.y === y - 1 ||
            dumbo.x === x && dumbo.y === y + 1 ||
            dumbo.y === y && dumbo.x === x - 1 ||
            dumbo.y === y && dumbo.x === x + 1 ||
            dumbo.x === x - 1 && dumbo.y === y - 1 ||
            dumbo.x === x - 1 && dumbo.y === y + 1 ||
            dumbo.x === x + 1 && dumbo.y === y - 1 ||
            dumbo.x === x + 1 && dumbo.y === y + 1;

    });

export const hasDumboReadyToFlash = (dumboPopulation: ReadonlyArray<IDumboOctopus>): boolean => dumboPopulation.some(({ energyLevel, hasFlashedInStep }) => energyLevel > 9 && !hasFlashedInStep);

export const runStep = (dumboPopulation: ReadonlyArray<IDumboOctopus>): [ReadonlyArray<IDumboOctopus>, number] => {
    const nextPopulationState: ReadonlyArray<IDumboOctopus> = dumboPopulation.map(dumbo => ({
        ...dumbo,
        energyLevel: dumbo.energyLevel + 1,
    }));

    while (hasDumboReadyToFlash(nextPopulationState)) {
        const nextToFlash = nextPopulationState.filter(({ energyLevel, hasFlashedInStep }) => energyLevel > 9 && !hasFlashedInStep);
        nextToFlash.forEach(dumbo => {
            dumbo.hasFlashedInStep = true;
            getAdjacents(nextPopulationState)(dumbo).forEach(adjacent => {
                adjacent.energyLevel = adjacent.energyLevel + 1;
            });
        });
    }

    return [nextPopulationState.map(dumbo => ({
        ...dumbo,
        energyLevel: dumbo.hasFlashedInStep ? 0 : dumbo.energyLevel,
        hasFlashedInStep: false,
    })), nextPopulationState.filter(({ hasFlashedInStep }) => hasFlashedInStep).length];
};

export const print = (population: ReadonlyArray<IDumboOctopus>) => {
    for (let x = 0; x < Math.sqrt(population.length); x++) {
        let row = '';
        for (let y = 0; y < Math.sqrt(population.length); y++) {
            row = row + population.find(({ x: posX, y: posY }) => posX === x && posY === y)?.energyLevel;
        }
        console.log(row);
    }
    console.log('--');
}