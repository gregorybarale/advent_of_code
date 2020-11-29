const checkInputIntegrity = (input) => {
  const lineLength = input[0].split("").length;
  return input.map((l) => l.split("")).every((l) => l.length === lineLength);
};

const retrieveInitialPosition = (input) => {
  const parsedInput = input.map((s) => s.split(""));
  const positions = {
    topLeftCorners: [],
    topRightCorners: [],
    bottomLeftCorners: [],
    bottomRightCorners: [],
    intersections: [],
    carts: [],
  };

  parsedInput.forEach((l, line) => {
    l.forEach((c, column, arr) => {
      switch (c) {
        case "/":
          if (column === 0) {
            positions.topLeftCorners.push({ line, column });
          } else if (column === arr.length - 1) {
            positions.bottomRightCorners.push({ line, column });
          } else if (
            arr[column + 1] === "-" || arr[column + 1] === "+" ||
            arr[column + 1] === ">" || arr[column + 1] === "<"
          ) {
            positions.topLeftCorners.push({ line, column });
          } else {
            positions.bottomRightCorners.push({ line, column });
          }
          break;
        case "\\":
          if (column === 0) {
            positions.bottomLeftCorners.push({ line, column });
          } else if (column === arr.length - 1) {
            positions.topRightCorners.push({ line, column });
          } else if (
            arr[column + 1] === "-" || arr[column + 1] === "+" ||
            arr[column + 1] === ">" || arr[column + 1] === "<"
          ) {
            positions.bottomLeftCorners.push({ line, column });
          } else {
            positions.topRightCorners.push({ line, column });
          }
          break;
        case "+":
          positions.intersections.push({ line, column });
          break;
        case ">":
          positions.carts.push({
            line,
            column,
            direction: "right",
            nextDirection: "left",
          });
          break;
        case "<":
          positions.carts.push({
            line,
            column,
            direction: "left",
            nextDirection: "left",
          });
          break;
        case "^":
          positions.carts.push({
            line,
            column,
            direction: "top",
            nextDirection: "left",
          });
          break;
        case "v":
          positions.carts.push({
            line,
            column,
            direction: "bottom",
            nextDirection: "left",
          });
          break;
        default:
          // Do nothing
      }
    });
  });

  return positions;
};

const isOnIntersection = (positions, cart) => {
  return (
    positions.intersections.find(
      (i) => i.line === cart.line && i.column === cart.column,
    ) !== undefined
  );
};

const isOnTopLeftCorner = (positions, cart) => {
  return (
    positions.topLeftCorners.find(
      (i) => i.line === cart.line && i.column === cart.column,
    ) !== undefined
  );
};

const isOnTopRightCorner = (positions, cart) => {
  return (
    positions.topRightCorners.find(
      (i) => i.line === cart.line && i.column === cart.column,
    ) !== undefined
  );
};

const isOnBottomLeftCorner = (positions, cart) => {
  return (
    positions.bottomLeftCorners.find(
      (i) => i.line === cart.line && i.column === cart.column,
    ) !== undefined
  );
};

const isOnBottomRightCorner = (positions, cart) => {
  return (
    positions.bottomRightCorners.find(
      (i) => i.line === cart.line && i.column === cart.column,
    ) !== undefined
  );
};

const getNewDirection = (nextDirection, currentDirection) => {
  if (nextDirection === "straight") {
    return currentDirection;
  }
  if (currentDirection === "top" && nextDirection === "left") {
    return "left";
  }
  if (currentDirection === "left" && nextDirection === "left") {
    return "bottom";
  }
  if (currentDirection === "bottom" && nextDirection === "left") {
    return "right";
  }
  if (currentDirection === "right" && nextDirection === "left") {
    return "top";
  }
  if (currentDirection === "top" && nextDirection === "right") {
    return "right";
  }
  if (currentDirection === "left" && nextDirection === "right") {
    return "top";
  }
  if (currentDirection === "bottom" && nextDirection === "right") {
    return "left";
  }
  if (currentDirection === "right" && nextDirection === "right") {
    return "bottom";
  }
  throw new Error("Something went wrong in getNewDirection");
};

const hasSameCoordinate = (cart1, cart2) => {
  return cart1.line === cart2.line && cart1.column === cart2.column;
};

module.exports = {
  checkInputIntegrity,
  retrieveInitialPosition,
  isOnIntersection,
  isOnTopLeftCorner,
  isOnTopRightCorner,
  isOnBottomLeftCorner,
  isOnBottomRightCorner,
  getNewDirection,
  hasSameCoordinate,
};
