export interface Dot {
    x: number;
    y: number;
}

export interface Instruction {
    x?: number;
    y?: number;
}

export type Paper = ReadonlyArray<Dot>;

export const parseInput = (input: ReadonlyArray<string>): [Paper, ReadonlyArray<Instruction>] => {
    const delimiter = input.findIndex(s => s === "");
    const [rawDots, rawInstructions] = input.reduce((acc, s, i) => {
        if (i < delimiter) {
            return [[...acc[0], s], acc[1]];
        }
        if (i > delimiter) {
            return [acc[0], [...acc[1], s]];
        }
        return acc;
    }, [[], []] as [ReadonlyArray<string>, ReadonlyArray<string>]);

    return [rawDots.map(str => ({
        x: Number.parseInt(str.split(',')[0], 10),
        y: Number.parseInt(str.split(',')[1], 10),
    })), rawInstructions.map(str => {
        const [axe, value] = str.split(' ')[2].split('=');
        if (axe === 'x') {
            return {
                x: Number.parseInt(value, 10),
            };
        }
        return {
            y: Number.parseInt(value, 10),
        };
    })];
};

export const foldPaper = (paper: Paper) => (instruction: Instruction): Paper => {
    let foldedPaperWithRedundancies: Paper;
    if (instruction.x !== undefined) {
        foldedPaperWithRedundancies = paper.map(dot => {
            if (dot.x <= (instruction.x as number)) {
                return dot;
            }
            return {
                x: dot.x - 2 * (dot.x - (instruction.x as number)),
                y: dot.y,
            }
        });
    } else {
        foldedPaperWithRedundancies = paper.map(dot => {
            if (dot.y <= (instruction.y as number)) {
                return dot;
            }
            return {
                x: dot.x,
                y: dot.y - 2 * (dot.y - (instruction.y as number)),
            }
        });
    }
    return foldedPaperWithRedundancies.reduce((acc, dot) => {
        if (acc.every(otherDot => JSON.stringify(otherDot) !== JSON.stringify(dot))) {
            return [...acc, dot];
        }
        return acc;
    }, [] as Paper);
};

export const printPaper = (paper: Paper) => {
    const maxX = Math.max(...paper.map(({ x }) => x));
    const maxY = Math.max(...paper.map(({ y }) => y));

    console.log('---');
    for (let y = 0; y <= maxY; y++) {
        let row = '';
        for (let x = 0; x <= maxX; x++) {
            if (paper.some(dot => dot.x === x && dot.y === y)) {
                row = row + '*';
            } else {
                row = row + ' ';
            }
        }
        console.log(row);
    }
    console.log('---');
}