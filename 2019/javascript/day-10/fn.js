const getAstroidCoordonate = (stellarMap) => {
  const astroids = [];
  for (let y = 0; y < stellarMap.length; y++) {
    const stellarLine = stellarMap[y].split('');
    for (let x = 0; x < stellarLine.length; x++) {
      if (stellarLine[x] === '#') {
        astroids.push({
          x,
          y
        })
      }
    }
  }
  return astroids;
}

const checkIfAstroidBetween = (astroidOrigin, astroidEnd) => astroidToTest => {
  if (astroidOrigin.x === astroidEnd.x && astroidOrigin.y === astroidEnd.y)
    throw new Error("[checkIfAstroidBetween] Origin and End must be different");
  if (astroidOrigin.x === astroidToTest.x && astroidOrigin.y === astroidToTest.y)
    throw new Error("[checkIfAstroidBetween] Astroid to test and End must be different");
  if (astroidToTest.x === astroidEnd.x && astroidToTest.y === astroidEnd.y)
    throw new Error("[checkIfAstroidBetween] Origin and Astroid to test must be different");

  if (astroidOrigin.x === astroidEnd.x) {
    return astroidToTest.x === astroidOrigin.x
      && astroidToTest.y > astroidOrigin.y
      && astroidToTest.y < astroidEnd.y;
  }

  if (astroidOrigin.y === astroidEnd.y) {
    return astroidToTest.y === astroidOrigin.y
      && astroidToTest.x > astroidOrigin.x
      && astroidToTest.x < astroidEnd.x;
  }

  const coefficient = (astroid.y - astroidOrigin.y) / (astroid.x - astroidOrigin.x);
  const offset = astroid.y - (astroid.y - astroidOrigin.y) / (astroid.x - astroidOrigin.x) * astroid.x;

  return astroidToTest.y === coefficient * astroidToTest.x + offset
    && astroidToTest.x > astroidOrigin.x
    && astroidToTest.x < astroidEnd.x;
}

function getAstroidsInSight(astroids, astroidOrigin) {
  let count = 0;
  for (let i = 0; i < astroids.length; i++) {
    const astroidEnd = astroids[i];
    const hasAstroidsBetween = astroids.some(astroid => astroid.x !== astroidOrigin.x
      && astroid.y !== astroidOrigin.y
      && astroid.x !== astroidEnd.x
      && astroid.y !== astroidEnd.y)
      && checkIfAstroidBetween(astroidOrigin, astroidEnd)(astroid);
    if (!hasAstroidsBetween) {
      count += 1;
    }
  }
  return count;
}

const fn1 = input => {
  const astroids = getAstroidCoordonate(input).map((astroid, _, astroidsArray) => {
    astroid['inSightCount'] = getAstroidsInSight(astroid, astroidsArray);
    return astroid;
  });
  console.log(astroids)
  return undefined
};

const fn2 = input => {
  return undefined
};

module.exports = {
  fn1,
  fn2
};
