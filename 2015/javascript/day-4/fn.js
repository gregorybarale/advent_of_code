const crypto = require("crypto");

function getHash(s) {
  const hash = crypto.createHash("md5");
  hash.update(s);
  return hash.digest("hex");
}

const fn1 = (input) => {
  let n = 1;
  while (getHash(`${input}${n}`).substring(0, 5) != "00000") {
    n++;
  }
  return n;
};

const fn2 = (input) => {
  let n = 254575;
  while (getHash(`${input}${n}`).substring(0, 6) != "000000") {
    n++;
  }
  return n;
};

module.exports = {
  fn1,
  fn2,
};
