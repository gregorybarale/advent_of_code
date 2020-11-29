function createTree(input) {
  const root = findChildren(
    {
      parent: undefined,
      value: "COM",
      depth: 0
    },
    input.map(x => ({
      parent: x.split(")")[0],
      child: x.split(")")[1]
    }))
  );

  return flattenNode(root);
}

function findChildren(node, orbitArray) {
  node.children = orbitArray
    .filter(orbit => orbit.parent === node.value)
    .map(orbit => ({
      parent: node,
      value: orbit.child,
      depth: node.depth + 1
    }));

  node.children.forEach(child => findChildren(child, orbitArray));

  return node;
}

function flattenNode(node) {
  return [
    node,
    ...node.children.reduce((acc, child) => [...acc, ...flattenNode(child)], [])
  ];
}

function getAncestorsValueArray(node) {
  if (node.parent) {
    return [node.parent.value, ...getAncestorsValueArray(node.parent)];
  }
  return [];
}

function getCommonAncestors(ancestorsA, ancestorsB) {
  const minLength = Math.min(ancestorsA.length, ancestorsB.length);
  let commonAncestor;
  if (minLength === 0) {
    return
  }

  for (let i = 0; i < minLength; i++) {
    if (ancestorsA[i] === ancestorsB[i]) {
      commonAncestor = ancestorsA[i];
    } else {
      break;
    }
  }

  return commonAncestor;
}

const fn1 = input => {
  const tree = createTree(input);

  return tree.reduce((acc, node) => acc + node.depth, 0);
};

const fn2 = input => {
  const tree = createTree(input);

  const youNode = tree.find(node => node.value === 'YOU');
  const santaNode = tree.find(node => node.value === 'SAN');

  const youAncestorsValues = getAncestorsValueArray(tree.find(node => node.value === 'YOU')).reverse();
  const santaAncestorsValues = getAncestorsValueArray(tree.find(node => node.value === 'SAN')).reverse();
  const commonAncestorValue = getCommonAncestors(youAncestorsValues, santaAncestorsValues);

  const commonAncestorNode = tree.find(node => node.value === commonAncestorValue);

  return (youNode.depth - (commonAncestorNode.depth + 1)) + (santaNode.depth - (commonAncestorNode.depth + 1));
};

module.exports = {
  fn1,
  fn2
};
