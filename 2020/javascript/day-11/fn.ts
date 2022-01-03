import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";

enum StateEnum {
  FLOOR = ".",
  EMPTY = "L",
  OCCUPIED = "#",
}

interface ICoordinate {
  x: number;
  y: number;
}

interface ISeat {
  coordinate: ICoordinate;
  state: StateEnum;
}

interface IWaitingArea {
  layout: ReadonlyArray<ISeat>;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const parser: (input: IAoCInput) => IWaitingArea = ({ input }: IAoCInput) => {
  const layout: ReadonlyArray<ISeat> = input.map((row, y) => {
    return row.split("").map((str, x) => {
      return {
        coordinate: {
          x,
          y,
        },
        state: str,
      } as ISeat;
    });
  }).flat();
  return {
    layout,
    xMin: 0,
    yMin: 0,
    xMax: input[0].length - 1,
    yMax: input.length - 1,
  };
};

const getSeatInArea: (
  area: IWaitingArea,
) => (coordinate: ICoordinate) => ISeat = ({ layout }: IWaitingArea) =>
  (coordinate: ICoordinate) =>
    layout.find((value) =>
      coordinate.x === value.coordinate.x && coordinate.y === value.coordinate.y
    ) as ISeat;

const getStrictAdjacentSeats: (
  area: IWaitingArea,
) => (seat: ISeat) => ReadonlyArray<ISeat> = (area: IWaitingArea) =>
  (seat: ISeat) => {
    let adjacentSeat: Array<ISeat> = [];

    const xToTake = [
      seat.coordinate.x - 1,
      seat.coordinate.x,
      seat.coordinate.x + 1,
    ].filter((n) => n >= area.xMin && n <= area.xMax);
    const yToTake = [
      seat.coordinate.y - 1,
      seat.coordinate.y,
      seat.coordinate.y + 1,
    ].filter((n) => n >= area.yMin && n <= area.yMax);

    for (let i = 0; i < xToTake.length; i++) {
      for (let j = 0; j < yToTake.length; j++) {
        const seat = getSeatInArea(area)({ x: xToTake[i], y: yToTake[j] });
        if (seat.state !== StateEnum.FLOOR) {
          adjacentSeat.push(seat);
        }
      }
    }

    return adjacentSeat.filter((s) =>
      s.coordinate.x !== seat.coordinate.x ||
      s.coordinate.y !== seat.coordinate.y
    );
  };

const getNextLeftSeat: (area: IWaitingArea) => (seat: ISeat) => ISeat | null = (
  area: IWaitingArea,
) =>
  (seat: ISeat) => {
    const { x, y } = seat.coordinate;
    let nextAbscisse = x;
    let nextSeat = undefined;
    while (nextSeat === undefined) {
      nextAbscisse -= 1;
      if (nextAbscisse < area.xMin) {
        nextSeat = null;
      } else if (
        getSeatInArea(area)({ x: nextAbscisse, y }).state !== StateEnum.FLOOR
      ) {
        nextSeat = getSeatInArea(area)({ x: nextAbscisse, y });
      }
    }
    return nextSeat as ISeat | null;
  };

const getNextRightSeat: (area: IWaitingArea) => (seat: ISeat) => ISeat | null =
  (area: IWaitingArea) =>
    (seat: ISeat) => {
      const { x, y } = seat.coordinate;
      let nextAbscisse = x;
      let nextSeat = undefined;
      while (nextSeat === undefined) {
        nextAbscisse += 1;
        if (nextAbscisse > area.xMax) {
          nextSeat = null;
        } else if (
          getSeatInArea(area)({ x: nextAbscisse, y }).state !== StateEnum.FLOOR
        ) {
          nextSeat = getSeatInArea(area)({ x: nextAbscisse, y });
        }
      }
      return nextSeat as ISeat | null;
    };

const getNextUpperSeat: (area: IWaitingArea) => (seat: ISeat) => ISeat | null =
  (area: IWaitingArea) =>
    (seat: ISeat) => {
      const { x, y } = seat.coordinate;
      let nextOrdinate = y;
      let nextSeat = undefined;
      while (nextSeat === undefined) {
        nextOrdinate -= 1;
        if (nextOrdinate < area.yMin) {
          nextSeat = null;
        } else if (
          getSeatInArea(area)({ x, y: nextOrdinate }).state !== StateEnum.FLOOR
        ) {
          nextSeat = getSeatInArea(area)({ x, y: nextOrdinate });
        }
      }
      return nextSeat as ISeat | null;
    };

const getNextLowerSeat: (area: IWaitingArea) => (seat: ISeat) => ISeat | null =
  (area: IWaitingArea) =>
    (seat: ISeat) => {
      const { x, y } = seat.coordinate;
      let nextOrdinate = y;
      let nextSeat = undefined;
      while (nextSeat === undefined) {
        nextOrdinate += 1;
        if (nextOrdinate > area.yMax) {
          nextSeat = null;
        } else if (
          getSeatInArea(area)({ x, y: nextOrdinate }).state !== StateEnum.FLOOR
        ) {
          nextSeat = getSeatInArea(area)({ x, y: nextOrdinate });
        }
      }
      return nextSeat as ISeat | null;
    };

const getNextLeftUpperSeat: (
  area: IWaitingArea,
) => (seat: ISeat) => ISeat | null = (area: IWaitingArea) =>
  (seat: ISeat) => {
    const { x, y } = seat.coordinate;
    let nextAbscisse = x;
    let nextOrdinate = y;
    let nextSeat = undefined;
    while (nextSeat === undefined) {
      nextAbscisse -= 1;
      nextOrdinate -= 1;
      if (nextAbscisse < area.xMin || nextOrdinate < area.yMin) {
        nextSeat = null;
      } else if (
        getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate }).state !==
          StateEnum.FLOOR
      ) {
        nextSeat = getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate });
      }
    }
    return nextSeat as ISeat | null;
  };

