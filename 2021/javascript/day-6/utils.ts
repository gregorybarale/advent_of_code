export const runDayNaive = (populationPreviousState: ReadonlyArray<number>): ReadonlyArray<number> => {
    let newBornPopulationState: ReadonlyArray<number> = [];
    const populationNextState = populationPreviousState.map(n => {
        if (n === 0) {
            newBornPopulationState = [...newBornPopulationState, 8];
            return 6;
        }
        return n - 1;
    });
    return [...populationNextState, ...newBornPopulationState];
}

export const runDayPro = (populationPreviousState: Map<number, number>): Map<number, number> => {
    const populationNextState = new Map<number, number>();
    populationNextState.set(6, 0);
    [...populationPreviousState.entries()].forEach(([key, value]) => {
        if (key === 0) {
            populationNextState.set(6, (populationNextState.get(6) as number) + value);
            populationNextState.set(8, value);
        } else if (key === 7) {
            populationNextState.set(6, (populationNextState.get(6) as number) + value);
        } else {
            populationNextState.set(key - 1, value);
        }
    });

    return populationNextState;
}