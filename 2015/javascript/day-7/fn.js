function uint16(n) {
  return n & 0xffff;
}

/**
 * Parse raw instruction
 * Parse into
 * {
 *   source: [a, b],
 *   target: c,
 *   fn: (a,b) => c
 * }
 */
function parseInstruction(instruction) {
  const arr = instruction.split(" ");
  if (arr.length === 3) {
    isSourceNumber = !isNaN(parseInt(arr[0]));
    return {
      source: isSourceNumber ? [] : [arr[0]],
      target: arr[2],
      fn: isSourceNumber ? () => parseInt(arr[0]) : (input) => input,
    };
  }
  if (arr.length === 4) {
    isSourceNumber = !isNaN(parseInt(arr[1]));
    return {
      source: isSourceNumber ? [] : [arr[1]],
      target: arr[3],
      fn: isSourceNumber
        ? () => uint16(~parseInt(arr[1]))
        : (input) => uint16(~input),
    };
  }
  if (arr.length === 5) {
    let fn;
    let source;
    const isSource1Number = !isNaN(parseInt(arr[0]));
    const isSource2Number = !isNaN(parseInt(arr[2]));
    switch (arr[1]) {
      case "AND":
        if (isSource1Number && isSource2Number) {
          source = [];
          fn = () => uint16(parseInt(arr[0]) & parseInt(arr[2]));
        } else if (isSource1Number) {
          source = [arr[2]];
          fn = (input) => uint16(parseInt(arr[0]) & input);
        } else if (isSource2Number) {
          source = [arr[0]];
          fn = (input) => uint16(input & arr[2]);
        } else {
          source = [arr[0], arr[2]];
          fn = (input1, input2) => uint16(input1 & input2);
        }
        break;
      case "OR":
        if (isSource1Number && isSource2Number) {
          source = [];
          fn = () => uint16(parseInt(arr[0]) | parseInt(arr[2]));
        } else if (isSource1Number) {
          source = [arr[2]];
          fn = (input) => uint16(parseInt(arr[0]) | input);
        } else if (isSource2Number) {
          source = [arr[0]];
          fn = (input) => uint16(parseInt(input | arr[2]));
        } else {
          source = [arr[0], arr[2]];
          fn = (input1, input2) => uint16(input1 | input2);
        }
        break;
      case "LSHIFT":
        if (isSource1Number && isSource2Number) {
          source = [];
          fn = () => uint16(parseInt(arr[0]) << parseInt(arr[2]));
        } else if (isSource1Number) {
          source = [arr[2]];
          fn = (input) => uint16(parseInt(arr[0]) << input);
        } else if (isSource2Number) {
          source = [arr[0]];
          fn = (input) => uint16(input << parseInt(arr[2]));
        } else {
          source = [arr[0], arr[2]];
          fn = (input1, input2) => uint16(input1 << input2);
        }
        break;
      case "RSHIFT":
        if (isSource1Number && isSource2Number) {
          source = [];
          fn = () => uint16(parseInt(arr[0]) >> parseInt(arr[2]));
        } else if (isSource1Number) {
          source = [arr[2]];
          fn = (input) => uint16(parseInt(arr[0]) >> input);
        } else if (isSource2Number) {
          source = [arr[0]];
          fn = (input) => uint16(input >> parseInt(arr[2]));
        } else {
          source = [arr[0], arr[2]];
          fn = (input1, input2) => uint16(input1 >> input2);
        }
        break;
    }
    return {
      source,
      target: arr[4],
      fn,
    };
  }
}

const fn1 = (instructions) => {
  const parsedInstruction = instructions.map((instruction) =>
    parseInstruction(instruction)
  );
  const wires = parsedInstruction
    .map((x) => [...x.source, x.target])
    .flat()
    .filter((x) => isNaN(parseInt(x)))
    .sort()
    .reduce((acc, x) => ({ ...acc, [x]: undefined }), {});

  const firstSources = parsedInstruction.filter(
    (x) => x.source.length === 0,
  );

  firstSources.forEach((x) => {
    wires[x.target] = x.fn();
  });

  while (Object.values(wires).some((value) => value === undefined)) {
    parsedInstruction.forEach((instruction) => {
      if (instruction.source.every((x) => wires[x] !== undefined)) {
        if (instruction.source.length === 1) {
          wires[instruction.target] = instruction.fn(
            wires[instruction.source[0]],
          );
        } else if (instruction.source.length === 2) {
          wires[instruction.target] = instruction.fn(
            wires[instruction.source[0]],
            wires[instruction.source[1]],
          );
        }
      }
    });
  }
  return wires;
};

const fn2 = (instructions) => {
  const parsedInstruction = instructions.map((instruction) =>
    parseInstruction(instruction)
  );

  const wires = fn1(instructions);

  const bValue = wires.a;

  Object.keys(wires).forEach((key) => {
    if (key !== "b") {
      wires[key] = undefined;
    }
  });

  wires.b = bValue;

  const firstSources = parsedInstruction.filter(
    (x) => x.source.length === 0,
  );

  firstSources.forEach((x) => {
    if (x.target !== "b") {
      wires[x.target] = x.fn();
    }
  });

  while (Object.values(wires).some((value) => value === undefined)) {
    parsedInstruction.forEach((instruction) => {
      if (
        instruction.source.every((x) => wires[x] !== undefined) &&
        instruction.target !== "b"
      ) {
        if (instruction.source.length === 1) {
          wires[instruction.target] = instruction.fn(
            wires[instruction.source[0]],
          );
        } else if (instruction.source.length === 2) {
          wires[instruction.target] = instruction.fn(
            wires[instruction.source[0]],
            wires[instruction.source[1]],
          );
        }
      }
    });
  }
  return wires;
};

module.exports = {
  fn1,
  fn2,
};
