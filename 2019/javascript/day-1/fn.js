const fn1 = (mass) => Math.floor(mass / 3) - 2;

const fn2 = (mass) => {
  let total = 0;
  let fuelToAdd = fn1(mass);
  while (fuelToAdd > 0) {
    total += fuelToAdd;
    fuelToAdd = fn1(fuelToAdd);
  }
  return total;
};

module.exports = {
  fn1,
  fn2,
};
