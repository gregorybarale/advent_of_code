export type Interval = [number, number];

export interface Cube {
    x: number;
    y: number;
    z: number;
    isOn: boolean;
};

export interface Cuboid {
    xRange: Interval;
    yRange: Interval;
    zRange: Interval;
}

export interface Step extends Cuboid {
    isOn: boolean;
}

export type Core = ReadonlyArray<Cube>;

export const isNumberInInterval = (interval: Interval) => (n: number): boolean => interval[0] <= n && n <= interval[1];
export const doesIntervalOverlap = (intervalA: Interval) => (intervalB: Interval): boolean =>
    isNumberInInterval(intervalA)(intervalB[0]) || isNumberInInterval(intervalA)(intervalB[1]);

export const parseInput = (input: ReadonlyArray<string>): ReadonlyArray<Step> => input.map(str => {
    const regexp = /(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/;
    if (!regexp.test(str)) throw new Error("Bad step parsing");
    const [_, isOn, xStart, xEnd, yStart, yEnd, zStart, zEnd] = regexp.exec(str) as RegExpExecArray;
    return {
        isOn: isOn === "on",
        xRange: [Number.parseInt(xStart, 10), Number.parseInt(xEnd, 10)],
        yRange: [Number.parseInt(yStart, 10), Number.parseInt(yEnd, 10)],
        zRange: [Number.parseInt(zStart, 10), Number.parseInt(zEnd, 10)],
    };
});

export const generateCore = (xRange: [number, number], yRange: [number, number], zRange: [number, number], isOn = false): Core => {
    const core: Array<Cube> = [];
    for (let x = xRange[0]; x <= xRange[1]; x++) {
        for (let y = yRange[0]; y <= yRange[1]; y++) {
            for (let z = zRange[0]; z <= zRange[1]; z++) {
                core.push({
                    isOn,
                    x,
                    y,
                    z,
                });
            }
        }
    }
    return core;
};

export const applyStepOnCore = (step: Step) => (core: Core): Core => core.map(cube => {
    if (
        cube.x >= step.xRange[0] && cube.x <= step.xRange[1] &&
        cube.y >= step.yRange[0] && cube.y <= step.yRange[1] &&
        cube.z >= step.zRange[0] && cube.z <= step.zRange[1]
    ) {
        return {
            ...cube,
            isOn: step.isOn,
        };
    }
    return cube;
});

export const doesCuboidIntersect = (cuboid1: Cuboid) => (cuboid2: Cuboid): boolean => {
    return doesIntervalOverlap(cuboid1.xRange)(cuboid2.xRange) ||
        doesIntervalOverlap(cuboid1.yRange)(cuboid2.yRange) ||
        doesIntervalOverlap(cuboid1.zRange)(cuboid2.zRange)
};



