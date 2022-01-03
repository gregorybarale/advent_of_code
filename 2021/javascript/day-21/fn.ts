import { IAoCInput } from '../../../utils/javascript/deno-utils/input.ts';
import { parseInput, rollDeterministicDiceThreeTimes, move, Player, runQuanticTurn, isAllUniversesEnded, gameToKey, getPlayerNumberOfWin } from './utils.ts';

export const fn1 = ({ input }: IAoCInput) => {
    let players = parseInput(input);
    let currentPlayerId = 1;
    let currentDiceState = 1;
    let turn = 0;
    while (players.every(({ score }) => score < 1000)) {
        const [value, newState] = rollDeterministicDiceThreeTimes(currentDiceState);
        currentDiceState = newState;
        players = players.map(player => {
            if (player.id === currentPlayerId) {
                return move(player)(value);
            }
            return player;
        });
        currentPlayerId = currentPlayerId === 1 ? 2 : 1;
        turn += 1;
    }

    const losingPlayer = players.find(({ score }) => score < 1000) as Player;

    return turn * 3 * losingPlayer.score;
};
export const fn2 = ({ input }: IAoCInput) => {
    let players = parseInput(input);
    let currentPlayerId: 1 | 2 = 1;
    let universes = new Map<string, number>();
    universes.set(gameToKey([players[0], players[1]]), 1);
    while (!isAllUniversesEnded(21)(universes)) {
        universes = runQuanticTurn(21)(universes)(currentPlayerId);
        currentPlayerId = currentPlayerId === 1 ? 2 : 1;
    }
    return [getPlayerNumberOfWin(21)(1)(universes), getPlayerNumberOfWin(21)(2)(universes)];
};
