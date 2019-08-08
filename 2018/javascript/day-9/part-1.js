const input = require("./input");
const utils = require("./utils");

const nbOfPlayers = input.nbOfPlayers;
const lastMarblePlayed = input.lastMarbleWorth;

const playersScore = Array.from(new Array(nbOfPlayers), () => 0);
let currentPlayer = 1;

const marbleList = new utils.CircularLinkList(0);
let nextMarble = 1;

while (nextMarble < lastMarblePlayed) {
  if (nextMarble % 23 === 0) {
    marbleList.goPrevious();
    marbleList.goPrevious();
    marbleList.goPrevious();
    marbleList.goPrevious();
    marbleList.goPrevious();
    marbleList.goPrevious();
    const removedNodeData = marbleList.removeBefore();
    playersScore[currentPlayer - 1] += removedNodeData + nextMarble;
  } else {
    marbleList.goNext();
    marbleList.insertAfter({ data: nextMarble });
    marbleList.goNext();
  }
  //console.log(`[${currentPlayer}] ${marbleList.getListLog()}`);
  if (currentPlayer === nbOfPlayers) {
    currentPlayer = 1;
  } else {
    currentPlayer++;
  }
  nextMarble++;
}
console.log(`High score: ${Math.max(...playersScore)}`);
