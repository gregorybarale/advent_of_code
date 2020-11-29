function retrievePointFromWire(wirePath) {
  const paths = wirePath.split(",").map((x) => {
    var [direction, ...y] = x;
    return {
      direction,
      length: Number.parseInt(y.join(""), 10),
    };
  });

  let points = [{ x: 0, y: 0, step: 0 }];
  let currentStep = 0;

  paths.forEach((path) => {
    const startPoint = points[points.length - 1];
    switch (path.direction) {
      case "U":
        points = [
          ...points,
          ...Array.from({ length: path.length }, (_, index) => {
            currentStep++;
            return {
              x: startPoint.x,
              y: startPoint.y + index + 1,
              step: currentStep,
            };
          }),
        ];
        break;
      case "D":
        points = [
          ...points,
          ...Array.from({ length: path.length }, (_, index) => {
            currentStep++;
            return {
              x: startPoint.x,
              y: startPoint.y - index - 1,
              step: currentStep,
            };
          }),
        ];
        break;
      case "L":
        points = [
          ...points,
          ...Array.from({ length: path.length }, (_, index) => {
            currentStep++;
            return {
              x: startPoint.x - index - 1,
              y: startPoint.y,
              step: currentStep,
            };
          }),
        ];
        break;
      case "R":
        points = [
          ...points,
          ...Array.from({ length: path.length }, (_, index) => {
            currentStep++;
            return {
              x: startPoint.x + index + 1,
              y: startPoint.y,
              step: currentStep,
            };
          }),
        ];
        break;
    }
  });

  return points;
}

const fn1 = (input) => {
  const points1 = retrievePointFromWire(input[0]);
  const points2 = retrievePointFromWire(input[1]);

  const mapPoints1 = points1.reduce((acc, value, index) => {
    const key = `x${value.x}y${value.y}`;
    if (acc[key]) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const mapPoints2 = points2.reduce((acc, value, index) => {
    const key = `x${value.x}y${value.y}`;
    if (acc[key]) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

  const intersectionPoints = Object.keys(mapPoints1).reduce((acc, key) => {
    if (mapPoints2[key]) {
      return [...acc, mapPoints1[key]];
    }
    return acc;
  }, []);

  return Math.min(
    ...intersectionPoints
      .filter((point) => point.x !== 0 && point.y !== 0)
      .map((point) => Math.abs(point.x) + Math.abs(point.y)),
  );
};

const fn2 = (input) => {
  const points1 = retrievePointFromWire(input[0]);
  const points2 = retrievePointFromWire(input[1]);

  const mapPoints1 = points1.reduce((acc, value) => {
    const key = `x${value.x}y${value.y}`;
    if (acc[key]) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const mapPoints2 = points2.reduce((acc, value) => {
    const key = `x${value.x}y${value.y}`;
    if (acc[key]) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

  const intersectionPoints = Object.keys(mapPoints1).reduce((acc, key) => {
    if (mapPoints2[key]) {
      return [
        ...acc,
        {
          x: mapPoints1[key].x,
          y: mapPoints1[key].y,
          totalStep: mapPoints1[key].step + mapPoints2[key].step,
        },
      ];
    }
    return acc;
  }, []);

  return Math.min(
    ...intersectionPoints
      .filter((point) => point.x !== 0 || point.y !== 0)
      .map((point) => point.totalStep),
  );
};

module.exports = {
  fn1,
  fn2,
};
