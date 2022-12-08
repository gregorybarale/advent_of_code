import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface IGame {
  player1Deck: ReadonlyArray<number>;
  player2Deck: ReadonlyArray<number>;
  turn: number;
}

const parser: (input: IAoCInput) => IGame = ({ input }: IAoCInput) => {
  const data = input.reduce((previousValue, currentValue) => {
    if (currentValue.includes("Player")) {
      return previousValue;
    }
    if (currentValue === "") {
      return [...previousValue, []];
    }
    previousValue[previousValue.length - 1] = [
      ...previousValue[previousValue.length - 1],
      currentValue,
    ];
    return previousValue;
  }, [[]] as Array<Array<string>>);

  return {
    turn: 0,
    player1Deck: data[0].map((s) => Number.parseInt(s, 10)),
    player2Deck: data[1].map((s) => Number.parseInt(s, 10)),
  };
};

const runCombatTurn: (initialState: IGame) => IGame = (initialState: IGame) => {
  if (
    initialState.player1Deck.length === 0 ||
    initialState.player2Deck.length === 0
  ) {
    throw Error("One player is missing card");
  }

  const deck1 = [...initialState.player1Deck];
  const deck2 = [...initialState.player2Deck];

  const card1 = deck1.shift() as number;
  const card2 = deck2.shift() as number;

  if (card1 > card2) {
    return {
      turn: initialState.turn + 1,
      player1Deck: [...deck1, card1, card2],
      player2Deck: [...deck2],
    };
  } else {
    return {
      turn: initialState.turn + 1,
      player1Deck: [...deck1],
      player2Deck: [...deck2, card2, card1],
    };
  }
};

const runRecursiveCombatTurn: (initialState: IGame) => IGame = (
  initialState: IGame,
) => {
  let isPlayer1Win: boolean;
  const deck1 = [...initialState.player1Deck];
  const deck2 = [...initialState.player2Deck];
  const card1 = deck1.shift() as number;
  const card2 = deck2.shift() as number;

  const doesBothHaveEnoughCard = deck1.length >= card1 && deck2.length >= card2;

  if (doesBothHaveEnoughCard) {
    const subState: IGame = {
      turn: 0,
      player1Deck: deck1.slice(0, card1),
      player2Deck: deck2.slice(0, card2),
    };

    const subFinalState = playRecursiveGame(subState);
    isPlayer1Win = subFinalState.player1Deck.length !== 0;
  } else if (card1 > card2) {
    isPlayer1Win = true;
  } else {
    isPlayer1Win = false;
  }

  return isPlayer1Win
    ? {
      turn: initialState.turn + 1,
      player1Deck: [...deck1, card1, card2],
      player2Deck: [...deck2],
    }
    : {
      turn: initialState.turn + 1,
      player1Deck: [...deck1],
      player2Deck: [...deck2, card2, card1],
    };
};

const playRecursiveGame: (initialState: IGame) => IGame = (
  initialState: IGame,
) => {
  let game: IGame = {
    turn: 0,
    player1Deck: [...initialState.player1Deck],
    player2Deck: [...initialState.player2Deck],
  };
  let history: ReadonlyArray<IGame> = [game];
  let hasLooped = false;

  while (!hasLooped && isGameStillPlayable(game)) {
    game = runRecursiveCombatTurn(game);
    hasLooped = history.some((x) => areGamesConfigurationSame(game)(x));
    history = [...history, game];
  }

  if (hasLooped) {
    game.player2Deck = [];
  }

  return game;
};

const isGameStillPlayable: (game: IGame) => boolean = (
  { player1Deck, player2Deck }: IGame,
) => player1Deck.length > 0 && player2Deck.length > 0;

const areGamesConfigurationSame: (
  reference: IGame,
) => (game: IGame) => boolean = (reference: IGame) => (game: IGame) =>
  reference.player1Deck.join("") === game.player1Deck.join("") &&
  reference.player2Deck.join("") === game.player2Deck.join("");

const computeWinnerScore: (game: IGame) => number = (
  { player1Deck, player2Deck }: IGame,
) => {
  const winnerDeck = player1Deck.length > 0 ? player1Deck : player2Deck;

  return winnerDeck.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      return previousValue + currentValue * (array.length - currentIndex);
    },
    0,
  );
};

export const fn1 = (input: IAoCInput) => {
  let game = parser(input);

  while (isGameStillPlayable(game)) {
    game = runCombatTurn(game);
  }

  return computeWinnerScore(game);
};
export const fn2 = (input: IAoCInput) => {
  const game = parser(input);
  const finalState = playRecursiveGame(game);

  console.log(finalState);

  return computeWinnerScore(finalState);
};
