export interface IHeatPoint {
  x: number;
  y: number;
  z: number;
}

export const parseInput = (
  input: ReadonlyArray<string>,
): ReadonlyArray<IHeatPoint> =>
  input.map((str) => str.split("").map((s) => Number.parseInt(s, 10)))
    .reduce((acc, row, x) => [
      ...acc,
      ...row.map((z, y) => ({
        x,
        y,
        z,
      })),
    ], [] as ReadonlyArray<IHeatPoint>);

export const isEqualPoint = (a: IHeatPoint) => (b: IHeatPoint) =>
  a.x === b.x && a.y === b.y;

export const isPointInBasin =
  (basin: ReadonlyArray<IHeatPoint>) => (point: IHeatPoint): boolean =>
    basin.some(isEqualPoint(point));
export const isPointNotInBasin =
  (basin: ReadonlyArray<IHeatPoint>) => (point: IHeatPoint): boolean =>
    !isPointInBasin(basin)(point);

export const getAdjacents =
  (heatMap: ReadonlyArray<IHeatPoint>) =>
  ({ x, y }: IHeatPoint): ReadonlyArray<IHeatPoint> =>
    heatMap.filter((point) => {
      return point.x === x && (point.y === y - 1 || point.y === y + 1) ||
        point.y === y && (point.x === x - 1 || point.x === x + 1);
    });

export const isLocalLower =
  (heatMap: ReadonlyArray<IHeatPoint>) => (heatPoint: IHeatPoint): boolean =>
    getAdjacents(heatMap)(heatPoint).every((point) => point.z > heatPoint.z);

export const getRiskLevel = ({ z }: IHeatPoint): number => z + 1;

export const addPointToBasin =
  (heatMap: ReadonlyArray<IHeatPoint>) =>
  (basin: ReadonlyArray<IHeatPoint>): ReadonlyArray<IHeatPoint> => {
    const adjacentsToBasin = basin.map((point) => getAdjacents(heatMap)(point))
      .reduce((acc, points) => [
        ...acc,
        ...points.filter(isPointNotInBasin(basin)).filter(
          isPointNotInBasin(acc),
        ),
      ], [] as ReadonlyArray<IHeatPoint>);
    const adjacentsToBasinToAdd = adjacentsToBasin.filter(({ z }) => z !== 9);
    if (adjacentsToBasinToAdd.length === 0) return basin;
    return addPointToBasin(heatMap)([...basin, ...adjacentsToBasinToAdd]);
  };
