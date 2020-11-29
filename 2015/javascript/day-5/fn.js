const fn1 = (input) => {
  const vowel = "aeiou";
  const forbiddenWords = ["ab", "cd", "pq", "xy"];
  let vowelCount = 0;
  let hasTwiceInARow = false;
  const charArray = input.split("");

  if (vowel.includes(charArray[0])) vowelCount++;

  for (let i = 1; i < charArray.length; i++) {
    if (forbiddenWords.includes(`${charArray[i - 1]}${charArray[i]}`)) {
      return false;
    }
    if (vowel.includes(charArray[i])) vowelCount++;
    if (charArray[i] === charArray[i - 1]) hasTwiceInARow = true;
  }

  return vowelCount >= 3 && hasTwiceInARow;
};

const fn2 = (input) => {
  const charArray = input.split("");

  const arrayPair = [];
  let hasDoublePairNotOverlapping = false;
  for (let i = 1; i < charArray.length; i++) {
    arrayPair.push(`${charArray[i - 1]}${charArray[i]}`);
  }
  const pairMap = arrayPair.reduce((map, pair, index) => {
    if (map[pair]) {
      map[pair].push(index);
    } else {
      map[pair] = [index];
    }
    return map;
  }, {});
  hasDoublePairNotOverlapping = Object.values(pairMap).some((value) => {
    return (
      value.length >= 2 &&
      value.every((_, index, array) =>
        index === 0 ? true : array[index] - array[index - 1] > 1
      )
    );
  });

  let letterRepeatingWithAnotherBetween = false;
  for (let i = 2; i < charArray.length; i++) {
    if (charArray[i - 2] === charArray[i]) {
      letterRepeatingWithAnotherBetween = true;
    }
  }

  return hasDoublePairNotOverlapping && letterRepeatingWithAnotherBetween;
};

module.exports = {
  fn1,
  fn2,
};
