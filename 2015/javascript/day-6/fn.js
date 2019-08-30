function isLightInclude(light, x1, y1, x2, y2) {
  return light.x >= x1 && light.y >= y1 && light.x <= x2 && light.y <= y2;
}

function toFunction(turnOnFn, turnOffFn, toggleFn) {
  return intruction => {
    const arr = intruction.split(" ");
    if (arr[0] === "turn") {
      const coord1 = arr[2].split(",");
      const coord2 = arr[4].split(",");
      if (arr[1] === "on") {
        return light => {
          if (
            isLightInclude(light, coord1[0], coord1[1], coord2[0], coord2[1])
          ) {
            light.brightness = turnOnFn(light.brightness);
          }
          return light;
        };
      } else {
        return light => {
          if (
            isLightInclude(light, coord1[0], coord1[1], coord2[0], coord2[1])
          ) {
            light.brightness = turnOffFn(light.brightness);
          }
          return light;
        };
      }
    } else {
      const coord1 = arr[1].split(",");
      const coord2 = arr[3].split(",");
      return light => {
        if (isLightInclude(light, coord1[0], coord1[1], coord2[0], coord2[1])) {
          light.brightness = toggleFn(light.brightness);
        }
        return light;
      };
    }
  };
}

const fn1 = instructions => {
  const instructionsFn = instructions.map(intruction =>
    toFunction(x => 1, x => 0, x => (x ? 0 : 1))(intruction)
  );
  const grid = [];
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      grid.push({
        x: i,
        y: j,
        brightness: 0
      });
    }
  }
  instructionsFn.forEach(fn => grid.map(light => fn(light)));
  return grid.reduce(
    (count, light) => (light.brightness ? count + 1 : count),
    0
  );
};

const fn2 = instructions => {
  const instructionsFn = instructions.map(intruction =>
    toFunction(x => x + 1, x => (x ? x - 1 : 0), x => x + 2)(intruction)
  );
  const grid = [];
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      grid.push({
        x: i,
        y: j,
        brightness: 0
      });
    }
  }
  instructionsFn.forEach(fn => grid.map(light => fn(light)));
  return grid.reduce((count, light) => count + light.brightness, 0);
};

module.exports = {
  fn1,
  fn2
};
