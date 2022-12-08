export const computeTargets = (
  positions: ReadonlyArray<number>,
): ReadonlyArray<number> => {
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  return Array.from({ length: max - min }, (_, i) => i + min);
};

export const computeFuelConsumptionSimple =
  (positions: ReadonlyArray<number>) => (targetPosition: number): number => {
    if (
      targetPosition < Math.min(...positions) ||
      targetPosition > Math.max(...positions)
    ) {
      throw new Error(
        "[computeFuelConsumption] Target position out of boundary",
      );
    }
    return positions.map((n) => Math.abs(n - targetPosition)).reduce(
      (acc, n) => acc + n,
      0,
    );
  };

export const computeFuelConsumptionComplex =
  (positions: ReadonlyArray<number>, distanceMap: Map<number, number>) =>
  (targetPosition: number): number => {
    if (
      targetPosition < Math.min(...positions) ||
      targetPosition > Math.max(...positions)
    ) {
      throw new Error(
        "[computeFuelConsumption] Target position out of boundary",
      );
    }
    return positions.map((n) =>
      distanceToConsumption(distanceMap)(Math.abs(n - targetPosition))
    ).reduce((acc, n) => acc + n, 0);
  };

export const distanceToConsumption =
  (distanceMap: Map<number, number>) => (distance: number): number => {
    if (!distanceMap.has(distance)) {
      distanceMap.set(
        distance,
        Array.from({ length: distance }, (_, i) => i + 1)
          .reduce((acc, n) => acc + n, 0),
      );
    }
    return distanceMap.get(distance) as number;
  };
