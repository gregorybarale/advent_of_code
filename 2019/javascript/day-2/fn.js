function getNextInstruction(code, index) {
  const newCode = [...code];
  switch (code[index]) {
    case 1:
      newCode[code[index + 3]] = newCode[code[index + 1]] +
        newCode[code[index + 2]];
      return newCode;
    case 2:
      newCode[code[index + 3]] = newCode[code[index + 1]] *
        newCode[code[index + 2]];
      return newCode;
    case 99:
      return undefined;
    default:
      throw new Error("Wrong opCode");
  }
}

const fn1 = (rawCode) => {
  let code = rawCode.split(",").map((x) => Number.parseInt(x, 10));
  let newCode = [...code];
  let currentIndex = -4;
  while (newCode) {
    code = newCode;
    currentIndex += 4;
    newCode = getNextInstruction(code, currentIndex);
  }
  return code;
};

const fn2 = (rawCode, output) => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      let code = rawCode.split(",").map((x) => Number.parseInt(x, 10));
      code[1] = i;
      code[2] = j;
      if (fn1(code.join(","))[0] === output) {
        return 100 * i + j;
      }
    }
  }
};

module.exports = {
  fn1,
  fn2,
};
