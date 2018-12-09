const _getLeaf = array => {
  array.shift(); // Remove number of children which is 0
  const quantityMetaData = array.shift();
  return {
    metaData: _getMetaData(array, quantityMetaData)
  };
};

const _getMetaData = (array, quantityMetaData) => {
  return Array.from(new Array(quantityMetaData), () => array.shift()).sort(
    (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
  );
};

const _getNextChild = array => {
  const nbrOfChildren = array.shift(),
    quantityMetaData = array.shift(),
    children = [];
  while (children.length < nbrOfChildren) {
    if (array[0] === 0) {
      children.push(_getLeaf(array));
    } else {
      children.push(_getNextChild(array));
    }
  }
  return {
    metaData: _getMetaData(array, quantityMetaData),
    children
  };
};

const getTree = array => {
  return _getNextChild(array);
};

const getSum = tree => {
  let array;
  if (tree.children) {
    array = [...tree.metaData, ...tree.children.map(child => getSum(child))];
  } else {
    array = [...tree.metaData];
  }
  return array.reduce((acc, n) => acc + n, 0);
};

const getNodeValue = tree => {
  if (tree.children === undefined) {
    return getSum(tree);
  }
  return tree.metaData
    .map(n => {
      if (tree.children[n - 1]) {
        return getNodeValue(tree.children[n - 1]);
      }
      return 0;
    })
    .reduce((acc, n) => acc + n, 0);
};

module.exports = {
  getTree,
  getSum,
  getNodeValue
};
