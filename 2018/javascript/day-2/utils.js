const getIdDictionnary = (id) => {
  const dictionnary = {};
  const charArray = id.split("");
  charArray.forEach((char) => {
    if (dictionnary[char] !== undefined) {
      dictionnary[char]++;
    } else {
      dictionnary[char] = 1;
    }
  });
  return dictionnary;
};

const compareId = (a, b) => {
  const arrA = a.split(""),
    arrB = b.split(""),
    arrDiffA = [],
    arrDiffB = [],
    sameArr = [];

  if (arrA.length != arrB.length) return null;

  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] === arrB[i]) {
      sameArr.push(arrA[i]);
    } else {
      arrDiffA.push(arrA[i]);
      arrDiffB.push(arrB[i]);
    }
  }
  return {
    diffA: arrDiffA.join(""),
    diffB: arrDiffB.join(""),
    same: sameArr.join(""),
  };
};

module.exports = {
  getIdDictionnary,
  compareId,
};
