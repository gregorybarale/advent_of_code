const fn1 = (password) => {
  if (password.length !== 6) {
    return false;
  }

  let twoSameCriteria = false;
  for (let i = 0; i < password.length - 1; i++) {
    if (!twoSameCriteria && password[i] === password[i + 1]) {
      twoSameCriteria = true;
    }
  }

  if (!twoSameCriteria) {
    return false;
  }

  for (let i = 0; i < password.length - 1; i++) {
    if (
      Number.parseInt(password[i], 10) > Number.parseInt(password[i + 1], 10)
    ) {
      return false;
    }
  }

  return true;
};

const fn2 = (password) => {
  const largerGroup = [];
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password[i] === password[i + 1] &&
      password[i + 1] === password[i + 2]
    ) {
      largerGroup.push(password[i] + password[i + 1] + password[i + 2]);
    }
  }

  let twoSameCriteriaNotInLargerGroup = false;
  for (let i = 0; i < password.length - 1; i++) {
    if (
      !twoSameCriteriaNotInLargerGroup &&
      password[i] === password[i + 1] &&
      largerGroup.every((g) => !g.includes(password[i] + password[i + 1]))
    ) {
      twoSameCriteriaNotInLargerGroup = true;
    }
  }

  return twoSameCriteriaNotInLargerGroup && fn1(password);
};

module.exports = {
  fn1,
  fn2,
};
