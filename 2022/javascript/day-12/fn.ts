import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface INode {
  elevation: string;
  x: number;
  y: number;
  distance: number;
}

//function to convert letter in number
const letterToNumber = (letter: string): number => {
  if (letter === "S") return 1;
  if (letter === "E") return 26;
  return letter.charCodeAt(0) - 96;
};

const isValidNeighbor = (node: INode, neighbor: INode): boolean => {
  return (
    Math.abs(node.x - neighbor.x) + Math.abs(node.y - neighbor.y) <= 1 &&
    letterToNumber(neighbor.elevation) - letterToNumber(node.elevation) <= 1
  );
};

const parseInput = (lines: ReadonlyArray<string>): Set<INode> => {
  const nodes: INode[] = [];
  lines.forEach((line, y) => {
    line.split("").forEach((elevation, x) => {
      nodes.push({
        elevation,
        x,
        y,
        distance: Infinity,
      });
    });
  });
  return new Set(nodes);
};

const visitNode =
  (unvisitedNodes: Set<INode>, visitedNodes: Set<INode>) =>
  (node: INode): INode => {
    const neighbors = [...unvisitedNodes].filter((n) =>
      isValidNeighbor(node, n)
    );
    neighbors.forEach((neighbor) => {
      if (neighbor.distance > node.distance + 1) {
        neighbor.distance = node.distance + 1;
      }
    });
    unvisitedNodes.delete(node);
    visitedNodes.add(node);
    return [...unvisitedNodes].sort((a, b) => a.distance - b.distance)[0];
  };

export const fn1 = ({ input }: IAoCInput) => {
  const unvisitedNodes = parseInput(input);
  const visitedNodes: Set<INode> = new Set();
  let currentNode: INode = Array.from(unvisitedNodes).find((n) =>
    n.elevation === "S"
  )!;
  currentNode.distance = 0;
  const endNode: INode = Array.from(unvisitedNodes).find((n) =>
    n.elevation === "E"
  )!;
  while (visitedNodes.has(endNode) === false) {
    currentNode = visitNode(unvisitedNodes, visitedNodes)(currentNode);
  }
  return endNode.distance;
};
export const fn2 = ({ input }: IAoCInput) => {
  const initialSet = parseInput(input);
  const possibleStartingPoints = Array.from(initialSet).filter((n) =>
    n.elevation === "S" || n.elevation === "a"
  ).filter((n) => {
    const neighbors = [...initialSet].filter((n2) => isValidNeighbor(n, n2));
    return neighbors.some((n2) => n2.elevation === "b");
  });
  console.log(`Possible starting points: ${possibleStartingPoints.length}`);
  let betterStartingPoint: INode | undefined;
  let bestDistance = Infinity;
  let cycle = 0;
  possibleStartingPoints.forEach((startingPoint) => {
    const unvisitedNodes = new Set(initialSet);
    const visitedNodes: Set<INode> = new Set();
    let currentNode: INode = startingPoint;
    currentNode.distance = 0;
    const endNode: INode = Array.from(unvisitedNodes).find((n) =>
      n.elevation === "E"
    )!;
    while (
      visitedNodes.has(endNode) === false && currentNode.distance < bestDistance
    ) {
      currentNode = visitNode(unvisitedNodes, visitedNodes)(currentNode);
    }
    if (endNode.distance < bestDistance) {
      bestDistance = endNode.distance;
      betterStartingPoint = startingPoint;
    }
    cycle++;
    console.log(`Cycle ${cycle} done. Best distance: ${bestDistance}`);
  });
  return bestDistance;
};
