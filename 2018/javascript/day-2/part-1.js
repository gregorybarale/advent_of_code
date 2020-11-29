const utils = require("./utils");
const input = require("./input");

const [numberOfTwo, numberOfThree] = input.reduce(
  ([counterOfTwo, counterOfThree], id) => {
    const dictionnary = utils.getIdDictionnary(id);
    [hasTwo, hasThree] = [
      Object.values(dictionnary).some((n) => n === 2),
      Object.values(dictionnary).some((n) => n === 3),
    ];
    if (hasTwo) counterOfTwo++;
    if (hasThree) counterOfThree++;
    return [counterOfTwo, counterOfThree];
  },
  [0, 0],
);

console.log(numberOfTwo * numberOfThree);
