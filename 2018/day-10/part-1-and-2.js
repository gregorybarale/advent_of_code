const input = require("./input");
const utils = require("./utils");

const stars = input.map(rawStar => utils.parseRawData(rawStar));
let time = 0;
let minVolume = Number.POSITIVE_INFINITY;
let timeMin = 0;

do {
  const [minX, maxX, minY, maxY] = utils.getAreaCorners(stars),
    currentVolume = Math.abs(maxX - minX) * Math.abs(maxY - minY);
  if (currentVolume < minVolume) {
    //utils.printGalaxy(stars, time, minX, maxX, minY, maxY);
    minVolume = currentVolume;
    timeMin = time;
  }
  utils.moveStars(stars);
  time++;
} while (time < 10831);

console.log(timeMin);
console.log(minVolume);
utils.printGalaxy(stars, time, ...utils.getAreaCorners(stars));