const getNextRightUpperSeat: (
  area: IWaitingArea,
) => (seat: ISeat) => ISeat | null = (area: IWaitingArea) =>
  (seat: ISeat) => {
    const { x, y } = seat.coordinate;
    let nextAbscisse = x;
    let nextOrdinate = y;
    let nextSeat = undefined;
    while (nextSeat === undefined) {
      nextAbscisse += 1;
      nextOrdinate -= 1;
      if (nextAbscisse > area.xMax || nextOrdinate < area.yMin) {
        nextSeat = null;
      } else if (
        getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate }).state !==
          StateEnum.FLOOR
      ) {
        nextSeat = getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate });
      }
    }
    return nextSeat as ISeat | null;
  };

const getNextLeftLowerSeat: (
  area: IWaitingArea,
) => (seat: ISeat) => ISeat | null = (area: IWaitingArea) =>
  (seat: ISeat) => {
    const { x, y } = seat.coordinate;
    let nextAbscisse = x;
    let nextOrdinate = y;
    let nextSeat = undefined;
    while (nextSeat === undefined) {
      nextAbscisse -= 1;
      nextOrdinate += 1;
      if (nextAbscisse < area.xMin || nextOrdinate > area.yMax) {
        nextSeat = null;
      } else if (
        getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate }).state !==
          StateEnum.FLOOR
      ) {
        nextSeat = getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate });
      }
    }
    return nextSeat as ISeat | null;
  };

const getNextRightLowerSeat: (
  area: IWaitingArea,
) => (seat: ISeat) => ISeat | null = (area: IWaitingArea) =>
  (seat: ISeat) => {
    const { x, y } = seat.coordinate;
    let nextAbscisse = x;
    let nextOrdinate = y;
    let nextSeat = undefined;
    while (nextSeat === undefined) {
      nextAbscisse += 1;
      nextOrdinate += 1;
      if (nextAbscisse > area.xMax || nextOrdinate > area.yMax) {
        nextSeat = null;
      } else if (
        getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate }).state !==
          StateEnum.FLOOR
      ) {
        nextSeat = getSeatInArea(area)({ x: nextAbscisse, y: nextOrdinate });
      }
    }
    return nextSeat as ISeat | null;
  };

