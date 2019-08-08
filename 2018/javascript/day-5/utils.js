const _doesReact = (char1, char2) => {
  return (
    char1 !== char2 &&
    (char1.toLowerCase() === char2 || char1 === char2.toLowerCase())
  );
};

const reactChain = inputArr => {
  const stack = [];

  inputArr.forEach(char => {
    if (stack.length === 0) {
      stack.push(char);
    } else {
      const exChar = stack.pop();
      if (!_doesReact(exChar, char)) {
        stack.push(exChar, char);
      }
    }
  });
  return stack;
};

module.exports = {
  reactChain
};
