import { IAoCInput } from "../../../utils/javascript/deno-utils/input.ts";
import { applyStepOnCore, Core, generateCore, parseInput } from "./utils.ts";

export const fn1 = ({ input }: IAoCInput) => {
  const steps = parseInput(input);
  console.log("Steps generation done");
  let core = generateCore([-50, 50], [-50, 50], [-50, 50]);
  console.log("Core generation done");
  steps.forEach((step, index) => {
    core = applyStepOnCore(step)(core);
    console.log(`Step ${index + 1} done`);
  });
  return core.filter(({ isOn }) => isOn).length;
};
export const fn2 = ({ input }: IAoCInput) => {
  const steps = parseInput(input);

  const xMin = Math.min(...steps.map(({ xRange }) => xRange[0]));
  const xMax = Math.max(...steps.map(({ xRange }) => xRange[1]));
  const yMin = Math.min(...steps.map(({ yRange }) => yRange[0]));
  const yMax = Math.max(...steps.map(({ yRange }) => yRange[1]));
  const zMin = Math.min(...steps.map(({ zRange }) => zRange[0]));
  const zMax = Math.max(...steps.map(({ zRange }) => zRange[1]));

  console.log("x", xMin, xMax);
  console.log("y", yMin, yMax);
  console.log("z", zMin, zMax);

  let nbrOn = 0;
  for (let x = xMin; x <= xMax; x++) {
    for (let y = yMin; y <= yMax; y++) {
      for (let z = zMin; z <= zMax; z++) {
        //console.log('cube', x, y, z);
        let isOn = false;
        steps.forEach((step) => {
          if (
            x >= step.xRange[0] && x <= step.xRange[1] &&
            y >= step.yRange[0] && y <= step.yRange[1] &&
            z >= step.zRange[0] && z <= step.zRange[1]
          ) {
            isOn = step.isOn;
          }
        });
        if (isOn) {
          nbrOn += 1;
        }
      }
    }
  }

  //console.log('Steps generation done');
  return nbrOn;
};
