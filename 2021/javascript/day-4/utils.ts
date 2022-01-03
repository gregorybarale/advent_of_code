export type Board = ReadonlyArray<ReadonlyArray<number>>;

export const parseInput = (input: ReadonlyArray<string>): [ReadonlyArray<number>, ReadonlyArray<Board>] => {
    const drawnedNumbers: ReadonlyArray<number> = input[0].split(',').map(s => Number.parseInt(s, 10));
    let boards: ReadonlyArray<Board> = [];
    let tempBoard: Board = [];
    for (let i = 2; i < input.length; i++) {
        if (input[i] === "") {
            boards = [...boards, [...tempBoard]];
            tempBoard = [];
        } else {
            tempBoard = [
                ...tempBoard,
                input[i].trim()
                    .split(' ')
                    .filter(s => s !== '')
                    .map(s => Number.parseInt(s.trim(), 10))
            ];
        }
    }
    boards = [...boards, [...tempBoard]];
    return [drawnedNumbers, boards];
};

export const getColumn = (index: number) => (board: Board): ReadonlyArray<number> => board.map(row => row[index]);

export const isComplete = (drawnedNumbers: ReadonlyArray<number>) =>
    (series: ReadonlyArray<number>): boolean => series.every(n => drawnedNumbers.includes(n));

export const checkBoard = (drawnedNumbers: ReadonlyArray<number>) => (board: Board): boolean => {
    if (board.some(row => isComplete(drawnedNumbers)(row))) {
        return true;
    }
    for (let i = 0; i < board[0].length; i++) {
        const column = getColumn(i)(board);
        if (isComplete(drawnedNumbers)(column)) {
            return true;
        }
    }
    return false;
}

export const getUnmarkedNumbers = (drawnedNumbers: ReadonlyArray<number>) => (board: Board) => {
    return board.reduce((acc, row) => {
        return [...acc, ...row.filter(n => !drawnedNumbers.includes(n))];
    }, []);
}