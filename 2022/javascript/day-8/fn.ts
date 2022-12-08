import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

interface ITree {
  x: number;
  y: number;
  height: number;
  isVisibleFromOutside?: boolean;
}

const parseInput = (
  input: ReadonlyArray<ReadonlyArray<string>>,
): ReadonlyArray<ITree> => {
  let trees: ReadonlyArray<ITree> = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const tree: ITree = {
        x: j,
        y: i,
        height: parseInt(input[i][j], 10),
      };
      trees = [...trees, tree];
    }
  }
  return trees;
};

const checkVisibilityIfUndefined =
  (trees: ReadonlyArray<ITree>) => (tree: ITree) => {
    const treesOnLeft = trees.filter((t) => t.x < tree.x && t.y === tree.y);
    const treesOnRight = trees.filter((t) => t.x > tree.x && t.y === tree.y);
    const treesOnTop = trees.filter((t) => t.x === tree.x && t.y < tree.y);
    const treesOnBottom = trees.filter((t) => t.x === tree.x && t.y > tree.y);
    if (
      treesOnLeft.length === 0 || treesOnRight.length === 0 ||
      treesOnTop.length === 0 || treesOnBottom.length === 0
    ) {
      tree.isVisibleFromOutside = true;
      return;
    }
    const maxHeightsOnLeft = Math.max(...treesOnLeft.map((t) => t.height));
    const maxHeightsOnRight = Math.max(...treesOnRight.map((t) => t.height));
    const maxHeightsOnTop = Math.max(...treesOnTop.map((t) => t.height));
    const maxHeightsOnBottom = Math.max(...treesOnBottom.map((t) => t.height));
    tree.isVisibleFromOutside = tree.height > maxHeightsOnLeft ||
      tree.height > maxHeightsOnRight || tree.height > maxHeightsOnTop ||
      tree.height > maxHeightsOnBottom;
  };

const computeScenicScore = (trees: ReadonlyArray<ITree>) => (tree: ITree) => {
  const treesOnLeft = trees.filter((t) => t.x < tree.x && t.y === tree.y);
  const treesOnRight = trees.filter((t) => t.x > tree.x && t.y === tree.y);
  const treesOnTop = trees.filter((t) => t.x === tree.x && t.y < tree.y);
  const treesOnBottom = trees.filter((t) => t.x === tree.x && t.y > tree.y);
  const visibleTreesOnLeft = treesOnLeft.filter(
    isVisibleFromTree(treesOnLeft, tree),
  );
  const visibleTreesOnRight = treesOnRight.filter(
    isVisibleFromTree(treesOnRight, tree),
  );
  const visibleTreesOnTop = treesOnTop.filter(
    isVisibleFromTree(treesOnTop, tree),
  );
  const visibleTreesOnBottom = treesOnBottom.filter(
    isVisibleFromTree(treesOnBottom, tree),
  );
  return visibleTreesOnLeft.length * visibleTreesOnRight.length *
    visibleTreesOnTop.length * visibleTreesOnBottom.length;
};

const isVisibleFromTree =
  (trees: ReadonlyArray<ITree>, anchorTree: ITree) => (tree: ITree) => {
    let filterFn: (t: ITree) => boolean;
    if (tree.y === anchorTree.y) {
      filterFn = tree.x < anchorTree.x
        ? (t) => t.x > tree.x && t.x < anchorTree.x && t.y === tree.y
        : (t) => t.x < tree.x && t.x > anchorTree.x && t.y === tree.y;
    } else {
      filterFn = tree.y < anchorTree.y
        ? (t) => t.y > tree.y && t.y < anchorTree.y && t.x === tree.x
        : (t) => t.y < tree.y && t.y > anchorTree.y && t.x === tree.x;
    }
    const treesBetween = trees.filter(filterFn);
    const maxHeightsBetween = Math.max(...treesBetween.map((t) => t.height));
    return anchorTree.height > maxHeightsBetween;
  };

export const fn1 = ({ input }: IAoCInput) => {
  const trees = parseInput(input.map((line) => line.split("")));
  trees.forEach(checkVisibilityIfUndefined(trees));
  return trees.filter((t) => t.isVisibleFromOutside).length;
};
export const fn2 = ({ input }: IAoCInput) => {
  const trees = parseInput(input.map((line) => line.split("")));
  return Math.max(...trees.map(computeScenicScore(trees)));
};