const getAdjacentInSightSeats: (
  area: IWaitingArea,
) => (seat: ISeat) => ReadonlyArray<ISeat> = (area: IWaitingArea) =>
  (seat: ISeat) =>
    [
      getNextLeftSeat(area)(seat),
      getNextLeftUpperSeat(area)(seat),
      getNextUpperSeat(area)(seat),
      getNextRightUpperSeat(area)(seat),
      getNextRightSeat(area)(seat),
      getNextRightLowerSeat(area)(seat),
      getNextLowerSeat(area)(seat),
      getNextLeftLowerSeat(area)(seat),
    ].filter((seat) => seat !== null) as ReadonlyArray<ISeat>;

const countOccupiedSeat: (seats: ReadonlyArray<ISeat>) => number = (
  seats: ReadonlyArray<ISeat>,
) => seats.filter((seat) => seat.state === StateEnum.OCCUPIED).length;

const compareArea: (
  area1: IWaitingArea,
) => (area2: IWaitingArea) => boolean = (area1: IWaitingArea) =>
  (area2: IWaitingArea) => {
    return area1.xMin === area2.xMin &&
      area1.xMax === area2.xMax &&
      area1.yMin === area2.yMin &&
      area1.yMax === area2.yMax &&
      getLayoutAsPrintable(area1).join("") ===
        getLayoutAsPrintable(area2).join("");
  };

const getLayoutAsPrintable = (area: IWaitingArea) => {
  const printableLayout: Array<Array<StateEnum>> = Array.from(
    { length: area.yMax + 1 },
    () => Array.from({ length: area.xMax + 1 }),
  );
  area.layout.forEach((seat) => {
    printableLayout[seat.coordinate.y][seat.coordinate.x] = seat.state;
  });

  return printableLayout.map((row) => row.join(""));
};

const runSeatBattleRoyal: (doPrint: boolean) => (
  getAdjacentSeat: (
    area: IWaitingArea,
  ) => (seat: ISeat) => ReadonlyArray<ISeat>,
) => (initialArea: IWaitingArea, maxAdjacentOccupied: number) => IWaitingArea =
  (doPrint: boolean) =>
    (
      getAdjacentSeat: (
        area: IWaitingArea,
      ) => (seat: ISeat) => ReadonlyArray<ISeat>,
    ) =>
      (initialArea: IWaitingArea, maxAdjacentOccupied: number) => {
        const currentArea: IWaitingArea = {
          ...initialArea,
          layout: [...initialArea.layout],
        };

        let isSameArea = false;

        while (!isSameArea) {
          const newLayout: ReadonlyArray<ISeat> = currentArea.layout.map(
            (seat) => {
              let newSeat = { ...seat };
              const numberOfAdjacentOccupied = countOccupiedSeat(
                getAdjacentSeat(currentArea)(seat),
              );
              switch (seat.state) {
                case StateEnum.FLOOR:
                  break;
                case StateEnum.EMPTY:
                  newSeat.state = numberOfAdjacentOccupied === 0
                    ? StateEnum.OCCUPIED
                    : StateEnum.EMPTY;
                  break;
                case StateEnum.OCCUPIED:
                  newSeat.state =
                    numberOfAdjacentOccupied >= maxAdjacentOccupied
                      ? StateEnum.EMPTY : StateEnum.OCCUPIED;
                  break;
              }
              return newSeat;
            },
          );

          isSameArea = compareArea(currentArea)({
            ...currentArea,
            layout: newLayout,
          });

          currentArea.layout = newLayout;

          if (doPrint) {
            getLayoutAsPrintable(currentArea).map((row) => {
              console.log(row);
            });
          }
        }

        return currentArea;
      };

export const fn1 = (input: IAoCInput) => {
  const initialArea = parser(input);
  const finalArea = runSeatBattleRoyal(true)(getStrictAdjacentSeats)(
    initialArea,
    4,
  );
  return countOccupiedSeat(finalArea.layout);
};
export const fn2 = (input: IAoCInput) => {
  const initialArea = parser(input);
  const finalArea = runSeatBattleRoyal(false)(getAdjacentInSightSeats)(
    initialArea,
    5,
  );
  return countOccupiedSeat(finalArea.layout);
};
