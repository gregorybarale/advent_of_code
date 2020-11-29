const { txtToArray } = require("../input-utils/txt-to-array");

const fn1 = (input) => {
  const max =
    txtToArray(input)[0].replace(/\\"/g, "##").replace(/\\\\/g, "##").replace(
      /(\\x([0-9]|[a-f]|[A-F]){2})/g,
      "####",
    ).length;
  const min = (txtToArray(input)[0].toString()).length;
  //const minus = array.reduce((acc, s) => acc + s.length, 0);
  console.log(txtToArray(input)[0].toString());
  console.log(max, min);
  return undefined;
};

const fn2 = (input) => {
  return undefined;
};

module.exports = {
  fn1,
  fn2,
};

console.log(txtToArray("./input.txt")[0].length);
console.log(
  txtToArray("./input.txt")[0].replace(/\\"/g, "##").replace(/\\\\/g, "##")
    .replace(/(\\x([0-9]|[a-f]|[A-F]){2})/g, "####").length,
);

fn1("./input.txt");
