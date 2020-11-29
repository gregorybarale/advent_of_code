const example = require("./example-2");
const input = require("./input");
const utils = require("./utils");

//const rawData = example;
const rawData = input;

console.log(example.map((x) => x.split("")));

if (!utils.checkInputIntegrity(rawData)) {
  throw new Error("Initial input is invalid");
}

const positions = utils.retrieveInitialPosition(rawData);

while (positions.carts.length > 1) {
  positions.carts.forEach((cart) => {
    // Move cart
    switch (cart.direction) {
      case "top":
        cart.line -= 1;
        break;
      case "left":
        cart.column -= 1;
        break;
      case "right":
        cart.column += 1;
        break;
      case "bottom":
        cart.line += 1;
        break;
      default:
        throw new Error("Wrong cart direction.");
    }
    // Change cart direction if necessary
    if (utils.isOnIntersection(positions, cart)) {
      cart.direction = utils.getNewDirection(
        cart.nextDirection,
        cart.direction,
      );
      switch (cart.nextDirection) {
        case "left":
          cart.nextDirection = "straight";
          break;
        case "right":
          cart.nextDirection = "left";
          break;
        case "straight":
          cart.nextDirection = "right";
          break;
        default:
          throw new Error("Wrong next direction.");
      }
    } else if (utils.isOnTopLeftCorner(positions, cart)) {
      if (cart.direction === "top") {
        cart.direction = "right";
      } else if (cart.direction === "left") {
        cart.direction = "bottom";
      } else {
        throw new Error(
          `Wrong direction for a topleft corner. Direction:${cart.direction}`,
        );
      }
    } else if (utils.isOnTopRightCorner(positions, cart)) {
      if (cart.direction === "top") {
        cart.direction = "left";
      } else if (cart.direction === "right") {
        cart.direction = "bottom";
      } else {
        throw new Error(
          `Wrong direction for a topright corner. Direction:${cart.direction}`,
        );
      }
    } else if (utils.isOnBottomLeftCorner(positions, cart)) {
      if (cart.direction === "bottom") {
        cart.direction = "right";
      } else if (cart.direction === "left") {
        cart.direction = "top";
      } else {
        throw new Error(
          `Wrong direction for a bottomleft corner. Direction:${cart.direction}`,
        );
      }
    } else if (utils.isOnBottomRightCorner(positions, cart)) {
      if (cart.direction === "bottom") {
        cart.direction = "left";
      } else if (cart.direction === "right") {
        cart.direction = "top";
      } else {
        throw new Error(
          `Wrong direction for a bottomright corner. Direction:${cart.direction}`,
        );
      }
    }
  });
  positions.carts = positions.carts.reduce((acc, cart, _, array) => {
    if (
      array
        .filter((otherCart) =>
          JSON.stringify(otherCart) !== JSON.stringify(cart)
        )
        .every((otherCart) => !utils.hasSameCoordinate(cart, otherCart))
    ) {
      return [...acc, cart];
    }
    return acc;
  }, []);
}

switch (positions.carts[0].direction) {
  case "top":
    positions.carts[0].line -= 1;
    break;
  case "left":
    positions.carts[0].column -= 1;
    break;
  case "right":
    positions.carts[0].column += 1;
    break;
  case "bottom":
    positions.carts[0].line += 1;
    break;
  default:
    throw new Error("Wrong cart direction.");
}

console.log(positions.carts);
