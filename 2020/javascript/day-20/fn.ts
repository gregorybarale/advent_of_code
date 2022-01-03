import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

type Image = ReadonlyArray<ReadonlyArray<"." | "#">>;

interface ITile {
  id: number;
  image: Image;
}

const parser: (input: IAoCInput) => ReadonlyArray<ITile> = (
  { input }: IAoCInput,
) => {
  return input.reduce((tiles, row) => {
    if (row === "") {
      return [...tiles, {
        id: undefined,
        image: [],
      }];
    }
    if (row.includes("Tile")) {
      const arrStr = row.split(" ")[1].split("");
      arrStr.pop();
      tiles[tiles.length - 1].id = Number.parseInt(arrStr.join(""), 10);
      return tiles;
    }
    tiles[tiles.length - 1].image = [
      ...tiles[tiles.length - 1].image,
      row.split("") as ReadonlyArray<"." | "#">,
    ];
    return tiles;
  }, [{
    id: undefined,
    image: [],
  }] as any);
};

const getImageTopBorder: (image: Image) => string = (image: Image) =>
  image[0].join("");
const getImageBottomBorderImage: (image: Image) => string = (image: Image) =>
  image[image.length - 1].join("");
const getImageLeftBorderImage: (image: Image) => string = (image: Image) =>
  image.map((arr) => arr[0]).join("");
const getImageRightBorderImage: (image: Image) => string = (image: Image) =>
  image.map((arr) => arr[arr.length - 1]).join("");

const getBordersFromImage: (image: Image) => {
  top: string;
  bottom: string;
  left: string;
  right: string;
} = (image: Image) => ({
  top: getImageTopBorder(image),
  bottom: getImageBottomBorderImage(image),
  left: getImageLeftBorderImage(image),
  right: getImageRightBorderImage(image),
});

export const fn1 = (input: IAoCInput) => {
  const tiles = parser(input);

  return undefined;
};
export const fn2 = (input: IAoCInput) => {
  return undefined;
};
