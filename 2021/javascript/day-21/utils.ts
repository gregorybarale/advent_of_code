export interface Player {
    id: number;
    position: number;
    score: number;
}

export type Game = [Player, Player];

export const gameToKey = (game: Game): string =>
    `${game[0].id}-${game[0].position}-${game[0].score}|${game[1].id}-${game[1].position}-${game[1].score}`;
export const keyToGame = (str: string): Game => [
    {
        id: Number.parseInt(str.split('|')[0].split('-')[0], 0),
        position: Number.parseInt(str.split('|')[0].split('-')[1]),
        score: Number.parseInt(str.split('|')[0].split('-')[2]),
    },
    {
        id: Number.parseInt(str.split('|')[1].split('-')[0]),
        position: Number.parseInt(str.split('|')[1].split('-')[1]),
        score: Number.parseInt(str.split('|')[1].split('-')[2]),
    }
];

export const parseInput = (input: ReadonlyArray<string>): ReadonlyArray<Player> => input.map(str => ({
    id: Number.parseInt(str.split(' ')[1], 10),
    position: Number.parseInt(str.split(' ')[4], 10),
    score: 0,
}));

export const move = (player: Player) => (increment: number): Player => {
    const n = player.position + increment;
    if (n % 10 === 0) {
        return {
            ...player,
            position: 10,
            score: player.score + 10,
        };
    }
    const position = Number.parseInt(`${n}`.at(-1) as string, 10);
    return {
        ...player,
        position,
        score: player.score + position,
    };
};

export const rollDeterministicDiceThreeTimes = (oldState: number): [number, number] => {
    return [oldState * 3 + 3, oldState + 3];
};

export const hasGameEnded = (maxScore: number) => (game: Game) => game.some(({ score }) => score >= maxScore);

export const isAllUniversesEnded = (maxScore: number) =>
    (universes: Map<string, number>) =>
        [...universes.keys()].every(key => hasGameEnded(maxScore)(keyToGame(key)));

export const runQuanticTurn = (maxScore: number) => (universes: Map<string, number>) => (playerId: 1 | 2): Map<string, number> => {
    const newUniversesMap = new Map<string, number>();
    [...universes.entries()].forEach(([key, value]) => {
        const game = keyToGame(key);

        if (hasGameEnded(maxScore)(game)) {
            newUniversesMap.set(key, (newUniversesMap.get(key) ?? 0) + value);
        } else {
            const currentPlayer = game.find(({ id }) => id === playerId) as Player;
            const otherPlayer = game.find(({ id }) => id !== playerId) as Player;
            const currentPlayerVersion1 = move(currentPlayer)(1);
            const currentPlayerVersion2 = move(currentPlayer)(2);
            const currentPlayerVersion3 = move(currentPlayer)(3);

            let gameVersion1: Game, gameVersion2: Game, gameVersion3: Game;
            if (currentPlayer.id === 1) {
                gameVersion1 = [currentPlayerVersion1, otherPlayer];
                gameVersion2 = [currentPlayerVersion2, otherPlayer];
                gameVersion3 = [currentPlayerVersion3, otherPlayer];
            } else {
                gameVersion1 = [otherPlayer, currentPlayerVersion1];
                gameVersion2 = [otherPlayer, currentPlayerVersion2];
                gameVersion3 = [otherPlayer, currentPlayerVersion3];
            }

            const key1 = gameToKey(gameVersion1);
            const key2 = gameToKey(gameVersion2);
            const key3 = gameToKey(gameVersion3);

            newUniversesMap.set(key1, (newUniversesMap.get(key1) ?? 0) + value);
            newUniversesMap.set(key2, (newUniversesMap.get(key2) ?? 0) + value);
            newUniversesMap.set(key3, (newUniversesMap.get(key3) ?? 0) + value);
        }
    });
    return newUniversesMap;
}

export const getPlayerNumberOfWin = (maxScore: number) => (playerId: 1 | 2) => (universes: Map<string, number>): number => [...universes.entries()]
    .filter(([key, value]) => (keyToGame(key).find(({ id }) => id === playerId)?.score as number) >= maxScore)
    .reduce((acc, [_, value]) => acc + value, 0);