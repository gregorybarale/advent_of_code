const sortNumber = (i, j) => {
  return i - j;
};

const getDiff = (row) => {
  row.sort(sortNumber);
  return row[row.length - 1] - row[0];
};

const getEvenlyNumber = (row) => {
  var n = 0;
  row.sort(sortNumber);
  for (let divider_index = 0; divider_index < row.length; divider_index++) {
    for (
      let dividee_index = divider_index + 1;
      dividee_index < row.length;
      dividee_index++
    ) {
      if (n === 0 && row[dividee_index] % row[divider_index] === 0) {
        n = row[dividee_index] / row[divider_index];
        break;
      }
    }
    if (n) break;
  }
  return n;
};

const reducer_simple = (input) => {
  return input.reduce((acc, row) => {
    return acc + getDiff(row);
  }, 0);
};

const reducer_hard = (input) => {
  return input.reduce((acc, row) => {
    return acc + getEvenlyNumber(row);
  }, 0);
};

module.exports = {
  reducer_simple: reducer_simple,
  reducer_hard: reducer_hard,
};
